# 📱 Hướng Dẫn Cài Đặt Xumi Wonder Weeks Lên iPhone

Chào anh, em đã tạo xong phiên bản Web App (PWA) mô phỏng lại 100% logic và giao diện gốc của bản Desktop. 
Source code được đặt tại thư mục: `E:\Project-Vibe-Code\Xumi-Wonder-Weeks-Web`

Đặc điểm của bản này:
- ⚡ **Hoạt động Offline 100%**: Sau khi cài xong, anh không cần mạng lưới Internet vẫn có thể xem lịch tiêm, đánh dấu ngày tiêm, xem thông tin Leap bình thường.
- 🔒 **Bảo mật tuyệt đối**: Dữ liệu lưu thẳng vào LocalStorage trên trình duyệt Safari của iPhone, không đẩy lên bất kỳ Server nào.

---

## 🚀 Các Bước Triển Khai (Dễ nhất - Bằng GitHub Pages)

Vì iPhone cần một đường link HTTPS hợp lệ để nhận dạng đây là 1 ứng dụng PWA, anh chỉ cần làm 3 bước sau:

### Bước 1: Đẩy Source Code lên GitHub
1. Anh đăng nhập vào **[GitHub.com](https://github.com)**
2. Tạo một Repository mới (chọn chế độ **Public** hoặc **Private** đều được, tên ví dụ: `xumi-ww-app`).
3. Upload toàn bộ các file trong thư mục `E:\Project-Vibe-Code\Xumi-Wonder-Weeks-Web` (gồm thư mục `assets`, `css`, `js`, file `index.html`, `manifest.json`, `sw.js`) lên Repo đó.

### Bước 2: Bật GitHub Pages
1. Trong Repo GitHub vừa tạo, vào tab **Settings** > **Pages** (cột bên trái).
2. Ở phần **Build and deployment** -> **Source**: Chọn nhánh `main` (hoặc `master`), Thư mục `/ (root)` rồi nhấn **Save**.
3. Chờ khoảng 1-2 phút, GitHub sẽ hiển thị 1 đường link trang web của anh (Ví dụ: `https://vinhlam.github.io/xumi-ww-app/`).

### Bước 3: Cài đặt vào Màn hình chính iPhone (Add to Home Screen)
1. Mở trình duyệt **Safari** trên iPhone 11 Pro Max của anh.
2. Truy cập vào đường link GitHub Pages vừa tạo ở Bước 2.
3. Ở cạnh dưới màn hình Safari, nhấn vào **nút Share (Chia sẻ)** (Hình vuông có mũi tên chĩa lên).
4. Kéo xuống dưới, chọn **Thêm vào MH chính (Add to Home Screen)**.
5. Nhấn **Thêm (Add)** ở góc trên bên phải.

🎉 Xong! Bây giờ ngoài màn hình chính của iPhone đã có biểu tượng **Xumi WW**. 
Anh mở lên, app sẽ chạy toàn màn hình, không có thanh địa chỉ Safari, mượt mà như app tải từ App Store.

---
*Lưu ý: Nếu anh dùng Vercel, Cloudflare Pages hoặc có Hosting riêng, anh chỉ cần ném toàn bộ thư mục đó lên Hosting tĩnh là được.*
