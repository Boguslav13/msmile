import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

import Login from './views/auth/Login.vue'
import PatientsList from './views/patients/PatientsList.vue'
import PatientCard from './views/patients/PatientCard.vue'
import PatientEdit from './views/patients/PatientEdit.vue'
import AddPatient from './views/patients/AddPatient.vue'
import EditPatient from './views/patients/EditPatient.vue'
import DoctorProfile from './views/doctor/DoctorProfile.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/patients',
    name: 'PatientsList',
    component: PatientsList
  },
  {
    path: '/archive',
    name: 'Archive',
    component: PatientsList
  },
  {
    path: '/patients/:id',
    name: 'PatientCard',
    component: PatientCard,
    props: true
  },
  {
    path: '/patients/:id/edit',
    name: 'PatientEdit',
    component: PatientEdit,
    props: true
  },
  {
    path: '/patients/add',
    name: 'AddPatient',
    component: AddPatient
  },
  {
    path: '/patients/:id/edit-new',
    name: 'EditPatient',
    component: EditPatient,
    props: true
  },
  {
    path: '/doctor/profile',
    name: 'DoctorProfile',
    component: DoctorProfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
