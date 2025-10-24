<template>
  <div class="patients-page">
    <!-- Header -->
    <Header />
    
    <!-- Плашка с поиском и кнопкой -->
    <SearchBar 
      @search="handleSearch"
      @add-patient="addPatient"
    />
    
    <!-- Основной контент -->
    <div class="content-container">
      <!-- Таблица пациентов -->
      <PatientsTable 
        :patients="currentPatients"
        :is-archive="activeTab === 'archive'"
        @view-patient="viewPatient"
        @archive-patient="archivePatient"
      />

      <!-- Пагинатор -->
      <Pagination 
        :current-page="currentPage"
        :total-pages="totalPages"
        @previous-page="goToPreviousPage"
        @next-page="goToNextPage"
      />
    </div>

    <!-- Модальное окно подтверждения архивации -->
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
import { useRouter, useRoute } from 'vue-router'
import { usePatients } from '../../composables/usePatients'
import Header from '../../components/layout/Header.vue'
import SearchBar from '../../components/patients/tables/SearchBar.vue'
import PatientsTable from '../../components/patients/tables/PatientsTable.vue'
import Pagination from '../../components/patients/tables/Pagination.vue'
import BaseConfirmationModal from '../../components/modals/BaseConfirmationModal.vue'

const router = useRouter()
const route = useRoute()
const { 
  getActivePatients, 
  getArchivedPatients, 
  searchPatients, 
  archivePatient: archivePatientAction, 
  restorePatient 
} = usePatients()

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 8

const activeTab = computed(() => {
  return route.path === '/archive' ? 'archive' : 'patients'
})

const allPatients = computed(() => {
  if (activeTab.value === 'archive') {
    return getArchivedPatients()
  }
  return getActivePatients()
})

const filteredPatients = computed(() => {
  if (searchQuery.value.trim()) {
    return searchPatients(searchQuery.value)
  }
  return allPatients.value
})

const totalPages = computed(() => {
  return Math.ceil(filteredPatients.value.length / itemsPerPage)
})

const currentPatients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPatients.value.slice(start, end)
})

const isArchiveModalOpen = ref(false)
const patientToArchive = ref(null)

const viewPatient = (patientId) => {
  router.push(`/patients/${patientId}`)
}

const archivePatient = (patientId) => {
  patientToArchive.value = patientId
  isArchiveModalOpen.value = true
}

const addPatient = () => {
  router.push('/patients/add')
}

const handleSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 1 // Reset to first page when searching
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const confirmArchive = () => {
  if (patientToArchive.value) {
    archivePatientAction(patientToArchive.value)
    alert('Пациент успешно перенесен в архив')
    isArchiveModalOpen.value = false
    patientToArchive.value = null
  }
}

const cancelArchive = () => {
  isArchiveModalOpen.value = false
  patientToArchive.value = null
}

onMounted(() => {
  currentPage.value = 1
})
</script>

<style scoped>
.patients-page {
  min-height: 100vh;
  background: #ffffff;
  padding-top: 160px;
}

.content-container {
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
}
</style>