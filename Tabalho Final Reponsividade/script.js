document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('mainMenu');
    const menuItems = menu.querySelectorAll('li');
    const isMobile = window.innerWidth <= 768;
  
    // Função para fechar todos os submenus
    function closeAllSubmenus() {
      document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('active');
      });
    }
  
    // Configurar eventos para cada item do menu
    menuItems.forEach(item => {
      const submenu = item.querySelector('.submenu');
      const link = item.querySelector('a');
      
      if (submenu) {
        if (isMobile) {
          // Comportamento para mobile (toggle no click)
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = submenu.classList.contains('active');
            closeAllSubmenus();
            if (!isOpen) {
              submenu.classList.add('active');
            }
          });
        } else {
          // Comportamento para desktop (mouseover/mouseout)
          item.addEventListener('mouseenter', function() {
            closeAllSubmenus();
            submenu.classList.add('active');
          });
          
          item.addEventListener('mouseleave', function() {
            submenu.classList.remove('active');
          });
        }
      }
    });
  
    // Fechar menus ao clicar fora
    document.addEventListener('click', function(e) {
      if (isMobile && !e.target.closest('#mainMenu')) {
        closeAllSubmenus();
      }
    });
  
    // Atualizar comportamento quando a janela for redimensionada
    window.addEventListener('resize', function() {
      const newIsMobile = window.innerWidth <= 768;
      if (isMobile !== newIsMobile) {
        window.location.reload(); // Recarrega para aplicar os novos eventos
      }
    });
  });