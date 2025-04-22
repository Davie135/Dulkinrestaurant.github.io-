// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Initialize slider if it exists on the page
    if (document.querySelector('.slider')) {
        initSlider();
    }
    
    // Initialize menu tabs if they exist
    if (document.querySelector('.category-tabs')) {
        initMenuTabs();
    }
    
    // Initialize accordion if it exists
    if (document.querySelector('.accordion')) {
        initAccordion();
    }
    
    // Initialize specials carousel if it exists
    if (document.querySelector('.specials-carousel')) {
        initSpecialsCarousel();
    }
});

// Slider Functionality
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav .prev');
    const nextBtn = document.querySelector('.slider-nav .next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = (index + slideCount) % slideCount;
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Menu Tabs Functionality
function initMenuTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === category) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Accordion Functionality
function initAccordion() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.classList.remove('active');
                content.style.maxHeight = '0';
            }
        });
    });
}

// Specials Carousel Functionality
function initSpecialsCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const specialItems = document.querySelectorAll('.special-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let counter = 0;
    const size = specialItems[0].clientWidth;
    const itemCount = specialItems.length;
    
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    
    nextBtn.addEventListener('click', () => {
        if (counter >= itemCount - 3) return;
        counter++;
        carouselSlide.style.transition = "transform 0.5s ease";
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    });
    
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        counter--;
        carouselSlide.style.transition = "transform 0.5s ease";
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    });
    
    carouselSlide.addEventListener('transitionend', () => {
        if (specialItems[counter].id === 'lastClone') {
            carouselSlide.style.transition = "none";
            counter = itemCount - 2;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        }
        
        if (specialItems[counter].id === 'firstClone') {
            carouselSlide.style.transition = "none";
            counter = itemCount - counter;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        }
    });
    
    window.addEventListener('resize', () => {
        carouselSlide.style.transition = "none";
        const newSize = specialItems[0].clientWidth;
        carouselSlide.style.transform = `translateX(${-newSize * counter}px)`;
    });
}

