<template>
  <div>
    <h2>{{ modoEdicion ? 'Editar Plan' : 'Crear Plan' }}</h2>

    <form @submit.prevent="modoEdicion ? actualizarPlan() : crearPlan()">
      <input type="text" v-model="plan.nombre" placeholder="Nombre" required />
      <input type="text" v-model="plan.descripcion" placeholder="Descripción" required />
      <input type="number" v-model="plan.precio" placeholder="Precio" required />
      <input type="text" v-model="plan.dificultad" placeholder="Dificultad" required />
      <input type="number" v-model="plan.duracion" placeholder="Duración (días)" required />
      <button type="submit">{{ modoEdicion ? 'Actualizar' : 'Crear' }}</button>
      <button v-if="modoEdicion" @click="cancelarEdicion" type="button">Cancelar</button>
    </form>

    <p v-if="mensaje" :style="{ color: exito ? 'green' : 'red' }">{{ mensaje }}</p>

    <hr />
    <h3>Planes Existentes</h3>
    <ul>
      <li v-for="p in planes" :key="p.id">
        {{ p.nombre }} - {{ p.precio }} CLP
        <button @click="cargarPlan(p)">Editar</button>
        <button @click="eliminarPlan(p.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plan: {
        nombre: '',
        descripcion: '',
        precio: 0,
        dificultad: '',
        duracion: 0
      },
      planes: [],
      mensaje: '',
      exito: false,
      modoEdicion: false,
      planId: ''
    };
  },
  mounted() {
    this.listarPlanes();
  },
  methods: {
    async listarPlanes() {
      try {
        const res = await fetch('http://localhost:3001/api/planes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.planes = await res.json();
      } catch (e) {
        console.error('Error al listar planes:', e);
      }
    },
    async crearPlan() {
      try {
        const res = await fetch('http://localhost:3001/api/planes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.plan)
        });
        const data = await res.json();
        if (res.ok) {
          this.mensaje = '✅ Plan creado';
          this.exito = true;
          this.plan = { nombre: '', descripcion: '', precio: 0, dificultad: '', duracion: 0 };
          this.listarPlanes();
        } else {
          this.mensaje = data.mensaje || '❌ Error al crear';
          this.exito = false;
        }
      } catch (e) {
        this.mensaje = '❌ Error de red';
        this.exito = false;
      }
    },
    cargarPlan(p) {
      this.plan = { ...p };
      this.planId = p.id;
      this.modoEdicion = true;
    },
    async actualizarPlan() {
      try {
        const res = await fetch(`http://localhost:3001/api/planes/${this.planId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.plan)
        });
        const data = await res.json();
        if (res.ok) {
          this.mensaje = '✅ Plan actualizado';
          this.exito = true;
          this.cancelarEdicion();
          this.listarPlanes();
        } else {
          this.mensaje = data.mensaje || '❌ Error al actualizar';
          this.exito = false;
        }
      } catch (e) {
        this.mensaje = '❌ Error de red';
        this.exito = false;
      }
    },
    cancelarEdicion() {
      this.modoEdicion = false;
      this.plan = { nombre: '', descripcion: '', precio: 0, dificultad: '', duracion: 0 };
      this.planId = '';
    },
    async eliminarPlan(id) {
      if (!confirm('¿Eliminar este plan?')) return;
      try {
        const res = await fetch(`http://localhost:3001/api/planes/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
          this.mensaje = '✅ Plan eliminado';
          this.exito = true;
          this.listarPlanes();
        } else {
          this.mensaje = '❌ Error al eliminar';
          this.exito = false;
        }
      } catch (e) {
        this.mensaje = '❌ Error de red';
        this.exito = false;
      }
    }
  }
};
</script>
