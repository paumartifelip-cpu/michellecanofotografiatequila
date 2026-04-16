// Interactive 3D Tilt Effect for Bento Cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);
    });

    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card center (-1 to +1)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Maximum rotation defined in degrees
        const maxRotateX = 8;
        const maxRotateY = 8;
        
        // Invert Y for correct tilt direction
        const rotateX = -y * maxRotateX * 2;
        const rotateY = x * maxRotateY * 2;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    function handleMouseEnter(e) {
        const card = e.currentTarget;
        card.style.transition = 'none'; // Remove transition during continuous movement instantly
        
        setTimeout(() => {
             // Let JS clear the CSS transition temporarily, so mousemove is fluid
             card.style.transition = 'transform 0.1s ease';
        }, 10);
    }
});
