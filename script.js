// Mobile Navbar Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if(navLinks.classList.contains('active')){
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Highlight Active Menu Item
const currentPage = window.location.pathname.split("/").pop();
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(link => {
    if(link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// Sticky Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Advanced Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50; 
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// ==========================================
// Secure UPI Checkout & Payment Modal Logic
// ==========================================
let currentPlanName = "Growth";
let currentPlanPrice = "999";

function openCheckout(planName, planPrice) {
    currentPlanName = planName;
    currentPlanPrice = planPrice;
    
    const planTextEl = document.getElementById('selectedPlanText');
    if (planTextEl) {
        planTextEl.innerText = `Selected Plan: ${planName} (₹${planPrice})`;
    }
    
    // Generate UPI Intent Link dynamically based on price
    const upiID = "shjadhav112-3@okaxis";
    const payeeName = "QwickDesk Solutions";
    const transactionNote = `Payment for ${planName} Plan - QwickDesk`;
    
    const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(upiID)}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(planPrice + '.00')}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    const upiIntentBtn = document.getElementById('upiIntentBtn');
    if (upiIntentBtn) {
        upiIntentBtn.setAttribute('href', upiIntentUrl);
    }
    
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.classList.add('active');
    }
}

function closeCheckout() {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.classList.remove('active');
    }
}

function copyUpiId() {
    const upiIdText = document.getElementById('upiIdText');
    if (upiIdText) {
        const upiText = upiIdText.innerText;
        navigator.clipboard.writeText(upiText).then(() => {
            alert('UPI ID copied to clipboard: ' + upiText);
        });
    }
}

function submitUtrForm(e) {
    e.preventDefault();
    const nameEl = document.getElementById('clientName');
    const phoneEl = document.getElementById('clientPhone');
    const utrEl = document.getElementById('clientUtr');

    if (nameEl && phoneEl && utrEl) {
        const name = nameEl.value;
        const phone = phoneEl.value;
        const utr = utrEl.value;

        let waText = `*New Paid Order Received!* 💰\n\n`;
        waText += `*Plan:* ${currentPlanName} (₹${currentPlanPrice})\n`;
        waText += `*Name:* ${name}\n`;
        waText += `*Phone:* ${phone}\n`;
        waText += `*UTR / Ref No:* ${utr}\n\n`;
        waText += `Please verify and initiate my project development.`;

        const adminWhatsApp = "917249828812";
        const waLink = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(waText)}`;
        
        window.open(waLink, '_blank');
        closeCheckout();
    }
}

// Close modal on outside click
window.addEventListener('click', (event) => {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closeCheckout();
    }
});
