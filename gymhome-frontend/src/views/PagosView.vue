<template>
  <div class="pagos-container">
    <h1>Gestión de Pagos</h1>
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>

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
            <th v-if="esAdminOEntrenador">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pago in pagos" :key="pago.id_pagos">
            <td>{{ pago.id_pagos }}</td>
            <td>{{ obtenerNombreUsuario(pago.id_usuarios) }}</td>
            <td>${{ pago.monto }}</td>
            <td>{{ new Date(pago.fecha).toLocaleDateString() }}</td>
            <td>{{ pago.estado }}</td>
            <td v-if="esAdminOEntrenador">
              <select v-model="estadoSeleccionado[pago.id_pagos]">
                <option disabled value="">Seleccionar estado</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
              </select>
              <button @click="registrarPago(pago.id_pagos)">Registrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const pagos = ref([]);
const usuarios = ref([]);
const estadoSeleccionado = ref({});
const rol = ref('admin'); 

const obtenerPagos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/pagos');
    pagos.value = response.data;
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
  }
};

const obtenerUsuarios = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/usuarios');
    usuarios.value = response.data;
    console.log('Usuarios:', usuarios.value);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

const obtenerNombreUsuario = (usuarioId) => {
  const usuario = usuarios.value.find(user => user.id_usuarios === usuarioId);
  return usuario ? usuario.nombre : 'Desconocido';
};

const registrarPago = async (id_pagos) => {
  try {
    const estado = estadoSeleccionado.value[id_pagos];
    if (!estado) {
      alert('Selecciona un estado antes de registrar.');
      return;
    }
    await axios.patch(`http://localhost:3001/api/pagos/${id_pagos}`, { estado });
    await obtenerPagos(); 
  } catch (error) {
    console.error('Error al registrar el pago:', error);
  }
};

const esAdminOEntrenador = computed(() => rol.value === 'admin' || rol.value === 'entrenador');

onMounted(() => {
  obtenerPagos();
  obtenerUsuarios();
});
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

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo {
  width: 120px;
  max-width: 100%;
}

.pagos-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.pagos-table th,
.pagos-table td {
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

select {
  padding: 6px;
  margin-right: 8px;
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

