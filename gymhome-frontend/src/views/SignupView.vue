<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Crear Cuenta</h2>
      <form @submit.prevent="register">
        <input type="text" placeholder="Nombre de Usuario" v-model="nombre" required />
        <input type="email" placeholder="Correo Electrónico" v-model="email" required />
        <input type="password" placeholder="Contraseña" v-model="contrasena" required />
        <input type="password" placeholder="Confirmar Contraseña" v-model="confirmarContrasena" required />
        
        <select v-model="rol" required>
          <option disabled value="">Selecciona un rol</option>
          <option value="usuario">Usuario</option>
          <option value="entrenador">Entrenador</option>
        </select>

        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const nombre = ref('')
const email = ref('')
const contrasena = ref('')
const confirmarContrasena = ref('')
const rol = ref('')
const router = useRouter()

const register = () => {
  if (contrasena.value !== confirmarContrasena.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  const usuario = {
    nombre: nombre.value,
    email: email.value,
    contrasena: contrasena.value,
    rol: rol.value
  }

  fetch('http://localhost:3001/api/usuarios/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  })
    .then(async response => {
      console.log('🧾 Código de respuesta:', response.status)
      const data = await response.json().catch(() => ({
        mensaje: 'Error al interpretar la respuesta del servidor'
      }))
      console.log('📦 Respuesta del servidor:', data)

      if (response.ok) {
        alert(data.mensaje || 'Registro exitoso')
        router.push('/')
      } else {
        alert('⚠️ Error: ' + (data.mensaje || 'Algo salió mal.'))
      }
    })
    .catch(error => {
      console.error('🚨 Error en fetch:', error)
      alert('Error de red o del servidor. Revisa la consola.')
    })
}
</script>

<style scoped>
.signup-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}

.signup-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.signup-box h2 {
  margin-bottom: 20px;
}

.signup-box input,
.signup-box select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.signup-box button {
  width: 100%;
  padding: 10px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.signup-box button:hover {
  background: #4338ca;
}
</style>
