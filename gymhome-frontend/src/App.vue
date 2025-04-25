<template>
  <div id="app">
    <Sidebar v-if="route.path !== '/'"/>
    <div :class="{
      'main-content': route.path !== '/',
      'login-content': route.path === '/'
    }">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { useRoute } from 'vue-router'
import axios from '@/services/axios'

const token = localStorage.getItem('authToken')
if (token) {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`
} else {
  console.log('No hay token almacenado')
}

const route = useRoute()
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow-x: hidden;
}

.main-content {
  margin-left: 220px;
  flex-grow: 1;
  background-color: #f9fafb;
  padding: 20px;
  overflow-y: auto;
}

.login-content {
  width: 100%;
}
</style>
