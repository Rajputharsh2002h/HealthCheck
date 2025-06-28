document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.querySelector('i').classList.add('fa-bars');
                        menuToggle.querySelector('i').classList.remove('fa-times');
                    }

                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the current slide and activate the corresponding dot
        testimonialSlides[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    // Initialize the slider
    showSlide(currentSlide);

    // Next button click event
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }

    // Previous button click event
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }

    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide testimonials
    setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-success');

    // Open modal when trigger is clicked
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.trim() === 'Book Now') {
            btn.addEventListener('click', function() {
                document.getElementById('bookingModal').classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Login button
    document.querySelector('.btn-login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal when close button is clicked
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Login/Register tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });

    // Form submissions
    const contactForm = document.getElementById('contactForm');
    const bookingForm = document.getElementById('bookingForm');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const newsletterForm = document.querySelector('.newsletter-form');

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('successModal').classList.add('active');
            document.getElementById('successMessage').textContent = 'Your message has been sent successfully. We will get back to you soon!';
            contactForm.reset();
        });
    }

    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('bookingModal').classList.remove('active');
            document.getElementById('successModal').classList.add('active');
            document.getElementById('successMessage').textContent = 'Your health checkup has been booked successfully. Our representative will contact you shortly to confirm the details.';
            bookingForm.reset();
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').classList.remove('active');
            document.getElementById('successModal').classList.add('active');
            document.getElementById('successMessage').textContent = 'You have been logged in successfully!';
            loginForm.reset();
        });
    }

    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').classList.remove('active');
            document.getElementById('successModal').classList.add('active');
            document.getElementById('successMessage').textContent = 'Your account has been created successfully!';
            registerForm.reset();
        });
    }

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('successModal').classList.add('active');
            document.getElementById('successMessage').textContent = 'Thank you for subscribing to our newsletter!';
            newsletterForm.reset();
        });
    }

    // Animated counter for stats
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate counters when stats section is visible
                    document.querySelectorAll('.stat-item .highlight').forEach(counter => {
                        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                        animateCounter(counter, target, 2000);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });

    // Typing animation for hero heading
    const heroHeading = document.querySelector('.hero-text h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.innerHTML = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    }

    // Image lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    `;
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });

    // Add preloader styles
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        .spinner {
            width: 70px;
            text-align: center;
        }
        .spinner > div {
            width: 18px;
            height: 18px;
            background-color: #4e54c8;
            border-radius: 100%;
            display: inline-block;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            margin: 0 3px;
        }
        .spinner .bounce1 {
            animation-delay: -0.32s;
        }
        .spinner .bounce2 {
            animation-delay: -0.16s;
        }
        @keyframes sk-bouncedelay {
            0%, 80%, 100% { 
                transform: scale(0);
            } 40% { 
                transform: scale(1.0);
            }
        }
    `;
    document.head.appendChild(preloaderStyle);

    // Add floating animation to elements
    const floatingElements = document.querySelectorAll('.package-card, .service-card');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // Add CSS for floating animation
    const floatingStyle = document.createElement('style');
    floatingStyle.textContent = `
        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .package-card, .service-card {
            animation: floating 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(floatingStyle);

    // Add hover effect to navigation menu
    const navLinks = document.querySelectorAll('.nav-menu li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Create SVG placeholder images
    function createSVGImage(id, color, text) {
        return `<svg id="${id}" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
            <rect width="100%" height="100%" fill="${color}"/>
            <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
        </svg>`;
    }

    // Create SVG images for placeholders
    const svgImages = {
        'hero-image': createSVGImage('hero-svg', '#4e54c8', 'Health Checkup Illustration'),
        'cap-usa': createSVGImage('cap-svg', '#00c9a7', 'CAP-USA'),
        'nabl': createSVGImage('nabl-svg', '#00c9a7', 'NABL'),
        'testimonial1': createSVGImage('testimonial1-svg', '#8f94fb', 'RS'),
        'testimonial2': createSVGImage('testimonial2-svg', '#8f94fb', 'SD'),
        'testimonial3': createSVGImage('testimonial3-svg', '#8f94fb', 'DK'),
        'app-mockup': createSVGImage('app-svg', '#4e54c8', 'App Mockup'),
        'about-image': createSVGImage('about-svg', '#00c9a7', 'About Us')
    };

    // Create images directory and SVG files
    const imagesDir = document.createElement('div');
    imagesDir.id = 'images-dir';
    imagesDir.style.display = 'none';
    document.body.appendChild(imagesDir);

    // Add SVG content to the page
    for (const [id, svg] of Object.entries(svgImages)) {
        const svgContainer = document.createElement('div');
        svgContainer.innerHTML = svg;
        imagesDir.appendChild(svgContainer);
    }

    // Replace image src with SVG data URLs
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('images/')) {
            const imageName = src.split('/')[1].split('.')[0];
            if (svgImages[imageName]) {
                const svgElement = document.getElementById(`${imageName}-svg`);
                if (svgElement) {
                    const svgData = new XMLSerializer().serializeToString(svgElement);
                    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
                    const svgUrl = URL.createObjectURL(svgBlob);
                    img.src = svgUrl;
                }
            }
        }
    });
});