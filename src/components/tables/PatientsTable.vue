<template>
  <div class="patients-table">
    <!-- Заголовок таблицы -->
    <div class="table-header" :class="{ 'archive-header': isArchive }">
      <div class="header-cell patient-col">Пациент</div>
      <div class="header-cell age-col">Возраст</div>
      <div class="header-cell date-col">Дата начала</div>
      <div class="header-cell stage-col">Этап лечения</div>
      <div class="header-cell cap-col">Текущая каппа</div>
      <div class="header-cell cycle-col">Цикл смены</div>
      <div class="header-cell count-col">Кол-во капп</div>
      <div class="header-cell visit-col">Следующий визит</div>
      <div class="header-cell notes-col">Примечания</div>
      <div class="header-cell actions-col">Действия</div>
    </div>

    <!-- Строки таблицы -->
    <div class="table-rows">
      <div 
        v-for="(patient, index) in patients" 
        :key="patient.id"
        class="table-row"
        :class="{ 'alternate': index % 2 === 1 }"
      >
        <!-- Пациент -->
        <div class="table-cell patient-col">
          <div class="patient-info" @click="handleViewPatient(patient.id)">
            <div class="patient-avatar">
              <img :src="patient.avatar" :alt="patient.name" />
            </div>
            <div class="patient-name">{{ patient.name }}</div>
          </div>
        </div>
        
        <!-- Возраст -->
        <div class="table-cell age-col">{{ patient.age }} лет</div>
        
        <!-- Дата начала -->
        <div class="table-cell date-col">{{ patient.startDate }}</div>
        
        <!-- Этап лечения -->
        <div class="table-cell stage-col stage-cell">{{ patient.treatmentStage }}</div>
        
        <!-- Текущая каппа -->
        <div class="table-cell cap-col cap-cell">{{ patient.currentCap }}</div>
        
        <!-- Цикл смены -->
        <div class="table-cell cycle-col">{{ patient.changeCycle }}</div>
        
        <!-- Кол-во капп -->
        <div class="table-cell count-col">{{ patient.capsCount }}</div>
        
        <!-- Следующий визит -->
        <div class="table-cell visit-col">{{ patient.nextVisit }}</div>
        
        <!-- Примечания -->
        <div class="table-cell notes-col">{{ patient.notes }}</div>
        
        <!-- Действия -->
        <div class="table-cell actions-col">
          <div class="actions">
            <button class="action-btn" @click="handleViewPatient(patient.id)">
              <img src="/icons/blue_eye.svg" alt="Просмотр" />
            </button>
            <button v-if="!isArchive" class="action-btn" @click="handleArchivePatient(patient.id)">
              <img src="/icons/archive.svg" alt="Архив" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  patients: {
    type: Array,
    required: true
  },
  isArchive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['view-patient', 'archive-patient'])

const handleViewPatient = (patientId) => {
  emit('view-patient', patientId)
}

const handleArchivePatient = (patientId) => {
  emit('archive-patient', patientId)
}
</script>

<style scoped>
/* Таблица пациентов */
.patients-table {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  margin-top: 20px;
  overflow-x: auto;
  overflow-y: visible;
}

/* Заголовок таблицы */
.table-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px 5px 16px;
  gap: 16px;
  width: 98%;
  min-width: 1600px;
  height: 54px;
  background: #FDF3C8;
  border-radius: 12px;
  margin-bottom: 0;
}

/* Заголовок таблицы для архива */
.table-header.archive-header {
  background: #CACACA;
}

.header-cell {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  color: #1F2937;
}

/* Колонки заголовка */
.patient-col { flex: 1; min-width: 150px; }
.age-col { width: 70px; flex: none; }
.date-col { width: 150px; flex: none; }
.stage-col { flex: 1; min-width: 180px; margin-right: -12px; }
.cap-col { width: 120px; flex: none; margin-left: -12px; }
.cycle-col { width: 150px; flex: none; }
.count-col { width: 100px; flex: none; }
.visit-col { width: 150px; flex: none; }
.notes-col { flex: 1; min-width: 180px; }
.actions-col { width: 80px; flex: none; }

/* Строки таблицы */
.table-rows {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 1600px;
  gap: 0;
}

.table-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 98%;
  min-width: 1600px;
  height: 92px;
  border-radius: 12px;
  margin-bottom: 0;
}

.table-row.alternate {
  background: rgba(200, 200, 200, 0.15);
}

.table-cell {
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.stage-cell {
  margin-right: -12px;
}

.cap-cell {
  margin-left: -12px;
}

/* Информация о пациенте */
.patient-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding-top: 8px;
  cursor: pointer;
}

.patient-info:hover {
  opacity: 0.8;
}

.patient-avatar {
  width: 60px;
  height: 60px;
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.patient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.patient-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  text-decoration-line: underline;
  color: #104D89;
  flex: 1;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}

/* Действия */
.actions {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0 8px;
  gap: 16px;
  width: 88px;
  height: 24px;
}

.action-btn {
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.action-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Стилизация скроллбара */
.patients-table::-webkit-scrollbar {
  height: 8px;
}

.patients-table::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.patients-table::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.patients-table::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
