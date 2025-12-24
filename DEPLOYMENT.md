# Hướng dẫn Deploy

## 1. Vercel (Khuyên dùng - Miễn phí)

### Cách 1: Deploy qua CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### Cách 2: Deploy qua GitHub
1. Push code lên GitHub
2. Truy cập https://vercel.com
3. Import repository
4. Vercel tự động detect Vite
5. Click Deploy

### Cấu hình Environment Variables
1. Vào Project Settings > Environment Variables
2. Thêm: `VITE_GOOGLE_CLIENT_ID` = your_client_id
3. Redeploy

## 2. Netlify (Miễn phí)

### Deploy qua CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy qua GitHub
1. Push code lên GitHub
2. Truy cập https://netlify.com
3. New site from Git
4. Chọn repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy

### Cấu hình
Tạo file `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 3. GitHub Pages

### Cách 1: Manual
```bash
# Build
npm run build

# Deploy (cần gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

### Cách 2: GitHub Actions
Tạo file `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install and Build
        run: |
          npm install
          npm run build
          
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Cấu hình `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

## 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

Cấu hình `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 5. Cloudflare Pages

1. Push code lên GitHub
2. Truy cập https://pages.cloudflare.com
3. Create a project
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
6. Deploy

## Checklist trước khi deploy

- [ ] Đã cấu hình Google OAuth Client ID
- [ ] Đã thêm production URL vào Authorized JavaScript origins
- [ ] Đã tạo PWA icons (192x192 và 512x512)
- [ ] Đã test build local: `npm run build && npm run preview`
- [ ] Đã update environment variables
- [ ] Đã test PWA install
- [ ] Đã test trên mobile
- [ ] Đã enable HTTPS

## Sau khi deploy

### 1. Cập nhật Google OAuth
1. Vào Google Cloud Console
2. Credentials > OAuth 2.0 Client IDs
3. Thêm production URL vào Authorized JavaScript origins
4. Ví dụ: `https://your-app.vercel.app`

### 2. Test PWA
1. Mở DevTools > Lighthouse
2. Run PWA audit
3. Score nên >= 90

### 3. Test trên mobile
1. Mở trên điện thoại
2. Test "Add to Home Screen"
3. Test offline mode
4. Test dark mode

## Custom Domain

### Vercel
1. Project Settings > Domains
2. Add domain
3. Update DNS records theo hướng dẫn

### Netlify
1. Domain settings > Add custom domain
2. Update DNS records

### Cloudflare Pages
1. Custom domains > Set up a domain
2. Tự động config DNS nếu dùng Cloudflare

## SSL/HTTPS

Tất cả các platform trên đều tự động cấp SSL certificate miễn phí (Let's Encrypt).

## Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Thêm vào `src/main.jsx`:
```javascript
import { inject } from '@vercel/analytics';
inject();
```

### Google Analytics
Thêm vào `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```
