<template>
  <div class="progreso">
    <h2>Progreso del Usuario</h2>
    <ul>
      <li v-for="item in progresos" :key="item._id">{{ item.progreso }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/axiosConfig';  

const route = useRoute();
const progresos = ref([]);

onMounted(async () => {
  const id_usuario = route.params.id_usuario;
  try {
    const response = await api.get(`/progreso/${id_usuario}`);
    progresos.value = response.data;  
  } catch (error) {
    console.error('Error al cargar el progreso:', error);
  }
});
</script>

<style scoped>
.progreso {
  padding: 20px;
}
</style>
