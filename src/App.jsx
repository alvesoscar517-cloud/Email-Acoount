import { useState, useEffect, useRef } from 'react';
import { ToastProvider, useToast as useToastContext } from './components/ui/toast';
import { DialogProvider, useDialog } from './components/ui/dialog';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import EmailGenerator from './components/EmailGenerator';
import EmailList from './components/EmailList';
import { saveAccounts, loadAccounts } from './lib/storage';
import { initGoogleDrive, signInWithGoogle, signOutFromGoogle, backupToDrive, getUserEmail, getUserAvatar, getBackupFolderId, tryRestoreSession } from './lib/googleDrive';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [driveReady, setDriveReady] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  
  const syncTimerRef = useRef(null);
  const lastSyncedRef = useRef(null);
  const { toast } = useToastContext();
  const { showDialog } = useDialog();

  // Initial load
  useEffect(() => {
    const savedAccounts = loadAccounts();
    setAccounts(savedAccounts);
    lastSyncedRef.current = JSON.stringify(savedAccounts);

    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    initGoogleDrive().then(async () => {
      setDriveReady(true);
      
      // Try to restore previous session
      const session = await tryRestoreSession();
      if (session) {
        setUserEmail(session.email);
        setUserAvatar(session.avatar);
        setIsLoggedIn(true);
      }
      
      setIsLoading(false);
    });
  }, []);

  // Save to localStorage immediately
  useEffect(() => {
    if (!isLoading) {
      saveAccounts(accounts);
    }
  }, [accounts, isLoading]);

  // Sync function
  const performSync = async (data) => {
    if (isSyncing) return;
    
    const currentData = JSON.stringify(data);
    if (currentData === lastSyncedRef.current) return;
    
    try {
      setIsSyncing(true);
      await backupToDrive(data);
      lastSyncedRef.current = currentData;
      toast('Synced to Drive');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto sync with debounce - only when accounts actually change
  useEffect(() => {
    if (!driveReady || !isLoggedIn || accounts.length === 0 || isLoading) {
      return;
    }

    const currentData = JSON.stringify(accounts);
    if (currentData === lastSyncedRef.current) {
      return;
    }

    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    syncTimerRef.current = setTimeout(() => {
      performSync(accounts);
    }, 3000);

    return () => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, [accounts, driveReady, isLoggedIn, isLoading]);

  const handleLogin = async () => {
    try {
      if (driveReady) {
        await signInWithGoogle();
        setUserEmail(getUserEmail());
        setUserAvatar(getUserAvatar());
      }
      setIsLoggedIn(true);
      
      // Initial sync after login if there's data
      if (accounts.length > 0) {
        setTimeout(() => performSync(accounts), 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    if (driveReady) {
      signOutFromGoogle();
    }
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserAvatar(null);
    lastSyncedRef.current = null;
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleSaveAccount = (account) => {
    setAccounts(prev => [account, ...prev]);
  };

  const handleUpdateAccount = (updatedAccount) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === updatedAccount.id ? updatedAccount : acc
    ));
  };

  const handleDeleteAccount = (id) => {
    showDialog({
      title: 'Delete Account',
      description: 'Are you sure you want to delete this account? This action cannot be undone.',
      onConfirm: () => {
        setAccounts(prev => prev.filter(acc => acc.id !== id));
      }
    });
  };

  const handleOpenDrive = () => {
    const folderId = getBackupFolderId();
    if (folderId) {
      window.open(`https://drive.google.com/drive/folders/${folderId}`, '_blank');
    } else {
      window.open('https://drive.google.com/drive/my-drive', '_blank');
    }
  };

  const stats = {
    total: accounts.length,
    used: accounts.filter(acc => acc.status === 'used').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5 pb-8 max-w-4xl">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
          onOpenDrive={handleOpenDrive}
          stats={stats}
          isSyncing={isSyncing}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
        
        <div className="grid gap-5 md:grid-cols-1">
          <EmailGenerator onSave={handleSaveAccount} />
          <EmailList
            accounts={accounts}
            onUpdate={handleUpdateAccount}
            onDelete={handleDeleteAccount}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <DialogProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </DialogProvider>
  );
}

export default App;
