document.addEventListener('DOMContentLoaded', function() {
    
  
    const menu = document.getElementById('mainMenu');
    const menuItems = menu.querySelectorAll('li');
    let isMobile = window.innerWidth <= 768;
    const menuToggle = document.getElementById('menuToggle');

    function closeAllSubmenus() {
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('active');
            submenu.previousElementSibling?.setAttribute('aria-expanded', 'false');
        });
    }

    menuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        const link = item.querySelector('a');

        if (submenu) {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');

            if (isMobile) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const isOpen = submenu.classList.contains('active');
                    closeAllSubmenus();
                    if (!isOpen) {
                        submenu.classList.add('active');
                        link.setAttribute('aria-expanded', 'true');
                    }
                });
            } else {
                item.addEventListener('mouseenter', function() {
                    closeAllSubmenus();
                    submenu.classList.add('active');
                    link.setAttribute('aria-expanded', 'true');
                });

                item.addEventListener('mouseleave', function() {
                    submenu.classList.remove('active');
                    link.setAttribute('aria-expanded', 'false');
                });
            }
        }
    });

    document.addEventListener('click', function(e) {
        if (isMobile && !e.target.closest('#mainMenu')) {
            closeAllSubmenus();
        }
    });

    function handleResize() {
        const newIsMobile = window.innerWidth <= 768;
        if (isMobile !== newIsMobile) {
            isMobile = newIsMobile;
            closeAllSubmenus();
        }
    }

    window.addEventListener('resize', debounce(handleResize, 250));

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menuToggle.classList.toggle('open');
    });

    
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const indicadores = document.querySelectorAll('.indicador');
    const totalSlides = slides.length;
    let slideInterval;

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.setAttribute('aria-hidden', i !== index);
        });
        
        indicadores.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
            ind.setAttribute('aria-current', i === index);
        });
    }

    function startSlideShow() {
        slideInterval = setInterval(() => {
            goToSlide((currentSlide + 1) % totalSlides);
        }, 5000);
    }

    function pauseSlideShow() {
        clearInterval(slideInterval);
    }

    document.querySelector('.next').addEventListener('click', () => {
        pauseSlideShow();
        goToSlide((currentSlide + 1) % totalSlides);
        startSlideShow();
    });

    document.querySelector('.prev').addEventListener('click', () => {
        pauseSlideShow();
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        startSlideShow();
    });

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            pauseSlideShow();
            goToSlide(index);
            startSlideShow();
        });
    });

    const carrossel = document.querySelector('.carrossel');
    carrossel.addEventListener('mouseenter', pauseSlideShow);
    carrossel.addEventListener('mouseleave', startSlideShow);

   
    startSlideShow();
});

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}