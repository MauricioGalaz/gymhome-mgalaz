<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4 text-center text-blue-600">Reportes de Usuario</h1>

    <div class="logo-container mb-4">
      <img src="@/assets/logo.png" alt="Logo GymHome" class="logo mx-auto" />
    </div>

    <p class="mb-4 text-gray-700 text-sm md:text-base text-center">
      Aquí podrás visualizar la evolución de tu estado físico, rutinas y métricas importantes.
    </p>

    <div class="flex justify-center gap-4 mb-6">
      <button @click="exportarPDF" class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-semibold">
        Exportar PDF
      </button>
      <button @click="exportarExcel" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold">
        Exportar Excel
      </button>
    </div>

    <div class="overflow-x-auto border rounded shadow">
      <table class="min-w-full bg-white border-collapse border border-gray-300">
        <thead class="bg-blue-600 text-white">
          <tr>
            <th class="py-2 px-4 border border-gray-300 text-left">ID Progreso</th>
            <th class="py-2 px-4 border border-gray-300 text-left">Fecha</th>
            <th class="py-2 px-4 border border-gray-300 text-left">Avance</th>
            <th class="py-2 px-4 border border-gray-300 text-left">ID Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registro, index) in reportes" :key="index" class="hover:bg-gray-100">
            <td class="py-2 px-4 border border-gray-300">{{ registro.id_progreso }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ registro.fecha }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ registro.avance || '-' }}</td>
            <td class="py-2 px-4 border border-gray-300">{{ registro.id_planes }}</td>
          </tr>
          <tr v-if="reportes.length === 0">
            <td colspan="4" class="text-center py-4 text-gray-500">No se encontraron reportes disponibles.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import logoGymHome from "@/assets/logo.png"

const reportes = ref([]) // Aquí se deben cargar los datos reales

const nombreUsuario = 'Juan Perez' // Cambia esto dinámicamente si quieres

const logoBase64 = ref(null)

// Función para convertir logo a base64 para el PDF
const getBase64FromUrl = async (url) => {
  const res = await fetch(url)
  const blob = await res.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

onMounted(async () => {
  logoBase64.value = await getBase64FromUrl(logoGymHome)

  // Carga simulada - reemplaza por llamada API real para traer datos
  reportes.value = [
    { id_progreso: 1, fecha: '2025-05-18', avance: 'Bueno', id_planes: 101 },
    { id_progreso: 2, fecha: '2025-05-19', avance: 'Excelente', id_planes: 102 }
  ]
})

const exportarPDF = () => {
  if (!reportes.value.length) {
    alert('No hay datos para exportar')
    return
  }

  const doc = new jsPDF()
  const pdfWidth = doc.internal.pageSize.getWidth()

  if (logoBase64.value) {
    const imgProps = doc.getImageProperties(logoBase64.value)
    const logoWidth = 50
    const logoHeight = (imgProps.height * logoWidth) / imgProps.width
    const logoX = (pdfWidth - logoWidth) / 2
    doc.addImage(logoBase64.value, 'PNG', logoX, 10, logoWidth, logoHeight)
  }

  doc.setFontSize(18)
  doc.setTextColor('#2563EB')
  doc.text('Reportes de Usuario', pdfWidth / 2, 70, { align: 'center' })

  doc.setFontSize(12)
  doc.setTextColor('#374151')
  doc.text(`Usuario: ${nombreUsuario}`, pdfWidth / 2, 80, { align: 'center' })

  const columns = ['ID Progreso', 'Fecha', 'Avance', 'ID Plan']
  const rows = reportes.value.map(r => [
    r.id_progreso,
    r.fecha,
    r.avance || '-',
    r.id_planes
  ])

  autoTable(doc, {
    startY: 90,
    head: [columns],
    body: rows,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] }
  })

  doc.save('reportes_usuario.pdf')
}

const exportarExcel = () => {
  if (!reportes.value.length) {
    alert('No hay datos para exportar')
    return
  }

  const worksheetData = [
    ['ID Progreso', 'Fecha', 'Avance', 'ID Plan'],
    ...reportes.value.map(r => [r.id_progreso, r.fecha, r.avance || '-', r.id_planes])
  ]

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reportes')

  XLSX.writeFile(workbook, 'reportes_usuario.xlsx')
}
</script>

<style scoped>
.reportes-container {
  max-width: 1200px;
  margin: 1rem auto;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1f2937;
}

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

p {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #374151;
}

.overflow-x-auto {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

thead {
  background-color: #2563eb;
  color: white;
}

th, td {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  text-align: left;
}

tbody tr:hover {
  background-color: #e0e7ff;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1e40af;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.gap-4 {
  gap: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}
</style>
