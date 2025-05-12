<template>
    <h1 class="titulo">Bienvenido a GymHome Limache</h1>
    <div class="dashboard-container">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
    <p class="descripcion">Tu espacio personal para entrenar desde casa con comodidad y control.</p>
    <div class="dashboard-content">
      <img src="@/assets/entrenamiento.jpg" alt="Entrenamiento" class="foto-principal" />

      <div class="grafico">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'


onMounted(async () => {
  await nextTick() // Espera a que el canvas esté en el DOM
  const canvas = document.getElementById('myChart')
  if (canvas) {
    const ctx = canvas.getContext('2d')
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        datasets: [{
          label: 'Usuarios activos',
          data: [5, 8, 6, 9, 7],
          backgroundColor: '#3B82F6'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Actividad semanal' }
        }
      }
    })
  }
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.btn-add {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
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

.titulo {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.descripcion {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #555;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.foto-principal {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.grafico {
  width: 100%;
  max-width: 600px;
}
</style>
