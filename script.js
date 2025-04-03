document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

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
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            nav.classList.remove('active');
        });
    });

    // Header shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
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
                    alert('Please click the play button to start music');
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

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});