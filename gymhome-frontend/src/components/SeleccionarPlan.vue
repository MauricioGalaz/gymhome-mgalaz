<template>
  <div class="seleccionar-plan">
    <h2>Selecciona tu plan</h2>
    <div v-if="planes.length === 0">Cargando planes...</div>

    <div v-else>
      <div v-for="plan in planes" :key="plan.id_planes" class="plan">
        <p><strong>{{ plan.nombre }}</strong></p>
        <button @click="escogerPlan(plan)">Escoger este plan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const planes = ref([])

const obtenerPlanes = async () => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    console.warn('Token no encontrado. Redirigiendo o mostrando mensaje.')
    return
  }

  try {
    const { data } = await axios.get('http://localhost:3001/api/planes', {
      headers: { Authorization: `Bearer ${token}` }
    })
    planes.value = data
  } catch (error) {
    console.error('Error al obtener planes:', error)
  }
}

const escogerPlan = (plan) => {
  // Aquí podrías guardar en store o emitir evento
  alert(`Plan seleccionado: ${plan.nombre}`)
}

onMounted(obtenerPlanes)
</script>

<style scoped>
.seleccionar-plan {
  padding: 1rem;
}
.plan {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
}
button {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
</style>
