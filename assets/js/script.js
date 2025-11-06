document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);



  const preloader = document.querySelector(".preloader__wrapper");
  const preloaderInner = document.querySelector(".preloader__wrapper-inner");
  const counterEl = document.querySelector(".counter");
  const heroWrapper = document.querySelector(".hero__wrapper");
  const heroLeft = document.querySelector(".hero__wrapper-left");
  const heroImg = document.querySelector(".hero__wrapper-right img");
  const headerNav = document.querySelector(".header__nav");

  // Start from top
  window.scrollTo(0, 0);

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" }
  });

  // ===== COUNTER (0 → 100%) =====
  let counter = { value: 0 };
  tl.to(counter, {
    value: 100,
    duration: 1,
    onUpdate: () => {
      counterEl.textContent = Math.floor(counter.value) + "%";
    }
  });

  // ===== PRELOADER + HERO START TOGETHER =====
  tl.addLabel("revealStart");

  // PRELOADER COLLAPSE
  tl.to(preloader, {
    height: 0,
    duration: 1.3,
    ease: "power4.inOut",
    transformOrigin: "bottom center",
    onComplete: () => {
      preloader.classList.add("hide");
    }
  }, "revealStart");

  // HERO TEXT (rise bottom → top)
  gsap.set(heroWrapper, { y: "100%" });
  tl.to(heroWrapper, {
    y: "0%",
    duration: 1.3,
    ease: "power4.out"
  }, "revealStart");

  // HERO IMAGE (zoom-out + slide-in)
  gsap.set(heroImg, { scale: 1.3, x: 100, opacity: 0 });
  tl.to(heroImg, {
    scale: 1,
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power4.out"
  }, "revealStart+=0.1");

  // ===== HERO LEFT GRADIENT TRANSITION =====
  gsap.set(heroLeft, {
    background: "linear-gradient(0deg, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%)"
  });

  tl.to(heroLeft, {
    duration: 1.3,
    ease: "power2.out",
    onUpdate: function () {
      // progress = 0 → 1
      const progress = this.progress() * 100;
      // dynamic gradient position change
      heroLeft.style.background = `linear-gradient(0deg, rgba(255,255,255,1) 100%, rgba(255,255,255,1) ${100 - progress}%)`;
    }
  }, "revealStart");

  // ===== HEADER NAV (fade-in + slide-down) =====
  gsap.set(headerNav, { y: 50, opacity: 0 });
  tl.to(headerNav, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
  }, "revealStart+=0.8");

  // List of hero image URLs
  const Heroimages = [
    '../assets/images/hero-img-1.jpg',
    '../assets/images/hero-img-2.jpg',
    '../assets/images/hero-img-3.jpg',
  ];

  // Get last used index from localStorage
  let currentIndex = localStorage.getItem('heroImageIndex');

  // If not set, start from 0
  if (!currentIndex) {
    currentIndex = 0;
  } else {
    currentIndex = parseInt(currentIndex) + 1;
    // Reset to 0 if it exceeds the array length
    if (currentIndex >= Heroimages.length) {
      currentIndex = 0;
    }
  }

  // Save current index for next page load
  localStorage.setItem('heroImageIndex', currentIndex);

  // Select the hero image element
  const heroInnerImg = document.querySelector('.hero__wrapper-right > img');

  // Set the image source if element exists
  if (heroInnerImg) {
    heroInnerImg.src = Heroimages[currentIndex];
  }
  /* HEADER JS START */
  const hamburger = document.querySelector("#hamburger");
  const menu = document.querySelector(".menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");

    if (hamburger.classList.contains("active")) {
      // OPEN MENU — remove .hide and animate mask down
      menu.classList.remove("hide");
      gsap.to(menu, {
        duration: 0.8,
        ease: "power3.inOut",
        css: { maskPosition: "0% 100%", WebkitMaskPosition: "0% 100%" }
      });
    } else {
      // CLOSE MENU — animate mask up and then hide
      gsap.to(menu, {
        duration: 0.8,
        ease: "power3.inOut",
        css: { maskPosition: "0% -100%", WebkitMaskPosition: "0% -100%" },
        onComplete: () => {
          menu.classList.add("hide");
        }
      });
    }
  });

  /* HEADER JS END */

  /* ABOUT SECTION START */

  ScrollTrigger.defaults({
    invalidateOnRefresh: true,
    anticipatePin: 1,
  });

  gsap.to(".bg", {
    y: "-100%",
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.set(".about__introduction", { y: "50%" });

  gsap.to(".about__introduction", {
    y: "-100%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about",
      start: "top 80%",
      end: "bottom 20%",
      scrub: 2,
    },
  });

  gsap.set(".about_quote--first", { y: "200%" });

  gsap.to(".about_quote--first", {
    y: "50%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top 90%",
      end: "bottom 10%",
      scrub: 2,
    },
  });

  gsap.set(".about__images--first", { y: "180%" });

  gsap.to(".about__images--first", {
    y: "-200%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.set(".about__images--second", { y: "200%" });

  gsap.to(".about__images--second", {
    y: "-120%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.set(".about__images--thired", { y: "500%" });

  gsap.to(".about__images--thired", {
    y: "-100%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  });

  gsap.set(".about__images--fourth", { y: "600%" });

  gsap.to(".about__images--fourth", {
    y: "-400%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top -80%",
      end: "bottom -20%",
      scrub: 2,
    },
  });

  gsap.set(".about_quote--second", { y: "200%" });

  gsap.to(".about_quote--second", {
    y: "-20%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top -80%",
      end: "bottom -20%",
      scrub: 2,
    },
  });

  gsap.set(".about__images--fifth", { y: "1200%" });

  gsap.to(".about__images--fifth", {
    y: "-100%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top -20%",
      end: "bottom -90%",
      scrub: 2,
    },
  });

  gsap.set(".about__images--sixth", { y: "800%" });

  gsap.to(".about__images--sixth", {
    y: "-100%",
    ease: "none",
    force3D: true,
    duration: 1,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top -50%",
      end: "bottom -200%",
      scrub: 2,
    },
  });

  /* ABOUT SECTION END */

  /* ON MOUSE MOVE IMAGE MOVEMENT JS START */

  const tiltImages = document.querySelectorAll('.about__images img');

  document.body.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (e.clientX - centerX) / centerX;
    const percentY = (e.clientY - centerY) / centerY;

    const rotateX = percentY * 5;
    const rotateY = percentX * -5;

    tiltImages.forEach(img => {
      img.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1)
    `;
    });
  });

  document.body.addEventListener('mouseleave', () => {
    tiltImages.forEach(img => {
      img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  /* ON MOUSE MOVE IMAGE MOVEMENT JS START */

  /* SPORTLIGHT EFFECT START */

  const spans = document.querySelectorAll(".spot-text span");

  document.addEventListener("mousemove", (e) => {
    spans.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      span.style.setProperty("--mx", `${x}px`);
      span.style.setProperty("--my", `${y}px`);
    });
  });

  /* SPORTLIGHT EFFECT END */

});

/* LENIS JS START */

// const lenis = new Lenis({
//   duration: 1.9,
//   easing: (t) => Math.min(1, 1.009 - Math.pow(2, -10 * t)),
//   smooth: true,
//   lerp: 0.6,
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);

/* LENIS JS END */