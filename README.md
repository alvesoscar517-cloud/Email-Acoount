# Mail Economic

Modern email account manager with Google Drive sync.

## Features

- ✅ Generate random email accounts
- ✅ Copy email/password with one click
- ✅ Manage account status (Active/Inactive)
- ✅ Add notes to each account
- ✅ Search accounts
- ✅ Auto-sync to Google Drive
- ✅ Dark mode
- ✅ PWA - Install as app on mobile
- ✅ Responsive design

## Tech Stack

- React 18 + Vite
- Tailwind CSS + Shadcn UI
- Lucide React Icons
- Google Drive API
- PWA Support

## Installation

```bash
npm install
```

## Configuration

### Google Drive OAuth2

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Drive API
4. Create OAuth 2.0 Client ID (Web application)
5. Add authorized JavaScript origins: `http://localhost:5173`
6. Copy Client ID and replace in `.env`

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

See `DEPLOYMENT.md` for deployment instructions.

## License

MIT
