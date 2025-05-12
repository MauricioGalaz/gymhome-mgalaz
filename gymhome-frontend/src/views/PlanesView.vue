<template>
  <div class="planes-container">
    <h1>Planes de Entrenamiento</h1>
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>

    <div v-if="planes.length === 0">No hay planes disponibles</div>

    <div v-else class="plans-grid">
      <div v-for="plan in planes" :key="plan.id_planes" class="section">
        <h2>{{ plan.nombre }}</h2>
        <p>{{ plan.descripcion }}</p>
        <p v-if="plan.dificultad">Dificultad: {{ plan.dificultad }}</p>
        <p v-if="plan.precio">Precio: ${{ plan.precio }}</p>
        <p v-if="plan.duracion">Duración: {{ plan.duracion }}</p>

        <div class="buttons">
          <button @click="verPlan(plan.id_planes)" aria-label="Ver plan">Ver</button>
          <button v-if="esEntrenador" @click="editarPlan(plan.id_planes)" aria-label="Editar plan">Editar</button>
          <button v-if="esEntrenador" @click="eliminarPlan(plan.id_planes)" aria-label="Eliminar plan">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const planes = ref([])
const router = useRouter()

// Leer rol desde localStorage
const rolUsuario = ref(JSON.parse(localStorage.getItem('usuario'))?.rol || 'usuario')
const esEntrenador = rolUsuario.value === 'entrenador'

// Función para obtener todos los planes
const obtenerPlanes = async () => {
  console.log('🔍 Fetching planes…')
  
  const authToken = localStorage.getItem('authToken')
  if (!authToken) {
    console.error('❌ Token no encontrado, por favor inicia sesión.')
    return
  }

  try {
    const response = await axios.get('http://localhost:3001/api/planes', {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    console.log('✅ /api/planes status:', response.status, 'data:', response.data)
    planes.value = response.data
  } catch (error) {
    console.error('❌ Error al obtener los planes:', error)
  }
}

// Carga inicial de los planes
onMounted(obtenerPlanes)

// Navegar a la vista de un plan
const verPlan = id_planes => {
  router.push(`/planes/${id_planes}`)
}

// Editar un plan
const editarPlan = id_planes => {
  router.push(`/planes/editar/${id_planes}`)
}

// Eliminar un plan
const eliminarPlan = async id_planes => {
  if (!confirm('¿Estás seguro de que quieres eliminar este plan?')) return

  try {
    const response = await axios.delete(`http://localhost:3001/api/planes/${id_planes}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })

    if (response.status === 200) {
      alert('Plan eliminado correctamente')
      obtenerPlanes()  // Refresca la lista de planes
    }
  } catch (error) {
    console.error('❌ Error al eliminar el plan:', error)
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 20px;
}
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo {
  width: 120px;
  max-width: 100%;
}
.planes-container {
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
}

.plans-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .plans-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.section {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.buttons button {
  flex: 1 1 100%;
}

@media (min-width: 640px) {
  .buttons button {
    flex: 1 1 auto;
  }
}
</style>
