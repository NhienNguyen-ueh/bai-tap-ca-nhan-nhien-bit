
document.addEventListener("DOMContentLoaded", function () {

  const deviceType = document.getElementById("device-type");
  const screenWidth = document.getElementById("screen-width");
  const responsiveHint = document.getElementById("responsive-hint");
  const todayDate = document.getElementById("today-date");
  const topButton = document.getElementById("top-button");

  // 1. Cập nhật thông tin Responsive
  function updateResponsive() {
    const width = window.innerWidth;

    screenWidth.textContent = width + "px";

    if (width <= 600) {
      deviceType.textContent = "📱 Mobile";
      responsiveHint.textContent =
        "🐾 Đây là logo Mobile: Pup!";
    } else if (width <= 900) {
      deviceType.textContent = "📟 Tablet";
      responsiveHint.textContent =
        "🐕 Đây là logo Tablet: Puppy Pad!";
    } else {
      deviceType.textContent = "🖥️ Desktop";
      responsiveHint.textContent =
        "🐶 Đây là logo Desktop: Puppy Diary!";
    }
  }

  // Chạy lần đầu tiên
  updateResponsive();

  // Cập nhật mỗi khi kích thước cửa sổ thay đổi
  window.addEventListener("resize", updateResponsive);

  // 2. Hiển thị ngày hiện tại
  const today = new Date();

  todayDate.textContent =
    "📅 " + today.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

  // 3. Hiển thị nút về đầu trang
  function updateTopButton() {
    if (window.scrollY > 250) {
      topButton.classList.add("show");
    } else {
      topButton.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateTopButton);
  updateTopButton();

  // 4. Cuộn về đầu trang
  topButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // 5. Thông báo khi website tải thành công
  console.log("🐶 Puppy Diary đã tải thành công!");
});
