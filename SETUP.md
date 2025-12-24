# Hướng dẫn cài đặt và sử dụng

## 1. Cài đặt dependencies

```bash
npm install
```

## 2. Cấu hình Google Drive OAuth2 (Tùy chọn)

Nếu bạn muốn sử dụng tính năng sao lưu lên Google Drive:

### Bước 1: Tạo Google Cloud Project
1. Truy cập https://console.cloud.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Vào "APIs & Services" > "Library"
4. Tìm và bật "Google Drive API"

### Bước 2: Tạo OAuth 2.0 Credentials
1. Vào "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Chọn "Web application"
4. Thêm Authorized JavaScript origins:
   - Development: `http://localhost:5173`
   - Production: URL website của bạn
5. Copy Client ID

### Bước 3: Cập nhật Client ID
Mở file `src/lib/googleDrive.js` và thay thế:
```javascript
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
```
bằng Client ID bạn vừa tạo.

## 3. Chạy ứng dụng

### Development mode
```bash
npm run dev
```
Mở http://localhost:5173

### Build production
```bash
npm run build
npm run preview
```

## 4. Tạo PWA Icons

Bạn cần tạo 2 file icon:
- `public/pwa-192x192.png` (192x192px)
- `public/pwa-512x512.png` (512x512px)

Có thể sử dụng tool online như:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

## 5. Cài đặt PWA trên điện thoại

### Android (Chrome/Edge)
1. Mở website trên Chrome
2. Nhấn menu (⋮) > "Add to Home screen"
3. Đặt tên và nhấn "Add"

### iOS (Safari)
1. Mở website trên Safari
2. Nhấn nút Share (⬆️)
3. Chọn "Add to Home Screen"
4. Đặt tên và nhấn "Add"

## 6. Deploy lên hosting

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
1. Build: `npm run build`
2. Push folder `dist` lên GitHub
3. Bật GitHub Pages trong Settings

## Tính năng chính

### Tạo email random
- Click "Tạo tài khoản mới"
- Email và password tự động generate
- Click icon copy để copy
- Nhấn "Thành công" để lưu hoặc "Thất bại" để tạo mới

### Quản lý danh sách
- Tìm kiếm email
- Click badge để đổi trạng thái (Đang dùng/Chưa dùng)
- Click icon edit để thêm ghi chú
- Click icon trash để xóa

### Sao lưu & Phục hồi
- **Export**: Download file JSON
- **Import**: Upload file JSON đã export
- **Backup to Drive**: Sao lưu lên Google Drive (cần OAuth)

### Dark Mode
- Click icon mặt trăng/mặt trời để chuyển đổi
- Tự động lưu preference

## Lưu ý bảo mật

- Dữ liệu lưu trong localStorage của trình duyệt
- Không gửi dữ liệu lên server nào (trừ Google Drive nếu bạn chọn)
- Nên sử dụng HTTPS khi deploy production
- Backup dữ liệu thường xuyên

## Troubleshooting

### Google Drive không hoạt động
- Kiểm tra Client ID đã đúng chưa
- Kiểm tra URL trong Authorized JavaScript origins
- Xem console log để debug

### PWA không cài được
- Cần HTTPS (localhost được miễn)
- Kiểm tra file manifest.json
- Kiểm tra icons đã tạo chưa

### Dark mode không lưu
- Kiểm tra localStorage có bị block không
- Thử clear cache và reload
