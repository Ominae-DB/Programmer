// File: js/hero-backgrounds.js

document.addEventListener('DOMContentLoaded', function() {
    // Mappa gli ID delle sezioni hero ai percorsi delle rispettive immagini di sfondo PNG.
    // Assicurati che queste immagini esistano nelle cartelle specificate!
    const heroBackgrounds = {
        'hero-home': '../assets/img/hero_home_background.png',
        'hero-chi-sono': '../assets/img/hero_chi_sono_background.png',
        'hero-servizi': '../assets/img/hero_servizi_background.png',
        'hero-contatti': '../assets/img/hero_contatti_background.png',
    };

    // Itera su ogni ID e percorso di immagine nell'oggetto heroBackgrounds
    for (const id in heroBackgrounds) {
        // Ottiene l'elemento della sezione hero tramite il suo ID
        const heroSection = document.getElementById(id);

        // Controlla se l'elemento esiste nella pagina corrente
        if (heroSection) {
            // Applica l'immagine di sfondo, impostando anche background-size e background-position
            heroSection.style.backgroundImage = `url('${heroBackgrounds[id]}')`;
            heroSection.style.backgroundSize = 'cover'; // L'immagine copre l'intera area
            heroSection.style.backgroundPosition = 'center'; // L'immagine è centrata
            // Puoi aggiungere altre proprietà CSS se lo desideri, ad esempio per un effetto parallasse:
            // heroSection.style.backgroundAttachment = 'fixed';
            // Oppure per un colore di fallback mentre l'immagine carica o se non dovesse caricarsi:
            // heroSection.style.backgroundColor = 'var(--color-dark-gray)'; // Usa una variabile CSS definita in main.css
        }
    }
});