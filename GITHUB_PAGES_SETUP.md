# Hướng dẫn Deploy lên GitHub Pages với Custom Domain

## Bước 1: Push code lên GitHub

```bash
# Khởi tạo git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit: Email Manager app"

# Tạo repository trên GitHub (tên gì cũng được, ví dụ: email-manager)
# Sau đó link với remote
git remote add origin https://github.com/YOUR_USERNAME/email-manager.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

## Bước 2: Cấu hình GitHub Secrets

1. Vào repository trên GitHub
2. Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Thêm secret:
   - Name: `VITE_GOOGLE_CLIENT_ID`
   - Value: `118532564138-9f267qpa52d0iaa6lhqmmgci9n1ubp5h.apps.googleusercontent.com`
5. Click "Add secret"

## Bước 3: Enable GitHub Pages

1. Vào Settings > Pages
2. Source: chọn "GitHub Actions"
3. Save

## Bước 4: Cấu hình Custom Domain

### Trong GitHub:
1. Vào Settings > Pages
2. Custom domain: nhập `email.graphosai.com`
3. Click Save
4. Đợi DNS check (có thể mất vài phút)
5. Sau khi DNS check pass, tick "Enforce HTTPS"

### Trong DNS Provider (nơi quản lý domain graphosai.com):

Thêm CNAME record:
```
Type: CNAME
Name: email
Value: YOUR_USERNAME.github.io
TTL: 3600 (hoặc Auto)
```

Ví dụ nếu GitHub username của bạn là `johndoe`:
```
email.graphosai.com -> johndoe.github.io
```

## Bước 5: Cập nhật Google OAuth

1. Vào Google Cloud Console: https://console.cloud.google.com/
2. Chọn project của bạn
3. APIs & Services > Credentials
4. Click vào OAuth 2.0 Client ID của bạn
5. Thêm vào "Authorized JavaScript origins":
   ```
   https://email.graphosai.com
   ```
6. Thêm vào "Authorized redirect URIs" (nếu cần):
   ```
   https://email.graphosai.com
   ```
7. Click Save

## Bước 6: Deploy

Code đã tự động deploy khi bạn push lên GitHub!

Kiểm tra:
1. Vào tab "Actions" trên GitHub
2. Xem workflow "Deploy to GitHub Pages" đang chạy
3. Đợi ~2-3 phút
4. Truy cập: https://email.graphosai.com

## Bước 7: Tạo PWA Icons (Quan trọng!)

Trước khi deploy, bạn cần tạo icons:

```bash
# Option 1: Tự động generate
npm run generate-icons

# Option 2: Tải từ online tool
# Truy cập: https://www.pwabuilder.com/imageGenerator
# Upload logo, download và copy vào public/
```

Cần 2 files:
- `public/pwa-192x192.png`
- `public/pwa-512x512.png`

## Troubleshooting

### DNS không resolve
- Đợi 5-30 phút để DNS propagate
- Check bằng: `nslookup email.graphosai.com`
- Hoặc: https://dnschecker.org/

### GitHub Pages không hoạt động
- Check tab Actions xem có lỗi không
- Đảm bảo đã enable GitHub Pages trong Settings
- Đảm bảo branch là `main` hoặc `master`

### Google OAuth lỗi "redirect_uri_mismatch"
- Kiểm tra lại Authorized JavaScript origins
- Phải có HTTPS (không có trailing slash)
- Đợi 5 phút sau khi save để Google cập nhật

### PWA không cài được
- Cần HTTPS (GitHub Pages tự động có)
- Kiểm tra icons đã tạo chưa
- Mở DevTools > Application > Manifest

## Update sau này

Mỗi khi bạn muốn update:

```bash
git add .
git commit -m "Update features"
git push
```

GitHub Actions sẽ tự động build và deploy!

## Kiểm tra deployment

1. **Website**: https://email.graphosai.com
2. **PWA**: Mở trên mobile > Menu > "Add to Home Screen"
3. **Google Login**: Test đăng nhập với Google
4. **Backup**: Test backup lên Google Drive

## Monitoring

Xem logs deployment:
- GitHub > Repository > Actions > Click vào workflow run

## Rollback (nếu cần)

```bash
# Quay lại commit trước
git revert HEAD
git push

# Hoặc reset về commit cụ thể
git reset --hard COMMIT_HASH
git push -f
```

## Tips

1. **Development**: Vẫn dùng `npm run dev` để test local
2. **Staging**: Có thể tạo branch `staging` và deploy riêng
3. **Analytics**: Thêm Google Analytics để track usage
4. **Monitoring**: Dùng GitHub Insights để xem traffic

## Checklist Deploy

- [x] Push code lên GitHub
- [x] Add GitHub Secret (VITE_GOOGLE_CLIENT_ID)
- [x] Enable GitHub Pages
- [x] Cấu hình Custom Domain
- [x] Thêm CNAME record trong DNS
- [x] Update Google OAuth origins
- [x] Tạo PWA icons
- [x] Test trên production
- [x] Test PWA install
- [x] Test Google login
- [x] Test backup to Drive

Xong! 🎉
