export const UIRenderer = {
  renderProfile(profile) {
    const nameEl = document.getElementById('dev-name');
    const bioEl = document.getElementById('dev-bio');
    if (nameEl) nameEl.textContent = `${profile.name} | Portafolio Frontend`;
    if (bioEl) {
      bioEl.textContent = `Desarrollador Frontend en ${profile.company.name}. Especializado en arquitectura web modular y consumo de APIs REST. Contacto: ${profile.email}`;
    }
  },

  renderArticles(articles, isAdmin = false) {
    const container = document.getElementById('articles-container');
    if (!container) return;

    container.innerHTML = articles.map(post => `
      <article class="article-card" id="article-${post.id}" style="border: 1px solid rgba(255,255,255,0.1); padding: 1.2rem; margin-bottom: 1rem; border-radius: 8px; background: rgba(255,255,255,0.03); display: flex; flex-direction: column; gap: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h3 style="color: #646cff; margin:0;" id="title-${post.id}">${post.title}</h3>
          <span style="font-size: 0.75rem; background: rgba(100,108,255,0.2); padding: 0.2rem 0.5rem; border-radius: 4px;">ID: ${post.id}</span>
        </div>
        <p style="opacity: 0.9; font-size: 0.95rem; margin:0;" id="body-${post.id}">${post.body}</p>
        
        ${isAdmin ? `
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <button class="btn-secondary btn-edit" data-id="${post.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; min-height: auto;">✏️ Editar</button>
          <button class="btn-secondary btn-delete" data-id="${post.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; min-height: auto; color: #f87171; border-color: rgba(248,113,113,0.3);">🗑️ Eliminar</button>
        </div>
        ` : ''}
      </article>
    `).join('');
  },

  addArticleToDOM(post) {
    const container = document.getElementById('articles-container');
    if (!container) return;
    const articleHTML = `
      <article class="article-card" id="article-${post.id}" style="border: 1px solid #10b981; padding: 1.2rem; margin-bottom: 1rem; border-radius: 8px; background: rgba(16,185,129,0.05); display: flex; flex-direction: column; gap: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h3 style="color: #34d399; margin:0;" id="title-${post.id}">${post.title}</h3>
          <span style="font-size: 0.75rem; background: rgba(16,185,129,0.2); color: #34d399; padding: 0.2rem 0.5rem; border-radius: 4px;">¡Nuevo! ID: ${post.id}</span>
        </div>
        <p style="opacity: 0.9; font-size: 0.95rem; margin:0;" id="body-${post.id}">${post.body}</p>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <button class="btn-secondary btn-edit" data-id="${post.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; min-height: auto;">✏️ Editar</button>
          <button class="btn-secondary btn-delete" data-id="${post.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; min-height: auto; color: #f87171; border-color: rgba(248,113,113,0.3);">🗑️ Eliminar</button>
        </div>
      </article>
    `;
    container.insertAdjacentHTML('afterbegin', articleHTML);
  },

  removeArticleFromDOM(id) {
    const el = document.getElementById(`article-${id}`);
    if (el) el.remove();
  },

  updateArticleInDOM(id, updatedPost) {
    const titleEl = document.getElementById(`title-${id}`);
    const bodyEl = document.getElementById(`body-${id}`);
    if (titleEl) titleEl.textContent = updatedPost.title;
    if (bodyEl) bodyEl.textContent = updatedPost.body;
  }
};