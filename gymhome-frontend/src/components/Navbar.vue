<template>
  <div class="nav-buttons">
    <button @click="irDashboard">Volver al Dashboard</button>
    <button @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout } from '@/utils/auth' 

const router = useRouter()

function irDashboard() {
  router.push('/dashboard')
}

function cerrarSesion() {
  logout()               
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
