<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo electrónico" required :disabled="cargando" />
        <input v-model="password" type="password" placeholder="Contraseña" required :disabled="cargando" />
        <button type="submit" :disabled="cargando">
          {{ cargando ? 'Ingresando...' : 'Entrar' }}
        </button>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
      <p class="signup-link">
        ¿No tienes cuenta? <router-link to="/signup">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axiosConfig'

const email = ref('')
const password = ref('') // Mantienes el nombre local
const cargando = ref(false)
const error = ref('')
const router = useRouter()

onMounted(() => {
  if (localStorage.getItem('authToken')) {
    router.push('/dashboard')
  }
})

const login = async () => {
  cargando.value = true
  error.value = ''
  try {
    const { data } = await api.post('/usuarios/login', {
      email: email.value,
      contrasena: password.value, // CAMBIO NECESARIO aquí
    })
    localStorage.setItem('authToken', data.token)
    localStorage.setItem('usuario', JSON.stringify(data.usuario))
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.mensaje || 'Error al iniciar sesión.'
  } finally {
    cargando.value = false
  }
}
</script>


<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.login-box h2 {
  margin-bottom: 20px;
}

.login-box input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.login-box button {
  width: 100%;
  padding: 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.login-box button:hover:enabled {
  background: #4338ca;
}

.error-msg {
  margin-top: 10px;
  color: red;
  font-size: 0.9rem;
}

.signup-link {
  margin-top: 15px;
}

.signup-link a {
  color: #4f46e5;
}
</style>
