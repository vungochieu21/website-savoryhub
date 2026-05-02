# ✏ TASTII - WEBSITE Giới thiệu địa điểm ăn uống địa phương (Local Food Discovery App)  

<br> Đây là một ứng dụng hiện đại giúp người dùng có thể khám phá và tìm kiếm các địa điểm ăn uống trong địa phương. Được gây dựng bởi TypeScript, Next.js và Tailwind CSS. Được lấy cảm hứng từ diadiemanuong.net.vn và DominoPizza, giao diện hiện đại, gọn gàng, có hỗ trợ dark mode và ngôn ngữ ( Anh/Việt ).

## 🛠 Các chức năng:
### 🔑 Chức năng chính:
-  Giúp người dùng tìm kiếm những quán ăn trong địa phương nơi sinh sống.
-  Thêm, chỉnh sửa và xóa các địa điểm ăn uống một cách dễ dàng.
-  Người dùng có thể xem địa điểm bằng google map.
-  Tiêu đề (Tiếng Việt & Tiếng Anh).
-  Mô tả (Tiếng Việt & Tiếng Anh).
-  Tìm kiếm và lọc các món ăn, loại món ăn.
-  Cho phép khách hàng/chủ cửa hàng xem được Bảng thống kê thu chi, lợi nhuận.
-  Có LocalStorage ( cho phép lưu danh sách yêu thích, lưu giao diện sáng/tối, lưu ngôn ngữ người dùng).
### 🚀 Công nghệ sử dụng:
-  Next.js (App Router)
-  React.js
-  CSS Modules
-  Framer Motion
-  Ant Design
-  React Icons
-  Leaflet / Google Maps
-  JSON
### 📂 Cấu trúc project

```
src/
├── app/
│   ├── api/
│   │   └── foods/
│   │       └── route.ts
│   │
│   ├── dashboard/
│   │   ├── Dashboard.module.css
│   │   └── page.tsx
│   │
│   ├── favorites/
│   │   └── page.js
│   │
│   ├── filter/
│   │   └── page.tsx
│   │
│   ├── food/
│   │   └── [id]/
│   │       ├── FoodDetail.module.css
│   │       └── page.tsx
│   │
│   ├── login/
│   │   └── page.jsx
│   │
│   ├── register/
│   │   └── page.jsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.module.css
│   ├── loading.tsx
│   ├── page.tsx
│   └── provider.js
│
├── components/
│   ├── dashboard/
│   │   ├── dashboard.module.css
│   │   ├── SimpleChart.tsx
│   │   ├── StatCard.tsx
│   │   └── TopFoods.tsx
│   │
│   ├── deal/
│   │   ├── DealCardMini.tsx
│   │   ├── DealSection.module.css
│   │   ├── ExclusiveDeal.module.css
│   │   └── ExclusiveDeal.tsx
│   │
│   ├── food/
│   │   ├── FoodCard.module.css
│   │   ├── FoodCard.tsx
│   │   ├── FoodForm.module.css
│   │   ├── FoodForm.tsx
│   │   ├── NearbyRestaurant.module.css
│   │   ├── NearbyRestaurant.tsx
│   │   ├── RestaurantList.module.css
│   │   └── RestaurantList.tsx
│   │
│   ├── layout/
│   │   ├── Banner.tsx
│   │   ├── BannerMini.tsx
│   │   ├── Footer.module.css
│   │   ├── Footer.tsx
│   │   ├── Navbar.module.css
│   │   └── Navbar.tsx
│   │
│   ├── section/
│   │   ├── GoogleMap.module.css
│   │   ├── GoogleMap.tsx
│   │   ├── GoogleMapClient.tsx
│   │   ├── Testimonials.module.css
│   │   └── Testimonials.tsx
│   │
│   └── ui/
│       ├── Dropdown.tsx
│       ├── NightModeButton.module.css
│       ├── NightModeButton.tsx
│       ├── ScrollToTopButton.jsx
│       ├── ScrollToTopButton.module.css
│       └── ThemeInit.tsx
│
├── data/
│   └── food.json
│
├── locales/
│   ├── context/
│   │   ├── FavoriteContext.js
│   │   └── LanguageContext.js
│   │
│   └── lang/
│       ├── texts.js
│       └── translator.js
│
└── utils/
    └── Storage.js
```
### 💎 Trải nghiệm người dùng:*
- Đăng ký/đăng nhập bằng Localstorage.
- Xem thông tin người dùng trong tài khoản.
- Có chế độ sáng/tối (lưu bằng Localstorage).
- Giao diện chế độ sáng/tối mượt mà.
- Hỗ trợ Tiếng Việt & Tiếng Anh.
- Có thông báo khi đăng kí/đăng nhập, yêu thích.
- Tích hợp animation mượt mà đẹp mắt.
- Tối ưu website gọn nhẹ.
- Có hỗ trợ nút cuộn lên trang chính.
- Tương thích với desktop.
### 📄 Các trang chính:
- ➡️ ***Trang chủ:***
- Banner quảng cáo hình ảnh các món ăn. 
- List các món đang được ưu đãi.
- List các món được bán chạy.
- Các gói ưu đãi phù hợp với từng khách hàng.
- Hiển thị đánh giá từ người dùng.
- Hiển thị quán ăn gần bạn và bản đồ khu vực.
- ➡️ ***Trang Filter:***
- Có tìm kiếm nâng cao đúng theo ý muốn mọi nhu cầu.
- Chọn lọc món theo nhu cầu người dùng.
- ➡️ ***Trang chi tiết món:***
- Cho phép đánh giá sao trên món.
- Cho phép đánh giá trải nghiệm vè món.
- Đề xuất các món phụ từ quán.
- Hiện đánh giá món từ người dùng khác.
- ➡️ ***Trang Thêm địa điểm:***
- Nhập thông tin địa điểm, giá cả, thời gian mở/đóng cửa cho các chủ cửa hàng.
- Cho phép up quán ăn, các thực đơn món từ người bán.
- ➡️ ***Trang tài khoản:***
- Trang đăng nhập/đăng ký rõ ràng.
- Xem thông tin tài khoản cá nhân.
- Cho phép người bán xem bảng thống kê thu chi.
- Có danh mục yêu thích.
- ➡️ ***Trang setting:***
- Có thể chuyển đổi sáng/tối theo cá nhân.
- Chuyển đổi ngôn ngữ theo ý muốn người dùng.
## 📩 Cách tải website-savoryhub:
- Bước 1: Clone
```bash
git clone https://github.com/vungochieu21/website-savoryhub.git
cd website-savoryhub
```
- Bước 2: Install
```bash
npm install
```
- Bước 3: Chạy server
```bash
npm run dev
```
- Bước 4: Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## 🧑‍💻 Tác giả:
- Được sáng tạo và phát triển bởi [Vu Hieu](https://github.com/vungochieu21) và [Anh Khoi 36](https://github.com/nguyenkhoi28052006-dev)