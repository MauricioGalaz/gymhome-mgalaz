export const getToken = () => localStorage.getItem('authToken')

export const setToken = token => localStorage.setItem('authToken', token)

export const removeToken = () => localStorage.removeItem('authToken')

export const getUsuario = () => {
  try {
    const usuario = localStorage.getItem('usuario')
    return usuario ? JSON.parse(usuario) : null
  } catch (e) {
    console.error('Error al parsear usuario:', e)
    return null
  }
}

export const setUsuario = usuario => localStorage.setItem('usuario', JSON.stringify(usuario))

export const removeUsuario = () => localStorage.removeItem('usuario')

// Función para saber si está autenticado (token válido)
export const estaAutenticado = () => !!getToken()

// Funciones para verificar roles
export const esAdmin = () => getUsuario()?.rol === 'admin'

export const esUsuario = () => getUsuario()?.rol === 'user'

// Función para cerrar sesión limpiando storage
export const logout = () => {
  removeToken()
  removeUsuario()
}
