// 1. Manejo de Tema Oscuro / Claro
const themeBtn = document.getElementById('theme-btn');
const savedTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', savedTheme);
if (themeBtn) {
  themeBtn.textContent = savedTheme === 'dark' ? '☀️ LIGHT' : '🌙 DARK';

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '☀️ LIGHT' : '🌙 DARK';
  });
}

// 2. Menú Móvil Hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-open');
  });

  // Cierra el menú al hacer clic en un enlace
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-open');
    });
  });
}

// 3. Copiar Código al Portapapeles
const copyBtn = document.getElementById('copy-btn');
const codeSnippet = document.getElementById('code-snippet');

if (copyBtn && codeSnippet) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(codeSnippet.innerText).then(() => {
      copyBtn.textContent = '¡Copiado!';
      copyBtn.style.color = 'var(--accent-lime)';
      setTimeout(() => {
        copyBtn.textContent = 'Copiar Código';
        copyBtn.style.color = '';
      }, 2000);
    });
  });
}

// 4. UX Playground Interactivo en Vivo
const demoBtn = document.getElementById('demo-btn');
const toggleTargetBtn = document.getElementById('toggle-target-btn');
const codeSize = document.getElementById('code-size');
const codeSizeBlock = document.getElementById('code-size-block');
const targetStatus = document.getElementById('target-status');

let isAccessible = true;

if (toggleTargetBtn && demoBtn) {
  toggleTargetBtn.addEventListener('click', () => {
    isAccessible = !isAccessible;

    if (isAccessible) {
      // Modo Acceso Fácil (44px)
      demoBtn.style.minInlineSize = '44px';
      demoBtn.style.minBlockSize = '44px';
      demoBtn.style.padding = '0.75rem 1.25rem';
      demoBtn.textContent = 'Target Accesible (44px) →';
      demoBtn.style.backgroundColor = 'var(--accent-lime)';
      demoBtn.style.color = '#090d16';
      
      if (codeSize) codeSize.textContent = '44px';
      if (codeSizeBlock) codeSizeBlock.textContent = '44px';
      if (targetStatus) {
        targetStatus.textContent = 'ESTADO: ÉXITO (LEY DE FITTS)';
        targetStatus.style.color = 'var(--accent-lime)';
      }
    } else {
      // Modo Dificultoso (20px)
      demoBtn.style.minInlineSize = '20px';
      demoBtn.style.minBlockSize = '20px';
      demoBtn.style.padding = '2px 6px';
      demoBtn.textContent = '20px Error';
      demoBtn.style.backgroundColor = '#ef4444';
      demoBtn.style.color = '#ffffff';

      if (codeSize) codeSize.textContent = '20px';
      if (codeSizeBlock) codeSizeBlock.textContent = '20px';
      if (targetStatus) {
        targetStatus.textContent = 'ESTADO: ERROR DE USABILIDAD (DEMASIADO PEQUEÑO)';
        targetStatus.style.color = '#ef4444';
      }
    }
  });

  demoBtn.addEventListener('click', () => {
    demoBtn.style.transform = 'scale(0.92)';
    setTimeout(() => { demoBtn.style.transform = 'scale(1)'; }, 150);
  });
}