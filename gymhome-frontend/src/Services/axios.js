import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/usuarios';

const usuarioService = {
  async crearUsuario(datosUsuario) {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post(`${apiUrl}/signup`, datosUsuario, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
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
      throw error;
    }
  }
};

export default usuarioService;
