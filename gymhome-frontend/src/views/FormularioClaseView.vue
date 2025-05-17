<template>
  <div class="formulario-container">
    <h1>{{ editando ? 'Editar Sesión' : 'Nueva Sesión' }}</h1>
    
    <div v-if="cargando" class="loading">
      <p>Cargando datos...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <form v-else @submit.prevent="guardarSesion" class="formulario">
      <div class="form-group">
        <label for="usuario">Usuario:</label>
        <select id="usuario" v-model="sesion.id_usuarios" required class="form-control">
          <option value="" disabled>Seleccione un usuario</option>
          <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
            {{ usuario.nombre }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="entrenador">Entrenador:</label>
        <select id="entrenador" v-model="sesion.id_entrenadores" required class="form-control">
          <option value="" disabled>Seleccione un entrenador</option>
          <option v-for="entrenador in entrenadores" :key="entrenador.id" :value="entrenador.id">
            {{ entrenador.nombre }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="fecha">Fecha y Hora:</label>
        <input 
          type="datetime-local" 
          id="fecha" 
          v-model="sesion.fecha" 
          required
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="duracion">Duración (minutos):</label>
        <input 
          type="number" 
          id="duracion" 
          v-model="sesion.duracion" 
          min="15" 
          step="15" 
          required
          class="form-control"
        />
      </div>
      
      <div class="botones-accion">
        <button type="submit" class="btn-save">Guardar</button>
        <button type="button" @click="volver" class="btn-cancel">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'FormularioClaseView',
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    
    const sesion = reactive({
      id_usuarios: '',
      id_entrenadores: '',
      fecha: '',
      duracion: 60
    });
    
    const usuarios = ref([]);
    const entrenadores = ref([]);
    const cargando = ref(true);
    const error = ref(null);
    
    
    const id = computed(() => route.params.id);
    const editando = computed(() => !!id.value);
    
    // Cargar datos de usuarios y entrenadores
    const cargarDatos = async () => {
      try {
        cargando.value = true;
        
        // Cargar usuarios
        const respUsuarios = await axios.get('http://localhost:3001/api/usuarios');
        usuarios.value = respUsuarios.data;
        
        // Cargar entrenadores
        const respEntrenadores = await axios.get('http://localhost:3001/api/entrenadores');
        entrenadores.value = respEntrenadores.data;
        
        // Si estamos editando, cargar datos de la sesión
        if (editando.value) {
          const respSesion = await axios.get(`http://localhost:3001/api/sesiones/${id.value}`);
          const datosSesion = respSesion.data;
          
          // Formatear la fecha para el input datetime-local
          const fechaObj = new Date(datosSesion.fecha);
          const año = fechaObj.getFullYear();
          const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
          const dia = String(fechaObj.getDate()).padStart(2, '0');
          const hora = String(fechaObj.getHours()).padStart(2, '0');
          const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
          
          
          Object.assign(sesion, {
            id_usuarios: datosSesion.id_usuarios,
            id_entrenadores: datosSesion.id_entrenadores,
            fecha: `${año}-${mes}-${dia}T${hora}:${minutos}`,
            duracion: datosSesion.duracion
          });
        } else {
         
          const fechaActual = new Date();
          fechaActual.setHours(fechaActual.getHours() + 1);
          
          const año = fechaActual.getFullYear();
          const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
          const dia = String(fechaActual.getDate()).padStart(2, '0');
          const hora = String(fechaActual.getHours()).padStart(2, '0');
          const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
          
          sesion.fecha = `${año}-${mes}-${dia}T${hora}:${minutos}`;
        }
        
        cargando.value = false;
      } catch (err) {
        console.error('Error al cargar datos:', err);
        error.value = 'Error al cargar los datos necesarios. Por favor, inténtelo de nuevo.';
        cargando.value = false;
      }
    };
    
    
    const guardarSesion = async () => {
      try {
        
        const datosSesion = {
          id_usuarios: sesion.id_usuarios,
          id_entrenadores: sesion.id_entrenadores,
          fecha: new Date(sesion.fecha).toISOString(),
          duracion: parseInt(sesion.duracion)
        };
        
        if (editando.value) {
          // Actualizar sesión existente
          await axios.put(`http://localhost:3001/api/sesiones/${id.value}`, datosSesion);
        } else {
          // Crear nueva sesión
          await axios.post('http://localhost:3001/api/sesiones', datosSesion);
        }
        
        // Redirigir a la lista de sesiones
        router.push('/clases');
      } catch (err) {
        console.error('Error al guardar la sesión:', err);
        alert('Error al guardar los datos. Por favor, inténtelo de nuevo.');
      }
    };
    
    // Volver a la lista de sesiones
    const volver = () => {
      router.push('/clases');
    };
    
    // Cargar datos al montar el componente
    onMounted(() => {
      cargarDatos();
    });
    
    return {
      sesion,
      usuarios,
      entrenadores,
      cargando,
      error,
      editando,
      guardarSesion,
      volver
    };
  }
};
</script>

<style scoped>
.formulario-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.formulario {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.botones-accion {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  margin-right: 10px;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  margin-left: 10px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-top: 20px;
}

.error {
  color: #f44336;
}
</style>