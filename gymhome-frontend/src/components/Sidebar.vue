<template>
  <div>
    <!-- Botón hamburguesa visible solo en móviles -->
    <div class="hamburger" @click="toggleSidebar" v-show="isMobile">☰</div>

    <!-- Fondo oscuro cuando el sidebar está abierto -->
    <div v-if="sidebarVisible && isMobile" class="overlay" @click="closeSidebar"></div>

    <!-- Menú lateral -->
    <nav class="sidebar" :class="{ show: sidebarVisible || !isMobile }">
      <div class="logo-section">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <h2 class="titulo-proyecto">GymHome</h2>
      </div>
      <ul>
        <li><router-link to="/dashboard" @click="closeSidebar">Dashboard</router-link></li>
        <li><router-link to="/planes" @click="closeSidebar">Planes Salud</router-link></li>
        <li><router-link to="/clases" @click="closeSidebar">Clases</router-link></li>
        <li><router-link to="/perfil" @click="closeSidebar">Perfil</router-link></li>
        <li><router-link to="/pagos" @click="closeSidebar">Pagos</router-link></li>
        <li><router-link to="/reportes" @click="closeSidebar">Reportes</router-link></li>
        <li v-if="rol === 'admin'">
          <router-link to="/admin" @click="closeSidebar">Gestión Admin</router-link>
        </li>
        <li>
          <a href="#" @click.prevent="cerrarSesion">Cerrar Sesión</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/utils/auth'

const router = useRouter()
const sidebarVisible = ref(false)
const isMobile = ref(window.innerWidth <= 768)
const rol = ref('')

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const cerrarSesion = () => {
  
  localStorage.removeItem('authToken')
  localStorage.removeItem('usuario')

  // Redirige al formulario de registro 
  router.push('/signup')  
}


const closeSidebar = () => {
  if (isMobile.value) sidebarVisible.value = false
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
  background-color: #111827;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 20;
  border-radius: 8px;
}

.sidebar {
  width: 220px;
  height: 100vh;
  background-color: #111827;
  color: white;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 30;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
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

.titulo-proyecto {
  font-size: 20px;
  font-weight: bold;
}

.sidebar h2 {
  margin-bottom: 30px;
  font-size: 24px;
  color: #3b82f6;
  text-align: center;
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
  padding: 8px 0;
  transition: color 0.3s;
}

.sidebar a.router-link-active {
  font-weight: bold;
  color: #3b82f6;
}

.sidebar a:hover {
  color: #60a5fa;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>
