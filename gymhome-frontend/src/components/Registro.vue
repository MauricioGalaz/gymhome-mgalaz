<template>
  <div class="registro-container">
    <header class="app-header">
      <img src="@/assets/logo.png" alt="Logo GymHome" class="logo" />
    </header>

    <div class="registro-box">
      <h2>Registro</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="nombre" type="text" placeholder="Nombre" />
        <input v-model="email" type="email" placeholder="Correo electrónico" />
        <input v-model="password" type="password" placeholder="Contraseña (mín. 8)" />
        <input v-model="confirmPassword" type="password" placeholder="Confirmar contraseña" />
        <select v-model="rol">
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const rol = ref('user') // valor predeterminado de rol

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  if (password.value.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    alert('Correo inválido')
    return
  }

  if (
    nombre.value.trim() === '' ||
    email.value.trim() === '' ||
    password.value.trim() === ''
  ) {
    alert('Todos los campos son obligatorios')
    return
  }

  try {
    const response = await axios.post('http://localhost:3001/api/usuarios/signup', {
      nombre: nombre.value,
      email: email.value,
      password: password.value,
      rol: rol.value
    })

    // Guardar el token en localStorage para usarlo en futuras solicitudes
    localStorage.setItem('token', response.data.token)
    alert('Registro exitoso')
  } catch (error) {
    alert('Error al registrarse: ' + (error.response?.data?.mensaje || error.message))
  }
}
</script>

<style scoped>
/* El mismo estilo que ya tienes */
</style>


<style scoped>
.registro-container {
  background-color: #111827;
  min-height: 100vh;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-header {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px 20px;
}

.logo {
  width: 80px;
}

.registro-box {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  margin-top: 40px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #111827;
}

form input {
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

form button {
  width: 100%;
  padding: 12px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: darkgreen;
}
</style>
