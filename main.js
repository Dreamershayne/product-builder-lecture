/* ===================================
   디지털브릿지 컨설팅 - main.js
   공통 헤더/푸터 주입 + 모바일 메뉴
   =================================== */

(function () {
  'use strict';

  const SITE_NAME = '디지털브릿지';
  const ADSENSE_ID = 'ca-pub-9643708394418399';
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  function isActive(href) {
    if (href === '/') return currentPath === '/' || currentPath === '/index.html' || currentPath === '/index';
    const clean = href.replace('.html', '').replace(/\/$/, '');
    return currentPath === href || currentPath === clean || currentPath === href.replace('.html', '');
  }

  // ===== Header =====
  function injectHeader() {
    const nav = [
      { label: '홈', href: '/' },
      { label: '서비스', href: '/services.html' },
      { label: '인사이트', href: '/blog.html' },
      { label: '회사소개', href: '/about.html' },
    ];

    const navHTML = nav.map(item => {
      const activeClass = isActive(item.href) ? ' active' : '';
      return `<li><a href="${item.href}" class="${activeClass}">${item.label}</a></li>`;
    }).join('');

    const ctaActive = isActive('/contact.html') ? ' active' : '';

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-inner">
        <a href="/" class="logo">${SITE_NAME}<span> 컨설팅</span></a>
        <nav>
          <ul class="nav-links" id="navLinks">
            ${navHTML}
            <li><a href="/contact.html" class="nav-cta${ctaActive}">문의하기</a></li>
          </ul>
        </nav>
        <button class="hamburger" id="hamburger" aria-label="메뉴 열기">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    `;

    document.body.prepend(header);

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
      this.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Footer =====
  function injectFooter() {
    const year = new Date().getFullYear();

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo">${SITE_NAME}<span> 컨설팅</span></div>
            <p>IT 전략부터 실행까지, 비즈니스 성장의 파트너.<br>디지털 전환과 IT 컨설팅을 통해 기업의 경쟁력을 높입니다.</p>
          </div>
          <div class="footer-col">
            <h4>서비스</h4>
            <ul>
              <li><a href="/services.html">서비스 개요</a></li>
              <li><a href="/consulting.html">IT 전략 컨설팅</a></li>
              <li><a href="/digital-transform.html">디지털 전환</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>회사</h4>
            <ul>
              <li><a href="/about.html">회사소개</a></li>
              <li><a href="/blog.html">인사이트</a></li>
              <li><a href="/contact.html">문의하기</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>법적고지</h4>
            <ul>
              <li><a href="/privacy.html">개인정보처리방침</a></li>
              <li><a href="/terms.html">이용약관</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; ${year} 디지털브릿지 컨설팅. All rights reserved.
        </div>
      </div>
    `;

    document.body.appendChild(footer);
  }

  // ===== Ad Unit Helper =====
  window.insertAdUnit = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="${ADSENSE_ID}"
           data-ad-slot="auto"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    `;
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  };

  // ===== Init =====
  function init() {
    injectHeader();
    injectFooter();

    // Initialize ad units
    document.querySelectorAll('.ad-placeholder').forEach(function (el) {
      if (el.id) {
        window.insertAdUnit(el.id);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
