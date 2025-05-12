<template>
  <div class="plan-detalle-container" v-if="plan">
    <h1>{{ plan.nombre }}</h1>
    <p>{{ plan.descripcion }}</p>
    <p v-if="plan.dificultad">Dificultad: {{ plan.dificultad }}</p>
    <p v-if="plan.precio">Precio: ${{ plan.precio }}</p>
    <p v-if="plan.duracion">Duración: {{ plan.duracion }}</p>

    <!-- Formulario para editar el plan -->
    <div v-if="esEntrenador">
      <h2>Editar Plan</h2>
      <form @submit.prevent="actualizarPlan">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="plan.nombre" required />
        </div>
        <div>
          <label for="descripcion">Descripción:</label>
          <textarea v-model="plan.descripcion" required></textarea>
        </div>
        <div>
          <label for="dificultad">Dificultad:</label>
          <input type="text" v-model="plan.dificultad" />
        </div>
        <div>
          <label for="precio">Precio:</label>
          <input type="number" v-model="plan.precio" required />
        </div>
        <div>
          <label for="duracion">Duración:</label>
          <input type="text" v-model="plan.duracion" required />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>

    <!-- Botón para eliminar el plan -->
    <div v-if="esEntrenador">
      <button @click="eliminarPlan(plan.id_planes)">Eliminar Plan</button>
    </div>

    <router-link to="/planes">Volver a los planes</router-link>
  </div>
  <div v-else>
    <p>Cargando el plan...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const plan = ref(null)
const route = useRoute()
const router = useRouter()

// Leer rol desde localStorage
const rolUsuario = ref(JSON.parse(localStorage.getItem('usuario'))?.rol || 'usuario')
const esEntrenador = rolUsuario.value === 'entrenador'

// Función para cargar el plan
const cargarPlan = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/planes/${route.params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    plan.value = response.data
  } catch (error) {
    console.error('Error al cargar el plan:', error)
  }
}

// Función para actualizar el plan
const actualizarPlan = async () => {
  try {
    await axios.put(`http://localhost:3001/api/planes/${plan.value.id_planes}`, plan.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    alert('Plan actualizado correctamente')
    router.push(`/planes/${plan.value.id_planes}`)
  } catch (error) {
    console.error('Error al actualizar el plan:', error)
  }
}

// Eliminar un plan
const eliminarPlan = async id_planes => {
  if (!confirm('¿Eliminar este plan?')) return
  try {
    await axios.delete(`http://localhost:3001/api/planes/${id_planes}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    alert('Plan eliminado correctamente')
    router.push('/planes')
  } catch (error) {
    console.error('Error al eliminar el plan:', error)
  }
}

// Cargar el plan cuando se monta el componente
onMounted(cargarPlan)
</script>

<style scoped>
.plan-detalle-container {
  padding: 1rem;
  max-width: 800px;
  margin: auto;
}

h1 {
  color: #2563EB;
}

p {
  font-size: 1.2rem;
  line-height: 1.5;
}

form {
  margin-top: 1rem;
}

form div {
  margin-bottom: 1rem;
}

form label {
  display: block;
}

form input, form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

button {
  background-color: #2563EB;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #1D4ED8;
}

a {
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  color: #2563EB;
}
</style>
