<template>
  <div class="listado-container">
    <h2>Listado de Clases</h2>
    <router-link to="/clases/crear" class="btn-crear">Crear Nueva Clase</router-link>

    <table v-if="clases.length > 0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Duración (min)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="clase in clases" :key="clase.id">
          <td>{{ clase.nombre }}</td>
          <td>{{ clase.descripcion }}</td>
          <td>{{ clase.duracion }}</td>
          <td>
            <router-link :to="'/clases/editar/' + clase.id" class="btn-editar">Editar</router-link>
            <button @click="eliminarClase(clase.id)" class="btn-eliminar">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No hay clases disponibles.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const clases = ref([]);
const router = useRouter();


const obtenerClases = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/clases');
    clases.value = res.data;
  } catch (error) {
    console.error('Error al obtener las clases:', error);
  }
};


const eliminarClase = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/clases/${id}`);
    obtenerClases();
  } catch (error) {
    console.error('Error al eliminar la clase:', error);
  }
};

// Cargar las clases al montar el componente
onMounted(obtenerClases);
</script>

<style scoped>
.listado-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background: #f3f4f6;
  border-radius: 12px;
}

h2 {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #2563eb;
  color: white;
}

button,
.router-link {
  padding: 6px 12px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-crear {
  background-color: #38bdf8;
  color: white;
}

.btn-editar {
  background-color: #4caf50;
  color: white;
}

.btn-eliminar {
  background-color: #f44336;
  color: white;
}

button:hover,
.router-link:hover {
  opacity: 0.8;
}
</style>
