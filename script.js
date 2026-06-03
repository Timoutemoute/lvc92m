// Initialisation au chargement de la page
window.addEventListener("load", () => {
    window.scrollTo(0,0);
    
    // Initialiser l'icône du thème
    const isLightMode = localStorage.getItem('theme') === 'light';
    if (isLightMode) {
        document.body.classList.add("light");
        const themeIcon = document.getElementById("themeIcon");
        if (themeIcon) themeIcon.textContent = "☀️";
    }
    
    // Configurer le menu mobile
    setupMobileMenu();
});

// Fonction pour basculer le thème
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

// Fonction pour ouvrir l'email
function openEmailClient() {
    const email = "les.voix.claires.92@gmail.com";
    const subject = "Contact - Les Voix Claires 92";
    const body = "Bonjour,\n\nJe souhaite vous contacter pour : \n\n[Veuillez détailler votre demande ici]\n\nCordialement,\n\n";
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Configurer le menu hamburger
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.menu-overlay');
    
    if (!menuToggle) return;
    
    // Ouvrir/fermer le menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fermer le menu en cliquant sur un lien
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu en cliquant sur l'overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Gestion du redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const overlay = document.querySelector('.menu-overlay');
            
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }, 250);
});