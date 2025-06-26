// File: js/contact-form.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatusMessagesContainer = document.getElementById('form-status-messages');
    
    // ===================================================================
    // MODIFICA: URL DELL'ENDPOINT DI GOOGLE APPS SCRIPT
    // ===================================================================
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbwE9yjJnU9HZOAiUHWxPbj0gBjMcc2IISO3ERVpCGonQsimT922JeZG1dyQkrdV8m28/exec';
    // ===================================================================

    if (contactForm) {
        // Pre-compilazione da URL (invariato)
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParamValue = urlParams.get('servizio');
        const serviceSelectElement = contactForm.querySelector('#service');
        if (serviceParamValue && serviceSelectElement) {
            if (Array.from(serviceSelectElement.options).some(option => option.value === serviceParamValue)) {
                serviceSelectElement.value = serviceParamValue;
            }
        }

        // --- Gestione Invio Form ---
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearAllFormErrors();
            let isFormValid = true;

            // Validazione Campi (invariata)
            const nameField = document.getElementById('name');
            if (!validateFieldRequired(nameField, 'Il nome e cognome sono obbligatori.')) isFormValid = false;
            
            const emailField = document.getElementById('email');
            if (!validateFieldRequired(emailField, "L'indirizzo email è obbligatorio.")) isFormValid = false;
            else if (!validateEmailFieldFormat(emailField, 'Inserisci un indirizzo email valido (es. nome@dominio.it).')) isFormValid = false;

            const messageField = document.getElementById('message');
            if (!validateFieldRequired(messageField, 'Il messaggio è obbligatorio.')) isFormValid = false;
            else if (!validateFieldMinLength(messageField, 15, 'Il messaggio deve contenere almeno 15 caratteri.')) isFormValid = false;

            const privacyCheckbox = document.getElementById('privacy');
            if (!validateCheckboxChecked(privacyCheckbox, 'Devi accettare la Privacy Policy per procedere.')) isFormValid = false;


            // ===================================================================
            // MODIFICA: INVIO FORM TRAMITE FETCH A GOOGLE SHEETS
            // ===================================================================
            if (isFormValid) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Invio in corso...';
                
                displayFormSubmissionMessage('Invio in corso...', 'info');
                
                // Crea un oggetto FormData direttamente dal form
                const formData = new FormData(contactForm);

                // Esegui la chiamata fetch all'URL di Google Apps Script
                fetch(googleScriptURL, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    // Google Apps Script di solito risponde con un redirect,
                    // quindi controlliamo se la risposta è di tipo 'cors' o se è andata a buon fine (status 200).
                    // Una risposta opaca (type: 'cors') da uno script di Google è spesso segno di successo.
                    if (response.ok || response.type === 'opaque' || response.type === 'cors') {
                        return response.json().catch(() => ({ success: true })); // Gestisce risposte non JSON
                    }
                    // Se la risposta non è ok, la trasformiamo in un errore
                    throw new Error(`Errore di rete: ${response.statusText} (codice: ${response.status})`);
                })
                .then(data => {
                     // Mostra il messaggio di successo
                    displayFormSubmissionMessage('Messaggio inviato con successo! Grazie per avermi contattato.', 'success');
                    contactForm.reset(); // Resetta i campi del form
                    if (serviceParamValue && serviceSelectElement) serviceSelectElement.value = serviceParamValue;
                })
                .catch(error => {
                    // Mostra un messaggio di errore generico in caso di fallimento
                    console.error("Errore durante l'invio del form a Google Sheets:", error);
                    displayFormSubmissionMessage(`Si è verificato un errore durante l'invio. Riprova più tardi o contattami via email. Dettaglio: ${error.message}`, 'error');
                })
                .finally(() => {
                    // Riabilita il bottone in ogni caso (successo o errore)
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });

            } else {
                displayFormSubmissionMessage('Per favore, correggi gli errori evidenziati nel modulo prima di inviare.', 'error');
                const firstInvalidField = contactForm.querySelector('.error-input, [aria-invalid="true"]');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
             // ===================================================================
            // FINE MODIFICA
            // ===================================================================
        });
    }

    // --- Funzioni Helper di Validazione e Gestione Errori (invariate) ---
    function validateFieldRequired(field, message) {
        if (!field.value || field.value.trim() === '') {
            setFieldError(field, message);
            return false;
        }
        clearFieldError(field);
        return true;
    }

    function validateEmailFieldFormat(field, message) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
            setFieldError(field, message);
            return false;
        }
        clearFieldError(field);
        return true;
    }
    
    function validateFieldMinLength(field, minLength, message) {
        if (field.value.trim().length < minLength) {
            setFieldError(field, message);
            return false;
        }
        clearFieldError(field);
        return true;
    }

    function validateCheckboxChecked(checkbox, message) {
        if (!checkbox.checked) {
            setFieldError(checkbox, message);
            return false;
        }
        clearFieldError(checkbox);
        return true;
    }

    function setFieldError(field, message) {
        field.classList.add('error-input');
        field.setAttribute('aria-invalid', 'true');
        let errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearFieldError(field) {
        field.classList.remove('error-input');
        field.removeAttribute('aria-invalid');
        let errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function clearAllFormErrors() {
        const invalidFields = contactForm.querySelectorAll('.error-input, [aria-invalid="true"]');
        invalidFields.forEach(input => clearFieldError(input));
        if(formStatusMessagesContainer) formStatusMessagesContainer.innerHTML = '';
    }
    
    function displayFormSubmissionMessage(message, type) { // type: 'success', 'error', 'info'
        if (formStatusMessagesContainer) {
            formStatusMessagesContainer.innerHTML = `<p class="status-${type}">${message}</p>`;
        }
    }
    console.log('Contact Form JS pronto per la validazione e l\'invio a Google Sheets.');
});