document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Intersection Observer untuk animasi section
    const sections = document.querySelectorAll('section:not(#home)');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Update URL hash tanpa trigger scroll
                if (history.replaceState) {
                    history.replaceState(null, null, `#${entry.target.id}`);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Aktifkan section yang sedang dilihat saat load
    function checkVisibleSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (
                rect.top <= (window.innerHeight * 0.75) && 
                rect.bottom >= (window.innerHeight * 0.25)
            );
            
            if (isVisible) {
                section.classList.add('active');
            }
        });
    }

    window.addEventListener('load', checkVisibleSections);
    window.addEventListener('scroll', checkVisibleSections);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Trigger animasi sebelum scroll
            targetElement.classList.add('active');
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. I will get back to you soon.');
            this.reset();
        });
    }

    // Profile image music control
    const profileImage = document.querySelector('.profile-image');
    const bgMusic = document.getElementById('bgMusic');
    
    // Set volume to 30% by default
    if (bgMusic) {
        bgMusic.volume = 0.3;
        
        profileImage.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play()
                    .then(() => {
                        this.classList.add('rotate', 'playing');
                        this.querySelector('.music-indicator i').className = 'fas fa-pause';
                    })
                    .catch(error => {
                        console.error('Audio playback failed:', error);
                        alert('Please interact with the page first to enable audio');
                    });
            } else {
                bgMusic.pause();
                this.classList.remove('rotate', 'playing');
                this.querySelector('.music-indicator i').className = 'fas fa-play';
            }
        });

        // Change play/pause icon on hover when music is playing
        profileImage.addEventListener('mouseenter', function() {
            if (!bgMusic.paused) {
                this.querySelector('.music-indicator i').className = 'fas fa-pause';
            }
        });

        profileImage.addEventListener('mouseleave', function() {
            if (!bgMusic.paused) {
                this.querySelector('.music-indicator i').className = 'fas fa-play';
            }
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            this.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            
            // Save theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
});