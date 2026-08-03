document.addEventListener("DOMContentLoaded", () => {
  const footerSlides = Array.from(document.querySelectorAll(".footer-photo-wall img"));
  if (footerSlides.length) footerSlides[0].classList.add("active");
  if (footerSlides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let footerSlideIndex = 0;
    window.setInterval(() => {
      footerSlides[footerSlideIndex].classList.remove("active");
      footerSlideIndex = (footerSlideIndex + 1) % footerSlides.length;
      footerSlides[footerSlideIndex].classList.add("active");
    }, 3000);
  }
  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  menuButton?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.textContent = "☰";
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

  const animateCounter = element => {
    const target = Number(element.dataset.value);
    const suffix = element.dataset.suffix || "";
    const startTime = performance.now();
    const duration = 900;
    const update = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".counter").forEach(counter => counterObserver.observe(counter));
});
