<template>
  <div class="clases-container">
    <h1>Clases Disponibles</h1>

    <div v-if="clases.length === 0">
      <p>No hay clases disponibles en este momento.</p>
    </div>

    <div v-else>
      <div v-for="clase in clases" :key="clase.id" class="clase-card">
        <h2>{{ clase.nombre }}</h2>
        <p>{{ clase.descripcion }}</p>
        <p><strong>Duración:</strong> {{ clase.duracion }}</p>
        <button @click="verClase(clase.id)">Ver Detalles</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const clases = ref([]);
const router = useRouter();

const obtenerClases = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/clases');
    clases.value = response.data;
  } catch (error) {
    console.error('Error al obtener las clases:', error);
  }
};

onMounted(() => {
  obtenerClases();
});

const verClase = (id) => {
  router.push(`/clase/${id}`);
};
</script>

<style scoped>
.clases-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 20px;
}

.clase-card {
  background-color: #f9fafb;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2563eb;
}

button {
  background-color: #2563eb;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
