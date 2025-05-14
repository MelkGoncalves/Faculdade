document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('mainMenu');
  const menuItems = menu.querySelectorAll('li');
  const isMobile = window.innerWidth <= 768;

  function closeAllSubmenus() {
    document.querySelectorAll('.submenu').forEach(submenu => {
      submenu.classList.remove('active');
    });
  }

  menuItems.forEach(item => {
    const submenu = item.querySelector('.submenu');
    const link = item.querySelector('a');

    if (submenu) {
      if (isMobile) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const isOpen = submenu.classList.contains('active');
          closeAllSubmenus();
          if (!isOpen) {
            submenu.classList.add('active');
          }
        });
      } else {
        item.addEventListener('mouseenter', function () {
          closeAllSubmenus();
          submenu.classList.add('active');
        });

        item.addEventListener('mouseleave', function () {
          submenu.classList.remove('active');
        });
      }
    }
  });

  document.addEventListener('click', function (e) {
    if (isMobile && !e.target.closest('#mainMenu')) {
      closeAllSubmenus();
    }
  });

  window.addEventListener('resize', function () {
    const newIsMobile = window.innerWidth <= 768;
    if (isMobile !== newIsMobile) {
      window.location.reload();
    }
  });

  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');

  menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('hidden');
  });
});
