export const getToken = () => localStorage.getItem('token')
export const setToken = token => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

export const getUsuario = () => JSON.parse(localStorage.getItem('usuario'))
export const setUsuario = usuario => localStorage.setItem('usuario', JSON.stringify(usuario))
export const removeUsuario = () => localStorage.removeItem('usuario')

export const estaAutenticado = () => getToken() !== null
export const esAdmin = () => getUsuario()?.rol === 'admin'
export const esUsuario = () => getUsuario()?.rol === 'usuario'

export const logout = () => {
  removeToken()
  removeUsuario()
}
