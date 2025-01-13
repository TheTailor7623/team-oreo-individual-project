"use strict";

// SELECTORS
const allLinks = document.querySelectorAll("a:link");
// Modal window selectors
const modal = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const iconCloseModal = document.querySelectorAll(".close-button__line");
const btnsCloseModal = document.querySelectorAll(".modal-window__close-button");
const btnsShowModal = document.querySelectorAll(".show-modal");
// Page navigation selectors
const pageNav = document.querySelector(".page-navigation");
const pageNavButton = document.querySelector(".page-navigation__button");
const pageNavIcon = document.querySelector(".arrow");
// Toggle selectors
const toggleContainers = document.querySelectorAll(".mytoggle");
// Submit button selectors
const submitButton = document.querySelector(".btn.btn--submit");
const clickbgButton = document.querySelector(".btn--submit__clickbg");

// HERO animation
document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".interactive");
  if (!interBubble) return;

  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(
      curX
    )}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});

// Box animation
document.querySelectorAll(".letters").forEach((element) => {
  const text = element.textContent;
  element.innerHTML = [...text]
    .map((letter, i) => `<span style="--index: ${i}">${letter}</span>`)
    .join("");
});

const boxes = document.querySelectorAll(".box.box--black--outline");

// Intersection Observer to trigger animation when a box enters the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-viewport");
        observer.unobserve(entry.target); // Stop observing once triggered
      }
    });
  },
  { threshold: 0.2 } // Trigger when 20% of the box is visible
);

// Observe all boxes
boxes.forEach((box) => observer.observe(box));

// Submit button code
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("clicked");
  clickbgButton.classList.toggle("moveUp");
  console.log("clicked");
});

// Toggle code
console.log(toggleContainers);
toggleContainers.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
  });
});

pageNavButton.addEventListener("click", function () {
  pageNav.classList.toggle("hide-nav");
  pageNavIcon.classList.toggle("rotation");
  overlay.classList.toggle("hidden-overlay");
});

// Closing page navigation on clicking overlay
overlay.addEventListener("click", function () {
  if (!pageNav.classList.contains("hide-nav")) {
    pageNav.classList.toggle("hide-nav");
    pageNavIcon.classList.toggle("rotation");
    overlay.classList.toggle("hidden-overlay");
  }
});

// REUSABLE FUNCTIONS
// Modal window functions
function showModal(event, modalToOpen) {
  event.preventDefault();

  // Select the modal based on the passed class
  const modalO = document.querySelector(`.${modalToOpen}`);

  modalO.classList.remove("hidden");
  overlay.classList.remove("hidden-overlay");
}

function closeModal(modalToClose) {
  const modalC = document.querySelector(`.${modalToClose}`);

  // Animate close button (rotating lines)
  const iconCloseModal = modalC.querySelectorAll(".close-button__line");

  iconCloseModal.forEach(function (line) {
    line.classList.add("rotated");
  });

  // After the full rotation animation, hide the modal and reset the button state
  setTimeout(function () {
    modalC.classList.add("hidden");
    overlay.classList.add("hidden-overlay");

    iconCloseModal.forEach(function (line) {
      line.classList.remove("rotated");
    });
  }, 300);
}

// Modal window code
// Opening modal window on clicking btn
btnsShowModal.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    showModal(event, `modal-window--${index + 1}`);
  });
});

// Closing modal window on clicking close button
btnsCloseModal.forEach(function (button, index) {
  button.addEventListener("click", function () {
    closeModal(`modal-window--${index + 1}`);
  });
});

// Closing modal window on clicking overlay
overlay.addEventListener("click", function () {
  const activeModal = document.querySelector(".modal-window:not(.hidden)");
  if (activeModal) {
    closeModal(activeModal.classList[1]);
  }
});

// Closing modal window on pressing Esc key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal-window:not(.hidden)");
    if (activeModal) {
      closeModal(activeModal.classList[1]);
    }
  }
});

allLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const href = link.getAttribute("href");

    // Scrolling to sections
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      const headerHeight = document.querySelector(".header").offsetHeight;

      const sectionPosition =
        sectionEl.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  });
});
