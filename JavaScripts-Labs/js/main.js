
'use strict';

// JavaScript tương tác dành riêng cho trang chủ JavaScript-Labs.
// Các Exercise trong Lab08 / Lab09 / Lab10 vẫn giữ mã nguồn riêng.

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  const year = document.querySelector('#year');
  const toast = document.querySelector('#toast');
  let toastTimeout;

  // Tự động cập nhật năm hiện tại
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // Hiển thị thông báo nhỏ
  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    window.clearTimeout(toastTimeout);

    toastTimeout = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Xử lý mở và đóng menu trên điện thoại
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const expanded =
        menuButton.getAttribute('aria-expanded') === 'true';

      menuButton.setAttribute(
        'aria-expanded',
        String(!expanded)
      );

      menuButton.setAttribute(
        'aria-label',
        expanded ? 'Mở menu' : 'Đóng menu'
      );

      navigation.classList.toggle('open', !expanded);
    });

    // Đóng menu khi người dùng chọn liên kết
    navigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navigation.classList.remove('open');

        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Mở menu');
      });
    });
  }

  // Kiểm tra liên kết GitHub chưa cập nhật
  document.querySelectorAll('[data-placeholder-link]').forEach(link => {
    link.addEventListener('click', event => {
      if (link.getAttribute('href') === '#') {
        event.preventDefault();

        showToast(
          'Bạn hãy thay dấu # bằng đường dẫn GitHub cá nhân trong index.html nha ♡'
        );
      }
    });
  });

  // Liên kết đến các Lab
  document.querySelectorAll('.lab-button').forEach(link => {
    link.addEventListener('click', () => {
      // Không chặn điều hướng.
      // Mỗi Lab cần có index.html riêng.
    });
  });
});

