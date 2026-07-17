// 1. Mobile Menu Hamburger Logic (Advanced Toggle)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if(navLinks.classList.contains('active')){
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// 2. Active Link Highlighter
const currentPage = window.location.pathname.split("/").pop();
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(link => {
    if(link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// 3. Navbar Glassmorphism Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 4. Advanced Staggered Scroll Reveal (Intersection Observer)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // kitna scroll karne pe dikhega
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
// To check the scroll position on page load
reveal();
