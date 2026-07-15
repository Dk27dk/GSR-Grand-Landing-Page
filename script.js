// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-cubic'
});

// Navbar scroll state
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

function runCounters() {
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    const duration = 1600;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(animate);
  });
}

const statsSection = document.querySelector('.stats');
let counted = false;

if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        runCounters();
      }
    });
  }, {
    threshold: 0.4
  });

  observer.observe(statsSection);
}

// ==============================
// Contact Form (Formspree)
// ==============================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

  const formMsg = document.getElementById("formMsg");
  const formErr = document.getElementById("formErr");
  const submitBtn = enquiryForm.querySelector(".form-submit");

  enquiryForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    formMsg.style.display = "none";
    formErr.style.display = "none";

    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    try {

      const formData = new FormData(enquiryForm);

      const response = await fetch("https://formspree.io/f/mdaqkjkq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {

        enquiryForm.reset();

        formMsg.style.display = "block";
        formMsg.innerHTML = "✅ Enquiry sent successfully! We'll contact you soon.";

      } else {

        const error = await response.json();
        console.error(error);

        formErr.style.display = "block";
        formErr.innerHTML = "❌ Failed to send enquiry. Please try again.";

      }

    } catch (err) {

      console.error(err);

      formErr.style.display = "block";
      formErr.innerHTML = "❌ Network error. Please check your internet connection.";

    } finally {

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

    }

  });

}