/* ==========================================================================
   나눔과 더함 이비인후과 | 수면다원검사 랜딩페이지 JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Sticky Navbar Shrink & Active Anchor Highlighting
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    // Header shrink
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Nav active anchor update
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  /* --------------------------------------------------------------------------
     2. Mobile Nav Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('is-active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Symptom Checklist Counter & Diagnostic Feedback
     -------------------------------------------------------------------------- */
  const checklistCards = document.querySelectorAll('.checklist-card');
  const checkedCountEl = document.getElementById('checked-count');
  const resultMessageEl = document.getElementById('result-message');

  checklistCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      updateChecklistResult();
    });
  });

  function updateChecklistResult() {
    const selectedCards = document.querySelectorAll('.checklist-card.selected');
    const count = selectedCards.length;

    if (checkedCountEl) {
      checkedCountEl.textContent = count;
    }

    if (resultMessageEl) {
      if (count === 0) {
        resultMessageEl.innerHTML = '항목을 선택하시면 수면무호흡증 위험도 및 검사 권장 여부를 안내해 드립니다.';
      } else if (count <= 2) {
        resultMessageEl.innerHTML = `현재 <strong style="color:var(--color-accent);">${count}개 항목</strong>이 해당됩니다. 경미한 수면 장애 가능성이 있으므로 전문의 상담을 받아보시는 것을 권장합니다.`;
      } else {
        resultMessageEl.innerHTML = `<strong style="color:#FF6B6B;">[검사 필요 - 고위험군]</strong> ${count}개 항목 해당! 중증 수면무호흡증 위험성이 높습니다. 정밀 수면다원검사가 강력히 권장됩니다.`;
      }
    }
  }

  /* --------------------------------------------------------------------------
     4. Facility Lightbox Modal
     -------------------------------------------------------------------------- */
  const facilityCards = document.querySelectorAll('.facility-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  facilityCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const captionText = card.getAttribute('data-caption');

      if (lightboxImg && lightboxCaption && lightboxModal) {
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = captionText;
        lightboxModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     5. FAQ Accordion Toggle
     -------------------------------------------------------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Scroll Intersection Observer Animations
     -------------------------------------------------------------------------- */
  const animatedElements = document.querySelectorAll('.fade-in-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

});

/* --------------------------------------------------------------------------
   7. Form Submission Handler
   -------------------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();

  const userName = document.getElementById('user-name').value.trim();
  const userPhone = document.getElementById('user-phone').value.trim();

  if (!userName || !userPhone) {
    alert('성함과 연락처를 입력해 주세요.');
    return;
  }

  // Visual success feedback alert
  alert(`[예약 접수 완료]\n\n${userName}님, 수면다원검사 상담 예약 신청이 정상적으로 접수되었습니다.\n\n전화번호: ${userPhone}\n동작구 나눔과 더함 이비인후과 전문 상담원이 빠른 시간 내에 연락드리겠습니다.\n\n급한 문의는 02-6929-4565 로 전화 주시면 빠른 연결이 가능합니다.`);

  // Reset form
  const form = document.getElementById('booking-form');
  if (form) {
    form.reset();
  }
}
