/* =========================================================
   AETHER — 交互脚本
   ========================================================= */
(function () {
  'use strict';

  /* 1) 导航滚动变色（仿 Attio sticky header）*/
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2) 移动端抽屉菜单 */
  var toggle = document.getElementById('menuToggle');
  var drawer = document.getElementById('drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () { drawer.classList.toggle('open'); });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { drawer.classList.remove('open'); });
    });
  }

  /* 3) 滚动模糊渐显（仿 Attio reveal）*/
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* 4) 加入购物车计数 */
  var badge = document.getElementById('cartBadge');
  var count = 0;
  document.querySelectorAll('.card__add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      count++;
      badge.textContent = count;
      badge.classList.add('show');
      badge.animate(
        [{ transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
        { duration: 280, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
    });
  });

  /* 5) 订阅表单 */
  var form = document.getElementById('subscribeForm');
  var msg = document.getElementById('subMsg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      if (input.value) {
        msg.textContent = '已订阅，感谢你的信任 ✦';
        input.value = '';
      }
    });
  }
})();
