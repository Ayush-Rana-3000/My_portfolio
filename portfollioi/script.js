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

// ── Project Rendering ──────────────────────────────────────────────
// Renders projects from window.PORTFOLIO_PROJECTS (data/projects.js)
// into the featured and projects grid sections.
(function renderProjects() {
    const projects = window.PORTFOLIO_PROJECTS;
    if (!Array.isArray(projects) || projects.length === 0) return;

    // Featured project
    const featured = projects.find(p => p.status === 'featured');
    const featuredContainer = document.getElementById('featured-project-container');
    if (featured && featuredContainer) {
        featuredContainer.innerHTML = buildFeaturedCard(featured);
    } else if (featuredContainer) {
        // No featured project — hide the section
        featuredContainer.closest('.section').style.display = 'none';
    }

    // Project cards (non-featured)
    const cardsContainer = document.getElementById('projects-container');
    if (cardsContainer) {
        const cards = projects.filter(p => p.status !== 'featured');
        cardsContainer.innerHTML = cards.map(buildProjectCard).join('');
    }

    function buildFeaturedCard(project) {
        const highlights = (project.highlights || [])
            .map(h => '<li>' + escapeHtml(h) + '</li>')
            .join('');
        const tags = buildTechTags(project.technologies);
        const links = buildLinks(project, 'featured-link');
        const imageHtml = project.image
            ? '<div class="featured-image-container">' +
                '<img src="' + escapeAttr(project.image) + '" ' +
                    'alt="' + escapeAttr(project.imageAlt || project.title) + '" ' +
                    'class="featured-image" loading="lazy">' +
            '</div>'
            : '';
        const galleryHtml = buildGallery(project, 'featured');

        return '<div class="featured-card">' +
            '<div class="featured-header">' +
                '<span class="featured-badge">Featured Project</span>' +
                '<h3 class="featured-title">' + escapeHtml(project.title) + '</h3>' +
                '<p class="featured-tagline">' + escapeHtml(project.tagline) + '</p>' +
            '</div>' +
            imageHtml +
            '<div class="featured-body">' +
                '<p class="featured-description">' + escapeHtml(project.description) + '</p>' +
                (highlights ? '<ul class="featured-highlights">' + highlights + '</ul>' : '') +
                '<div class="tech-tags">' + tags + '</div>' +
                '<div class="featured-links">' + links + '</div>' +
            '</div>' +
            galleryHtml +
        '</div>';
    }

    function buildProjectCard(project) {
        const tags = buildTechTags(project.technologies);
        const links = buildLinks(project, 'project-link');
        const imageHtml = project.image
            ? '<div class="project-card-image">' +
                '<img src="' + escapeAttr(project.image) + '" ' +
                    'alt="' + escapeAttr(project.imageAlt || project.title) + '" ' +
                    'loading="lazy">' +
            '</div>'
            : '';

        return '<div class="project-card">' +
            imageHtml +
            '<h3 class="project-title">' + escapeHtml(project.title) + '</h3>' +
            '<p class="project-tagline">' + escapeHtml(project.tagline) + '</p>' +
            '<div class="tech-tags">' + tags + '</div>' +
            '<p class="project-description">' + escapeHtml(project.description) + '</p>' +
            '<div class="project-links">' + links + '</div>' +
        '</div>';
    }

    function buildGallery(project, context) {
        if (!Array.isArray(project.gallery) || project.gallery.length === 0) return '';
        var id = 'gallery-' + project.id;
        var items = project.gallery.map(function(img, i) {
            return '<button class="gallery-thumb" ' +
                'data-src="' + escapeAttr(img.src) + '" ' +
                'data-alt="' + escapeAttr(img.alt) + '" ' +
                'data-caption="' + escapeAttr(img.caption || '') + '" ' +
                'aria-label="View screenshot: ' + escapeAttr(img.caption || img.alt) + '">' +
                '<img src="' + escapeAttr(img.src) + '" alt="' + escapeAttr(img.alt) + '" loading="lazy">' +
                (img.caption ? '<span class="gallery-thumb-caption">' + escapeHtml(img.caption) + '</span>' : '') +
            '</button>';
        }).join('');
        return '<div class="gallery-strip" id="' + id + '">' +
            '<h4 class="gallery-strip-title">Screenshots</h4>' +
            '<div class="gallery-strip-items">' + items + '</div>' +
        '</div>';
    }

    function buildTechTags(technologies) {
        if (!Array.isArray(technologies)) return '';
        return technologies
            .map(t => '<span class="tech-tag">' + escapeHtml(t) + '</span>')
            .join('');
    }

    function buildLinks(project, prefix) {
        var html = '';
        if (project.githubUrl) {
            html += '<a href="' + escapeAttr(project.githubUrl) + '" ' +
                'target="_blank" rel="noopener noreferrer" ' +
                'class="' + prefix + ' ' + prefix + '--github" ' +
                'aria-label="View ' + escapeAttr(project.title) + ' source on GitHub">' +
                'GitHub</a>';
        }
        if (project.demoUrl) {
            html += '<a href="' + escapeAttr(project.demoUrl) + '" ' +
                'target="_blank" rel="noopener noreferrer" ' +
                'class="' + prefix + ' ' + prefix + '--demo" ' +
                'aria-label="View ' + escapeAttr(project.title) + ' live demo">' +
                'Live Demo</a>';
        } else if (project.githubUrl) {
            html += '<span class="project-no-demo">No live demo available</span>';
        }
        return html;
    }

    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function escapeAttr(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
})();

// ── Experience Rendering ─────────────────────────────────────────
// Renders experience entries from window.PORTFOLIO_EXPERIENCE
(function renderExperience() {
    var experiences = window.PORTFOLIO_EXPERIENCE;
    if (!Array.isArray(experiences) || experiences.length === 0) return;

    var container = document.getElementById('experience-container');
    if (!container) return;

    container.innerHTML = experiences.map(function(exp) {
        var highlights = (exp.highlights || [])
            .map(function(h) { return '<li>' + escapeExpHtml(h) + '</li>'; })
            .join('');
        var tags = (exp.technologies || [])
            .map(function(t) { return '<span class="tech-tag">' + escapeExpHtml(t) + '</span>'; })
            .join('');

        var imagesHtml = '';
        if (Array.isArray(exp.images) && exp.images.length > 0) {
            imagesHtml = '<div class="experience-images">' +
                exp.images.map(function(img) {
                    return '<figure class="experience-image-item">' +
                        '<img src="' + escapeExpAttr(img.src) + '" ' +
                            'alt="' + escapeExpAttr(img.alt) + '" loading="lazy">' +
                        (img.caption ? '<figcaption>' + escapeExpHtml(img.caption) + '</figcaption>' : '') +
                    '</figure>';
                }).join('') +
            '</div>';
        }

        return '<div class="experience-card">' +
            '<div class="experience-header">' +
                '<span class="experience-badge">' + escapeExpHtml(exp.type) + '</span>' +
                '<h3 class="experience-role">' + escapeExpHtml(exp.role) + '</h3>' +
                '<p class="experience-company">' + escapeExpHtml(exp.company) + '</p>' +
            '</div>' +
            '<p class="experience-description">' + escapeExpHtml(exp.description) + '</p>' +
            (highlights ? '<ul class="experience-highlights">' + highlights + '</ul>' : '') +
            '<div class="tech-tags">' + tags + '</div>' +
            imagesHtml +
        '</div>';
    }).join('');

    function escapeExpHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    function escapeExpAttr(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
})();

// ── Gallery Modal / Lightbox ──────────────────────────────────────
// Lightweight accessible lightbox for project and experience screenshots.
(function initGalleryModal() {
    // Create the modal overlay once
    var overlay = document.createElement('div');
    overlay.className = 'gallery-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Screenshot viewer');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="gallery-modal-content">' +
        '<button class="gallery-modal-close" aria-label="Close screenshot viewer">&times;</button>' +
        '<button class="gallery-modal-prev" aria-label="Previous screenshot">&#8249;</button>' +
        '<button class="gallery-modal-next" aria-label="Next screenshot">&#8250;</button>' +
        '<img class="gallery-modal-img" src="" alt="Screenshot preview">' +
        '<p class="gallery-modal-caption"></p>' +
    '</div>';
    document.body.appendChild(overlay);

    var modalImg = overlay.querySelector('.gallery-modal-img');
    var modalCaption = overlay.querySelector('.gallery-modal-caption');
    var closeBtn = overlay.querySelector('.gallery-modal-close');
    var prevBtn = overlay.querySelector('.gallery-modal-prev');
    var nextBtn = overlay.querySelector('.gallery-modal-next');
    var currentItems = [];
    var currentIndex = 0;

    function openModal(items, startIndex) {
        currentItems = items;
        currentIndex = startIndex;
        showCurrent();
        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Return focus to the trigger element
        if (currentItems[currentIndex] && currentItems[currentIndex].trigger) {
            currentItems[currentIndex].trigger.focus();
        }
    }

    function showCurrent() {
        var item = currentItems[currentIndex];
        if (!item) return;
        modalImg.src = item.src;
        modalImg.alt = item.alt || '';
        modalCaption.textContent = item.caption || '';
        prevBtn.style.display = currentItems.length > 1 ? '' : 'none';
        nextBtn.style.display = currentItems.length > 1 ? '' : 'none';
    }

    function navigate(direction) {
        currentIndex = (currentIndex + direction + currentItems.length) % currentItems.length;
        showCurrent();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', function() { navigate(-1); });
    nextBtn.addEventListener('click', function() { navigate(1); });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // Attach click handlers to gallery thumbnails (delegated)
    document.addEventListener('click', function(e) {
        var thumb = e.target.closest('.gallery-thumb');
        if (!thumb) return;

        var strip = thumb.closest('.gallery-strip');
        if (!strip) return;

        var thumbs = strip.querySelectorAll('.gallery-thumb');
        var items = [];
        var startIndex = 0;
        thumbs.forEach(function(t, i) {
            items.push({
                src: t.getAttribute('data-src'),
                alt: t.getAttribute('data-alt'),
                caption: t.getAttribute('data-caption'),
                trigger: t
            });
            if (t === thumb) startIndex = i;
        });

        openModal(items, startIndex);
    });
})();
