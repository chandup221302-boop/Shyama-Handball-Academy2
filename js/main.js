// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Header Height for Sticky Navbar
    const updateHeaderHeight = () => {
        const topHeader = document.querySelector('.top-header');
        if(topHeader) {
            document.documentElement.style.setProperty('--header-height', `${topHeader.offsetHeight}px`);
        }
    };
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('load', () => {
        updateHeaderHeight();
        // Hide Preloader
        document.body.classList.add('loaded');
    });
    updateHeaderHeight();

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (navbar && navLinks) {
        // Add mobile menu button to navbar
        const mobileBtn = document.createElement('div');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.appendChild(mobileBtn);

        // Position the mobile button vertically aligned with navbar
        const positionBtn = () => {
            const navRect = navbar.getBoundingClientRect();
            mobileBtn.style.top = navRect.top + 'px';
        };
        positionBtn();
        window.addEventListener('resize', positionBtn);
        window.addEventListener('scroll', positionBtn);

        // Create overlay (behind menu, only for dimming background)
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);

        const icon = mobileBtn.querySelector('i');

        // Toggle logic
        const openMenu = () => {
            navLinks.classList.add('active');
            overlay.classList.add('active');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        };

        const toggleMenu = () => {
            if (navLinks.classList.contains('active')) closeMenu();
            else openMenu();
        };

        mobileBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        // DO NOT add any click listeners on the nav links!
        // Let the browser handle <a href="..."> navigation natively.
        // Any JS interference (e.preventDefault, closeMenu, setTimeout) 
        // can block mobile browsers from following the link.
    }

    // Carousels Logic (Auto-slide, Buttons, and Dots)
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.slider-container');
        const leftBtn = wrapper.querySelector('.left-btn');
        const rightBtn = wrapper.querySelector('.right-btn');
        const dotsContainer = wrapper.querySelector('.carousel-dots');

        if(slider) {
            const items = Array.from(slider.children);
            // Dynamic scroll amount based on 1 item width + gap
            const getScrollAmount = () => items.length > 0 ? items[0].offsetWidth + 20 : 350;
            let dots = [];

            // Generate dots
            if(dotsContainer && items.length > 0) {
                items.forEach((item, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if(index === 0) dot.classList.add('active');
                    
                    dot.addEventListener('click', () => {
                        slider.scrollTo({
                            left: item.offsetLeft - slider.offsetLeft,
                            behavior: 'smooth'
                        });
                    });
                    
                    dotsContainer.appendChild(dot);
                    dots.push(dot);
                });
            }

            // Update active dot on scroll
            slider.addEventListener('scroll', () => {
                let index = Math.round(slider.scrollLeft / items[0].clientWidth);
                if(index >= dots.length) index = dots.length - 1;
                dots.forEach(d => d.classList.remove('active'));
                if(dots[index]) dots[index].classList.add('active');
            });

            // Buttons logic
            if(leftBtn && rightBtn) {
                leftBtn.addEventListener('click', () => {
                    slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
                });
                rightBtn.addEventListener('click', () => {
                    slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
                });
            }

            // Auto-slide logic
            let autoSlideInterval;
            const startAutoSlide = () => {
                autoSlideInterval = setInterval(() => {
                    if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                        slider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
                    }
                }, 3000); // slide every 3 seconds
            };

            const stopAutoSlide = () => clearInterval(autoSlideInterval);

            // Start auto-slide by default
            startAutoSlide();

            // Pause auto-slide on hover/touch
            wrapper.addEventListener('mouseenter', stopAutoSlide);
            wrapper.addEventListener('mouseleave', startAutoSlide);
            wrapper.addEventListener('touchstart', stopAutoSlide);
            wrapper.addEventListener('touchend', startAutoSlide);
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation class on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section-title, .about-content');
        elements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for elements to be animated
    const elementsToAnimate = document.querySelectorAll('.card, .section-title, .about-content');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger once on load
});
