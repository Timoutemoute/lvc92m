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
    
    // Créer l'overlay pour le menu mobile
    createMenuOverlay();
    
    // Configurer le menu hamburger
    setupMobileMenu();
});

// Fonction pour basculer le thème
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");
    
    body.classList.toggle("light");
    
    // Sauvegarder la préférence
    if (body.classList.contains("light")) {
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.textContent = "☀️";
    } else {
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.textContent = "🌙";
    }
}

// Fonction pour ouvrir l'email (remplace le formulaire)
function openEmailClient() {
    const email = "les.voix.claires.92@gmail.com";
    const subject = "Contact - Les Voix Claires 92";
    const body = "Bonjour,\n\nJe souhaite vous contacter pour : \n\n[Veuillez détailler votre demande ici]\n\nCordialement,\n\n";
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Fonction pour le défilement fluide
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Créer l'overlay pour le menu mobile
function createMenuOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.id = 'menuOverlay';
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', closeMobileMenu);
}

// Configurer le menu hamburger
function setupMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Vérifier si le bouton existe déjà
    let menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Menu');
        menuToggle.innerHTML = '<span class="hamburger"></span>';
        
        // Insérer le bouton avant les nav-links
        nav.insertBefore(menuToggle, navLinks);
    }
    
    // Ajouter l'événement de clic
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Fermer le menu lors du clic sur un lien
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Ouvrir/fermer le menu mobile
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.getElementById('menuOverlay');
    
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    
    // Empêcher le scroll du body quand le menu est ouvert
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Fermer le menu mobile
function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.getElementById('menuOverlay');
    
    if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
    }
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
    if (overlay && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
}

// Gestion du redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Si la fenêtre est agrandie au-delà de 768px, fermer le menu
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});
