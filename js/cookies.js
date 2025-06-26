// File: js/cookies.js

document.addEventListener('DOMContentLoaded', () => {
    const COOKIE_NAME = 'ominea_cookie_consent';
    const COOKIE_ACCEPTED = 'true';
    const GA_MEASUREMENT_ID = 'G-5YQ5F8NXG7'; // Inserisci qui il tuo ID di misurazione GA4

    // ===================================================================
    // MODIFICA: LOGICA PER L'INIEZIONE DI GOOGLE ANALYTICS 4
    // ===================================================================

    // Funzione per caricare dinamicamente lo script di Google Analytics 4
    function loadGoogleAnalytics() {
        // Controlla se lo script è già stato caricato per evitare duplicazioni
        if (document.getElementById('ga-script')) {
            console.log('Google Analytics script già presente.');
            return;
        }

        console.log('Consenso dato. Caricamento di Google Analytics 4 in corso...');

        // Crea il primo tag script (quello asincrono)
        const gaScript = document.createElement('script');
        gaScript.id = 'ga-script';
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);

        // Crea il secondo tag script con la configurazione
        const gaConfigScript = document.createElement('script');
        gaConfigScript.id = 'ga-config-script';
        // Inserisce lo snippet di configurazione direttamente nel tag script
        gaConfigScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Configurazione di GA4 con anonimizzazione dell'IP
            gtag('config', '${GA_MEASUREMENT_ID}', { 'anonymize_ip': true });
        `;
        document.head.appendChild(gaConfigScript);

        console.log('Google Analytics 4 caricato e configurato con IP anonimo.');
    }

    // ===================================================================
    // FINE MODIFICA
    // ===================================================================


    // Funzione per creare il banner HTML
    function createCookieBanner() {
        const bannerHTML = `
            <div id="cookieConsentBanner" style="display: none;">
                <div class="cookie-banner-content">
                    <div>
                        <h3>La tua Privacy è Importante</h3>
                        <p>Questo sito utilizza cookie tecnici per funzionare. Con il tuo consenso, potremmo usare anche cookie analitici per migliorare l'esperienza. Per saperne di più, consulta la nostra <a href="cookie-policy.html">Cookie Policy</a>.</p>
                    </div>
                    <div class="cookie-banner-actions">
                        <button id="acceptCookieBtn" class="btn btn-primary btn-small">Accetta</button>
                        <button id="declineCookieBtn" class="btn btn-outline btn-small">Rifiuta</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
    }

    // Funzione per mostrare il banner
    function showBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            banner.style.display = 'flex';
            document.getElementById('acceptCookieBtn').addEventListener('click', handleAccept);
            document.getElementById('declineCookieBtn').addEventListener('click', handleDecline);
        }
    }

    // Funzione per nascondere il banner
    function hideBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    // Gestisce il click su "Accetta"
    function handleAccept() {
        localStorage.setItem(COOKIE_NAME, COOKIE_ACCEPTED);
        hideBanner();
        // MODIFICA: Chiama la funzione per caricare GA4
        loadGoogleAnalytics();
    }

    // Gestisce il click su "Rifiuta"
    function handleDecline() {
        localStorage.setItem(COOKIE_NAME, 'false');
        hideBanner();
    }

    // Controlla lo stato del consenso al caricamento della pagina
    function checkConsent() {
        const consent = localStorage.getItem(COOKIE_NAME);
        if (consent === COOKIE_ACCEPTED) {
            // Se il consenso era già stato dato in passato, carica subito GA4
            loadGoogleAnalytics();
        } else if (!consent) {
            // Se non c'è una scelta salvata, mostra il banner
            createCookieBanner();
            showBanner();
        }
        // Se il consenso è 'false', non fa nulla.
    }

    // Esegui il controllo del consenso all'avvio
    checkConsent();
});