<template>
    <div>
      <h1>Usuarios</h1>
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nombre }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        usuarios: [], 
      };
    },
    created() {
      this.obtenerUsuarios(); 
    },
    methods: {
      obtenerUsuarios() {
        const token = localStorage.getItem('token'); 
  
        fetch('http://localhost:3001/api/usuarios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.usuarios = data; 
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
    },
  };
  </script>
