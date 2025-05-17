<!-- src/views/SesionFormulario.vue -->
<template>
  <div class="formulario-container">
    <h2>{{ esEdicion ? 'Editar Sesión' : 'Nueva Sesión' }}</h2>
    <form @submit.prevent="guardarSesion">
      <div class="form-group">
        <label for="usuario">ID Usuario:</label>
        <input v-model="sesion.id_usuarios" type="number" id="usuario" required />
      </div>

      <div class="form-group">
        <label for="entrenador">ID Entrenador:</label>
        <input v-model="sesion.id_entrenadores" type="number" id="entrenador" required />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input v-model="sesion.fecha" type="datetime-local" id="fecha" required />
      </div>

      <div class="form-group">
        <label for="duracion">Duración (minutos):</label>
        <input v-model="sesion.duracion" type="number" id="duracion" required />
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

const sesion = ref({
  id_usuarios: '',
  id_entrenadores: '',
  fecha: '',
  duracion: ''
});

const esEdicion = ref(false);

onMounted(async () => {
  if (route.params.id) {
    esEdicion.value = true;
    const { data } = await axios.get(`http://localhost:3001/api/sesiones/${route.params.id}`);
    sesion.value = data;
  }
});

const guardarSesion = async () => {
  try {
    if (esEdicion.value) {
      await axios.put(`http://localhost:3001/api/sesiones/${route.params.id}`, sesion.value);
    } else {
      await axios.post('http://localhost:3001/api/sesiones', sesion.value);
    }
    router.push('/sesiones');
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
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
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  background-color: #2563eb;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
}
</style>
