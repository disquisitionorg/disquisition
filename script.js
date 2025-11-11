// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ==================== SEARCH FUNCTIONALITY ====================
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const heroSearchInput = document.getElementById('heroSearchInput');
const searchResults = document.getElementById('searchResults');

// Sample search data - you'll expand this with your actual content
const searchData = [
    {
        title: "AC Motors",
        type: "topic",
        url: "topics/ac-motors.html",
        excerpt: "Understanding induction and synchronous motors, their principles and applications",
        tags: ["machines", "motors"]
    },
    {
        title: "Transformers",
        type: "topic",
        url: "topics/transformers.html",
        excerpt: "Core principles of electromagnetic induction and voltage transformation",
        tags: ["power systems", "transformers"]
    },
    {
        title: "Electric Machines",
        type: "course",
        url: "courses/electric-machines/index.html",
        excerpt: "Comprehensive study of DC machines, transformers, induction motors, and synchronous machines",
        tags: ["course", "machines"]
    },
    {
        title: "Power Electronics",
        type: "topic",
        url: "topics/power-electronics.html",
        excerpt: "Semiconductor devices for power conversion and control applications",
        tags: ["electronics", "power"]
    },
    {
        title: "Circuit Analysis",
        type: "topic",
        url: "topics/circuit-analysis.html",
        excerpt: "Fundamental techniques for analyzing electrical circuits and networks",
        tags: ["fundamentals", "circuits"]
    }
];

// Open search overlay
function openSearch() {
    searchOverlay.classList.add('active');
    searchInput.focus();
}

// Close search overlay
function closeSearch() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
}

// Search function
function performSearch(query) {
    if (!query.trim()) {
        searchResults.innerHTML = '<p style="color: var(--text-secondary); padding: var(--spacing-md);">Start typing to search...</p>';
        return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.includes(lowerQuery))
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="color: var(--text-secondary); padding: var(--spacing-md);">No results found</p>';
        return;
    }

    searchResults.innerHTML = results.map(result => `
        <a href="${result.url}" style="
            display: block;
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-sm);
            background-color: var(--bg-secondary);
            transition: var(--transition);
        " onmouseover="this.style.backgroundColor='var(--bg-primary)'" onmouseout="this.style.backgroundColor='var(--bg-secondary)'">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs);">
                <h3 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-primary);">${result.title}</h3>
                <span style="
                    padding: 2px 8px;
                    background-color: var(--accent-primary);
                    color: white;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-family: var(--font-heading);
                    text-transform: uppercase;
                ">${result.type}</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${result.excerpt}</p>
        </a>
    `).join('');
}

// Event listeners
searchToggle.addEventListener('click', openSearch);
searchClose.addEventListener('click', closeSearch);

searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});

heroSearchInput.addEventListener('focus', () => {
    openSearch();
    searchInput.value = heroSearchInput.value;
    performSearch(heroSearchInput.value);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        closeSearch();
    }
});

// Close on overlay click (not on search container)
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        closeSearch();
    }
});

// ==================== SMOOTH SCROLL ====================
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
