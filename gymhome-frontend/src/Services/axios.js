import axios from 'axios'

// Recupera el token desde localStorage
const token = localStorage.getItem('authToken')

// Crea una instancia de Axios con el token
const instance = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default instance
