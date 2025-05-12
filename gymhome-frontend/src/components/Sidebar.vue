<template>
  <div>
    <!-- Botón hamburguesa móvil -->
    <div v-if="isMobile" class="hamburger" @click="toggleSidebar">☰</div>

    <!-- Fondo oscuro -->
    <div v-if="sidebarVisible && isMobile" class="overlay" @click="closeSidebar"></div>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ show: sidebarVisible || !isMobile }">
      <div class="logo-section">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <h2>GymHome</h2>
      </div>
      <ul>
        <li><router-link to="/dashboard" @click="closeSidebar">Dashboard</router-link></li>
        <li><router-link to="/planes" @click="closeSidebar">Planes</router-link></li>
        <li><router-link to="/clases" @click="closeSidebar">Clases</router-link></li>
        <li><router-link to="/perfil" @click="closeSidebar">Perfil</router-link></li>
        <li><router-link to="/pagos" @click="closeSidebar">Pagos</router-link></li>
        <li><router-link to="/reportes" @click="closeSidebar">Reportes</router-link></li>
        <li v-if="rol === 'admin'"><router-link to="/admin" @click="closeSidebar">Admin</router-link></li>
        <li><a href="#" @click.prevent="cerrarSesion">Cerrar Sesión</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarVisible = ref(false)
const isMobile = ref(window.innerWidth <= 768)
const rol = ref('')

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const closeSidebar = () => {
  if (isMobile.value) sidebarVisible.value = false
}

const cerrarSesion = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('usuario')
  router.push('/login') // Redirige a la página de login
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) sidebarVisible.value = true
}

const obtenerRol = () => {
  const datos = JSON.parse(localStorage.getItem('usuario'))
  rol.value = datos?.rol || ''
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
  obtenerRol()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.hamburger {
  font-size: 28px;
  background: #111827;
  color: white;
  padding: 10px;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
  border-radius: 8px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
}

.sidebar {
  width: 220px;
  height: 100vh;
  background: #111827;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 60;
}

.sidebar.show {
  transform: translateX(0);
}

.logo-section {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.sidebar h2 {
  font-size: 24px;
  color: #3b82f6;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 18px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  transition: 0.3s;
}

.sidebar a:hover,
.sidebar a.router-link-active {
  color: #60a5fa;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 100%;
    transform: translateX(-100%);
  }

  .sidebar.show {
    transform: translateX(0);
  }
}
</style>
