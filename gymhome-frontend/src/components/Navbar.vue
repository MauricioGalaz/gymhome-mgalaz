<template>
  <div class="nav-buttons">
    <button @click="irDashboard">Volver al Dashboard</button>
    <button @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout } from '@/utils/auth' // ✅ Importa la función correcta

const router = useRouter()

function irDashboard() {
  router.push('/dashboard')
}

function cerrarSesion() {
  logout()                // ✅ Borra token y usuario del localStorage
  router.push('/')        // ✅ Redirige al login
}
</script>

<style scoped>
.nav-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
