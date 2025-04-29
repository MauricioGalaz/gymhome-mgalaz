<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold text-center mb-6">{{ isEditMode ? 'Editar Plan' : 'Crear Plan' }}</h1>

      <form @submit.prevent="guardarPlan" class="space-y-5">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input id="nombre" v-model="plan.nombre" class="mt-1 w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea id="descripcion" v-model="plan.descripcion" class="mt-1 w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" required></textarea>
        </div>

        <div>
          <label for="dificultad" class="block text-sm font-medium text-gray-700">Dificultad</label>
          <input id="dificultad" v-model="plan.dificultad" class="mt-1 w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label for="precio" class="block text-sm font-medium text-gray-700">Precio</label>
          <input id="precio" type="number" v-model.number="plan.precio" class="mt-1 w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" required min="0" />
        </div>

        <div>
          <label for="duracion" class="block text-sm font-medium text-gray-700">Duración</label>
          <input id="duracion" type="number" v-model.number="plan.duracion" class="mt-1 w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500" required min="1" />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          {{ isEditMode ? 'Actualizar' : 'Crear' }} Plan
        </button>
      </form>

      <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
      <p v-if="success" class="text-green-500 text-center mt-4">{{ success }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// Variables reactivas
const route = useRoute();
const router = useRouter();

const plan = ref({
  nombre: '',
  descripcion: '',
  dificultad: '',
  precio: 0,
  duracion: 0,
});

const isEditMode = ref(false);
const error = ref('');
const success = ref('');

// Definir la URL base de la API
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Cargar los datos del plan si es en modo edición
onMounted(async () => {
  const id = route.params.id;
  if (id) {
    isEditMode.value = true;
    try {
      const response = await axios.get(`${apiUrl}/api/planes/${id}`);
      plan.value = response.data;
    } catch (err) {
      console.error(err);
      error.value = 'Error al cargar el plan.';
    }
  }
});

// Función para guardar o actualizar el plan
const guardarPlan = async () => {
  const method = isEditMode.value ? 'put' : 'post';
  const url = isEditMode.value
    ? `${apiUrl}/api/planes/${plan.value.id}`
    : `${apiUrl}/api/planes`;

  try {
    // Enviar la solicitud al backend
    await axios[method](url, { ...plan.value });

    // Mensaje de éxito
    success.value = `Plan ${isEditMode.value ? 'actualizado' : 'creado'} exitosamente.`;
    router.push('/planes'); // Redirigir a la lista de planes
  } catch (err) {
    console.error(err);
    error.value = 'Error al guardar el plan.';
  }
};
</script>
