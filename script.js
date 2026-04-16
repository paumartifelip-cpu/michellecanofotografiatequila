document.addEventListener("DOMContentLoaded", () => {
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded.");
        return;
    }

    // 1. Initial configuration & Plugin Registration (Official Best Practice)
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initial Entry Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Soft fade in of the enormous background text using autoAlpha instead of opacity
    tl.fromTo(".bg-typography", 
        { autoAlpha: 0, scale: 0.95 }, 
        { autoAlpha: 1, scale: 1, duration: 2.5, stagger: 0.3 }, 
        0
    );

    // Drop in the header
    tl.fromTo(".glass-header",
        { y: -30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1 },
        0.2
    );

    // 3. ScrollTrigger for sequencing Grid elements (Best Practice)
    // Connecting a ScrollTrigger to a timeline instead of just single tweens.
    const bentoTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 85%", // Starts animating when the top of the grid hits 85% of the viewport height
            // We use standard trigger without scrub for a one-time entry animation, 
            // but we could add scrub for continuous parallax. Let's do a smooth entry:
            toggleActions: "play none none reverse" 
        }
    });

    // Stagger the Bento Box cards popping in and tilting up
    bentoTl.fromTo(".tilt-card",
        { y: 60, autoAlpha: 0, rotationX: -15, scale: 0.9 },
        { y: 0, autoAlpha: 1, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.08, ease: "back.out(1.2)" }
    );

    // 4. Continuous Ambient Animations
    
    // Abstract neon orbs slowly drifting for dynamic background
    gsap.to(".orb-1", {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-80, 80),
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".orb-2", {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-80, 80),
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
    });

    // 5. 3D Hover Effect using Context-safe / direct gsap.to
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const maxRotate = 10; // degrees
            
            gsap.to(card, {
                rotateX: -y * maxRotate * 2,
                rotateY: x * maxRotate * 2,
                scale: 1.02,
                duration: 0.6,
                ease: "power2.out",
                transformPerspective: 1000
            });
        });

        // Reset to original state smoothly upon mouse leave
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                transformPerspective: 1000
            });
        });
        
        // Remove native CSS transition so GSAP can take over cleanly
        card.style.transition = 'none';
    });

    // Refresh layout just in case images/fonts alter sizes for ScrollTrigger
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});
