<template>
  <div class="plan-container">
    <div class="logo-section">
      <img src="@/assets/logo.png" alt="Logo de GymHome" class="logo" />
      <h2>GymHome</h2>
    </div>

    <h3>Escoge un plan</h3>

    <div v-if="loading" class="loading">
      <span>Cargando planes...</span>
    </div>

    <div v-if="!loading" class="planes-grid">
      <div v-for="plan in planes" :key="plan.id_plan" class="plan-card">
        <h4>{{ plan.nombre }}</h4>
        <p><strong>Descripción:</strong> {{ plan.descripcion }}</p>
        <p><strong>Precio:</strong> ${{ plan.precio }}</p>
        <p><strong>Dificultad:</strong> {{ plan.dificultad }}</p>
        <p><strong>Duración:</strong> {{ plan.duracion }} días</p>

        <button
          v-if="planSeleccionado !== plan.id_plan"
          @click="escogerPlan(plan.id_plan)"
        >
          Escoger
        </button>

        <p v-else class="plan-seleccionado">Ya has escogido este plan</p>
      </div>
    </div>

    <div v-if="planSeleccionado" class="plan-seleccionado-notification">
      <p><strong>¡Ya has escogido un plan!</strong></p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/axiosConfig';

const route = useRoute();
const router = useRouter();
const userId = route.params.id;

const planes = ref([]);
const loading = ref(true);
const planSeleccionado = ref(null); // Guardará el id del plan seleccionado

// Verificar si el usuario ya ha escogido un plan
const verificarPlanSeleccionado = async () => {
  try {
    const response = await api.get(`/usuarios/${userId}/plan-seleccionado`);
    if (response.data && response.data.id_plan) {
      planSeleccionado.value = response.data.id_plan;
    }
  } catch (err) {
    console.error('Error al verificar el plan seleccionado', err);
  }
};

onMounted(async () => {
  try {
    const res = await api.get('/planes');
    planes.value = res.data;
    await verificarPlanSeleccionado();
    loading.value = false;
  } catch (err) {
    console.error('Error cargando planes', err);
    loading.value = false;
  }
});

const escogerPlan = async (idPlan) => {
  try {
    await api.post(`/usuarios/${userId}/escoger-plan`, { id_plan: idPlan });
    alert('Plan seleccionado correctamente');
    planSeleccionado.value = idPlan;
    router.push('/dashboard');
  } catch (err) {
    console.error('Error al escoger plan', err);
    alert('No se pudo asignar el plan');
  }
};
</script>

<style scoped>
.plan-container {
  padding: 20px;
  text-align: center;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 100px;
  margin-bottom: 10px;
}

.planes-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.plan-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  width: 250px;
  background-color: #f5f5f5;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.plan-card:hover {
  transform: scale(1.05);
}

.plan-card button {
  padding: 10px 20px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.plan-card button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.plan-seleccionado {
  margin-top: 10px;
  color: #28a745;
  font-weight: bold;
}

.plan-seleccionado-notification {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 5px;
}

.loading {
  font-size: 18px;
  color: #007bff;
}
</style>
