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
          <option value="admin">Entrenador-Admin</option>
          <option value="user">Usuario</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      <!-- Mensaje de error o éxito -->
      <p v-if="mensaje" :class="mensajeClase">{{ mensaje }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const nombre = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const rol = ref('user'); // valor predeterminado de rol
const mensaje = ref('');
const mensajeClase = ref('');

const router = useRouter(); // Usamos Vue Router para redirigir después del registro

const handleRegister = async () => {
  // Validaciones
  if (password.value !== confirmPassword.value) {
    mensaje.value = 'Las contraseñas no coinciden';
    mensajeClase.value = 'error';
    return;
  }

  if (password.value.length < 8) {
    mensaje.value = 'La contraseña debe tener al menos 8 caracteres';
    mensajeClase.value = 'error';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    mensaje.value = 'Correo inválido';
    mensajeClase.value = 'error';
    return;
  }

  if (nombre.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
    mensaje.value = 'Todos los campos son obligatorios';
    mensajeClase.value = 'error';
    return;
  }

  // Enviar datos al backend
  try {
    const response = await axios.post('http://localhost:3001/api/usuarios/signup', {
      nombre: nombre.value,
      email: email.value,
      password: password.value,
      rol: rol.value,
    });

    // Guardar el token en localStorage
    localStorage.setItem('token', response.data.token);

    // Mostrar mensaje de éxito
    mensaje.value = 'Registro exitoso';
    mensajeClase.value = 'success';

    // Redirigir al usuario a una página protegida (como el dashboard)
    router.push('/dashboard');
  } catch (error) {
    mensaje.value = 'Error al registrarse: ' + (error.response?.data?.mensaje || error.message);
    mensajeClase.value = 'error';
  }
};
</script>

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

/* Estilo para el mensaje de éxito y error */
p.success {
  color: green;
  font-weight: bold;
}

p.error {
  color: red;
  font-weight: bold;
}
</style>
