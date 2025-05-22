<template>
  <div class="pagos-container">
    <h1>Gestión de Pagos</h1>
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>

    <!-- Botón para agregar pagos -->
    <div v-if="esAdminOEntrenador" class="acciones">
      <button @click="mostrarFormulario = true">Agregar Pago</button>
    </div>

    <!-- Formulario para agregar pago -->
    <div v-if="mostrarFormulario" class="formulario-agregar">
      <h3>Nuevo Pago</h3>
      <label>Monto:</label>
      <input v-model.number="nuevoPago.monto" type="number" required />

      <label>ID Usuario:</label>
      <input v-model.number="nuevoPago.id_usuario" type="number" required />

      <div class="modal-buttons">
        <button @click="confirmarAgregarPago">Confirmar</button>
        <button @click="mostrarFormulario = false">Cancelar</button>
      </div>
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
            <th v-if="esAdminOEntrenador || esUsuario">Acción</th>
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
            <td>
              <div v-if="esAdminOEntrenador">
                <button @click="eliminarPago(pago.id_pagos)" class="btn-eliminar">
                  Eliminar
                </button>
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
              </div>

              <div v-else-if="esUsuario && pago.estado === 'Pendiente'">
                <button @click="pagarComoUsuario(pago.id_pagos)">Pagar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import api from '@/axiosConfig' // Asegúrate de tener api base configurada

const pagos = ref([])
const estadoSeleccionado = ref({})
const editando = ref({})
const mostrarFormulario = ref(false)
const nuevoPago = ref({ monto: 0, id_usuario: 1 })
const rol = ref('admin') // Cambia a 'usuario' o 'entrenador' para pruebas

const obtenerPagos = async () => {
  try {
    const response = await api.get('/pagos')
    pagos.value = response.data
  } catch (error) {
    console.error('Error al obtener pagos:', error)
  }
}

const activarEdicion = (id_pagos) => {
  const pago = pagos.value.find(p => p.id_pagos === id_pagos)
  if (pago && pago.estado !== 'Pagado') {
    editando.value[id_pagos] = true
    estadoSeleccionado.value[id_pagos] = pago.estado
  }
}

const guardarEstado = async (id_pagos) => {
  try {
    const estado = estadoSeleccionado.value[id_pagos]
    if (!estado) {
      alert('Selecciona un estado antes de guardar.')
      return
    }

    await api.put(`/pagos/estado/${id_pagos}`, { estado })
    await obtenerPagos()
    editando.value[id_pagos] = false
  } catch (error) {
    console.error('Error al registrar el pago:', error.response || error)
  }
}

const confirmarAgregarPago = async () => {
  try {
    if (nuevoPago.value.monto <= 0 || !nuevoPago.value.id_usuario) {
      alert('Monto y usuario son obligatorios.');
      return;
    }

    const nuevo = {
      monto: nuevoPago.value.monto,
      id_usuario: nuevoPago.value.id_usuario,
      fecha: new Date().toISOString().slice(0, 10),
      estado: 'Pendiente'
    };

    const response = await api.post('/pagos', nuevo);
    pagos.value.push(response.data); // Agregar el pago recibido al arreglo local
    mostrarFormulario.value = false;
    nuevoPago.value = { monto: 0, id_usuario: 1 };
  } catch (error) {
    console.error('Error al agregar el pago:', error.response?.data || error);
    alert('No se pudo agregar el pago.');
  }
};

async function eliminarPago(id) {
  try {
    const response = await fetch(`http://localhost:3001/api/pagos/${id}`, {
      method: 'DELETE',
    });

    const contentType = response.headers.get('content-type');
    const responseText = await response.text();

    console.log('Respuesta:', responseText);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = contentType.includes('application/json')
      ? JSON.parse(responseText)
      : { mensaje: responseText };

    console.log('Pago eliminado:', data);
    await obtenerPagos();
  } catch (error) {
    console.error('Error al eliminar pago:', error);
    alert('No se pudo eliminar el pago.');
  }
}




const pagarComoUsuario = async (id_pagos) => {
  try {
    await api.put(`/pagos/estado/${id_pagos}`, { estado: 'Pagado' })
    await obtenerPagos()
  } catch (error) {
    console.error('Error al pagar:', error)
    alert('No se pudo registrar el pago.')
  }
}

const esAdminOEntrenador = computed(() => rol.value === 'admin' || rol.value === 'entrenador')
const esUsuario = computed(() => rol.value === 'usuario')
const pagosOrdenados = computed(() => [...pagos.value].sort((a, b) => a.id_pagos - b.id_pagos))

onMounted(() => {
  obtenerPagos()
})
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

.btn-eliminar {
  background-color: #ef4444;
  margin-left: 6px;
}

.btn-eliminar:hover {
  background-color: #dc2626;
}

.icono-verde {
  margin-left: 6px;
  color: green;
}

.formulario-agregar {
  margin: 20px 0;
  background-color: #f0f4ff;
  padding: 20px;
  border-radius: 8px;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.acciones {
  display: flex;
  justify-content: flex-end;
}
</style>
