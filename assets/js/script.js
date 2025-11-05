document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const counter = { value: 0 };
  const counterEl = document.querySelector(".counter");
  const preloader = document.querySelector(".preloader");
  const hero = document.querySelector(".hero");
  const heroLeft = document.querySelector(".hero-left");
  const heroImgs = document.querySelectorAll(".hero-right img");

  // ===== PRELOADER COUNTER =====
  gsap.to(counter, {
    value: 100,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => {
      counterEl.textContent = Math.floor(counter.value) + "%";
    },
    onComplete: () => {
      // ===== HERO + PRELOADER ANIMATION =====
      const tl = gsap.timeline({
        onComplete: () => {
          preloader.classList.add("hide");
          document.body.style.overflow = "auto";
        }
      });

      // 1️⃣ Preloader height to 0 (collapse upward)
      tl.to(preloader, {
        height: 0,
        duration: 1.2,
        ease: "power3.inOut"
      });

      // 2️⃣ Hero section reveal (slide up)
      tl.to(
        hero,
        {
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        },
        "<" // same time (sync with preloader collapse)
      );

      // 3️⃣ Hero-left background from black → white
      tl.to(
        heroLeft,
        {
          backgroundColor: "#fff",
          color: "#000",
          duration: 1,
          ease: "power2.inOut"
        },
        "-=0.8"
      );

      // 4️⃣ Hero image zoom-in
      tl.to(
        heroImgs[0],
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out"
        },
        "-=0.6"
      );
    },
  });

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
      scrub: 1.5,
    },
  });

  gsap.set(".about__introduction", { y: "50%" });

  gsap.to(".about__introduction", {
    y: "-100%",
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  gsap.set(".about_quote--first", { y: "200%" });

  gsap.to(".about_quote--first", {
    y: "-100%",
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  gsap.set(".about__images--first", { y: "100%" });

  gsap.to(".about__images--first", {
    y: "-300%",
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: ".about__introduction",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  /* ABOUT SECTION END */

});