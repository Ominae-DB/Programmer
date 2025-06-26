// File: js/global.js

document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav ul');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const currentYearSpan = document.getElementById('currentYear');
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    // --- Gestione Header allo Scroll ---
    // Aggiunge una classe all'header quando l'utente scorre la pagina,
    // permettendo stili differenziati (es. sfondo più solido, ombra).
    if (header) {
        const scrollThreshold = 50; // Distanza di scroll (in px) prima di aggiungere la classe
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Gestione Menu Mobile ---
    // Attiva/disattiva la visibilità del menu di navigazione su schermi piccoli
    // e aggiorna l'attributo aria-expanded per l'accessibilità.
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());
        });

        // Opzionale: Chiudi il menu mobile quando si clicca su un link al suo interno
        // (utile per Single Page Application o se i link portano a sezioni della stessa pagina)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- Pulsante "Scroll to Top" ---
    // Mostra/nasconde il pulsante per tornare all'inizio della pagina
    // e gestisce l'azione di scroll.
    if (scrollToTopBtn) {
        const visibilityThreshold = 300; // Mostra dopo 300px di scroll

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > visibilityThreshold) {
                scrollToTopBtn.classList.add('visible'); // Usa la classe per animazione CSS
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Animazione di scroll fluida
            });
        });
    }

    // --- Aggiornamento Anno Corrente nel Footer ---
    // Inserisce dinamicamente l'anno corrente nel footer per il copyright.
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling per Ancore Interne ---
    // Implementa uno scroll animato verso le sezioni della pagina
    // linkate tramite ancore (es. href="#sezione").
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hrefAttribute = this.getAttribute('href');
            
            // Verifica che sia un'ancora interna valida sulla pagina corrente
            if (hrefAttribute.startsWith('#') && hrefAttribute.length > 1) {
                let targetElement = null;
                try {
                    targetElement = document.querySelector(hrefAttribute);
                } catch (error) {
                    console.warn(`Elemento target non trovato per l'ancora "${hrefAttribute}": ${error.message}`);
                    return; // Selettore non valido o elemento non esistente
                }

                if (targetElement) {
                    e.preventDefault(); 
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    // Calcola la posizione dell'elemento target tenendo conto dell'altezza dell'header fisso
                    // e di un piccolo offset aggiuntivo per migliore spaziatura visiva.
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20; // 20px di offset aggiuntivo

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Se il menu mobile è aperto, chiudilo dopo il click sull'ancora
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            }
            // Se il link non è una semplice ancora interna (es. link a un'altra pagina con hash),
            // il comportamento di default del browser non viene interrotto.
        });
    });

    console.log('Global JS caricato e inizializzato. Pronto per interagire con la pagina.');
});