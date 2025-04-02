// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
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

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active'); // Closes menu when link is clicked
    });
});


// Close menu on click (for mobile)
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
