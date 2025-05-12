<template>
  <div id="app">
    <Sidebar v-if="isAuthenticated" />
    <main :class="{ 'main-content': isAuthenticated }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'

const isAuthenticated = ref(false)

onMounted(() => {
  const token = localStorage.getItem('authToken')
  isAuthenticated.value = !!token
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
