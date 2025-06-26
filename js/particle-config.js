// File: js/particle-config.js (Versione con effetto più leggero)

tsParticles.load("tsparticles", {
    fullScreen: {
        enable: false,
        zIndex: 0
    },
    particles: {
        number: {
            value: 50, // MODIFICATO: Ridotto da 60
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 120, // MODIFICATO: Ridotto da 150
            color: "#ffffff",
            opacity: 0.2, // MODIFICATO: Ridotto da 0.2
            width: 1
        },
        move: {
            enable: true,
            speed: 1.3, // MODIFICATO: Ridotto da 2
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 80 // MODIFICATO: Ridotto da 100
            },
            push: {
                particles_nb: 5
            }
        }
    },
    retina_detect: true,
    background: {
        color: "transparent"
    }
});