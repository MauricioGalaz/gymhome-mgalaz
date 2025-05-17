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

export const estaAutenticado = () => !!getToken()

export const esAdmin = () => getUsuario()?.rol === 'admin'
export const esUsuario = () => getUsuario()?.rol === 'user'

export const logout = () => {
  removeToken()
  removeUsuario()
}
