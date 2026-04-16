document.addEventListener("DOMContentLoaded", () => {
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded.");
        return;
    }

    // 1. Initial Entry Timeline (Staggered Bento Grid Reveal)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Soft fade in of the enormous background text
    tl.fromTo(".bg-typography", 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 2.5, stagger: 0.3 }, 
        0
    );

    // Drop in the header
    tl.fromTo(".glass-header",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.2
    );

    // Stagger the Bento Box cards popping in and tilting up
    tl.fromTo(".tilt-card",
        { y: 60, opacity: 0, rotationX: -15, scale: 0.9 },
        { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.08, ease: "back.out(1.2)" },
        0.4
    );

    // 2. Continuous Ambient Animations
    
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

    // 3. 3D Hover Effect using GSAP (Buttery Smooth!)
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to card center (-0.5 to +0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const maxRotate = 10; // degrees
            
            // Apply smoothly using GSAP, overriding previous tweens automatically
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
                ease: "power3.out", // Extra springy snap back
                transformPerspective: 1000
            });
        });
        
        // Remove native CSS transition so GSAP can take over cleanly
        card.style.transition = 'none';
    });
});
