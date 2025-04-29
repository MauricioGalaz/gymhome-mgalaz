<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <button @click="subirImagen">Subir Imagen</button>
      <img v-if="urlImagen" :src="urlImagen" alt="Imagen subida" width="200" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const imagen = ref(null)
  const urlImagen = ref('')
  
  const handleFileChange = (event) => {
    imagen.value = event.target.files[0]
  }
  
  const subirImagen = async () => {
    if (!imagen.value) return alert('Selecciona una imagen')
  
    const formData = new FormData()
    formData.append('imagen', imagen.value)
  
    try {
      const res = await axios.post('http://localhost:3001/api/uploads/imagen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      urlImagen.value = res.data.ruta
    } catch (error) {
      console.error(error)
      alert('Error al subir la imagen')
    }
  }
  </script>
  