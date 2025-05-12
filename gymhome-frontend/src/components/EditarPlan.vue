<template>
    <div>
      <h2>Editar Plan</h2>
      <form @submit.prevent="actualizarPlan">
        <label>Nombre:</label>
        <input v-model="plan.nombre" required />
  
        <label>Descripción:</label>
        <textarea v-model="plan.descripcion" required></textarea>
  
        <label>Dificultad:</label>
        <input v-model="plan.dificultad" required />
  
        <label>Duración:</label>
        <input type="number" v-model="plan.duracion" required />
  
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditarPlan',
    data() {
      return {
        plan: {
          nombre: '',
          descripcion: '',
          dificultad: '',
          duracion: '',
        },
      };
    },
    mounted() {
      this.cargarPlan();
    },
    methods: {
      async cargarPlan() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:3001/planes/${id_planes}`);
          this.plan = response.data;
        } catch (error) {
          console.error('Error al cargar el plan:', error);
        }
      },
      async actualizarPlan() {
        const id = this.$route.params.id;
        try {
          await axios.put(`http://localhost:3001/planes/${id_planes}`, this.plan);
          alert('Plan actualizado correctamente');
          this.$router.push(`/planes/${id_planes}`);
        } catch (error) {
          console.error('Error al actualizar el plan:', error);
        }
      },
    },
  };
  </script>