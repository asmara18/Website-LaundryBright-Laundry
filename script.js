document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        void heroContent.offsetWidth;
        heroContent.querySelector('.text-3d').classList.add('visible');
        heroContent.querySelector('p').classList.add('visible');
        heroContent.querySelector('.cta-button').classList.add('visible');

        document.querySelector('.text-3d').style.opacity = '1';
        document.querySelector('.slide-up').classList.add('visible');
        document.querySelector('.cta-button').classList.add('visible');
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    const serviceCards = document.querySelectorAll('.hover-3d');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const rotateX = ((centerY - e.clientY) / centerY) * 10;
            const rotateY = ((e.clientX - centerX) / centerX) * 10;

            const shadowX = ((e.clientX - centerX) / centerX) * 15;
            const shadowY = ((e.clientY - centerY) / centerY) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0, 123, 255, 0.5)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = 'var(--card-shadow)';
        });
    });

    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (!this.classList.contains('wa-cta') && !this.classList.contains('wa-cta-small')) {
                 e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});