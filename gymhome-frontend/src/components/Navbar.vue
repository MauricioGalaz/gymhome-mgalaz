<template>
  <div class="nav-buttons">
    <button @click="irDashboard">Volver al Dashboard</button>
    <button @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function irDashboard() {
  router.push('/dashboard')
}

function cerrarSesion() {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<style scoped>
.nav-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
