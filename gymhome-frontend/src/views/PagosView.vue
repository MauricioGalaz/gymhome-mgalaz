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
          <tr v-for="pago in pagosOrdenados" :key="pago.id_pagos">
            <td>{{ pago.id_pagos }}</td>
            <td>{{ pago.nombre_usuario }}</td>
            <td>${{ pago.monto }}</td>
            <td>{{ new Date(pago.fecha).toLocaleDateString() }}</td>
            <td>
              <span v-if="!editando[pago.id_pagos]">
                {{ pago.estado }}
                <span v-if="pago.estado === 'Pagado'" class="icono-verde">✅</span>
              </span>

              <select v-if="editando[pago.id_pagos]" v-model="estadoSeleccionado[pago.id_pagos]">
                <option disabled value="">Seleccionar estado</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </td>

            <td v-if="esAdminOEntrenador">
              <button
                v-if="!editando[pago.id_pagos] && pago.estado !== 'Pagado'"
                @click="activarEdicion(pago.id_pagos)"
              >
                Registrar
              </button>

              <button
                v-else-if="editando[pago.id_pagos]"
                @click="guardarEstado(pago.id_pagos)"
              >
                Guardar
              </button>
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
const estadoSeleccionado = ref({});
const editando = ref({});
const rol = ref('admin'); // Simulado, reemplaza con autenticación real si es necesario

// Función para obtener los pagos desde la API
const obtenerPagos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/pagos');
    pagos.value = response.data;
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
  }
};

// Activar el modo edición para una fila
const activarEdicion = (id_pagos) => {
  const pago = pagos.value.find(p => p.id_pagos === id_pagos);
  if (pago && pago.estado !== 'Pagado') {
    editando.value[id_pagos] = true;
    estadoSeleccionado.value[id_pagos] = pago.estado;
  }
};

// Guardar el nuevo estado del pago
const guardarEstado = async (id_pagos) => {
  try {
    const estado = estadoSeleccionado.value[id_pagos];
    if (!estado) {
      alert('Selecciona un estado antes de guardar.');
      return;
    }

    await axios.put(`http://localhost:3001/api/pagos/estado/${id_pagos}`, { estado });

    await obtenerPagos();
    editando.value[id_pagos] = false;

    // Desactivar edición permanentemente si es "Pagado"
    if (estado === 'Pagado') {
      editando.value[id_pagos] = undefined;
    }
  } catch (error) {
    console.error('Error al registrar el pago:', error.response || error);
  }
};

// Mostrar botón solo si el usuario es admin o entrenador
const esAdminOEntrenador = computed(() => rol.value === 'admin' || rol.value === 'entrenador');

// Ordenar los pagos por ID de menor a mayor
const pagosOrdenados = computed(() => {
  return [...pagos.value].sort((a, b) => a.id_pagos - b.id_pagos);
});

onMounted(() => {
  obtenerPagos();
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

.icono-verde {
  margin-left: 6px;
  color: green;
}
</style>
