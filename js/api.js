
const DATA_URL = './data/initial-data.json';

// Funciones auxiliares para persistencia local
const getLocalPosts = () => JSON.parse(localStorage.getItem('cms_articles'));
const saveLocalPosts = (posts) => localStorage.setItem('cms_articles', JSON.stringify(posts));

export const ApiService = {
  // GET: Carga el perfil propio de Aldo vía fetch()
  async getProfile() {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error('Error al cargar el perfil propio');
    const data = await response.json();
    return data.profile;
  },

  // GET: Obtiene tus artículos mediante fetch() o memoria local
  async getArticles() {
    let localPosts = getLocalPosts();
    
    // Si es la primera vez que abre la página, carga tus artículos desde initial-data.json
    if (!localPosts) {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error('Error al cargar los artículos iniciales');
      const data = await response.json();
      localPosts = data.articles;
      saveLocalPosts(localPosts);
    }

    return localPosts;
  },

  // POST: Guarda un nuevo artículo creado por ti
  async createArticle(articleData) {
    const posts = getLocalPosts() || [];
    const newPost = {
      id: Date.now().toString().slice(-4),
      title: articleData.title,
      body: articleData.body
    };

    posts.unshift(newPost);
    saveLocalPosts(posts);
    return newPost;
  },

  // PUT: Actualiza uno de tus artículos
  async updateArticle(id, articleData) {
    let posts = getLocalPosts() || [];
    posts = posts.map(post => post.id.toString() === id.toString() ? { ...post, ...articleData } : post);
    saveLocalPosts(posts);
    return { id, ...articleData };
  },

  // DELETE: Elimina un artículo de la lista
  async deleteArticle(id) {
    let posts = getLocalPosts() || [];
    posts = posts.filter(post => post.id.toString() !== id.toString());
    saveLocalPosts(posts);
    return true;
  }
};