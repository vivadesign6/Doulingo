/**
 * Duolingo Magic Carpet Experience
 * Main JavaScript File
 */

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const testimonialSlider = document.querySelector('.testimonial-slider');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');
const dots = document.querySelectorAll('.dot');
const videoPlaceholder = document.querySelector('.video-placeholder');

// Mobile Menu Toggle
function toggleMobileMenu() {
  if (mainNav) {
    mainNav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  }
}

// Initialize mobile menu
function initMobileMenu() {
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (mainNav && mainNav.classList.contains('active')) {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle) {
        toggleMobileMenu();
      }
    }
  });
}

// Initialize testimonial slider
function initTestimonialSlider() {
  if (!testimonialSlider) return;
  
  let currentSlide = 0;
  const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
  
  // Hide all slides except the first one
  slides.forEach((slide, index) => {
    if (index !== 0) {
      slide.style.display = 'none';
    }
  });
  
  // Show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.style.display = 'none';
    });
    
    // Show the selected slide
    slides[index].style.display = 'block';
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Next slide function
  function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }
  
  // Previous slide function
  function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    }
    showSlide(newIndex);
  }
  
  // Add event listeners to controls
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }
  
  // Add event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

// Handle video placeholder click
function initVideoPlaceholder() {
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
      // In a real implementation, this would embed and play the video
      alert("Video would play here in the final implementation.");
    });
  }
}

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }
  
  // Function to handle scroll
  function handleScroll() {
    animatedElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('animated');
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Trigger once on page load
  handleScroll();
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTestimonialSlider();
  initVideoPlaceholder();
  initScrollAnimations();
  initSmoothScrolling();
});