import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import PlanesView from '../views/PlanesView.vue'
import ClasesView from '../views/ClasesView.vue'
import PerfilView from '../views/PerfilView.vue'
import SignupView from '../views/SignupView.vue'
import ReportesView from '../views/ReportesView.vue'
import PagosView from '../views/PagosView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/signup', component: SignupView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/planes', component: PlanesView, meta: { requiresAuth: true } },
  { path: '/clases', component: ClasesView, meta: { requiresAuth: true } },
  { path: '/perfil', component: PerfilView, meta: { requiresAuth: true } },
  { path: '/reportes', component: ReportesView, meta: { requiresAuth: true } },
  { path: '/pagos', component: PagosView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  
  if (to.meta.requiresAuth && !token) {
    next('/') // Redirige al login
  } else if ((to.path === '/' || to.path === '/signup') && token) {
    next('/dashboard') // Redirige al dashboard si ya está logueado
  } else {
    next()
  }
})

// Exportamos también la función cerrarSesion
export function cerrarSesion() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('usuario')
}

export default router
