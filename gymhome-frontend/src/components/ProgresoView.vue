<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Progreso Personal</h2>

    <div v-if="cargando" class="text-gray-500">Cargando progreso...</div>

    <div v-else-if="progresos.length === 0" class="text-gray-500">
      No hay registros de progreso aún.
    </div>

    <table v-else class="w-full border border-gray-300 rounded">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="p-2">Fecha</th>
          <th class="p-2">Plan</th>
          <th class="p-2">Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="progreso in progresos" :key="progreso.id_progreso" class="border-t">
          <td class="p-2">{{ formatFecha(progreso.fecha) }}</td>
          <td class="p-2">{{ progreso.id_planes }}</td>
          <td class="p-2">{{ progreso.avance }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { getToken, getUsuario } from '@/utils/auth'

const progresos = ref([])
const cargando = ref(true)

const cargarProgreso = async () => {
  try {
    const usuario = getUsuario()
    const res = await axios.get(`/api/progreso/${usuario.id_usuarios}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    progresos.value = res.data
  } catch (error) {
    console.error('Error al cargar progreso:', error)
  } finally {
    cargando.value = false
  }
}

const formatFecha = (fechaStr) => {
  const fecha = new Date(fechaStr)
  return fecha.toLocaleDateString()
}

onMounted(() => {
  cargarProgreso()
})
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
