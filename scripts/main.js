// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add safe area insets for sticky header
    const header = document.querySelector('.navbar');
    if (header && CSS.supports('padding-top', 'env(safe-area-inset-top)')) {
        header.style.paddingTop = 'env(safe-area-inset-top)';
    }

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach((img) => {
            lazyImageObserver.observe(img);
        });
    }
});