<template>
  <div class="dashboard">
    <h1>Bienvenido al Dashboard</h1>

    <div v-if="esAdmin()">
      <p>👑 Contenido exclusivo para administradores</p>
    </div>

    <div v-if="esUsuario()">
      <p>🙋 Contenido exclusivo para usuarios</p>
    </div>

    <button @click="$router.push('/perfil')">Ir al Perfil</button>
    <button @click="$router.push('/clases')">Ir a Clases</button>
    <button @click="$router.push('/pagos')">Ir a Pagos</button>
  </div>
</template>

<script setup>
import { esAdmin, esUsuario } from '@/utils/auth';
</script>
