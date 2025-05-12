<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Reportes de Usuario</h1>
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>

    <div class="bg-white p-4 rounded shadow">
      <p class="mb-4">Aquí podrás visualizar la evolución de tu estado físico, rutinas y métricas importantes.</p>

      <div class="flex space-x-4 mb-4">
        <button @click="exportarPDF" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Exportar PDF
        </button>
        <button @click="exportarExcel" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Exportar Excel
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Fecha</th>
              <th class="py-2 px-4 border-b">Peso (kg)</th>
              <th class="py-2 px-4 border-b">IMC</th>
              <th class="py-2 px-4 border-b">Comentario</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(registro, index) in reportes" :key="index">
              <td class="py-2 px-4 border-b">{{ registro.fecha }}</td>
              <td class="py-2 px-4 border-b">{{ registro.peso }}</td>
              <td class="py-2 px-4 border-b">{{ registro.imc }}</td>
              <td class="py-2 px-4 border-b">{{ registro.comentario }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const reportes = ref([
  { fecha: '2025-04-01', peso: 75, imc: 24.6, comentario: 'Bien' },
  { fecha: '2025-04-08', peso: 74.5, imc: 24.4, comentario: 'Progreso' }
])

const exportarPDF = () => {
  alert('Funcionalidad de exportar a PDF aún no implementada')
}

const exportarExcel = () => {
  alert('Funcionalidad de exportar a Excel aún no implementada')
}
</script>

<style scoped>
/* Aquí puedes personalizar aún más */
</style>

<style scoped>
.reportes-container {
  padding: 20px;
}
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 20px;
}
.logo {
  width: 120px;
  max-width: 100%;
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

