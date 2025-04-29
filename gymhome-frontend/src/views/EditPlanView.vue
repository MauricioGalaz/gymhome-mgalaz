<template>
  <div class="edit-plan-container">
    <h1>Editar Plan</h1>

    <form @submit.prevent="guardarPlan">
      <div>
        <label for="nombre">Nombre del Plan:</label>
        <input type="text" v-model="plan.nombre" id="nombre" required />
      </div>
      <div>
        <label for="descripcion">Descripción:</label>
        <textarea v-model="plan.descripcion" id="descripcion" required></textarea>
      </div>
      <div>
        <label for="dificultad">Dificultad:</label>
        <select v-model="plan.dificultad" id="dificultad" required>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <div>
        <label for="precio">Precio:</label>
        <input type="number" v-model="plan.precio" id="precio" required />
      </div>
      <div>
        <label for="duracion">Duración:</label>
        <input type="text" v-model="plan.duracion" id="duracion" required />
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const plan = ref({
  nombre: '',
  descripcion: '',
  dificultad: '',
  precio: '',
  duracion: ''
});

const route = useRoute();
const router = useRouter();
const planId = route.params.id;

const obtenerPlan = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/planesentrenamiento/${planId}`);
    plan.value = response.data;
  } catch (error) {
    console.error('Error al obtener el plan:', error);
  }
};

onMounted(() => {
  obtenerPlan();
});

// Función para guardar los cambios en el plan
const guardarPlan = async () => {
  try {
    await axios.put(`http://localhost:3001/api/planesentrenamiento/${planId}`, plan.value);
    router.push('/planes'); // Redirigir a la vista de planes después de guardar
  } catch (error) {
    console.error('Error al guardar el plan:', error);
  }
};
</script>

<style scoped>
.edit-plan-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
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
