document.addEventListener('DOMContentLoaded', () => {
    /* Menu icon toggle */
    const menuIcon = document.querySelector('#menu-icon i');
    const navbar = document.querySelector('.navbar');

    if (menuIcon) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        };
    }

    /* Initialize tsParticles (Master Background) */
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-js", {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#00c3ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#329bdd", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2.5, direction: "none", out_mode: "out" }
            },
            interactivity: {
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
                modes: { grab: { distance: 160 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    /* Theme Light/Dark Mode Logic */
    const themeIcon = document.querySelector('#theme-icon i');
    const body = document.body;
    
    // Check for saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeIcon) {
        themeIcon.onclick = () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        };
    }

    /* Scroll sections active link */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    const targetLink = document.querySelector('header nav a[href*=' + id + ']');
                    if (targetLink) targetLink.classList.add('active');
                });
            }
        });

        /* Sticky navbar */
        const header = document.querySelector('.header');
        if (header) header.classList.toggle('sticky', window.scrollY > 100);

        /* Remove menu icon navbar when click navbar link (scroll) */
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        }
    };

    /* Scroll reveal */
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .contact-card-container', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img, .timeline-item.left', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content, .timeline-item.right', { origin: 'right' });

    ScrollReveal().reveal('.about-stats-grid', { 
        origin: 'bottom',
        afterReveal: (el) => {
            const counters = el.querySelectorAll('.counter');
            counters.forEach(animateCounter);
        }
    });

    /* Typed JS */
    if (document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: ['Mobile Developer', 'Web Developer', 'AI Enthusiast', 'Data Scientist'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    /* Resume Modal Logic */
    const resumeModal = document.getElementById('resumeModal');
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const closeResume = document.querySelector('.close-resume');

    if (viewResumeBtn && resumeModal) {
        viewResumeBtn.onclick = () => {
            resumeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    }

    if (closeResume) {
        closeResume.onclick = () => {
            resumeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    /* AJAX Contact Form Submission */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.onsubmit = async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.style.pointerEvents = 'none';
            submitBtn.style.opacity = '0.7';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent successfully! 👍';
                    formStatus.classList.add('active');
                    submitBtn.innerHTML = 'Sent! <i class="fa-solid fa-check-double"></i>';
                    submitBtn.style.background = 'linear-gradient(90deg, #00eeff, #00ff88)';
                    submitBtn.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.4)';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.classList.remove('active');
                        submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                        submitBtn.style.background = '';
                        submitBtn.style.boxShadow = '';
                        submitBtn.style.pointerEvents = 'all';
                        submitBtn.style.opacity = '1';
                    }, 5000);
                } else {
                    throw new Error();
                }
            } catch (error) {
                formStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Oops! Something went wrong.';
                formStatus.classList.add('active', 'error');
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                submitBtn.style.pointerEvents = 'all';
                submitBtn.style.opacity = '1';
                setTimeout(() => formStatus.classList.remove('active', 'error'), 4000);
            }
        };
    }

    /* Counter Animation Function */
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const val = Math.floor(progress * target);
            if (target >= 1000) {
                let disp = (val/1000).toFixed(1);
                if (disp.endsWith('.0')) disp = parseInt(disp);
                el.innerText = disp + 'k+';
            } else {
                el.innerText = val + '+';
            }
            if (progress < 1) requestAnimationFrame(step);
            else el.innerText = (target >= 1000 ? (target/1000) + 'k+' : target + '+');
        };
        requestAnimationFrame(step);
    }
});

/* Modal Configuration & Logic */
const projectData = {
    learning: { title: "Learning Platform", desc: "An immersive educational ecosystem designed to redefine online learning.", steps: ["Step 1: Open the Platform.", "Step 2: Sign Up Profile.", "Step 3: Access HD Videos.", "Step 4: Track Progress."], link: "https://learn.loganathan.site/" },
    healthcare: { title: "Healthcare Portal", desc: "A next-gen medical dashboard with high-security data compliance.", steps: ["Step 1: Secure Login.", "Step 2: Vitals Tracking.", "Step 3: Appointment Hub.", "Step 4: Digital Reports."], link: "https://healthcare.loganathan.site/" },
    language: { title: "Language App", desc: "Linguistic tool leveraging smart algorithms for language mastery.", steps: ["Step 1: Choose Language.", "Step 2: Daily Fluency Goals.", "Step 3: AI Practice Sessions.", "Step 4: Leaderboard Status."], link: "https://ling.loganathan.site/" },
    exampro: { title: "ExamPro DSU", desc: "ExamPro DSU is an advanced online examination platform transforming campus education digitally. Secure, automated, and analytical.", steps: ["Step 1: Open Homepage.", "Step 2: Login as Admin/Student.", "Step 3: Dashboard View.", "Step 4: MCQ Creation.", "Step 5: Attend Exam.", "Step 6: Auto Evaluation.", "Step 7: Analytics.", "Step 8: Save Time."], link: "https://dsu.loganathan.site/" },
    chatbot: { title: "Xyntra AI Chat", desc: "Intelligent AI simulating human conversation using NLP.", steps: ["Step 1: Open interface.", "Step 2: Type Message.", "Step 3: AI Response.", "Step 4: 24/7 Availability.", "Step 5: Processing."], link: "https://share.google/vKPAHlGLL3HRZXxN8" },
    weather: { title: "Weather Analysis", desc: "Real-time weather data visualization using APIs.", steps: ["Step 1: Open Dashboard.", "Step 2: Enter City.", "Step 3: Charts.", "Step 4: Forecasts."], link: "https://weather-analysis-6.onrender.com/" },
    javachat: { title: "Java Chat App", desc: "Real-time messaging with Java infrastructure.", steps: ["Step 1: Open App.", "Step 2: Register.", "Step 3: Messaging.", "Step 4: Voice Messaging."], link: "https://www.loganathan.site/" },
    faceexam: { title: "AI Proctor", desc: "Facial recognition proctoring system.", steps: ["Step 1: Launch Proctor.", "Step 2: Calibration.", "Step 3: Recognition.", "Step 4: Fraud Detection."], link: "https://www.loganathan.site/" },
    memegen: { title: "AI Meme Gen", desc: "AI-generated humorous captions for templates.", steps: ["Step 1: Open App.", "Step 2: Choose Template.", "Step 3: AI Captions.", "Step 4: Download/Share."], link: "https://www.loganathan.site/" },
    attendance: { title: "AI Attendance", desc: "Automated attendance via facial recognition.", steps: ["Step 1: Setup Kiosk.", "Step 2: Registration.", "Step 3: Checkin.", "Step 4: Reports."], link: "https://www.loganathan.site/" }
};

function openModal(projectId) {
    const modal = document.getElementById("projectModal");
    const modalBody = document.getElementById("modalBody");
    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
        <h3>${data.title}</h3>
        <div class="modal-desc">${data.desc}</div>
        <h4>How to Use (Step-by-Step Explanation)</h4>
        <ul>
            ${data.steps.map(s => `<li>${s.includes(':') ? `<strong>${s.split(':')[0]}:</strong>${s.split(':')[1]}` : s}</li>`).join('')}
        </ul>
        <a href="${data.link}" target="_blank" class="launch-btn">Launch Platform</a>
    `;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    document.querySelector(".close-modal").onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };
}

window.onclick = (e) => {
    const projectModal = document.getElementById("projectModal");
    const resumeModal = document.getElementById("resumeModal");
    
    if (e.target == projectModal) {
        projectModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    if (e.target == resumeModal) {
        resumeModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};
