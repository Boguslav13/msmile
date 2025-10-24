<template>
  <div class="patient-card-page">
    <Header />
    
    <div class="breadcrumb">
      <router-link to="/patients" class="breadcrumb-link">Список пациентов</router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">Карточка пациента</span>
    </div>

    <div class="main-content">
      <div class="left-column">
        <PatientInfoCard 
          v-if="patient"
          :patient="patient" 
          @archive="handleArchive"
          @edit="handleEdit"
        />

        <VisitHistory :visits="visits" />
      </div>

      <div class="right-column">
        <VisitCalendar />
        <NotesSection />
        <AppSection />
      </div>
    </div>

    <!-- Archive confirmation modal -->
    <BaseConfirmationModal
      v-model="isArchiveModalOpen"
      title="Поместить в архив"
      message="Вы уверены, что хотите перенести пациента в архив?"
      primary-text="Нет, оставить"
      secondary-text="Перенести"
      @primary="cancelArchive"
      @secondary="confirmArchive"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePatients } from '../../composables/usePatients'
import Header from '../../components/layout/Header.vue'
import PatientInfoCard from '../../components/patients/sections/PatientInfoCard.vue'
import VisitHistory from '../../components/patients/sections/VisitHistory.vue'
import VisitCalendar from '../../components/patients/sections/VisitCalendar.vue'
import NotesSection from '../../components/patients/sections/NotesSection.vue'
import AppSection from '../../components/patients/sections/AppSection.vue'
import BaseConfirmationModal from '../../components/modals/BaseConfirmationModal.vue'

const route = useRoute()
const router = useRouter()
const { getPatient, getPatientVisits, getPatientNotes, getPatientAppointments, archivePatient } = usePatients()

const isArchiveModalOpen = ref(false)

const patient = ref(null)
const visits = ref([])
const notes = ref([])
const appointments = ref([])

onMounted(() => {
  const patientId = route.params.id
  patient.value = getPatient(patientId)
  visits.value = getPatientVisits(patientId)
  notes.value = getPatientNotes(patientId)
  appointments.value = getPatientAppointments(patientId)
})

const handleArchive = (patientId) => {
  isArchiveModalOpen.value = true
}

const confirmArchive = () => {
  if (patient.value) {
    archivePatient(patient.value.id)
    alert('Пациент успешно перенесен в архив')
    isArchiveModalOpen.value = false
    
    router.push('/patients')
  }
}

const cancelArchive = () => {
  isArchiveModalOpen.value = false
}

const handleEdit = (patientId) => {
  router.push(`/patients/${patientId}/edit-new`)
}
</script>

<style scoped>
.patient-card-page {
  min-height: 100vh;
  background: #ffffff;
  padding-top: 160px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
}

.main-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.left-column {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.right-column {
  flex: 0 0 39%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0 0 0;
}

.breadcrumb-link {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.005em;
  color: #3B7AB8;
  text-decoration: none;
}

.breadcrumb-separator {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.005em;
  color: #6B7897;
}

.breadcrumb-current {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.005em;
  color: #C4C4C4;
}
</style>
