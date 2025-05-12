<template>
  <div class="edit-plan-container">
    <h1>Editar Plan</h1>

    <form @submit.prevent="guardarPlan">
      <div>
        <label for="nombre">Nombre del Plan:</label>
        <input type="text" v-model="plan.nombre" id="nombre" required />
        <p v-if="errores.nombre" class="error">{{ errores.nombre }}</p>
      </div>

      <div>
        <label for="descripcion">Descripción:</label>
        <textarea v-model="plan.descripcion" id="descripcion" required></textarea>
        <p v-if="errores.descripcion" class="error">{{ errores.descripcion }}</p>
      </div>

      <div>
        <label for="dificultad">Dificultad:</label>
        <select v-model="plan.dificultad" id="dificultad" required>
          <option value="">Selecciona una opción</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <p v-if="errores.dificultad" class="error">{{ errores.dificultad }}</p>
      </div>

      <div>
        <label for="precio">Precio:</label>
        <input type="number" v-model="plan.precio" id="precio" required />
        <p v-if="errores.precio" class="error">{{ errores.precio }}</p>
      </div>

      <div>
        <label for="duracion">Duración:</label>
        <input type="text" v-model="plan.duracion" id="duracion" required />
        <p v-if="errores.duracion" class="error">{{ errores.duracion }}</p>
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

const errores = ref({});

const route = useRoute();
const router = useRouter();
const planId = route.params.id;
const authToken = localStorage.getItem('authToken');

const obtenerPlan = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/planes/${planId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    plan.value = response.data;
  } catch (error) {
    console.error('Error al obtener el plan:', error);
  }
};

onMounted(obtenerPlan);

const validarCampos = () => {
  errores.value = {}; // reinicia errores

  if (!plan.value.nombre.trim()) {
    errores.value.nombre = 'El nombre no puede estar vacío.';
  }

  if (!plan.value.descripcion.trim() || plan.value.descripcion.length < 10) {
    errores.value.descripcion = 'La descripción debe tener al menos 10 caracteres.';
  }

  if (!plan.value.dificultad) {
    errores.value.dificultad = 'Debe seleccionar una dificultad.';
  }

  if (!plan.value.precio || plan.value.precio <= 0) {
    errores.value.precio = 'El precio debe ser mayor que 0.';
  }

  if (!plan.value.duracion.trim()) {
    errores.value.duracion = 'La duración no puede estar vacía.';
  }

  return Object.keys(errores.value).length === 0;
};

const guardarPlan = async () => {
  if (!validarCampos()) return;

  try {
    await axios.put(`http://localhost:3001/api/planes/${planId}`, plan.value, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    alert('✅ Plan actualizado correctamente');
    router.push('/planes');
  } catch (error) {
    console.error('Error al guardar el plan:', error);
    alert('Error al guardar el plan.');
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

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}
</style>
