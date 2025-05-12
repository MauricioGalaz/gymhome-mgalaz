<template>
  <div class="formulario-container">
    <h2>{{ esEdicion ? 'Editar Clase' : 'Nueva Clase' }}</h2>
    <form @submit.prevent="guardarClase">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input v-model="clase.nombre" type="text" id="nombre" required />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea v-model="clase.descripcion" id="descripcion" required></textarea>
      </div>

      <div class="form-group">
        <label for="duracion">Duración (minutos):</label>
        <input v-model="clase.duracion" type="number" id="duracion" required />
      </div>

      <button type="submit">{{ esEdicion ? 'Actualizar' : 'Crear' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const clase = ref({
  nombre: '',
  descripcion: '',
  duracion: ''
});

const esEdicion = ref(false);

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    esEdicion.value = true;
    try {
      const res = await axios.get(`http://localhost:3001/api/clases/${id}`);
      clase.value = res.data;
    } catch (error) {
      console.error('Error al cargar la clase:', error);
    }
  }
});

const guardarClase = async () => {
  try {
    if (esEdicion.value) {
      await axios.put(`http://localhost:3001/api/clases/${route.params.id}`, clase.value);
    } else {
      await axios.post('http://localhost:3001/api/clases', clase.value);
    }
    router.push('/clases');
  } catch (error) {
    console.error('Error al guardar clase:', error);
  }
};
</script>

<style scoped>
.formulario-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: #2563eb;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
