<template>
  <div class="perfil-contenedor">
    <div class="perfil-header">
      <h1>Perfil de Usuario</h1>
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>
      <button v-if="!editando" class="boton-editar" @click="activarEdicion">Editar Perfil</button>
    </div>

    <div v-if="cargando" class="perfil-contenedor cargando">
      <div class="spinner"></div>
      <p>Cargando datos del perfil...</p>
    </div>

    <div v-else-if="error" class="perfil-contenedor error">
      <div class="mensaje-error">
        <i class="icono-error">⚠️</i>
        <p>{{ error }}</p>
        <button @click="cargarDatosUsuario" class="boton-reintentar">Reintentar</button>
      </div>
    </div>

    <div v-else class="perfil-contenido">
      <div class="perfil-info">
        <!-- Formulario de edición -->
        <form v-if="editando" @submit.prevent="guardarCambios" class="formulario-perfil">
          <div class="imagen-perfil-contenedor">
            <img :src="usuario.imagen_perfil || '/img/default-user.png'" alt="Foto de perfil" class="imagen-perfil" />
            <button type="button" class="boton-cambiar-imagen" @click="abrirSelectorImagen">Cambiar imagen</button>
            <input type="file" ref="fileInput" style="display: none" @change="seleccionarImagen" accept="image/*" />
          </div>

          <div class="grupo-campos">
            <div class="campo">
              <label for="nombre">Nombre completo:</label>
              <input type="text" id="nombre" v-model="datosForm.nombre" required />
            </div>
            <div class="campo">
              <label for="email">Correo electrónico:</label>
              <input type="email" id="email" v-model="datosForm.email" required />
            </div>
            <div class="campo">
              <label for="telefono">Teléfono:</label>
              <input type="tel" id="telefono" v-model="datosForm.telefono" />
            </div>
            <div class="campo">
              <label for="objetivo">Objetivo:</label>
              <select id="objetivo" v-model="datosForm.objetivo">
                <option value="Pérdida de peso">Pérdida de peso</option>
                <option value="Ganancia muscular">Ganancia muscular</option>
                <option value="Tonificación">Tonificación</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Rendimiento">Rendimiento deportivo</option>
              </select>
            </div>
            <div class="campo">
              <label for="peso">Peso (kg):</label>
              <input type="number" id="peso" v-model="datosForm.peso" step="0.1" />
            </div>
            <div class="campo">
              <label for="altura">Altura (cm):</label>
              <input type="number" id="altura" v-model="datosForm.altura" />
            </div>
          </div>

          <div class="acciones-formulario">
            <button type="submit" class="boton-guardar">Guardar cambios</button>
            <button type="button" class="boton-cancelar" @click="cancelarEdicion">Cancelar</button>
          </div>
        </form>

        <!-- Vista solo lectura -->
        <div v-else>
          <div class="usuario-info-principal">
            <div class="imagen-perfil-contenedor">
              <img :src="usuario.imagen_perfil || '/img/default-user.png'" alt="Foto de perfil" class="imagen-perfil" />
            </div>
            <div class="detalles-principales">
              <h2>{{ usuario.nombre }}</h2>
              <p><strong>Email:</strong> {{ usuario.email }}</p>
              <p><strong>Teléfono:</strong> {{ usuario.telefono || 'No especificado' }}</p>
              <p><strong>Miembro desde:</strong> {{ formatearFecha(usuario.fecha_registro) }}</p>
            </div>
          </div>

          <div class="usuario-metricas">
            <div class="metrica">
              <span class="metrica-valor">{{ usuario.peso || 'N/A' }} kg</span>
              <span class="metrica-etiqueta">Peso actual</span>
            </div>
            <div class="metrica">
              <span class="metrica-valor">{{ usuario.altura || 'N/A' }} cm</span>
              <span class="metrica-etiqueta">Altura</span>
            </div>
            <div class="metrica">
              <span class="metrica-valor">{{ calcularIMC() }}</span>
              <span class="metrica-etiqueta">IMC</span>
            </div>
            <div class="metrica">
              <span class="metrica-valor">{{ usuario.objetivo || 'No establecido' }}</span>
              <span class="metrica-etiqueta">Objetivo</span>
            </div>
          </div>
        </div>
      </div>

      <div class="perfil-sesiones">
        <h2>Sesiones de Entrenamiento</h2>
        <div v-if="cargandoSesiones" class="cargando-sesiones">
          <div class="spinner"></div>
          <p>Cargando sesiones...</p>
        </div>
        <div v-else-if="errorSesiones" class="error-sesiones">
          <p>{{ errorSesiones }}</p>
          <button @click="cargarSesiones" class="boton-reintentar">Reintentar</button>
        </div>
        <div v-else-if="sesiones.length === 0" class="sin-sesiones">
          <p>No tienes sesiones de entrenamiento registradas.</p>
        </div>
        <div v-else class="tabla-sesiones">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Entrenador</th>
                <th>Duración (min)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sesion in sesiones" :key="sesion.id_sesiones">
                <td>{{ sesion.id_sesiones }}</td>
                <td>{{ formatearFecha(sesion.fecha) }}</td>
                <td>{{ obtenerNombreEntrenador(sesion.id_entrenadores) }}</td>
                <td>{{ sesion.duracion }}</td>
                <td>
                  <button @click="verDetalleSesion(sesion)" class="boton-detalle">Ver detalle</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="modalSesion" class="modal-sesion">
      <div class="modal-contenido">
        <span class="cerrar-modal" @click="cerrarModalSesion">&times;</span>
        <h3>Detalles de la Sesión #{{ sesionSeleccionada.id_sesiones }}</h3>
        <div class="detalles-sesion">
          <p><strong>Fecha:</strong> {{ formatearFecha(sesionSeleccionada.fecha) }}</p>
          <p><strong>Entrenador:</strong> {{ obtenerNombreEntrenador(sesionSeleccionada.id_entrenadores) }}</p>
          <p><strong>Duración:</strong> {{ sesionSeleccionada.duracion }} minutos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PerfilView',
  data() {
    return {
      usuario: {},
      sesiones: [],
      entrenadores: [],
      cargando: true,
      cargandoSesiones: true,
      error: null,
      errorSesiones: null,
      editando: false,
      datosForm: {
        nombre: '',
        email: '',
        telefono: '',
        objetivo: '',
        peso: '',
        altura: ''
      },
      modalSesion: false,
      sesionSeleccionada: {}
    };
  },
  created() {
    this.cargarDatosUsuario();
    this.cargarEntrenadores();
  },
  methods: {
    obtenerUsuarioId() {
      return localStorage.getItem('usuarioId') || 1;
    },
    async cargarDatosUsuario() {
      this.cargando = true;
      this.error = null;
      try {
        const usuarioId = this.obtenerUsuarioId();
        const response = await axios.get(`/api/usuarios/${usuarioId}`);
        this.usuario = response.data;
        this.datosForm = { ...this.usuario };
        await this.cargarSesiones();
      } catch (err) {
        this.error = "No se pudieron cargar los datos del usuario";
      } finally {
        this.cargando = false;
      }
    },
    async cargarEntrenadores() {
      try {
        const response = await axios.get('/api/entrenadores');
        this.entrenadores = response.data;
      } catch {
        this.entrenadores = [];
      }
    },
    async cargarSesiones() {
      this.cargandoSesiones = true;
      this.errorSesiones = null;
      try {
        const usuarioId = this.obtenerUsuarioId();
        const response = await axios.get(`/api/sesiones/usuario/${usuarioId}`);
        this.sesiones = response.data;
      } catch {
        this.errorSesiones = "No se pudieron cargar las sesiones";
      } finally {
        this.cargandoSesiones = false;
      }
    },
    activarEdicion() {
      this.editando = true;
    },
    cancelarEdicion() {
      this.editando = false;
      this.datosForm = { ...this.usuario };
    },
    async guardarCambios() {
      try {
        const usuarioId = this.obtenerUsuarioId();
        await axios.put(`/api/usuarios/${usuarioId}`, this.datosForm);
        await this.cargarDatosUsuario();
        this.editando = false;
      } catch (error) {
        alert("Error al guardar los cambios");
      }
    },
    abrirSelectorImagen() {
      this.$refs.fileInput.click();
    },
    seleccionarImagen(event) {
      const archivo = event.target.files[0];
      if (archivo) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.datosForm.imagen_perfil = e.target.result;
        };
        reader.readAsDataURL(archivo);
      }
    },
    formatearFecha(fecha) {
      return new Date(fecha).toLocaleDateString();
    },
    calcularIMC() {
      const peso = parseFloat(this.usuario.peso);
      const altura = parseFloat(this.usuario.altura) / 100;
      if (peso && altura) {
        return (peso / (altura * altura)).toFixed(1);
      }
      return "N/A";
    },
    obtenerNombreEntrenador(id) {
      const entrenador = this.entrenadores.find(e => e.id_entrenadores === id);
      return entrenador ? entrenador.nombre : 'Desconocido';
    },
    verDetalleSesion(sesion) {
      this.sesionSeleccionada = sesion;
      this.modalSesion = true;
    },
    cerrarModalSesion() {
      this.modalSesion = false;
    }
  }
};
</script>

<style scoped>
.perfil-contenedor {
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.perfil-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}
.h1 {
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
.perfil-contenido {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .perfil-contenido {
    grid-template-columns: 1fr;
  }
}

.perfil-info {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.usuario-info-principal {
  display: flex;
  margin-bottom: 2rem;
}

.imagen-perfil-contenedor {
  position: relative;
  margin-right: 1.5rem;
}

.imagen-perfil {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1565c0;
}

.boton-cambiar-imagen {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(21, 101, 192, 0.8);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  white-space: nowrap;
}

.detalles-principales h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #333;
}

.detalles-principales p {
  margin: 0.5rem 0;
  color: #555;
}

.usuario-metricas {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.metrica {
  flex: 1;
  min-width: 80px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem 0.5rem;
  margin: 0 0.5rem 0.5rem 0;
}

.metrica-valor {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1565c0;
}

.metrica-etiqueta {
  display: block;
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.25rem;
}

.perfil-sesiones {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.perfil-sesiones h2 {
  color: #1565c0;
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.tabla-sesiones table {
  width: 100%;
  border-collapse: collapse;
}

.tabla-sesiones th, 
.tabla-sesiones td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.tabla-sesiones th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.boton-detalle {
  background-color: #1565c0;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
}

/* Formulario de edición */
.formulario-perfil {
  width: 100%;
}

.grupo-campos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 500px) {
  .grupo-campos {
    grid-template-columns: 1fr;
  }
}

.campo {
  margin-bottom: 1rem;
}

.campo label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #555;
}

.campo input,
.campo select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

.acciones-formulario {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 1rem;
}

/* Botones */
.boton-editar,
.boton-guardar,
.boton-cancelar,
.boton-reintentar {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.boton-editar {
  background-color: #f5f5f5;
  color: #1565c0;
  border: 1px solid #1565c0;
}

.boton-guardar {
  background-color: #1565c0;
  color: white;
  border: none;
}

.boton-cancelar {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ccc;
}

.boton-reintentar {
  background-color: #1565c0;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
}

/* Estados de carga y error */
.cargando, .cargando-sesiones {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #1565c0;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error, .error-sesiones {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.mensaje-error {
  text-align: center;
  padding: 2rem;
  background-color: #ffebee;
  border-radius: 8px;
  max-width: 400px;
}

.icono-error {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.sin-sesiones {
  text-align: center;
  padding: 2rem;
  color: #777;
  background-color: #f5f5f5;
  border-radius: 8px;
}


.modal-sesion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-contenido {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.cerrar-modal {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.detalles-sesion {
  margin-top: 1rem;
}

.detalles-sesion p {
  margin: 0.5rem 0;
}
</style>