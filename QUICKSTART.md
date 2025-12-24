# Quick Start - 5 phút để chạy

## Bước 1: Cài đặt (1 phút)
```bash
npm install
```

## Bước 2: Tạo icons PWA (1 phút)
```bash
npm run generate-icons
```
Hoặc download icons từ: https://www.pwabuilder.com/imageGenerator

## Bước 3: Chạy app (30 giây)
```bash
npm run dev
```
Mở http://localhost:5173

## Bước 4: Test (2 phút)
1. Click "Đăng nhập với Google" (có thể bỏ qua OAuth)
2. Click "Tạo tài khoản mới"
3. Copy email và password
4. Click "Thành công" để lưu
5. Xem danh sách tài khoản

## Bước 5: Cài PWA trên điện thoại (1 phút)
1. Deploy lên Vercel/Netlify (xem DEPLOYMENT.md)
2. Mở trên điện thoại
3. Menu > "Add to Home Screen"

## Tùy chọn: Cấu hình Google Drive

Nếu muốn backup lên Drive:

1. Tạo OAuth Client ID: https://console.cloud.google.com/
2. Copy file `.env.example` thành `.env`
3. Thêm Client ID vào `.env`
4. Restart dev server

Chi tiết: xem SETUP.md

## Troubleshooting nhanh

**Icons không hiển thị?**
```bash
npm run generate-icons
```

**Build lỗi?**
```bash
rm -rf node_modules
npm install
npm run build
```

**PWA không cài được?**
- Cần HTTPS (hoặc localhost)
- Kiểm tra icons trong public/

**Google Drive không hoạt động?**
- Có thể bỏ qua, app vẫn chạy bình thường
- Dữ liệu lưu trong localStorage

## Các lệnh hữu ích

```bash
# Development
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Generate PWA icons
npm run generate-icons
```

## Cấu trúc project

```
email-manager/
├── public/              # Static files & PWA icons
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Shadcn UI components
│   │   ├── EmailGenerator.jsx
│   │   ├── EmailList.jsx
│   │   ├── Header.jsx
│   │   └── LoginScreen.jsx
│   ├── lib/            # Utilities
│   │   ├── emailGenerator.js
│   │   ├── googleDrive.js
│   │   ├── storage.js
│   │   └── utils.js
│   ├── App.jsx         # Main app
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Next Steps

1. Đọc FEATURES.md để xem tất cả tính năng
2. Đọc DEPLOYMENT.md để deploy lên production
3. Đọc SETUP.md để cấu hình chi tiết
4. Customize theo ý bạn!

## Support

Có vấn đề? Check:
- README.md - Tổng quan
- SETUP.md - Cài đặt chi tiết
- DEPLOYMENT.md - Deploy production
- FEATURES.md - Danh sách tính năng
- CREATE_ICONS.md - Tạo icons PWA
