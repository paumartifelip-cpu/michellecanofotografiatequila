// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Unobserve to animate only once
            }
        });
    }, observerOptions);

    // Select all elements with the slide-up class
    const elementsToAnimate = document.querySelectorAll('.slide-up');
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});
