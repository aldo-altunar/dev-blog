import { ApiService } from './api.js';
import { UIRenderer } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('login-form');
  const isAdminPage = !!loginForm;

  // 1. Cargar datos en la vista pública (index.html)
  if (!isAdminPage) {
    try {
      if (document.getElementById('dev-name')) {
        const profile = await ApiService.getProfile();
        UIRenderer.renderProfile(profile);
      }
      const articles = await ApiService.getArticles();
      UIRenderer.renderArticles(articles, false);
    } catch (error) {
      console.error("Error al cargar la API:", error);
    }
    return;
  }

  // 2. Control de Acceso y Seguridad para admin.html
  const loginCard = document.getElementById('login-card');
  const adminPanel = document.getElementById('admin-panel');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  const checkAuth = () => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  };

  const showAdminPanel = async () => {
    loginCard.style.display = 'none';
    adminPanel.style.display = 'block';

    try {
      const articles = await ApiService.getArticles();
      UIRenderer.renderArticles(articles, true);
    } catch (error) {
      console.error("Error al cargar artículos en admin:", error);
    }
  };

  if (checkAuth()) {
    showAdminPanel();
  }

  // Evento de Login (Contraseña: admin123)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passInput = document.getElementById('admin-pass').value;

    if (passInput === 'admin123') {
      sessionStorage.setItem('admin_authenticated', 'true');
      loginError.style.display = 'none';
      showAdminPanel();
    } else {
      loginError.style.display = 'block';
    }
  });

  // Evento de Cerrar Sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('admin_authenticated');
      window.location.reload();
    });
  }

  // 3. Manejo del Formulario CRUD en admin.html
  const form = document.getElementById('article-form');
  const editIdInput = document.getElementById('edit-id');
  const submitBtn = document.getElementById('form-submit-btn');
  const cancelBtn = document.getElementById('cancel-edit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('article-title').value;
      const body = document.getElementById('article-body').value;
      const editId = editIdInput.value;

      if (editId) {
        const updated = await ApiService.updateArticle(editId, { title, body, userId: 1 });
        UIRenderer.updateArticleInDOM(editId, updated);
        alert(`✅ Artículo #${editId} actualizado vía API (PUT)`);
        resetForm();
      } else {
        const created = await ApiService.createArticle({ title, body, userId: 1 });
        UIRenderer.addArticleToDOM(created);
        alert(`✅ Artículo creado vía API (POST) con ID: ${created.id}`);
        form.reset();
      }
    });

    const container = document.getElementById('articles-container');
    if (container) {
      container.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-delete')) {
          const id = e.target.getAttribute('data-id');
          if (confirm(`¿Eliminar artículo #${id}?`)) {
            await ApiService.deleteArticle(id);
            UIRenderer.removeArticleFromDOM(id);
            alert(`🗑️ Artículo #${id} eliminado vía API (DELETE)`);
          }
        }

        if (e.target.classList.contains('btn-edit')) {
          const id = e.target.getAttribute('data-id');
          const currentTitle = document.getElementById(`title-${id}`)?.textContent || '';
          const currentBody = document.getElementById(`body-${id}`)?.textContent || '';

          editIdInput.value = id;
          document.getElementById('article-title').value = currentTitle;
          document.getElementById('article-body').value = currentBody;
          submitBtn.textContent = '💾 Guardar Cambios (PUT)';
          cancelBtn.style.display = 'inline-block';
          form.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', resetForm);
    }

    function resetForm() {
      editIdInput.value = '';
      form.reset();
      submitBtn.textContent = '➕ Guardar Artículo (POST)';
      cancelBtn.style.display = 'none';
    }
  }
});