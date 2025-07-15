// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(30, 60, 114, 0.95)';
        navbar.style.padding = '15px 0';
    } else {
        navbar.style.backgroundColor = 'rgba(30, 60, 114, 0.9)';
        navbar.style.padding = '20px 0';
    }
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stats Section Counter Animation
            if (entry.target.id === 'stats') {
                animateCounters();
            }
            
            // Add animation class to timeline items
            if (entry.target.id === 'achievements') {
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
            
            // Add animation class to gallery items
            if (entry.target.id === 'gallery') {
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 150);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Initialize Timeline and Gallery items with hidden state
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        if (item.classList.contains('timeline-item:nth-child(odd)')) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'all 0.5s ease';
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'all 0.5s ease';
    });
});

// Video Fallback Image
const heroVideo = document.querySelector('.hero-video');
const videoFallback = document.createElement('div');
videoFallback.className = 'video-fallback';
videoFallback.style.backgroundImage = 'url(https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80)';
videoFallback.style.backgroundSize = 'cover';
videoFallback.style.backgroundPosition = 'center';
videoFallback.style.position = 'absolute';
videoFallback.style.top = '0';
videoFallback.style.left = '0';
videoFallback.style.width = '100%';
videoFallback.style.height = '100%';
videoFallback.style.zIndex = '-2';

heroVideo.addEventListener('error', () => {
    document.querySelector('.hero').appendChild(videoFallback);
    heroVideo.style.display = 'none';
});

// Current Year for Footer
document.querySelector('.footer-bottom').innerHTML = document.querySelector('.footer-bottom').innerHTML.replace('2023', new Date().getFullYear());

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
});
