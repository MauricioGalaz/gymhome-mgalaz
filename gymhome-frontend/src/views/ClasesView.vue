<template>
  <div class="clases-container">
    <h1>Clases Disponibles</h1>
    
    <!-- Verifica si las clases están cargadas y muestra un mensaje si no hay clases disponibles -->
    <div v-if="clases.length > 0">
      <div v-for="clase in clases" :key="clase.id" class="clase-card">
        <h3>{{ clase.nombre }}</h3>
        <p><strong>Instructor:</strong> {{ clase.instructor }}</p>
        <p><strong>Horario:</strong> {{ clase.horario }}</p>
        <button @click="verDetalles(clase)">Ver detalles</button>
      </div>
    </div>
    
    <!-- Mensaje si no hay clases disponibles o cargando -->
    <p v-else-if="cargando">Cargando clases...</p>
    <p v-else>No hay clases disponibles en este momento.</p>
    
    <!-- Mostrar error si este ocurre -->
    <p v-if="error" class="error">Hubo un problema al cargar las clases. Intenta nuevamente más tarde.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const clases = ref([])
const cargando = ref(true)
const error = ref(false)

const obtenerClases = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/clases')
    clases.value = response.data
  } catch (err) {
    error.value = true
    console.error('Error al obtener las clases:', err)
  } finally {
    cargando.value = false
  }
}

const verDetalles = (clase) => {
  alert(`Detalles de la clase: ${clase.nombre}`)
}

onMounted(obtenerClases)
</script>

<style scoped>
.clases-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.clase-card {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.clase-card:hover {
  transform: translateY(-5px);
}

.clase-card h3 {
  margin-bottom: 10px;
}

.clase-card button {
  background-color: #4f46e5;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.clase-card button:hover {
  background-color: #4338ca;
}

.error {
  color: red;
  font-weight: bold;
}

@media (max-width: 768px) {
  .clase-card {
    margin: 10px;
  }
}
</style>
