/* Header Sticky JS Start */

const header = document.querySelector('.header');
const logo = document.querySelector('.header__logo--link > svg');
let lastScrollY = 0;
let rotation = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('sticky-header');
    } else {
        header.classList.remove('sticky-header');
        logo.style.transform = 'rotate(0deg)';
        return;
    }

    if (header.classList.contains('sticky-header')) {
        const delta = window.scrollY - lastScrollY;
        rotation += delta * 0.1;
        logo.style.transform = `rotate(${rotation}deg)`;
    }

    lastScrollY = window.scrollY;
});

/* Header Sticky JS End */

/* Banner Section JS Start */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".banner__main",
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true
    }
});

tl.to(".banner__title.left__hide", {
    x: "-220%"
}, 0)

    .to(".banner__title.right__hide", {
        x: "220%"
    }, 0)

    .to(".banner__content .banner__title:first-child", {
        scale: 1.5,
        y: 40
    }, 0)

    .to(".banner__content .banner__title:last-child", {
        scale: 1.5,
        y: -40
    }, 0)

    .to(".banner__search", {
        y: "800%"
    }, 0)

    .to(".banner__intro", {
        bottom: 0,
        opacity: 1,
        transform: "none",
    }, 0);

/* Banner Section JS End */

/* Pricing Section JS Start */

const tabInner = document.querySelector('.pricing--tab__inner');
const contentInner = document.querySelector('.pricing--tab__content--wrapper__inner');
const buttons = document.querySelectorAll('.pricing--tab__inner button');

buttons.forEach((button, index) => {
    button.addEventListener('click', function () {

        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        tabInner.classList.remove('monthly-active', 'annually-active');
        contentInner.classList.remove('monthly-active', 'annually-active');

        if (index === 0) {
            tabInner.classList.add('monthly-active');
            contentInner.classList.add('monthly-active');
        } else {
            tabInner.classList.add('annually-active');
            contentInner.classList.add('annually-active');
        }

    });
});

/* Pricing Section JS End */

/* FAQ Section JS Start */

const items = document.querySelectorAll(".faq--item");

items.forEach(item => {
    const question = item.querySelector(".faq--question");
    const answer = item.querySelector(".faq--answer");

    question.addEventListener("click", () => {

        items.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq--answer").style.height = 0;
            }
        });

        if (item.classList.contains("active")) {
            item.classList.remove("active");
            answer.style.height = 0;
        } else {
            item.classList.add("active");
            answer.style.height = answer.scrollHeight + "px";
        }

    });
});

/* FAQ Section JS End */

/* On Scroll Background Change JS Start */

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const meetSection = document.querySelector(".meet__golao-main");
    const authorSection = document.querySelector(".author__main");

    body.style.backgroundColor = "#374a34";

    function updateBackground() {

        const meetRect = meetSection.getBoundingClientRect();
        const authorRect = authorSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (authorRect.top <= windowHeight * 0.2) {
            body.style.backgroundColor = "#202633";
        }
        else if (meetRect.top <= windowHeight * 0.1) {
            body.style.backgroundColor = "#451930";
        }
        else {
            body.style.backgroundColor = "#374a34";
        }
    }

    window.addEventListener("scroll", updateBackground);
});

/* On Scroll Background Change JS End */

/* On Scroll Transform JS Start */

document.addEventListener("DOMContentLoaded", function () {

    const boxes = document.querySelectorAll(".scroll--transform--box");
    let lastScrollY = window.scrollY;

    boxes.forEach(box => {
        box.style.transform = "translate(0px, 80px)";
        box.style.transition = "transform 1.1s ease";
    });

    window.addEventListener("scroll", function () {

        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < lastScrollY;

        boxes.forEach(box => {

            const rect = box.getBoundingClientRect();

            if (!scrollingUp && rect.top < window.innerHeight) {
                box.style.transform = "translate(0px, 0px)";
            }

            if (scrollingUp && rect.top >= window.innerHeight) {
                box.style.transform = "translate(0px, 80px)";
            }

        });

        lastScrollY = currentScrollY;

    });

});

/* On Scroll Transform JS End */

/* Header JS Start */

document.querySelectorAll('.header__menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('aria-label');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* Header JS End */

/* Creator Form JS Start */

const steps = document.querySelectorAll(".creator--form__inner form ul li");
const nextBtn = document.querySelector(".form--arrows button:last-child");
const prevBtn = document.querySelector(".form--arrows button:first-child");
const ul = document.querySelector(".creator--form__inner form ul");

let currentStep = 0;

function updateStep() {

    ul.style.transform = `translateX(-${currentStep * 100}%)`;

    if (currentStep === 0) {
        prevBtn.style.opacity = "0";
        prevBtn.style.pointerEvents = "none";
    } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
    }

    if (currentStep === steps.length - 1) {
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
    } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
    }
}

updateStep();

nextBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep();
    }
});

prevBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (currentStep > 0) {
        currentStep--;
        updateStep();
    }
});

/* Creator Form JS End */