// src/utils/auth.js

// Obtiene el token del localStorage
export const getToken = () => localStorage.getItem('authToken');

// Guarda el token en el localStorage
export const setToken = token => localStorage.setItem('authToken', token);

// Elimina el token del localStorage
export const removeToken = () => localStorage.removeItem('authToken');

// Obtiene el objeto usuario desde localStorage
export const getUsuario = () => {
  try {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  } catch (e) {
    console.error('Error al parsear usuario:', e);
    return null;
  }
};

// Guarda el objeto usuario en localStorage
export const setUsuario = usuario => localStorage.setItem('usuario', JSON.stringify(usuario));

// Elimina el objeto usuario del localStorage
export const removeUsuario = () => localStorage.removeItem('usuario');

// Verifica si el usuario está autenticado
export function estaAutenticado() {
  const token = localStorage.getItem('authToken'); // Debe ser 'authToken' y no 'token'
  return !!token; // Retorna true si hay token, false si no
}

// Verifica si el usuario es administrador
export const esAdmin = () => getUsuario()?.rol === 'admin';

// Verifica si el usuario es un usuario normal
export const esUsuario = () => getUsuario()?.rol === 'user';

// Elimina token y usuario del localStorage (logout)
export const logout = () => {
  removeToken();
  removeUsuario();
};
