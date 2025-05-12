<template>
    <div class="admin-container">
      <h1>Panel de Administración</h1>
      <p>Bienvenido, administrador. Desde aquí puedes gestionar usuarios, reportes y más.</p>
  
      <
      <div class="card-grid">
        <div class="admin-card">
          <h3>Usuarios</h3>
          <p>Administrar registros de usuarios.</p>
          <button @click="irA('/usuarios')">Ir</button>
        </div>
        <div class="admin-card">
          <h3>Reportes</h3>
          <p>Ver reportes de actividad.</p>
          <button @click="irA('/reportes')">Ir</button>
        </div>
        <div class="admin-card">
          <h3>Pagos</h3>
          <p>Gestionar pagos y suscripciones.</p>
          <button @click="irA('/pagos')">Ir</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const irA = (ruta) => {
    router.push(ruta)
  }
  </script>
  
  <style scoped>
  .admin-container {
    padding: 20px;
  }
  
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .admin-card {
    flex: 1 1 250px;
    background-color: #f3f4f6;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    transition: transform 0.2s;
  }
  
  .admin-card:hover {
    transform: translateY(-3px);
  }
  
  .admin-card h3 {
    margin-bottom: 10px;
  }
  
  .admin-card button {
    margin-top: 10px;
    background-color: #3b82f6;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .admin-card button:hover {
    background-color: #2563eb;
  }
  </style>
  
