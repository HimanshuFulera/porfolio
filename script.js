// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.style.color = 'var(--text-main)';
        } else {
            link.style.color = 'var(--text-muted)';
        }
    });
});

// Toggle Form Visibility
const toggleFormBtn = document.getElementById('toggleFormBtn');
const contactFormContainer = document.getElementById('contactFormContainer');

if (toggleFormBtn && contactFormContainer) {
    toggleFormBtn.addEventListener('click', () => {
        if (contactFormContainer.style.display === 'none') {
            contactFormContainer.style.display = 'flex';
            toggleFormBtn.innerText = 'Hide Form';
        } else {
            contactFormContainer.style.display = 'none';
            toggleFormBtn.innerText = 'Show Form';
        }
    });
}

// Typing Effect for Hero Subtitle
const roles = ["AI Developer", "Competitive Programmer", "Full-Stack Engineer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeElement = document.querySelector('.typewriter');

function type() {
    if (!typeElement) return;
    
    const currentRole = roles[roleIndex];
    
    // Determine the article "a" vs "an" based on the word
    const isVowel = /^[AEIOU]/i.test(currentRole);
    const prefixElement = typeElement.previousElementSibling;
    if (prefixElement) {
        prefixElement.innerText = isVowel ? "I'm an" : "I'm a";
    }

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typeElement.innerText = currentRole.substring(0, charIndex);

    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", () => {
    type();
});

// Visitor Card Logic
const profileVisitorCard = document.getElementById('profileVisitorCard');
if (profileVisitorCard) {
    profileVisitorCard.addEventListener('click', () => {
        profileVisitorCard.classList.toggle('expanded');
    });
}

// Starry Background Generation
function createStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    
    const starCount = 80; // Enough to be alive, not overwhelming
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random sizing (1px to 3px)
        const size = Math.random() * 2 + 1;
        
        // Random blinking duration (2s to 6s)
        const duration = Math.random() * 4 + 2;
        
        // Random delay so they don't blink together
        const delay = Math.random() * 5;
        
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
    }
}

// Initialize stars on load
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    
    // Theme Mode Initialization
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Resume Dropdown Click Toggle for Mobile/Touch
const resumeDropdownBtn = document.querySelector('.resume-btn');
const resumeDropdown = document.querySelector('.resume-dropdown');

if (resumeDropdownBtn && resumeDropdown) {
    resumeDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resumeDropdown.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
        resumeDropdown.classList.remove('active');
    });
}

// Download CV Without Page Navigation
const downloadCvBtn = document.getElementById('download-cv-btn');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const downloadUrl = downloadCvBtn.getAttribute('href');
        
        // Creating and using a hidden iframe for the download
        const hiddenIframe = document.createElement('iframe');
        hiddenIframe.style.display = 'none';
        hiddenIframe.src = downloadUrl;
        document.body.appendChild(hiddenIframe);
        
        // Cleanup after some time
        setTimeout(() => {
            document.body.removeChild(hiddenIframe);
        }, 30000); // 30s to allow download initiation
    });
}

// Certificate Modal Logic
function openCertModal(imgSrc, title, issuer, date, verifyLink) {
    const modal = document.getElementById('certModal');
    if (!modal) return;
    
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalIssuer').textContent = issuer;
    document.getElementById('modalDate').textContent = date;
    
    const verifyBtn = document.getElementById('modalVerifyBtn');
    if (verifyBtn) {
        verifyBtn.href = verifyLink ? verifyLink : '#';
        verifyBtn.style.display = verifyLink ? 'inline-flex' : 'none';
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    
    document.body.style.overflow = '';
    
    setTimeout(() => {
        modal.style.display = 'none';
        const img = document.getElementById('modalImg');
        if(img) img.src = ''; 
    }, 300);
}

// Contact Form AJAX Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show processing state
        if (formStatus) {
            formStatus.textContent = 'Processing...';
            formStatus.style.display = 'block';
        }

        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Message Sent!';
                contactForm.reset();
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                const errorData = await response.json();
                formStatus.textContent = errorData.error || 'Oops! There was a problem sending your message.';
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem sending your message.';
        }
    });
}
