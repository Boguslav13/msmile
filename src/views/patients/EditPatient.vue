<template>
  <div class="edit-patient-page">
    <Header />
    
    <div class="breadcrumb">
      <router-link to="/patients" class="breadcrumb-item active">Список пациентов</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link to="/patients/1" class="breadcrumb-item active">Карточка пациента</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">Редактирование пациента</span>
    </div>

    <AddPatientForm 
      ref="editPatientFormRef"
      :patient-data="patientData"
      :is-edit-mode="true"
      @update="handleUpdate"
      @cancel="handleCancel"
      class="edit-patient-form"
    />

    <ParentDataForm 
      ref="editParentDataFormRef"
      :parent-data="parentData"
      :is-edit-mode="true"
      @data-changed="handleParentDataChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePatients } from '../../composables/usePatients'
import Header from '../../components/layout/Header.vue'
import AddPatientForm from '../../components/patients/forms/AddPatientForm.vue'
import ParentDataForm from '../../components/patients/forms/ParentDataForm.vue'

const router = useRouter()
const route = useRoute()
const { getPatient, updatePatient } = usePatients()

const editPatientFormRef = ref(null)
const editParentDataFormRef = ref(null)

const patientData = ref(null)
const parentData = ref(null)

const validateAllForms = () => {
  const isEditPatientValid = editPatientFormRef.value?.validateForm() || false
  const isEditParentDataValid = editParentDataFormRef.value?.validateForm() || false
  
  return isEditPatientValid && isEditParentDataValid
}

const handleUpdate = (updatedPatientData) => {
  if (!validateAllForms()) {
    return // Validation failed, errors are already displayed
  }
  
  const patientId = route.params.id
  updatePatient(patientId, updatedPatientData)
  
  alert('Данные пациента успешно обновлены')
  router.push(`/patients/${patientId}`) // Redirect to patient card
}

const handleCancel = () => {
  const patientId = route.params.id
  router.push(`/patients/${patientId}`) // Redirect to patient card
}

const handleParentDataChange = (parentData) => {
  console.log('Parent data changed:', parentData)
}

onMounted(() => {
  const patientId = route.params.id
  const patient = getPatient(patientId)
  
  if (patient) {
    patientData.value = {
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      birthDate: patient.birthDate,
      photo: patient.photo,
      notes: patient.notes
    }
    
    parentData.value = patient.parentData
  }
})
</script>

<style scoped>
.edit-patient-page {
  min-height: 100vh;
  background: #ffffff;
  padding-top: 160px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
}

.edit-patient-form {
  margin-top: 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0 0 0;
}

.breadcrumb-item {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.005em;
  color: #3B7AB8;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #3B7AB8;
}

.breadcrumb-item:not(.active) {
  color: #C4C4C4;
}

.breadcrumb-separator {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.005em;
  color: #6B7897;
}
</style>
