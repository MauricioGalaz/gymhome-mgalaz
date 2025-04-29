<template>
    <div class="admin-container">
      <h1>Panel de Administración</h1>
      <router-link to="/gestionar-planes">Gestionar Planes</router-link><br>
      <router-link to="/gestionar-sesiones">Gestionar Sesiones</router-link><br>
      <router-link to="/gestionar-usuarios">Gestionar Usuarios</router-link><br>
      <router-link to="/reportes">Ver Reportes</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .admin-container {
    padding: 20px;
  }
  </style>
  