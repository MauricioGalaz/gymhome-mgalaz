import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import PlanesView from '../views/PlanesView.vue';
import EditPlanView from '../views/EditPlanView.vue';
import ClasesView from '../views/ClasesView.vue';
import PerfilView from '../views/PerfilView.vue';
import PagosView from '../views/PagosView.vue';
import ReportesView from '../views/ReportesView.vue';
import PlanDetalleView from '../views/PlanDetalleView.vue';
import DashboardView from '../views/DashboardView.vue';
import FormularioClase from '../components/FormularioClase.vue';

import { estaAutenticado } from '@/utils/auth';

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/usuarios/:id/escoger-plan',
    name: 'EscogerPlan',
    component: () => import('@/views/EscogerPlanView.vue'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/planes',
    name: 'Planes',
    component: PlanesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/planes/:id',
    name: 'DetallePlan',
    component: PlanDetalleView,
    meta: { requiresAuth: true }
  },
  {
    path: '/planes/editar/:id',
    name: 'EditarPlan',
    component: EditPlanView,
    meta: { requiresAuth: true }
  },
  {
    path: '/clases',
    name: 'Clases',
    component: ClasesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: PerfilView,
    meta: { requiresAuth: true }
  },
  
  {
    path: '/pagos',
    name: 'Pagos',
    component: PagosView,
    meta: { requiresAuth: true }
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: ReportesView,
    meta: { requiresAuth: true }
  },
   {
    path: '/formulario-clase',
    name: 'FormularioClase',
    component: FormularioClase
  },
  {
  path: '/clase/nueva',
  component: () => import('@/views/FormularioClaseView.vue')
},
{
  path: '/clase/:id',
  component: () => import('@/views/FormularioClaseView.vue')
}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware global para autenticaciÃ³n
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !estaAutenticado()) {
    next({ name: 'Login' });
  } else if ((to.name === 'Login' || to.name === 'Signup') && estaAutenticado()) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;

