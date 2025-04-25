<template>
  <div class="pagos-container">
    <h1>Pagos Pendientes</h1>
    
    <div v-if="pagos.length > 0">
      <div v-for="pago in pagos" :key="pago.id" class="pago-card">
        <h3>Plan: {{ pago.plan }}</h3>
        <p><strong>Fecha de Vencimiento:</strong> {{ pago.fechaVencimiento }}</p>
        <p><strong>Monto:</strong> {{ pago.monto | currency }}</p>
        <button @click="realizarPago(pago)">Realizar Pago</button>
      </div>
    </div>
    <p v-else>Cargando pagos...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pagos = ref([])

const obtenerPagos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/pagos') 
    pagos.value = response.data
  } catch (error) {
    console.error('Error al obtener los pagos:', error)
  }
}

const realizarPago = (pago) => {
  alert(`Realizando pago para el plan: ${pago.plan}`)
  
}

onMounted(obtenerPagos)
</script>

<style scoped>
.pagos-container {
  padding: 20px;
}

.pago-card {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.pago-card h3 {
  margin-bottom: 10px;
}

.pago-card button {
  background-color: #4f46e5;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.pago-card button:hover {
  background-color: #4338ca;
}
</style>
