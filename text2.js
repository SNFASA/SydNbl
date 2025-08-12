
        // Mobile Menu Toggle
        const menuIcon = document.getElementById('menu-icon');
        const navlist = document.getElementById('navlist');
        
        menuIcon.addEventListener('click', () => {
            navlist.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            icon.className = navlist.classList.contains('active') ? 'bx bx-x' : 'bx bx-menu';
        });

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navlist.classList.remove('active');
                menuIcon.querySelector('i').className = 'bx bx-menu';
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function highlightNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightNav);

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
            observer.observe(el);
        });

        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scroll-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        // Form submission with enhanced validation and feedback
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Enhanced validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errors = [];
            
            if (!name) errors.push('Name is required');
            if (!email) errors.push('Email is required');
            else if (!emailRegex.test(email)) errors.push('Please enter a valid email address');
            if (!subject) errors.push('Subject is required');
            if (!message) errors.push('Message is required');
            else if (message.length < 10) errors.push('Message must be at least 10 characters long');
            
            if (errors.length > 0) {
                showNotification('Please fix the following errors:\n• ' + errors.join('\n• '), 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.send-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
                showNotification(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon!`, 'success');
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="ri-${type === 'success' ? 'check-circle' : type === 'error' ? 'error-warning' : 'information'}-line"></i>
                <span>${message}</span>
                <button class="close-notification">×</button>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 9999;
                max-width: 400px;
                transform: translateX(400px);
                transition: all 0.3s ease;
                white-space: pre-line;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            const closeBtn = notification.querySelector('.close-notification');
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                margin-left: 1rem;
            `;
            
            function closeNotification() {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }
            
            closeBtn.addEventListener('click', closeNotification);
            
            setTimeout(closeNotification, 5000);
        }

        // Enhanced scroll effects with performance optimization
        let ticking = false;
        
        function updateScrollEffects() {
            highlightNav();
            
            // Scroll to top button
            const scrollTopBtn = document.getElementById('scroll-top');
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
            
            // Header scroll effect
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestScrollUpdate);

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    hero.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Add loading animation for page
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Enhanced portfolio card interactions
        document.querySelectorAll('.portfolio-card').forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add staggered animation on scroll
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                navlist.classList.remove('active');
                menuIcon.querySelector('i').className = 'bx bx-menu';
            }
        });

        // Add focus management for accessibility
        const focusableElements = 'a[href], button, textarea, input, select';
        const modal = document.querySelector('.contact-form');
        
        if (modal) {
            const focusableContent = modal.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];
            
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }

        console.log('Portfolio website loaded successfully! 🚀');
        console.log('Created by: Syed Nabil (SydNbl)');
        console.log('Contact: syednabil.0413@gmail.com');

        // Add typing effect to hero section
        const heroText = document.querySelector('.main-content h1');
        if (heroText) {
            const originalText = heroText.innerHTML;
            heroText.innerHTML = 'I\'m <span>Syed Nabil</span>';
            
            // No typing effect needed, keep original text
            heroText.innerHTML = originalText;
        }

        // Add staggered animation to coding icons
        const codingIcons = document.querySelectorAll('.coding a');
        codingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.1}s`;
            icon.classList.add('fade-in');
        });

        // Add tech stack hover effects
        const techIcons = [
            { selector: '.bxl-visual-studio', name: 'Visual Studio', color: '#5C2D91' },
            { selector: '.bxl-html5', name: 'HTML5', color: '#E34F26' },
            { selector: '.bxl-css3', name: 'CSS3', color: '#1572B6' },
            { selector: '.bxl-java', name: 'Java', color: '#ED8B00' },
            { selector: '.bxl-c-plus-plus', name: 'C++', color: '#00599C' },
            { selector: '.bxs-data', name: 'Database', color: '#336791' },
            { selector: '.bxl-python', name: 'Python', color: '#3776AB' }
        ];

        techIcons.forEach(tech => {
            const elements = document.querySelectorAll(tech.selector);
            elements.forEach(element => {
                const parent = element.closest('a');
                if (parent) {
                    // Add tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tech-tooltip';
                    tooltip.textContent = tech.name;
                    tooltip.style.cssText = `
                        position: absolute;
                        bottom: 120%;
                        left: 50%;
                        transform: translateX(-50%);
                        background: ${tech.color};
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        font-size: 0.8rem;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                        pointer-events: none;
                        white-space: nowrap;
                        z-index: 1000;
                    `;
                    
                    // Add arrow
                    const arrow = document.createElement('div');
                    arrow.style.cssText = `
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 5px solid transparent;
                        border-top-color: ${tech.color};
                    `;
                    tooltip.appendChild(arrow);
                    
                    parent.style.position = 'relative';
                    parent.appendChild(tooltip);
                    
                    parent.addEventListener('mouseenter', () => {
                        tooltip.style.opacity = '1';
                        tooltip.style.visibility = 'visible';
                        parent.style.backgroundColor = tech.color;
                        parent.style.color = 'white';
                    });
                    
                    parent.addEventListener('mouseleave', () => {
                        tooltip.style.opacity = '0';
                        tooltip.style.visibility = 'hidden';
                        parent.style.backgroundColor = '';
                        parent.style.color = '';
                    });
                }
            });
        });

        // Add hover effects to portfolio cards
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click ripple effect to buttons
        document.querySelectorAll('.btn, .send-btn, .h-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
