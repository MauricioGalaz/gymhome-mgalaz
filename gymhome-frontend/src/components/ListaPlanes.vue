<template>
    <div class="planes-container">
      <h1>Planes Disponibles</h1>
  
      <button @click="crearNuevoPlan" class="nuevo-btn">Crear Nuevo Plan</button>
  
      <div v-if="isLoading" class="loading">Cargando planes...</div>
  
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  
      <table v-if="planes.length > 0" class="planes-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>descripcion</th>
            <th>Dificultad</th>
            <th>Precio</th>
            <th>Duración (días)</th>        
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in planes" :key="planes.id_planes"></tr>
            <td>{{ plan.nombre }}</td>
            <td>{{ plan.descripcion }}</td>
            <td>{{ plan.dificultad }}</td>
            <td>${{ plan.precio }}</td>
            <td>{{ plan.duracion }}</td>
            <td>
              <button @click="editarPlan(plan.id_planes)" class="editar-btn">Editar</button>
              <button @click="eliminarPlan(plan.id_planes)" class="eliminar-btn">Eliminar</button>
            </td>
          
        </tbody>
      </table>
  
      <div v-else class="no-planes">No hay planes disponibles.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const planes = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref('');
  
  const router = useRouter();
  
  const obtenerPlanes = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get('http://localhost:3001/api/planes');
      planes.value = response.data;
    } catch (error) {
      console.error('Error al obtener planes:', error);
      errorMessage.value = 'No se pudieron cargar los planes. Intenta más tarde.';
    } finally {
      isLoading.value = false;
    }
  };
  
  const crearNuevoPlan = () => {
    router.push('/planes/crear');
  };
  
  const editarPlan = (id_planes) => {
    router.push(`/planes/editar/${id_planes}`);
  };
  
  const eliminarPlan = async (id_planes) => {
    if (confirm('¿Estás seguro de que deseas eliminar este plan?')) {
      try {
        await axios.delete(`http://localhost:3001/api/planes/${id_planes}`);
        alert('Plan eliminado correctamente.');
        obtenerPlanes();
      } catch (error) {
        console.error('Error al eliminar plan:', error);
        errorMessage.value = 'No se pudo eliminar el plan. Intenta nuevamente.';
      }
    }
  };
  
  onMounted(() => {
    obtenerPlanes();
  });
  </script>
  
  <style scoped>
  .planes-container {
    padding: 20px;
    max-width: 1000px;
    margin: auto;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .nuevo-btn {
    background-color: #22c55e;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    margin-bottom: 20px;
    cursor: pointer;
  }
  
  .nuevo-btn:hover {
    background-color: #16a34a;
  }
  
  .loading,
  .no-planes,
  .error-message {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
  }
  
  .error-message {
    color: red;
  }
  
  .planes-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .planes-table th,
  .planes-table td {
    border: 1px solid #ccc;
    padding: 12px;
    text-align: center;
  }
  
  .editar-btn {
    background-color: #2563eb;
    color: white;
    padding: 6px 12px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .editar-btn:hover {
    background-color: #1d4ed8;
  }
  
  .eliminar-btn {
    background-color: #dc2626;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .eliminar-btn:hover {
    background-color: #b91c1c;
  }
  </style>