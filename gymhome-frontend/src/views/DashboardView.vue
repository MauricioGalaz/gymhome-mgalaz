<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <div class="logo-container">
        <img src="https://www.example.com/path-to-your-logo.jpg" alt="GymHome Logo" class="logo" />
      </div>
      <router-link to="/dashboard" class="menu-link">Dashboard</router-link>
      <router-link to="/planes" class="menu-link">Planes</router-link>
      <router-link to="/clases" class="menu-link">Clases</router-link>
      <router-link to="/perfil" class="menu-link">Perfil</router-link>
      <router-link to="/pagos" class="menu-link">Pagos</router-link>
      <router-link to="/reportes" class="menu-link">Reportes</router-link>
      <a href="#" class="menu-link" @click.prevent="cerrarSesion">Cerrar sesión</a>
    </div>

    <main class="main-content">
      <h1>Bienvenido al Dashboard</h1>
      <p>Selecciona una opción del menú para comenzar.</p>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const cerrarSesion = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('usuario')
  router.push('/') // Redirige al Login
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #374151;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
}

.logo-container {
  margin-bottom: 30px;
  text-align: center;
}

.logo {
  width: 80%;
  max-width: 150px;
}

.menu-link {
  color: white;
  text-decoration: none;
  margin-bottom: 16px;
  font-size: 16px;
  padding: 10px 0;
}

.menu-link:hover {
  color: #93c5fd;
}

.main-content {
  margin-left: 250px;
  padding: 40px;
  background-color: #f3f4f6;
  flex-grow: 1;
  text-align: center;
}
</style>
