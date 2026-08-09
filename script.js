/* ==========================================================================
   QWICKDESK SOLUTIONS - CORE INTERACTION SCRIPT
   Description: Handles Scroll Animations, Mobile Menu, and Sticky Navbar
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ---------------------------------------------------------
    // 1. STICKY NAVBAR LOGIC (Shrink & Blur on Scroll)
    // ---------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                // Adds a slight top border for distinction when scrolled
                navbar.style.borderTop = "none";
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ---------------------------------------------------------
    // 2. MOBILE HAMBURGER MENU TOGGLE
    // ---------------------------------------------------------
    const hamburgerBtn = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    
    if (hamburgerBtn && mobileMenu) {
        let isMenuOpen = false;

        hamburgerBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Open Menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                hamburgerBtn.innerHTML = '<i class="fas fa-times"></i>'; // Change icon to 'X'
                // Prevent body scrolling
                document.body.style.overflow = 'hidden'; 
            } else {
                // Close Menu
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>'; // Change icon back to hamburger
                // Restore body scrolling
                document.body.style.overflow = ''; 
            }
        });

        // Close menu if a link is clicked inside the mobile menu
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }

    // ---------------------------------------------------------
    // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ---------------------------------------------------------
    // Define the observer options
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the viewport
    };

    // Create the observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the active class to trigger CSS transitions
                entry.target.classList.add("reveal-active");
                // Stop observing once animated to prevent repeating
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Select all elements with reveal classes and observe them
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in');
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ---------------------------------------------------------
    // 4. CLIENT PORTAL MODAL GLOBAL LOGIC (Fallback)
    // ---------------------------------------------------------
    // Just in case inline script fails, global listener for escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const loginModal = document.getElementById('loginModal');
            if (loginModal && !loginModal.classList.contains('hidden')) {
                // Simulate the closeLoginModal() function defined in HTML
                loginModal.classList.add('opacity-0');
                loginModal.querySelector('.modal-card').classList.add('scale-95');
                setTimeout(() => {
                    loginModal.classList.add('hidden');
                }, 300);
            }
        }
    });

});
