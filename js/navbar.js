// navbar.js

async function loadNavbar() {
  try {
    const res = await fetch("navbar.html");
    if (!res.ok) throw new Error("Failed to fetch navbar");

    const navbarHtml = await res.text();
    document.getElementById("navbar").innerHTML = navbarHtml;

    const burger = document.getElementById("burger-menu");
    const nav = document.getElementById("main-nav");

    function isIndexPage() {
      return (
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname === ""
      );
    }
    
    // ✅ Burger menu toggle
    function handleBurgerMenu() {
      if (!burger || !nav) return;

      burger.addEventListener("click", function () {
        burger.classList.toggle("active");
        nav.classList.toggle("open");
        burger.setAttribute(
          "aria-expanded",
          burger.classList.contains("active")
        );
      });

      // Close on link click (mobile UX)
      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function (e) {
          if (window.innerWidth <= 960) {
            burger.classList.remove("active");
            nav.classList.remove("open");
            burger.setAttribute("aria-expanded", "false");
          }

          const href = this.getAttribute("href");
          if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }
        });
      });
    }
    handleBurgerMenu();

    // ✅ Auto-scroll to section if hash is present in URL
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      let target = document.getElementById(hash);
      if (!target) target = document.querySelector("." + hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

  } catch (err) {
    console.error("Error loading navbar:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadNavbar);
// Scroll to footer when Contact link in navbar is clicked
function setupNavbarContactScroll() {
  document.addEventListener('click', function(e) {
    var target = e.target;
    // Check if the clicked element is the contact link in the navbar
    if (target.matches('.navbar-contact-link')) {
      e.preventDefault();
      var footer = document.getElementById('footer-placeholder') || document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', setupNavbarContactScroll);