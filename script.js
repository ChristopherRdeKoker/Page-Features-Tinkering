"use strict";

// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//insertingh new Div for bottom msg
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = 'We use cookies for stats etc';
message.innerHTML =
  'We use cookies for stats and analytics. <button class="btn btn--close--cookie">Got it!</button>';

const header = document.querySelector(".header");
header.before(message);
// header.prepend(message);
document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", function (e) {
    e.preventDefault();
    message.remove();
  });

message.style.backgroundColor = "#37383d";
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 12 + "px";

//////////////////////////////////////////////////////////////////////////////////
//implementing smooth scroll 'learn more' link
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function () {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log("Current Scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  //////////////scroll now
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,                       //old way
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,                  //better, smooth transition
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: "smooth" }); //most modern way, NB not all browsers
});
////////////////////////////////////////////////////////////////////////////////
//Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////////////
//Tabbed components
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

// /*tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
// but bad practice, what if 200 tabs... find parent element. event delegation*/
// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');
//   console.log(clicked);

//   //guard clause
//   if (!clicked) return;

//   //remove active classes
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(t => t.classList.remove('operations__content--active'));

//   //active tab
//   clicked.classList.add('operations__tab--active');

//   /*.................................*/

//   //activate content area
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
//   console.log(clicked.dataset.tab);
// });
///////////////////////////////////////////////////////////////////////////////
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  //remove 2
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //activate tab
  console.log(clicked);
  clicked.classList.add("operations__tab--active");
  //add win
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");

  // console.log(clicked.dataset.tab);
});
//phew. did above amazingly. good review practice
///////////////////////////////////////////////////////////////////////////
//fade animation

const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5; //great first code!
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
///////////////////////////////////////////////////////////////
//better Sticky header

const navHeight = nav.getBoundingClientRect().height;

const stickynavFunc = function (entries) {
  const entry = entries[0]; //or   const [entry] = entries
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickynavFunc, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//////////////////////////////////////////////////////////////////////////
//reveal sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //15% then will be visible
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
//////////////////////////////////////////////////
//lazy loading images, nice
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImgFunc = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};

const imgObserver = new IntersectionObserver(loadImgFunc, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));
//////////////////////////////////////////////////////////////////
//slider
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

let currSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (currSlide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currSlide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
};

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
