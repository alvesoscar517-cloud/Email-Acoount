# Hướng dẫn tạo PWA Icons

## Cách nhanh nhất

### Option 1: Sử dụng PWA Asset Generator (Khuyên dùng)
```bash
npx @vite-pwa/assets-generator --preset minimal public/logo.svg
```

Trước tiên tạo file `public/logo.svg` với logo của bạn.

### Option 2: Sử dụng online tool

1. Truy cập: https://www.pwabuilder.com/imageGenerator
2. Upload logo của bạn (PNG hoặc SVG)
3. Download các icon đã generate
4. Copy 2 file vào folder `public/`:
   - `pwa-192x192.png`
   - `pwa-512x512.png`

### Option 3: Tạo thủ công bằng design tool

Sử dụng Figma, Photoshop, hoặc tool online:

1. Tạo canvas 512x512px
2. Design logo ở giữa (để padding ~10% mỗi bên)
3. Export 2 size:
   - 192x192px → `public/pwa-192x192.png`
   - 512x512px → `public/pwa-512x512.png`

## Icon đơn giản với emoji

Nếu bạn muốn nhanh, có thể dùng emoji:

1. Truy cập: https://favicon.io/emoji-favicons/
2. Chọn emoji (ví dụ: 📧 cho email)
3. Download và đổi tên file
4. Resize lên 192x192 và 512x512

## Yêu cầu icon

- Format: PNG
- Background: Nên có màu nền (không trong suốt hoàn toàn)
- Safe area: Để padding ~10% để tránh bị crop
- Sizes: 192x192 và 512x512 pixels

## Test PWA

Sau khi tạo icons:

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Mở DevTools > Application > Manifest
4. Kiểm tra icons hiển thị đúng
5. Test "Add to Home Screen"
