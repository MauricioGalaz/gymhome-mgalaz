<script setup>
import { esAdmin, esUsuario } from '@/utils/auth';
</script>

<template>
  <h1>Bienvenido al Dashboard</h1>

  <div v-if="esAdmin()">
    <p>👑 Contenido exclusivo para administradores</p>
  </div>

  <div v-if="esUsuario()">
    <p>🙋 Contenido exclusivo para usuarios</p>
  </div>
</template>
