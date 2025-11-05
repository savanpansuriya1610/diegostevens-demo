document.addEventListener("DOMContentLoaded", function() {

  gsap.registerPlugin(ScrollTrigger);

  // ===== PRELOADER COUNTER =====
  let counter = { value: 0 };
  const counterEl = document.querySelector('.counter');
  const preloader = document.querySelector('.preloader');
  const hero = document.querySelector('.hero');
  const heroLeft = document.querySelector('.hero-left');
  const heroImgs = document.querySelectorAll('.hero-right img');

  gsap.to(counter, {
    value: 100,
    duration: 2.5,
    ease: "power1.out",
    onUpdate: () => counterEl.textContent = Math.floor(counter.value) + '%',
    onComplete: () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          preloader.style.display = "none";
          document.body.style.overflow = "auto";
          
          // Animate hero section up
          gsap.to(hero, {y: 0, duration: 1.2, ease: "power3.out"});
          gsap.to(heroLeft, {opacity:1, y:0, duration:1.2, delay:0.6, ease:"power2.out"});
          gsap.to(heroImgs[0], {opacity:1, scale:1, duration:1.5, ease:"power3.out"});
        }
      });
    }
  });

  // ===== SCROLL IMAGE CHANGER =====
  let current = 0;
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const index = Math.min(Math.floor(scrollPos / 500), heroImgs.length - 1);
    if (index !== current) {
      gsap.to(heroImgs[current], {opacity:0, scale:1.2, duration:1, ease:"power2.out"});
      gsap.to(heroImgs[index], {opacity:1, scale:1, duration:1.2, ease:"power2.out"});
      current = index;
    }
  });

});
