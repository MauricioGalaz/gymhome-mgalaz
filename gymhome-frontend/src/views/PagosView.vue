<template>
  <div class="pagos-container">
    <h1>Gestión de Pagos</h1>

    <div v-if="pagos.length === 0">
      <p>No hay pagos registrados.</p>
    </div>

    <div v-else>
      <table class="pagos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pago in pagos" :key="pago.id">
            <td>{{ pago.id }}</td>
            <td>{{ pago.usuario_id }}</td>
            <td>${{ pago.monto }}</td>
            <td>{{ new Date(pago.fecha).toLocaleDateString() }}</td>
            <td>{{ pago.estado }}</td>
            <td><button @click="verPago(pago.id)">Ver Detalles</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const pagos = ref([]);
const router = useRouter();

const obtenerPagos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/pagos');
    pagos.value = response.data;
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
  }
};

onMounted(() => {
  obtenerPagos();
});

const verPago = (id) => {
  router.push(`/pago/${id}`);
};
</script>

<style scoped>
.pagos-container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 20px;
}

.pagos-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.pagos-table th, .pagos-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.pagos-table th {
  background-color: #2563eb;
  color: white;
}

.pagos-table td {
  background-color: #f9fafb;
}

button {
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1d4ed8;
}
</style>
