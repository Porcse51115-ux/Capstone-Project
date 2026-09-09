/* ==========================================================
   Portfolio — JavaScript Interactions
   1. Typing animation in the hero
   2. Mobile hamburger menu toggle
   3. Smooth-scroll navigation
   ========================================================== */


/* ----------------------------------------------------------
   1. TYPING ANIMATION
   Cycles through phrases with a typewriter effect.
   Uses querySelector + addEventListener (via setTimeout).
   ---------------------------------------------------------- */

var typedElement = document.getElementById('typed-text');

if (typedElement) {
    var phrases = [
        'Trucker turned developer.',
        'Building AI-powered SaaS.',
        'Shipping real products.',
        'From the road to the repo.'
    ];

    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;

    function typeLoop() {
        var current = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            // Pause at end of phrase
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}


/* ----------------------------------------------------------
   2. HAMBURGER MENU TOGGLE
   querySelector + addEventListener('click').
   Visibly changes the page without reloading.
   ---------------------------------------------------------- */

var hamburger = document.querySelector('.hamburger');
var navList = document.querySelector('nav ul');

if (hamburger && navList) {
    hamburger.addEventListener('click', function () {
        var isOpen = navList.classList.toggle('nav-open');
        hamburger.classList.toggle('is-active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked (for smooth-scroll links)
    navList.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            navList.classList.remove('nav-open');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}


/* ----------------------------------------------------------
   3. SMOOTH SCROLL for anchor links
   Intercepts clicks on hash links and scrolls smoothly.
   ---------------------------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
