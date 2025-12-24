// Google Drive OAuth2 và backup
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const BACKUP_FOLDER_NAME = 'Mail Economic Backups';
const BACKUP_FILE_NAME = 'email-accounts.json';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let backupFolderId = null;
let backupFileId = null;
let userEmail = null;
let userAvatar = null;

const SESSION_KEY = 'mail_economic_session';

function saveSession(token, email, avatar) {
  const session = {
    token,
    email,
    avatar,
    timestamp: Date.now()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadSession() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    
    const session = JSON.parse(data);
    // Token expires after 1 hour, but we check 50 mins to be safe
    const isExpired = Date.now() - session.timestamp > 50 * 60 * 1000;
    if (isExpired) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function initGoogleDrive() {
  return new Promise((resolve) => {
    // Load GAPI
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.onload = () => {
      window.gapi.load('client', async () => {
        await window.gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
        });
        gapiInited = true;
        maybeResolve();
      });
    };
    document.body.appendChild(gapiScript);

    // Load GIS
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.onload = () => {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
      });
      gisInited = true;
      maybeResolve();
    };
    document.body.appendChild(gisScript);

    function maybeResolve() {
      if (gapiInited && gisInited) {
        resolve(true);
      }
    }
  });
}

// Try to restore previous session
export async function tryRestoreSession() {
  const session = loadSession();
  if (!session || !session.token) return null;
  
  try {
    // Set the saved token
    window.gapi.client.setToken(session.token);
    
    // Verify token is still valid by making a test request
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: 'Bearer ' + session.token.access_token
      }
    });
    
    if (!response.ok) {
      clearSession();
      window.gapi.client.setToken(null);
      return null;
    }
    
    const data = await response.json();
    userEmail = data.email;
    userAvatar = data.picture;
    
    // Update session with fresh user info
    saveSession(session.token, userEmail, userAvatar);
    
    return { email: userEmail, avatar: userAvatar };
  } catch {
    clearSession();
    window.gapi.client.setToken(null);
    return null;
  }
}

export function signInWithGoogle() {
  return new Promise((resolve, reject) => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        reject(resp);
      } else {
        // Get user info (email + avatar)
        try {
          const token = window.gapi.client.getToken();
          const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: 'Bearer ' + token.access_token
            }
          });
          const data = await response.json();
          userEmail = data.email;
          userAvatar = data.picture;
          
          // Save session for auto-login
          saveSession(token, userEmail, userAvatar);
        } catch (error) {
          console.error('Error getting user info:', error);
        }
        resolve(resp);
      }
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
}

export function signOutFromGoogle() {
  const token = window.gapi.client.getToken();
  if (token !== null) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken('');
  }
  clearSession();
  backupFolderId = null;
  backupFileId = null;
  userEmail = null;
  userAvatar = null;
}

export function getUserEmail() {
  return userEmail;
}

export function getBackupFolderId() {
  return backupFolderId;
}

async function findOrCreateFolder() {
  if (backupFolderId) return backupFolderId;

  try {
    // Search for existing folder
    const response = await window.gapi.client.drive.files.list({
      q: `name='${BACKUP_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });

    if (response.result.files && response.result.files.length > 0) {
      backupFolderId = response.result.files[0].id;
      return backupFolderId;
    }

    // Create folder if not exists
    const folderMetadata = {
      name: BACKUP_FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
    };

    const folder = await window.gapi.client.drive.files.create({
      resource: folderMetadata,
      fields: 'id',
    });

    backupFolderId = folder.result.id;
    return backupFolderId;
  } catch (error) {
    console.error('Error finding/creating folder:', error);
    throw error;
  }
}

async function findBackupFile(folderId) {
  if (backupFileId) return backupFileId;

  try {
    const response = await window.gapi.client.drive.files.list({
      q: `name='${BACKUP_FILE_NAME}' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });

    if (response.result.files && response.result.files.length > 0) {
      backupFileId = response.result.files[0].id;
      return backupFileId;
    }

    return null;
  } catch (error) {
    console.error('Error finding backup file:', error);
    throw error;
  }
}

export async function backupToDrive(accounts, retries = 3) {
  try {
    const content = JSON.stringify({
      version: '1.0',
      timestamp: new Date().toISOString(),
      accounts: accounts,
    }, null, 2);

    const folderId = await findOrCreateFolder();
    const existingFileId = await findBackupFile(folderId);

    const metadata = {
      name: BACKUP_FILE_NAME,
      mimeType: 'application/json',
    };

    if (!existingFileId) {
      metadata.parents = [folderId];
    }

    const file = new Blob([content], { type: 'application/json' });
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const url = existingFileId
      ? `https://www.googleapis.com/upload/drive/v3/files/${existingFileId}?uploadType=multipart`
      : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

    const method = existingFileId ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: new Headers({ 
        Authorization: 'Bearer ' + window.gapi.client.getToken().access_token 
      }),
      body: form,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!existingFileId) {
      backupFileId = result.id;
    }

    return { success: true, fileId: result.id };
  } catch (error) {
    console.error('Backup error:', error);
    
    // Retry logic
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return backupToDrive(accounts, retries - 1);
    }
    
    throw error;
  }
}

export function isSignedIn() {
  return window.gapi?.client?.getToken() !== null;
}

export function getUserAvatar() {
  return userAvatar;
}
