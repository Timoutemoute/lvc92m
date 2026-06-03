// Initialisation au chargement
document.addEventListener("DOMContentLoaded", function() {
    // Thème
    const isLightMode = localStorage.getItem('theme') === 'light';
    if (isLightMode) {
        document.body.classList.add("light");
        const themeIcon = document.getElementById("themeIcon");
        if (themeIcon) themeIcon.textContent = "☀️";
    }
    
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.menu-overlay');
    
    if (menuToggle && navLinks && overlay) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        overlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

// Bascule du thème
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");
    
    body.classList.toggle("light");
    
    if (body.classList.contains("light")) {
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.textContent = "☀️";
    } else {
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.textContent = "🌙";
    }
}

// Email
function openEmailClient() {
    window.location.href = "mailto:les.voix.claires.92@gmail.com?subject=Contact%20-%20Les%20Voix%20Claires%2092&body=Bonjour%2C%0A%0AJe%20souhaite%20vous%20contacter%20pour%20%3A%0A%0A";
}