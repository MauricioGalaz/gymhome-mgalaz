<template>
  <div class="planes-container">
    <h1>Planes de Salud</h1>

    <div class="section">
      <h2>🍎 Plan Alimenticio</h2>
      <p>Recibe un plan alimenticio personalizado según tus objetivos.</p>
      <button class="btn">Ver Plan</button>
    </div>

    <div class="section">
      <h2>💪 Evaluación Física</h2>
      <p>Consulta tu estado físico actual y recibe sugerencias.</p>
      <button class="btn">Ver Evaluación</button>
    </div>

    <div class="section">
      <h2>✅ Recomendación</h2>
      <p>Obtén recomendaciones saludables según tu progreso.</p>
      <button class="btn">Ver Recomendaciones</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.planes-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 30px;
}

.section {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

h2 {
  color: #2563eb;
}

.btn {
  margin-top: 10px;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #1d4ed8;
}


@media (max-width: 768px) {
  .planes-salud-container {
    padding: 10px;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 16px;
  }

  .btn {
    width: 100%;
  }
}
</style>
