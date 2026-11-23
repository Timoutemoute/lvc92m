// Initialisation au chargement
document.addEventListener("DOMContentLoaded", function() {
    // La préférence de thème est facultative : le site reste fonctionnel
    // si le navigateur bloque le stockage local.
    let savedTheme = null;
    try {
        savedTheme = window.localStorage.getItem('theme');
    } catch (error) {
        // Le stockage peut être indisponible en navigation privée ou restreinte.
    }

    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }
    updateThemeControl();

    // Regrouper les liens existants en catégories déroulantes, sans modifier
    // leurs URL : les pages et les liens déjà présents restent inchangés.
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const dropdownGroups = [
            { label: 'S’informer', hrefs: ['temoignages.html', 'questionnaire.html'] },
            { label: 'Aide et ressources', hrefs: ['urgence.html', 'tchat.html'] },
            { label: 'L’association', hrefs: ['equipe.html', 'recrutement.html', 'partenaires.html'] }
        ];

        dropdownGroups.forEach(function(group) {
            const groupLinks = Array.from(navLinks.querySelectorAll(':scope > a')).filter(function(link) {
                return group.hrefs.includes(link.getAttribute('href'));
            });
            if (groupLinks.length === 0) return;

            const details = document.createElement('details');
            details.className = 'nav-dropdown';
            const summary = document.createElement('summary');
            summary.textContent = group.label;
            const menu = document.createElement('div');
            menu.className = 'nav-dropdown-menu';

            groupLinks.forEach(function(link) {
                menu.appendChild(link);
            });
            details.append(summary, menu);
            // Insérer les catégories avant le sélecteur de thème.
            const themeSwitch = navLinks.querySelector('.theme-switch');
            navLinks.insertBefore(details, themeSwitch || null);

            details.addEventListener('toggle', function() {
                if (details.open) {
                    navLinks.querySelectorAll('.nav-dropdown[open]').forEach(function(other) {
                        if (other !== details) other.open = false;
                    });
                }
            });
        });
    }

    // Menu mobile : synchroniser l'état visuel et les attributs accessibles.
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.menu-overlay');

    if (menuToggle && navLinks && overlay) {
        if (!navLinks.id) navLinks.id = 'nav-links';
        menuToggle.setAttribute('aria-controls', navLinks.id);
        menuToggle.setAttribute('aria-expanded', 'false');

        const closeMenu = function(restoreFocus) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
            if (restoreFocus) menuToggle.focus();
        };

        menuToggle.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active', isOpen);
            overlay.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });

        overlay.addEventListener('click', function() {
            closeMenu(true);
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu(false);
            });
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu(true);
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu(false);
            }
        });
    }

    // Rendre le sélecteur de thème accessible au clavier.
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
        themeSwitch.setAttribute('role', 'switch');
        themeSwitch.setAttribute('tabindex', '0');
        themeSwitch.setAttribute('aria-label', 'Thème clair');
        themeSwitch.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleTheme();
            }
        });
    }
});

function updateThemeControl() {
    const themeIcon = document.getElementById('themeIcon');
    const themeSwitch = document.querySelector('.theme-switch');
    const isLight = document.body.classList.contains('light');

    if (themeIcon) themeIcon.textContent = isLight ? '☀️' : '🌙';
    if (themeSwitch) {
        themeSwitch.setAttribute('aria-checked', String(isLight));
        themeSwitch.setAttribute('aria-label', isLight ? 'Thème clair activé' : 'Thème sombre activé');
    }
}

// Bascule du thème
function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    try {
        window.localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (error) {
        // Le changement de thème reste appliqué pour la page en cours.
    }
    updateThemeControl();
}

// Email
function openEmailClient() {
    const subject = encodeURIComponent('Contact - Les Voix Claires 92');
    const body = encodeURIComponent('Bonjour,\n\nJe souhaite vous contacter pour :\n\n');
    window.location.href = `mailto:contact@les-voix-claires-92.fr?subject=${subject}&body=${body}`;
}
