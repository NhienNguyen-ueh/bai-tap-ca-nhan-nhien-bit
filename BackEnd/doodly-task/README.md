# Doodly Tasks

Ứng dụng quản lý công việc cá nhân theo phong cách sổ tay minh họa, sử dụng giao diện tiếng Việt, REST API và cơ sở dữ liệu SQLite. Đây là đồ án thực hành về thiết kế giao diện, CRUD, truy vấn dữ liệu và biểu diễn thống kê.

## Tính năng

- Tạo, xem, sửa, xóa, đánh dấu hoàn thành và tìm kiếm công việc; lọc theo danh mục, trạng thái, độ ưu tiên và sắp xếp.
- Trang tổng quan theo ngày, các danh mục giấy màu, tiến độ trong ngày.
- Thống kê tổng quan, xu hướng 7/30 ngày và phân bố danh mục từ dữ liệu SQLite.
- Nhật ký công việc hoàn thành; lưu tùy chỉnh màu, mũ, phụ kiện, biểu cảm cho Doodly.
- Tạo danh mục tùy chỉnh, đổi màu; ngăn xóa danh mục còn công việc.
- Chủ đề giấy kem/vườn pastel, bố cục đáp ứng thiết bị di động, hỗ trợ reduced motion.

## Công nghệ và cấu trúc

Node.js, Express, better-sqlite3, SQLite, HTML/CSS, JavaScript thuần, Fetch API. Thống kê được trình bày bằng biểu đồ thanh CSS để tránh phụ thuộc thư viện ngoài.

```text
backend/server.js              REST API và phục vụ frontend
backend/database/schema.sql    Lược đồ, ràng buộc và chỉ mục
backend/database/migrate.js    Khởi tạo schema và danh mục mặc định
backend/database/seed.js       42 bản ghi demo tương đối theo ngày hiện tại
frontend/index.html            Ứng dụng single-page, điều hướng theo URL
frontend/css/app.css           Thiết kế responsive, giấy và minh họa
frontend/js/app.js             Fetch API và tương tác giao diện
docs/ai-prompts.md             Ghi chú hỗ trợ AI
```

## Cài đặt và chạy

Yêu cầu Node.js 18 trở lên và npm.

```sh
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Mở http://localhost:3000. Mặc định SQLite lưu tại `backend/database/doodly.sqlite`; có thể sao chép `.env.example` thành `.env` và đặt `PORT` hoặc `DB_FILE`. `db:seed` không thêm trùng khi đã có tác vụ.

## Cơ sở dữ liệu

`categories` liên kết một-nhiều với `tasks` qua `category_id`; ràng buộc foreign key được bật. `tasks` giới hạn độ dài, trạng thái và mức ưu tiên. `mascot_settings` lưu tùy chỉnh đơn (id=1), còn `app_settings` lưu tùy chọn giao diện. Mọi truy vấn API dùng prepared statement.

## API chính

| Phương thức | Đường dẫn | Chức năng |
|---|---|---|
| GET | `/api/tasks?search=&status=&category=&priority=&date=&sort=` | Tìm, lọc và sắp xếp |
| GET | `/api/tasks/today`, `/api/tasks/:id` | Công việc hôm nay / chi tiết |
| POST, PUT, PATCH, DELETE | `/api/tasks`, `/api/tasks/:id`, `/api/tasks/:id/toggle` | CRUD và chuyển trạng thái |
| GET, POST, PUT, DELETE | `/api/categories` và `/api/categories/:id` | Quản lý danh mục |
| GET | `/api/statistics/overview`, `/weekly`, `/monthly`, `/categories` | Tổng hợp thống kê |
| GET, PUT | `/api/mascot`, `/api/settings` | Tùy chỉnh Doodly và chủ đề |
| GET | `/api/history` | Nhật ký hoàn thành |

Lỗi trả JSON dạng `{ "error": "..." }` cùng HTTP status tương ứng. API dùng ngày ISO `YYYY-MM-DD`.

## Demo và kiểm tra thủ công

1. Mở trang chủ, xem công việc và tiến độ hôm nay.
2. Tạo việc, tìm ở trang Công việc, sửa, đánh dấu xong và xóa.
3. Lọc theo danh mục/trạng thái/mức ưu tiên; thử sắp xếp hạn gần nhất.
4. Mở Thống kê và Nhật ký để xem bản ghi hoàn thành.
5. Đổi diện mạo Doodly và chủ đề, tải lại trang để kiểm tra lưu trữ.
6. Tạo danh mục; thử xóa danh mục đang có công việc để xem thông báo bảo vệ dữ liệu.

Có thể chạy `npm test` (Node test runner). Giao diện được thiết kế cho màn hình desktop, tablet và điện thoại; cần kiểm tra thủ công trên trình duyệt mục tiêu.

## Ảnh chụp và cải tiến

Thư mục `docs/screenshots/` dành cho ảnh chụp khi demo. Hiện chưa có ảnh chụp được commit. Hướng phát triển: thêm biểu đồ Canvas/Chart.js, kiểm thử API tự động có database tạm, phân trang và xác thực đa người dùng.

## Giới hạn

Ứng dụng cá nhân chạy local, chưa có đăng nhập hoặc đồng bộ nhiều thiết bị. Xóa danh mục tùy chỉnh chỉ được phép khi danh mục trống. Dữ liệu seed chỉ chạy khi bảng tasks đang trống.
