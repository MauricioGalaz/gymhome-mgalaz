<template>
  <div class="perfil-container">
    <h1>Perfil del Usuario</h1>

    <div v-if="usuario">
      <div class="perfil-details">
        <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>Teléfono:</strong> {{ usuario.telefono }}</p>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      </div>

      <div v-if="usuario.rol === 'admin'" class="mt-4 text-green-700 font-bold">
        🛠️ Eres Administrador. Puedes gestionar usuarios, clases y más.
      </div>
      <div v-else class="mt-4 text-blue-700 font-bold">
        🙋 Rol de Usuario. Acceso limitado.
      </div>

      <button @click="editarPerfil" class="btn-editar">Editar Perfil</button>

      <!-- Formulario para editar perfil -->
      <div v-if="editando" class="perfil-edit-form">
        <h2>Editar Perfil</h2>
        <form @submit.prevent="guardarPerfil">
          <label for="nombre">Nombre</label>
          <input type="text" v-model="usuario.nombre" id="nombre" />

          <label for="email">Email</label>
          <input type="email" v-model="usuario.email" id="email" />

          <label for="telefono">Teléfono</label>
          <input type="text" v-model="usuario.telefono" id="telefono" />

          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>

    <p v-else>Cargando perfil...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const usuario = ref(null)
const editando = ref(false)
const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const obtenerPerfil = async () => {
  try {
    const response = await api.get('/usuario/perfil')
    usuario.value = response.data
    // Guarda el rol en localStorage para usarlo en otras vistas
    localStorage.setItem('usuario', JSON.stringify(response.data))
  } catch (error) {
    console.error('Error al obtener el perfil:', error)
  }
}

const editarPerfil = () => {
  editando.value = true
}

const guardarPerfil = async () => {
  try {
    await api.put('/usuario/perfil', usuario.value)
    editando.value = false
    alert('Perfil actualizado con éxito')
  } catch (error) {
    console.error('Error al guardar el perfil:', error)
  }
}

onMounted(obtenerPerfil)
</script>


<style scoped>
.perfil-container {
  padding: 20px;
}

.perfil-details {
  margin-bottom: 20px;
}

.perfil-edit-form {
  margin-top: 20px;
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
}

.perfil-edit-form form {
  display: flex;
  flex-direction: column;
}

.perfil-edit-form label {
  margin-bottom: 8px;
}

.perfil-edit-form input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.perfil-edit-form button {
  background-color: #4f46e5;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
}

.perfil-edit-form button:hover {
  background-color: #4338ca;
}

.btn-editar {
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-editar:hover {
  background-color: #1d4ed8;
}
</style>
