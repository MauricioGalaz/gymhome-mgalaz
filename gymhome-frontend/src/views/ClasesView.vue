<template>
  <div class="clases-container">
    <h1>Gestión de Sesiones</h1>

    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>

    <div class="actions">
      <button class="btn-add" @click="abrirModalCrear">Crear Nueva Sesión</button>
      <input v-model="busqueda" placeholder="Buscar..." class="search-input" />
    </div>

    <div v-if="cargando" class="loading">Cargando sesiones...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="sesionesFiltradas.length === 0" class="no-data">No hay sesiones disponibles.</div>

    <table v-else class="sesiones-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Entrenador</th>
          <th>Fecha</th>
          <th>Duración</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sesion in sesionesFiltradas" :key="sesion.id_sesiones">
          <td>{{ sesion.id_sesiones }}</td>
          <td>{{ sesion.nombre_usuario || sesion.id_usuarios }}</td>
          <td>{{ sesion.nombre_entrenador || sesion.id_entrenadores }}</td>
          <td>{{ formatearFecha(sesion.fecha) }}</td>
          <td>{{ sesion.duracion }} min</td>
          <td class="actions-column">
            <button v-if="puedeEditar" @click="abrirModalEditar(sesion)" class="btn-edit">Editar</button>
            <button v-if="puedeEditar" @click="confirmarEliminacion(sesion.id_sesiones)" class="btn-delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h2>{{ sesionActual.id_sesiones ? 'Editar Sesión' : 'Crear Sesión' }}</h2>

        <form @submit.prevent="guardarSesion">
          <label>Usuario:</label>
          <input v-model="sesionActual.id_usuarios" required placeholder="ID Usuario" />

          <label>Entrenador:</label>
          <input v-model="sesionActual.id_entrenadores" required placeholder="ID Entrenador" />

          <label>Fecha:</label>
          <input v-model="sesionActual.fecha" type="datetime-local" required />

          <label>Duración (min):</label>
          <input v-model="sesionActual.duracion" type="number" required min="1" />

          <div class="modal-actions">
            <button type="submit" class="btn-add">Guardar</button>
            <button type="button" class="btn-delete" @click="cerrarModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const sesiones = ref([]);
const cargando = ref(true);
const error = ref(null);
const busqueda = ref('');
const mostrarModal = ref(false);
const sesionActual = ref({ id_usuarios: '', id_entrenadores: '', fecha: '', duracion: '' });

const usuario = ref({ nombre: 'Juan Pérez', rol: 'entrenador' }); 
const puedeEditar = computed(() => usuario.value.rol === 'admin' || usuario.value.rol === 'entrenador');

const sesionesFiltradas = computed(() => {
  if (!busqueda.value) return sesiones.value;
  const termino = busqueda.value.toLowerCase();
  return sesiones.value.filter(s =>
    s.id_sesiones.toString().includes(termino) ||
    (s.nombre_usuario && s.nombre_usuario.toLowerCase().includes(termino)) ||
    (s.nombre_entrenador && s.nombre_entrenador.toLowerCase().includes(termino)) ||
    (s.fecha && s.fecha.toLowerCase().includes(termino))
  );
});

const formatearFecha = (fecha) => {
  try {
    const f = new Date(fecha);
    return f.toLocaleString('es-CL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return fecha;
  }
};

const obtenerSesiones = async () => {
  try {
    cargando.value = true;
    const res = await axios.get('http://localhost:3001/api/sesiones');
    sesiones.value = res.data;
  } catch (e) {
    console.error(e);
    error.value = 'No se pudieron cargar las sesiones. Intente nuevamente.';
  } finally {
    cargando.value = false;
  }
};

const abrirModalCrear = () => {
  sesionActual.value = { id_usuarios: '', id_entrenadores: '', fecha: '', duracion: '' };
  mostrarModal.value = true;
};

const abrirModalEditar = (sesion) => {
  sesionActual.value = { ...sesion };
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

const guardarSesion = async () => {
  try {
    if (sesionActual.value.id_sesiones) {
      // EDITAR
      await axios.put(`http://localhost:3001/api/sesiones/${sesionActual.value.id_sesiones}`, sesionActual.value);
    } else {
      // CREAR
      await axios.post('http://localhost:3001/api/sesiones', sesionActual.value);
    }
    cerrarModal();
    await obtenerSesiones();
  } catch (e) {
    console.error(e);
    alert('No se pudo guardar la sesión.');
  }
};

const confirmarEliminacion = async (id) => {
  if (confirm('¿Está seguro de eliminar esta sesión?')) {
    try {
      await axios.delete(`http://localhost:3001/api/sesiones/${id}`);
      await obtenerSesiones();
    } catch (e) {
      console.error(e);
      alert('No se pudo eliminar la sesión.');
    }
  }
};

onMounted(obtenerSesiones);
</script>

<style scoped>
.clases-container {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #2563eb;
  margin-bottom: 1.5rem;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo {
  max-width: 100px;
}

.actions {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-add {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.search-input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;
  max-width: 300px;
}

.sesiones-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.sesiones-table th, .sesiones-table td {
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.sesiones-table th {
  background-color: #f1f5f9;
  color: #111827;
}

.sesiones-table tr:nth-child(even) {
  background-color: #f9fafb;
}

.actions-column {
  display: flex;
  gap: 0.5rem;
}

.btn-edit {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 6px;
}

.error {
  background-color: #fee2e2;
  color: #b91c1c;
}

.no-data {
  background-color: #fef9c3;
  color: #92400e;
}


.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.modal-content h2 {
  margin-bottom: 1rem;
  color: #2563eb;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}
</style>
