<template>
  <div class="dashboard-container">
    <div class="overlay"></div>
    <div class="content">
      <h1>Bienvenido al GymHome Limache</h1>
      <p>Aquí puedes gestionar tus planes, clases y más.</p>

      <div class="dashboard-actions">
        <router-link to="/planes">
          <button>Ver Planes</button>
        </router-link>
        <router-link to="/clases">
          <button>Ver Clases</button>
        </router-link>
        <router-link to="/reportes">
          <button>Ver Reportes</button>
        </router-link>
        <router-link to="/perfil">
          <button>Perfil</button>
        </router-link>
        <router-link to="/pagos">
          <button>Pagos</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.dashboard-container {
  background: linear-gradient(to right, #1e3a8a, #2563eb); 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.content {
  position: relative;
  color: white;
  text-align: center;
  max-width: 800px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.dashboard-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

button {
  background-color: #2563eb;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
