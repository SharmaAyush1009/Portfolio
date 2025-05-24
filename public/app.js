// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on localStorage or system preference
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.body.classList.add('dark');
} else {
    document.body.classList.remove('dark');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        } else if (item.getAttribute('href') === '#' && current === '' || current === 'hero') {
            item.classList.add('active');
        }
    });
});

// Typewriter Effect
new Typed('#typewriter', {
    strings: ['Problem Solver', 'Full Stack Developer', 'Tech Enthusiast'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// Skills Data
const skills = {
    frontend: ['HTML5', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'Python', 'Django', 'MongoDB'],
    tools: ['Git', 'GitHub', 'VS Code', 'Postman']
};

// Render Skills
function renderSkills() {
    const frontendContainer = document.getElementById('frontend-skills');
    const backendContainer = document.getElementById('backend-skills');
    const toolsContainer = document.getElementById('tools-skills');
    
    if (frontendContainer) {
        frontendContainer.innerHTML = skills.frontend.map(skill => 
            `<div class="skill-item">${skill}</div>`
        ).join('');
    }
    
    if (backendContainer) {
        backendContainer.innerHTML = skills.backend.map(skill => 
            `<div class="skill-item">${skill}</div>`
        ).join('');
    }
    
    if (toolsContainer) {
        toolsContainer.innerHTML = skills.tools.map(skill => 
            `<div class="skill-item">${skill}</div>`
        ).join('');
    }
}

// Experience Data
const experiences = [
    {
        title: "Project Intern under Prof. Rahul CS",
        company: "IIT Goa",
        date: "May 2025 - Present",
        description: "Design and implementation of the database architecture using MongoDB, crafting efficient data models and schemas. Working on backend features."
    },
    {
        title: "Goa Police Hackathon",
        company: "BITS Goa",
        date: "Oct 2024",
        description: "Build fraud detection system, worked on backend and database management part. Got selected among 32 teams out of 100+. Continuously improving it by adding more features."
    },
    {
        title: "Problem Solving",
        company: "Competitive Platforms",
        date: "Aug 2024 - Present",
        description: "Leetcode Rating: 1650+"
    }
];

// Render Experiences
function renderExperiences() {
    const timelineContainer = document.getElementById('experience-timeline');
    
    if (timelineContainer) {
        timelineContainer.innerHTML = experiences.map(exp => `
            <div class="timeline-item" data-aos="fade-up">
                <div class="timeline-date">${exp.date}</div>
                <h3 class="timeline-title">${exp.title}</h3>
                <div class="timeline-company">${exp.company}</div>
                <p>${exp.description}</p>
            </div>
        `).join('');
    }
}

// Projects Data
const projects = [
    {
        title: "Management System Software",
        description: "Full-stack alumni management system with React & Node.js. Features include role-based authentication, profile verification, placement statistics tracking, and admin-controlled data updates.",
        tech: ["React", "Node.js", "Tailwind CSS", "MongoDB", "JWT", "REST API"],
        links: {
            github: "https://github.com/SharmaAyush1009/ManagementSystem",
            demo: "https://management-system-indol.vercel.app/login"
        }
    },
    {
        title: "Fraud Website Detector",
        description: "AI-powered website fraud detection system. Features include SSL validation, domain analysis, content scanning, contact verification, and real-time risk assessment powered by Gemini AI.",
        tech: ["Python", "Flask", "Google Gemini AI", "BeautifulSoup", "HTML/CSS/JS", "MongoDB"],
        links: {
            github: "https://github.com/SharmaAyush1009/FraudWebsiteDetect",
            demo: "https://fraudwebsitedetect.onrender.com/"
        }
    },
    {
        title: "Secure Interview System(in Progress)",
        description: "Designed a secure, cross-platform desktop application to conduct coding interviews with built-in anti-cheating mechanisms.  \"NOTE\" : Currently live not available ",
        tech: ["Node.js", "Electron", "OS API"],
        links: {
            github: "#",
            demo: "#"
        }
    }
];

// Render Projects
function renderProjects() {
    const container = document.getElementById('projects-container');
    
    if (container) {
        container.innerHTML = projects.map(project => `
            <div class="project-card" data-aos="fade-up">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.links.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
            </div>
        `).join('');
    }
}

// Contact Form
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        fetch('https://portfolio-5k16.onrender.com/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        })
        .then(response => {
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = 'Message sent successfully!';
                contactForm.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.innerHTML = '';
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            formStatus.className = 'form-status error';
            formStatus.innerHTML = 'Something went wrong. Please try again later.';

            // Clear error message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.innerHTML = '';
            }, 5000);
        });
    });
}

// Update footer year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Add method to easily add new skills, experiences, or projects
function addSkill(category, skillName) {
    if (skills[category]) {
        skills[category].push(skillName);
        renderSkills();
    }
}

function addExperience(experience) {
    experiences.unshift(experience); // Add to beginning of array
    renderExperiences();
}

function addProject(project) {
    projects.unshift(project); // Add to beginning of array
    renderProjects();
}

// Initialize elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderExperiences();
    renderProjects();
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});