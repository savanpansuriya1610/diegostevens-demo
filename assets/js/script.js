document.addEventListener("DOMContentLoaded", function () {

  // ✅ Fix: prevent auto-scroll after reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Lenis Scroll

  const lenis = new Lenis({
    smooth: true,
    multiplier: 1,
    easing: (t) => t * (2 - t),
    smoothTouch: true,
    lerp: 0.05,
    duration: 1.2
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);

  const preloader = document.querySelector(".preloader__wrapper");
  const counterEl = document.querySelector(".counter");
  const heroWrapper = document.querySelector(".hero__wrapper");
  const heroLeft = document.querySelector(".hero__wrapper-left");
  const heroImg = document.querySelector(".hero__wrapper-right img");
  const headerNav = document.querySelector(".header__nav");
  const fixedLogo = document.querySelector(".fixed-logo");
  const fixedLogoImg = document.querySelector(".fixed-logo svg");

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

  tl.to(".logo-black", {
    clipPath: "inset(0% 0 0 0)",
    duration: 1.3,
    ease: "power4.out",
    onComplete: () => {
      preloader.classList.add("hide");
    }
  }, "revealStart");

  // PRELOADER COLLAPSE
  tl.to(preloader, {
    height: 0,
    duration: 1.3,
    ease: "power4.inOut",
    transformOrigin: "bottom center",
    onComplete: () => {
      fixedLogo.classList.add("hide");
      heroLeft.classList.add("show");
    }
  }, "revealStart");



  // HERO TEXT (rise bottom → top)
  tl.to(heroWrapper, {
    y: "0%",
    opacity: 1,
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
      const progress = this.progress() * 100;
      heroLeft.style.background = `linear-gradient(0deg, rgba(255, 255, 255, 1) 100%, rgba(255,255,255,1) ${100 - progress}%)`;
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

  // ===== ROTATING HERO IMAGE LOGIC =====
  const Heroimages = [
    '../assets/images/hero-img-1.jpg',
    '../assets/images/hero-img-2.jpg',
    '../assets/images/hero-img-3.jpg',
  ];

  let currentIndex = localStorage.getItem('heroImageIndex');
  if (!currentIndex) currentIndex = 0;
  else {
    currentIndex = parseInt(currentIndex) + 1;
    if (currentIndex >= Heroimages.length) currentIndex = 0;
  }
  localStorage.setItem('heroImageIndex', currentIndex);

  const heroInnerImg = document.querySelector('.hero__wrapper-right > img');
  if (heroInnerImg) {
    heroInnerImg.src = Heroimages[currentIndex];
  }
  /* HEADER JS START */
  const hamburger = document.querySelector("#hamburger");
  const menu = document.querySelector(".menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");

    if (hamburger.classList.contains("active")) {
      menu.classList.remove("hide");
      gsap.to(menu, {
        duration: 0.8,
        ease: "power3.inOut",
        css: { maskPosition: "0% 100%", WebkitMaskPosition: "0% 100%" }
      });
    } else {
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


  /* ===== SCROLL ZOOM EFFECT ON HERO IMAGE ===== */
  const zoomImages = document.querySelectorAll(".columns__layout-section-left img.columns__layout-section-img");

  tl.eventCallback("onComplete", function () {
    ScrollTrigger.refresh();

    gsap.to(heroImg, {
      scale: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero__wrapper",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false
      }
    });

    zoomImages.forEach((img) => {
      gsap.fromTo(img,
        { scale: 1 },
        {
          scale: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: false
          }
        }
      );
    });
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

  /*=== PARALLAX DESIN START(BACKGROUND IMAGE MOVEMEMT) === */
  const maxMove = -700;

  const speedFactors = {
    child1: 1.10,
    child2: 2.0,
    child3: 2.5,
    child4: 4.5
  };

  const commonScrollTrigger = {
    trigger: ".partners-container",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5
  };

  gsap.to(".partner-item:nth-child(1) .image-container img", {
    y: maxMove * speedFactors.child1,
    ease: "none",
    scrollTrigger: commonScrollTrigger
  });

  gsap.to(".partner-item:nth-child(2) .image-container img", {
    y: maxMove * speedFactors.child2,
    ease: "none",
    scrollTrigger: commonScrollTrigger
  });

  gsap.to(".partner-item:nth-child(3) .image-container img", {
    y: maxMove * speedFactors.child3,
    ease: "none",
    scrollTrigger: commonScrollTrigger
  });

  gsap.to(".partner-item:nth-child(4) .image-container img", {
    y: maxMove * speedFactors.child4,
    ease: "none",
    scrollTrigger: commonScrollTrigger
  });
  /*=== PARALLAX DESIN END(BACKGROUND IMAGE MOVEMEMT) === */

  /*=== TIMELINE EFFECT START === */

  ScrollTrigger.create({
    trigger: ".columns__layout-section",
    start: "top top",
    end: "+=50%",
  });


  gsap.set(".project-timeline", { y: "70vh" });
  gsap.to(".project-timeline", {
    y: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".columns__layout-section",
      start: "top top",
      end: "+=97%",
      scrub: 1
    }
  });

  /*=== TIMELINE EFFECT END === */

  /* === OUR FOCUS START === */

  const list = document.querySelector(".our__focus-list");
  if (list) {
    const MAX_TRANSLATE = 10;
    const SCALE = 1.02;

    let activeLi = null;

    list.addEventListener("mousemove", (e) => {
      const li = e.target.closest("li");
      if (!li || !list.contains(li)) return;

      activeLi = li;

      const rect = li.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const nx = ((x / rect.width) - 0.5) * 2;
      const ny = ((y / rect.height) - 0.5) * 2;

      const tx = -nx * MAX_TRANSLATE;
      const ty = -ny * MAX_TRANSLATE;

      li.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${SCALE})`;
      li.style.zIndex = 5;
      li.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
    });

    list.addEventListener("mouseleave", () => {
      list.querySelectorAll("li").forEach((li) => {
        li.style.transform = "";
        li.style.zIndex = "";
        li.style.boxShadow = "";
      });
    });

    list.addEventListener("mouseout", (e) => {
      const liLeft = e.target.closest("li");
      const toElement = e.relatedTarget;
      if (liLeft && (!toElement || !liLeft.contains(toElement))) {
        liLeft.style.transform = "";
        liLeft.style.zIndex = "";
        liLeft.style.boxShadow = "";
        if (activeLi === liLeft) activeLi = null;
      }
    });

    function handleResize() {
      if (window.innerWidth <= 768) {
        list.querySelectorAll("li").forEach((li) => {
          li.style.transform = "";
          li.style.zIndex = "";
          li.style.boxShadow = "";
        });
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
  }
  /* === OUR FOCUS END === */

  /* === OUR FOCUS (SPORTLIGHT EFFECT) START === */
  const focusItems = document.querySelectorAll(".our__focus-list li");

  focusItems.forEach((item, index) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      item.style.setProperty("--mx", `${x}px`);
      item.style.setProperty("--my", `${y}px`);
      item.style.setProperty("--spotlight-opacity", 1);

      const prevItem = focusItems[index - 1];
      const nextItem = focusItems[index + 1];

      if (prevItem) prevItem.classList.add("glow-near");
      if (nextItem) nextItem.classList.add("glow-near");

      focusItems.forEach((el) => {
        const rect2 = el.getBoundingClientRect();
        const relX = e.clientX - rect2.left;
        const relY = e.clientY - rect2.top;
        el.style.setProperty("--mx", `${relX}px`);
        el.style.setProperty("--my", `${relY}px`);
      });
    });

    item.addEventListener("mouseleave", () => {
      item.style.setProperty("--spotlight-opacity", 0);
      if (focusItems[index - 1]) focusItems[index - 1].classList.remove("glow-near");
      if (focusItems[index + 1]) focusItems[index + 1].classList.remove("glow-near");
    });
  });
  /* === OUR FOCUS (SPORTLIGHT EFFECT) END === */

  /* ==== TODAY GRAB SECTION SPOTLIGHT START ==== */
  const cards = document.querySelectorAll(".today__slide-master-card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);
    card.style.setProperty("--spotlight-opacity", 1);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--spotlight-opacity", 0);
  });
});
 
  /* ==== TODAY GRAB SECTION SPOTLIGHT END ==== */

});

/* === TODAY SECTION JS START === */

gsap.registerPlugin(Draggable);

let draggableInstance = null;

function initTodaySlider() {
  const cards = document.querySelectorAll(".today__slide-master-card");
  const slider = document.querySelector(".today__slide-content");
  const wrapper = document.querySelector(".today__slider-wrapper");

  if (!slider || !wrapper) return;

  /** Destroy if width < 1024 */
  if (window.innerWidth <= 1024) {
    if (draggableInstance) {
      draggableInstance[0].kill();
      draggableInstance = null;
    }
    gsap.set(slider, { x: 0 });
    return;
  }

  /** Prevent double initialization */
  if (draggableInstance) return;

  let isDragging = false;
  let lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  function applyHover(targetCard) {
    if (!targetCard) return resetHover();
    cards.forEach(c => {
      if (c !== targetCard) {
        gsap.to(c, {
          opacity: 0.5,
          filter: "blur(10px)",
          scale: 1,
          duration: 0.28,
          ease: "power2.out"
        });
      }
    });

    gsap.to(targetCard, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1.1,
      duration: 0.28,
      ease: "power2.out"
    });
  }

  function resetHover() {
    gsap.to(cards, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 0.28,
      ease: "power2.out"
    });
  }

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      if (!isDragging) applyHover(card);
    });

    card.addEventListener("mouseleave", () => {
      if (!isDragging) resetHover();
    });
  });

  let pointerMoveHandler = (e) => {
    lastMouse.x = e.clientX ?? e.touches?.[0]?.clientX ?? lastMouse.x;
    lastMouse.y = e.clientY ?? e.touches?.[0]?.clientY ?? lastMouse.y;
  };

  function smoothThrowAndSyncHover(currentX, distance, minX, maxX) {
    let target = currentX + distance;
    target = Math.max(Math.min(target, maxX), minX);

    const duration = Math.min(1.9, Math.max(0.45, Math.abs(distance) / 900));

    gsap.to(slider, {
      x: target,
      duration,
      ease: "power3.out",
      onUpdate() {
        const el = document.elementFromPoint(lastMouse.x, lastMouse.y);
        const card = el?.closest?.(".today__slide-master-card");
        if (card) applyHover(card);
        else resetHover();
      }
    });
  }

  const containerWidth = wrapper.clientWidth;
  const contentWidth = slider.scrollWidth;
  const minXValue = -(contentWidth - containerWidth);

  if (contentWidth <= containerWidth) return;

  draggableInstance = Draggable.create(slider, {
    type: "x",
    bounds: { minX: minXValue, maxX: 0 },
    edgeResistance: 0.32,
    dragClickables: true,

    onPress(e) {
      isDragging = true;
      gsap.killTweensOf(slider);
      gsap.killTweensOf(cards);

      slider.style.cursor = "grabbing";
      gsap.to(wrapper, { scale: 0.94, duration: 0.22, ease: "power2.out" });

      document.addEventListener("pointermove", pointerMoveHandler);
      document.addEventListener("mousemove", pointerMoveHandler);
      document.addEventListener("touchmove", pointerMoveHandler, { passive: true });

      this._hist = [{ x: this.x, t: performance.now() }];

      if (e?.clientX !== undefined) {
        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;
      }
    },

    onDrag() {
      const now = performance.now();
      this._hist.push({ x: this.x, t: now });
      if (this._hist.length > 8) this._hist.shift();

      if (this.pointerX !== undefined) {
        lastMouse.x = this.pointerX;
        lastMouse.y = this.pointerY ?? lastMouse.y;
      }
    },

    onRelease(e) {
      isDragging = false;
      slider.style.cursor = "grab";
      gsap.to(wrapper, { scale: 1, duration: 0.22, ease: "power2.out" });

      if (e?.clientX !== undefined) {
        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;
      }

      setTimeout(() => {
        document.removeEventListener("pointermove", pointerMoveHandler);
        document.removeEventListener("mousemove", pointerMoveHandler);
        document.removeEventListener("touchmove", pointerMoveHandler);
      }, 2000);

      const hist = this._hist || [];
      if (hist.length < 2) {
        const elNow = document.elementFromPoint(lastMouse.x, lastMouse.y);
        const cardNow = elNow?.closest?.(".today__slide-master-card");
        if (cardNow) applyHover(cardNow);
        else resetHover();
        return;
      }

      const last = hist[hist.length - 1];
      let first = hist[0];
      for (let i = hist.length - 2; i >= 0; i--) {
        if (last.t - hist[i].t >= 60) {
          first = hist[i];
          break;
        }
      }

      const dt = Math.max(1, last.t - first.t);
      const dx = last.x - first.x;
      const velocity = dx / dt;

      const multiplier = 520;
      const distance = velocity * multiplier;

      const currentX = gsap.getProperty(slider, "x");

      smoothThrowAndSyncHover(currentX, distance, minXValue, 0);
    }
  });
}

document.addEventListener("DOMContentLoaded", initTodaySlider);
window.addEventListener("resize", () => {
  setTimeout(initTodaySlider, 250);
});

/* === TODAY SECTION JS END === */
