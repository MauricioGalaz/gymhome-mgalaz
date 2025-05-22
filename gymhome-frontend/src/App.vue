<template>
  <div id="app">
    <!-- Menú lateral visible solo si está logueado -->
    <Sidebar v-if="isAuthenticated" />

    <!-- Contenido principal -->
    <main :class="{ 'main-content': isAuthenticated }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import Sidebar from './components/Sidebar.vue'

// Estado de autenticación
const isAuthenticated = ref(false)

// Verifica el token al cargar
const checkAuth = () => {
  const token = localStorage.getItem('authToken')
  isAuthenticated.value = !!token
}

// Ejecutar al cargar el componente
onMounted(() => {
  checkAuth()

  // Observar cambios en localStorage en caso de login/logout desde otra pestaña
  window.addEventListener('storage', () => {
    checkAuth()
  })
})
</script>

<style scoped>
.main-content {
  margin-left: 220px;
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
