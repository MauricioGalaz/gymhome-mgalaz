<template>
  <div class="planes-container">
    <h1>Planes de Entrenamiento</h1>

    
    <div v-if="planes.length === 0">
      <p>No hay planes disponibles</p>
    </div>
    <div v-else>
      <div v-for="plan in planes" :key="plan.id" class="section">
        <h2>{{ plan.nombre }}</h2>
        <p>{{ plan.descripcion }}</p>
        <p>Dificultad: {{ plan.dificultad }}</p>
        <p>Precio: ${{ plan.precio }}</p>
        <p>Duración: {{ plan.duracion }}</p>
        <button @click="verPlan(plan.id)">Ver Plan</button>
        <button @click="editarPlan(plan.id)">Editar</button>
        <button @click="eliminarPlan(plan.id)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const planes = ref([]);
const router = useRouter();

const obtenerPlanes = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/planesentrenamiento');
    planes.value = response.data;
  } catch (error) {
    console.error('Error al obtener los planes:', error);
  }
};

onMounted(() => {
  obtenerPlanes();
});

// ver un plan
const verPlan = (id) => {
  router.push(`/plan/${id}`);
};

// editar un plan
const editarPlan = (id) => {
  router.push(`/editar-plan/${id}`);
};

// eliminar un plan
const eliminarPlan = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/planesentrenamiento/${id}`);
    obtenerPlanes(); // Actualiza la lista después de eliminar el plan
    alert('Plan eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el plan:', error);
  }
};
</script>

<style scoped>
.planes-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 30px;
}

.section {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

h2 {
  color: #2563eb;
}

button {
  margin-top: 10px;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
