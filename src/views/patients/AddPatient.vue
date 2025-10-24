<template>
  <div class="add-patient-page">
    <Header />
    
    <div class="breadcrumb">
      <router-link to="/patients" class="breadcrumb-item active">Список пациентов</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">Добавление пациента</span>
    </div>

    <AddPatientForm 
      ref="addPatientFormRef"
      @create="handleCreate"
      @cancel="handleCancel"
      class="add-patient-form"
    />

    <!-- Parent Data Form -->
    <ParentDataForm 
      ref="parentDataFormRef"
      @data-changed="handleParentDataChange"
    />

    <!-- Treatment Data Form -->
    <TreatmentDataForm 
      ref="treatmentDataFormRef"
      @data-changed="handleTreatmentDataChange"
    />

    <!-- Account Data Form -->
    <AccountDataForm 
      ref="accountDataFormRef"
      @data-changed="handleAccountDataChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatients } from '../../composables/usePatients'
import Header from '../../components/layout/Header.vue'
import AddPatientForm from '../../components/patients/forms/AddPatientForm.vue'
import ParentDataForm from '../../components/patients/forms/ParentDataForm.vue'
import TreatmentDataForm from '../../components/patients/forms/TreatmentDataForm.vue'
import AccountDataForm from '../../components/patients/forms/AccountDataForm.vue'

const router = useRouter()
const { createPatient } = usePatients()

const addPatientFormRef = ref(null)
const parentDataFormRef = ref(null)
const treatmentDataFormRef = ref(null)
const accountDataFormRef = ref(null)

const validateAllForms = () => {
  const isAddPatientValid = addPatientFormRef.value?.validateForm() || false
  const isParentDataValid = parentDataFormRef.value?.validateForm() || false
  const isTreatmentDataValid = treatmentDataFormRef.value?.validateForm() || false
  const isAccountDataValid = accountDataFormRef.value?.validateForm() || false
  
  return isAddPatientValid && isParentDataValid && isTreatmentDataValid && isAccountDataValid
}

const handleCreate = (patientData) => {
  if (!validateAllForms()) {
    return // Validation failed, errors are already displayed
  }
  
  createPatient(patientData)
  
  alert('Пациент успешно создан')
  router.push('/patients')
}

const handleCancel = () => {
  router.push('/patients')
}

const handleParentDataChange = (parentData) => {
  console.log('Parent data changed:', parentData)
}

const handleTreatmentDataChange = (treatmentData) => {
  console.log('Treatment data changed:', treatmentData)
}

const handleAccountDataChange = (accountData) => {
  console.log('Account data changed:', accountData)
}
</script>

<style scoped>
.add-patient-page {
  min-height: 100vh;
  background: #ffffff;
  padding-top: 160px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
}

.add-patient-form {
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
