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


/* ----------------------------------------------------------
   4. FORM VALIDATION (About/Contact page)
   Intercepts submit with preventDefault(), shows DOM errors,
   validates email format, clears errors on input.
   Keyboard accessible — all native form elements.
   ---------------------------------------------------------- */

var contactForm = document.getElementById('contact-form');

if (contactForm) {
    var fields = [
        {
            id: 'full-name',
            validate: function (val) { return val !== ''; },
            msg: 'Please enter your name.'
        },
        {
            id: 'email',
            validate: function (val) {
                if (val === '') return false;
                return val.indexOf('@') !== -1 && val.indexOf('.') !== -1;
            },
            msg: 'Please enter a valid email address.'
        },
        {
            id: 'subject',
            validate: function (val) { return val !== ''; },
            msg: 'Please enter a subject.'
        },
        {
            id: 'message',
            validate: function (val) { return val !== ''; },
            msg: 'Please enter a message.'
        }
    ];

    // Real-time error clearing as user types
    fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        if (input) {
            input.addEventListener('input', function () {
                if (field.validate(input.value.trim())) {
                    clearFormError(input, field.id);
                }
            });
        }
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var allValid = true;

        fields.forEach(function (field) {
            var input = document.getElementById(field.id);
            var value = input.value.trim();

            if (!field.validate(value)) {
                showFormError(input, field.id, field.msg);
                allValid = false;
            } else {
                clearFormError(input, field.id);
            }
        });

        if (allValid) {
            contactForm.hidden = true;
            document.getElementById('form-success').hidden = false;
        }
    });
}

function showFormError(input, id, msg) {
    var errorSpan = document.getElementById(id + '-error');
    if (errorSpan) errorSpan.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('input-error');
}

function clearFormError(input, id) {
    var errorSpan = document.getElementById(id + '-error');
    if (errorSpan) errorSpan.textContent = '';
    input.removeAttribute('aria-invalid');
    input.classList.remove('input-error');
}
