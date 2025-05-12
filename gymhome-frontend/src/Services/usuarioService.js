import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/usuarios';

const usuarioService = {
  async crearUsuario(datosUsuario) {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post(`${apiUrl}/signup`, datosUsuario, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error.response?.data || error.message);
      throw error;
    }
  },

  async obtenerUsuarios() {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error.response?.data || error.message);
      throw error;
    }
  }
  
};

export default usuarioService;
