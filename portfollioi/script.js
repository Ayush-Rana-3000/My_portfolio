// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toggle mobile navigation menu
const nav = document.querySelector('nav ul');
const toggleBtn = document.createElement('div');
toggleBtn.classList.add('menu-toggle');
toggleBtn.innerHTML = '&#9776;'; // Hamburger icon
document.querySelector('nav').prepend(toggleBtn);

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when a link is clicked (on mobile)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active'); 
    });
});

// Add animation on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    observer.observe(section);
});
