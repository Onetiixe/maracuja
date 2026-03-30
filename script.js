// ===== Scroll bouton =====
function scrollToContact() {
  const contact = document.getElementById("contact");
  if (contact) {
    contact.scrollIntoView({ behavior: "smooth" });
  }
}

// ===== Formulaire =====
function handleSubmit(event) {
  event.preventDefault();
  alert("Message envoyé ! (version démo)");
}

// ===== Carousel =====
let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let autoSlide;

function showSlide(index) {
  if (slides.length === 0) return;

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active-dot"));

  slides[index].classList.add("active");
  if (dots[index]) {
    dots[index].classList.add("active-dot");
  }

  current = index;
}

function nextSlide() {
  if (slides.length === 0) return;
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  if (slides.length === 0) return;
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 4500);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

startAutoSlide();

const carousel = document.querySelector(".carousel");
if (carousel) {
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);
}

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    showSlide(index);

    const carouselSection = document.getElementById("carousel-section");
    if (carouselSection) {
      carouselSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== Apparition au scroll =====
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.88;

  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < trigger) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== Compteurs =====
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {
  const statsSection = document.querySelector(".stats");
  if (!statsSection || countersStarted) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));

      const updateCounter = () => {
        count += step;

        if (count >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = count;
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);