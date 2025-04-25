<template>
  <div class="reportes-container">
    <h1>Reportes e Indicadores</h1>
    
    <div v-if="reportes.length > 0">
      <div v-for="reporte in reportes" :key="reporte.id" class="reporte-card">
        <h3>{{ reporte.titulo }}</h3>
        <p><strong>Fecha:</strong> {{ reporte.fecha }}</p>
        <p>{{ reporte.descripcion }}</p>
        <button @click="verReporte(reporte)">Ver Reporte</button>
      </div>
    </div>
    <p v-else>Cargando reportes...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const reportes = ref([])

const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const obtenerReportes = async () => {
  try {
    const response = await api.get('/reportes')
    reportes.value = response.data
  } catch (error) {
    console.error('Error al obtener los reportes:', error)
  }
}

const verReporte = (reporte) => {
  alert(`Mostrando reporte: ${reporte.titulo}`)

}

onMounted(obtenerReportes)
</script>

<style scoped>
.reportes-container {
  padding: 20px;
}

.reporte-card {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.reporte-card h3 {
  margin-bottom: 10px;
}

.reporte-card button {
  background-color: #4f46e5;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.reporte-card button:hover {
  background-color: #4338ca;
}
</style>
