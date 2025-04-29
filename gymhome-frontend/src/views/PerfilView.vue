<template>
  <div class="perfil-container">
    <h1>Perfil de Usuario</h1>

    <div class="perfil-info">
      <h2>{{ usuario.nombre }}</h2>
      <p><strong>Email:</strong> {{ usuario.email }}</p>
      <p><strong>Fecha de registro:</strong> {{ new Date(usuario.fechaRegistro).toLocaleDateString() }}</p>
    </div>

    
    <div v-if="recomendaciones">
      <h3>Recomendaciones:</h3>
      <p>{{ recomendaciones }}</p>
    </div>

    
    <div v-if="progresos.length === 0">
      <p>No hay registros de progreso disponibles.</p>
    </div>

    <div v-else>
      <table class="progreso-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan</th>
            <th>Avance (%)</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="progreso in progresos" :key="progreso.id">
            <td>{{ progreso.id }}</td>
            <td>{{ progreso.plan_id }}</td>
            <td>{{ progreso.avance }}%</td>
            <td>{{ new Date(progreso.fecha).toLocaleDateString() }}</td>
            <td><button @click="verProgreso(progreso.id)">Ver Detalles</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const usuario = ref({});
const progresos = ref([]);
const recomendaciones = ref('');

// Obtener datos del usuario
const obtenerUsuario = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/usuario');
    usuario.value = response.data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};

// Obtener los progresos de usuario
const obtenerProgresos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/progresousuario');
    progresos.value = response.data;
  } catch (error) {
    console.error('Error al obtener los progresos de usuario:', error);
  }
};

// Obtener recomendaciones personalizadas de IA
const obtenerRecomendaciones = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/recomendaciones/1`);   

  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
  }
};

onMounted(() => {
  obtenerUsuario();
  obtenerProgresos();
  obtenerRecomendaciones();
});

const verProgreso = (id) => {
  // ver el progreso de un plan
};
</script>

<style scoped>
.perfil-container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 20px;
}

.perfil-info {
  margin-bottom: 30px;
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

h2 {
  color: #1f2937;
}

.progreso-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.progreso-table th, .progreso-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.progreso-table th {
  background-color: #2563eb;
  color: white;
}

.progreso-table td {
  background-color: #f9fafb;
}

button {
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
