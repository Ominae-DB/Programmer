// File: js/animations.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Animazione Logo al Caricamento ---
    // Aggiunge una classe al logo dopo un breve ritardo per permettere
    // l'attivazione di una transizione CSS (es. fade-in, slide-in).
    const logo = document.getElementById('logo');
    if (logo) {
        setTimeout(() => {
            logo.classList.add('logo-loaded'); 
        }, 200); // Ritardo di 200ms prima di applicare la classe
    }

    // --- Animazioni di Caricamento Contenuti allo Scroll (Intersection Observer) ---
    // Attiva animazioni CSS sugli elementi con classe '.animate-on-scroll'
    // quando entrano nel viewport. È più performante rispetto all'ascolto
    // dell'evento 'scroll' per molti elementi.
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const animationObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // L'elemento è entrato nel viewport
                    entry.target.classList.add('is-visible'); // Aggiunge la classe per l'animazione CSS
                    observerInstance.unobserve(entry.target); // Opzionale: smetti di osservare dopo la prima animazione
                }
            });
        }, {
            threshold: 0.1, // Triggera quando almeno il 10% dell'elemento è visibile
            // rootMargin: "0px 0px -50px 0px" // Opzionale: modifica l'area di trigger (es. triggera 50px prima che l'elemento sia completamente visibile in basso)
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });

    } else if (animatedElements.length > 0) {
        // Fallback per browser che non supportano IntersectionObserver
        // o se non ci sono elementi da animare con questo metodo.
        // Mostra subito gli elementi senza animazione di scroll.
        animatedElements.forEach(el => {
            el.classList.add('is-visible'); 
        });
        console.warn('IntersectionObserver non supportato o nessun elemento .animate-on-scroll. Animazioni di scroll fallback attivate.');
    }

    // Nota per lo sviluppatore:
    // Le microinterazioni (es. hover su bottoni, transizioni di menu) sono gestite
    // principalmente tramite CSS per ottimizzare le performance e la semplicità del codice.
    // Questo file JS si concentra su animazioni più complesse o che richiedono logica JavaScript,
    // come quelle attivate da eventi specifici (caricamento pagina, scroll nel viewport).

    console.log('Animations JS caricato. Effetti visivi e animazioni pronti.');

    // Esempio (commentato) per l'inizializzazione di una libreria esterna come AOS.js:
    // if (typeof AOS !== 'undefined') { // Verifica se la libreria AOS è stata caricata
    //     AOS.init({
    //         duration: 700,       // Durata dell'animazione in millisecondi
    //         once: true,          // Specifica se l'animazione deve avvenire solo una volta
    //         offset: 100,         // Offset (in px) dal punto di trigger originale
    //         easing: 'ease-out-cubic', // Tipo di easing per l'animazione
    //         disable: 'mobile'    // Opzionale: disabilita AOS su dispositivi mobili
    //     });
    // }
});