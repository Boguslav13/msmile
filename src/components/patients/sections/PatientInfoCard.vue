<template>
  <div class="patient-info-card">
    <!-- Patient photo -->
    <div class="patient-photo">
      <img :src="patient.avatar" :alt="patient.name" />
    </div>

    <!-- Patient details -->
    <div class="patient-details">
      <div class="patient-name">{{ patient.name }}</div>
      
      <div class="details-grid">
        <!-- Left column - Personal info -->
        <div class="details-column">
          <div class="detail-row">
            <span class="detail-label">Дата рождения:</span>
            <span class="detail-value">{{ patient.birthDate }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">ФИО родителя:</span>
            <span class="detail-value">{{ patient.parentName }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Эл. почта:</span>
            <span class="detail-value">{{ patient.email }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Номер телефона:</span>
            <span class="detail-value">{{ patient.phone }}</span>
          </div>
        </div>

        <!-- Right column - Treatment info -->
        <div class="details-column">
          <div class="detail-row">
            <span class="detail-label">Тип лечения:</span>
            <span class="detail-value">{{ patient.treatmentType }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Текущая каппа:</span>
            <span class="detail-value">{{ patient.currentCap }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Назначенно капп:</span>
            <span class="detail-value">{{ patient.assignedCaps }}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Цикл смены капп:</span>
            <span class="detail-value">{{ patient.changeCycle }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="action-buttons">
      <button class="btn btn-edit" @click="handleEdit">Изменить</button>
      <button class="btn btn-archive" @click="handleArchive">Архив</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  patient: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['archive', 'edit'])

const handleArchive = () => {
  emit('archive', props.patient.id)
}

const handleEdit = () => {
  emit('edit', props.patient.id)
}
</script>

<style scoped>
.patient-info-card {
  width: 100%;
  min-height: 212px;
  background: #F7F7F7;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 24px;
  gap: 24px;
  margin: 20px 0 0 0px;
  box-sizing: border-box;
}

.patient-photo {
  width: 164px;
  height: 164px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.patient-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.patient-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.patient-name {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.details-grid {
  display: flex;
  gap: 24px;
}

.details-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail-label {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #8C96AB;
}

.detail-value {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 140px;
  align-items: flex-end;
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: 103px;
  height: 35px;
  border-radius: 44px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  cursor: pointer;
  white-space: nowrap;
}

.btn-edit {
  background: #FFFFFF;
  color: #104D89;
  border: 1px solid #104D89;
}

.btn-archive {
  background: #FFFFFF;
  color: #666C75;
  border: 1px solid #666C75;
}
</style>
