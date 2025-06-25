document.addEventListener('DOMContentLoaded', () => {
//Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu    = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

//Sidebar
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar       = document.getElementById('sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', e => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });

    //Fecha quando clicamos fora
    document.addEventListener('click', e => {
      if (!sidebar.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });

    //Fecha quando clicamos num 'a'
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('active');
      });
    });
  }

  //Modal de login
  const loginLink  = document.getElementById('loginLink');
  const loginModal = document.getElementById('loginModal');
  const closeBtn   = loginModal?.querySelector('.close');
  const loginForm  = document.getElementById('loginForm');

  if (loginLink && loginModal && closeBtn && loginForm) {
    loginLink.addEventListener('click', e => {
      e.preventDefault();
      loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });

    window.addEventListener('click', e => {
      if (e.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });

    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username && password) {
        alert(`Bem-vindo, ${username}!`);
        loginModal.style.display = 'none';
        loginForm.reset();
      } else {
        alert('Por favor, preenche todos os campos!');
      }
    });
  }

  //IMC
  const calculateBtn = document.getElementById('calculateBtn');
  const resultDiv    = document.getElementById('result');

  if (calculateBtn && resultDiv) {
    calculateBtn.addEventListener('click', () => {
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);

      if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = '<p class="error">Por favor, coloca valores válidos!</p>';
        return;
      }

      const imc = weight / (height * height);
      let classification = '';

      if      (imc < 18.5) classification = 'Abaixo do peso';
      else if (imc < 25)   classification = 'Peso normal';
      else if (imc < 30)   classification = 'Sobrepeso';
      else if (imc < 35)   classification = 'Obesidade Grau I';
      else if (imc < 40)   classification = 'Obesidade Grau II';
      else                  classification = 'Obesidade Grau III';

      resultDiv.innerHTML = `
        <p>IMC: <strong>${imc.toFixed(2)}</strong></p>
        <p>Classificação: <strong>${classification}</strong></p>
        <p>${getIMCAdvice(classification)}</p>
      `;
    });
  }

  function getIMCAdvice(classification) {
    switch (classification) {
      case 'Abaixo do peso':
        return 'Recomendamos uma dieta rica em nutrientes e exercícios de força.';
      case 'Peso normal':
        return 'Parabéns! Mantém os teus hábitos saudáveis.';
      case 'Sobrepeso':
        return 'Recomendamos exercícios aeróbicos e uma dieta equilibrada.';
      default:
        return 'Consulta um nutricionista e um personal trainer para uma orientação especializada.';
    }
  }

  //Contacto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name && email && message) {
        alert(`Obrigado ${name}! A tua mensagem foi enviada com sucesso.`);
        contactForm.reset();
      } else {
        alert('Por favor, preenche todos os campos!');
      }
    });
  }
});
