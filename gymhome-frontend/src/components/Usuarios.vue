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
        usuarios: [], // Array para almacenar la lista de usuarios
      };
    },
    created() {
      this.obtenerUsuarios(); // Llamar la función para obtener usuarios cuando el componente se carga
    },
    methods: {
      obtenerUsuarios() {
        const token = localStorage.getItem('token'); // Recuperar el token desde localStorage (o sessionStorage)
  
        fetch('http://localhost:3001/api/usuarios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.usuarios = data; // Almacenar los usuarios en el estado del componente
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
    },
  };
  </script>
