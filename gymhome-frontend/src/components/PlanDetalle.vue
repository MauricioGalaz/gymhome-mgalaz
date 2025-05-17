<template>
  <div>
    <h2>Detalles del Plan</h2>
    <div v-if="plan">
      <p><strong>Nombre:</strong> {{ plan.nombre }}</p>
      <p><strong>Descripción:</strong> {{ plan.descripcion }}</p>
      <p><strong>Dificultad:</strong> {{ plan.dificultad }}</p>
      <p><strong>Precio:</strong> {{ plan.precio }}</p>
      <p><strong>Duración:</strong> {{ plan.duracion }}</p>

      <router-link v-if="esEntrenador" :to="`/planes/editar/${plan.id_planes}`">
        <button>Editar Plan</button>
      </router-link>
    </div>
    <div v-else>
      Cargando datos del plan...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const plan = ref(null)
const esEntrenador = ref(false)

const cargarPlan = async () => {
  try {
    const { id } = route.params
    const res = await axios.get(`http://localhost:3001/planes/${id}`)
    plan.value = res.data
  } catch (error) {
    console.error('Error al cargar el plan:', error)
  }
}

onMounted(() => {
  cargarPlan()
  esEntrenador.value = true 
})
</script>