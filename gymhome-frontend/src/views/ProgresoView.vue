<template>
    <div class="progreso-container">
      <h1>Mi Progreso</h1>
  
      <div v-if="progresos.length === 0">
        <p>No se ha registrado progreso todavía.</p>
      </div>
  
      <div v-for="progreso in progresos" :key="progreso.id_progreso" class="progreso-card"></div>
        <p><strong>Fecha:</strong> {{ formatoFecha(progreso.fecha) }}</p>
        <p><strong>Plan ID:</strong> {{ progreso.plan_id }}</p>
        <p><strong>Avance:</strong> {{ progreso.avance }}</p>
      </div>
  
      <button @click="mostrarFormulario = !mostrarFormulario" class="btn-toggle-form">
        {{ mostrarFormulario ? 'Cancelar' : 'Registrar Nuevo Progreso' }}
      </button>
  
      <form v-if="mostrarFormulario" @submit.prevent="registrarProgreso" class="formulario-progreso">
        <input type="number" v-model="nuevoProgreso.plan_id" placeholder="ID del Plan" required />
        <input type="text" v-model="nuevoProgreso.avance" placeholder="Descripción de avance" required />
        <input type="date" v-model="nuevoProgreso.fecha" required />
        <button type="submit">Guardar Progreso</button>
      </form>

  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const progresos = ref([])
  const mostrarFormulario = ref(false)
  const nuevoProgreso = ref({
    plan_id: '',
    avance: '',
    fecha: ''
  })
  
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  
  const cargarProgresos = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/progresos/${usuario.id}`)
      progresos.value = res.data
    } catch (error) {
      console.error(error)
      alert('Error al cargar progresos')
    }
  }
  
  const registrarProgreso = async () => {
    try {
      await axios.post('http://localhost:3001/api/progresos', {
        usuario_id: usuario.id,
        ...nuevoProgreso.value
      })
      alert('Progreso registrado correctamente')
      mostrarFormulario.value = false
      await cargarProgresos()
    } catch (error) {
      console.error(error)
      alert('Error al registrar progreso')
    }
  }
  
  const formatoFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString()
  }
  
  onMounted(() => {
    cargarProgresos()
  })
  </script>
  
  <style scoped>
  .progreso-container {
    padding: 20px;
    text-align: center;
  }
  
  .progreso-card {
    background: #f9fafb;
    padding: 20px;
    margin: 15px 0;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .formulario-progreso {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .formulario-progreso input {
    width: 250px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  
  .formulario-progreso button {
    padding: 10px 20px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .btn-toggle-form {
    margin-top: 20px;
    background-color: #10b981;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
  
  .btn-toggle-form:hover {
    background-color: #059669;
  }
  </style>
  