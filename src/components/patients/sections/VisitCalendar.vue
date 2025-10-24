<template>
  <div class="visit-calendar">
    <div class="calendar-header">
      <div class="calendar-title">Календарь визитов</div>
      <button class="schedule-visit-btn" @click="handleScheduleVisit">
        <img src="/icons/plus_blue.svg" alt="Add" class="add-icon" />
        Назначить визит
      </button>
    </div>
    
    <!-- Список визитов -->
    <div v-if="visits.length > 0" class="visits-list">
      <div v-for="visit in visits" :key="visit.id" class="visit-item">
        <div class="visit-date">
          <div class="time">{{ visit.time }}</div>
          <div class="date">{{ visit.date }}</div>
        </div>
        <div class="visit-info">
          <div class="description">{{ visit.description }}</div>
        </div>
        <div class="visit-actions">
          <button class="confirm-btn" @click="handleConfirmVisit(visit.id)">
            <span>Подтвердить явку</span>
          </button>
          <div class="action-buttons">
            <button class="calendar-btn" @click="handleRescheduleVisit(visit.id)">
              <img src="/ui/calendar_button.svg" alt="Calendar" />
            </button>
            <button class="delete-btn" @click="handleDeleteVisit(visit.id)">
              <img src="/ui/delete_visit_button.svg" alt="Delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete visit confirmation modal -->
    <BaseConfirmationModal
      v-model="isDeleteVisitModalOpen"
      title="Удалить запись"
      message="Вы уверены, что хотите удалить назначенный визит?"
      primary-text="Нет, оставить"
      secondary-text="Удалить"
      @primary="cancelDeleteVisit"
      @secondary="confirmDeleteVisit"
    />
    
    <!-- Reschedule visit modal -->
    <RescheduleVisitModal
      v-model="isRescheduleVisitModalOpen"
      :current-date="currentVisitDate"
      :current-type="currentVisitType"
      @reschedule="confirmRescheduleVisit"
      @cancel="cancelRescheduleVisit"
    />
    
    <!-- Schedule visit modal -->
    <ScheduleVisitModal
      v-model="isScheduleVisitModalOpen"
      @schedule="confirmScheduleVisit"
      @cancel="cancelScheduleVisit"
    />
    
    <!-- Confirm visit modal -->
    <ConfirmVisitModal
      v-model="isConfirmVisitModalOpen"
      :visit-date="currentVisitDate"
      :visit-type="currentVisitType"
      @confirm="confirmVisitConfirmation"
      @cancel="cancelVisitConfirmation"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseConfirmationModal from '../../modals/BaseConfirmationModal.vue'
import RescheduleVisitModal from '../../modals/RescheduleVisitModal.vue'
import ScheduleVisitModal from '../../modals/ScheduleVisitModal.vue'
import ConfirmVisitModal from '../../modals/ConfirmVisitModal.vue'

import { visitCalendarData } from '../../../data/mockData'
const visits = ref([...visitCalendarData])

const isDeleteVisitModalOpen = ref(false)
const pendingDeleteVisitId = ref(null)

const isRescheduleVisitModalOpen = ref(false)
const pendingRescheduleVisitId = ref(null)
const currentVisitDate = ref('25.10.2016')
const currentVisitType = ref('Плановый')

const isScheduleVisitModalOpen = ref(false)

const isConfirmVisitModalOpen = ref(false)

const handleDeleteVisit = (visitId) => {
  pendingDeleteVisitId.value = visitId
  isDeleteVisitModalOpen.value = true
}

const confirmDeleteVisit = () => {
  alert('Визит успешно удален')
  isDeleteVisitModalOpen.value = false
  pendingDeleteVisitId.value = null
}

const cancelDeleteVisit = () => {
  isDeleteVisitModalOpen.value = false
  pendingDeleteVisitId.value = null
}

const handleRescheduleVisit = (visitId) => {
  pendingRescheduleVisitId.value = visitId
  isRescheduleVisitModalOpen.value = true
}

const confirmRescheduleVisit = () => {
  alert('Визит успешно перенесен')
  isRescheduleVisitModalOpen.value = false
  pendingRescheduleVisitId.value = null
}

const cancelRescheduleVisit = () => {
  isRescheduleVisitModalOpen.value = false
  pendingRescheduleVisitId.value = null
}

const handleScheduleVisit = () => {
  isScheduleVisitModalOpen.value = true
}

const confirmScheduleVisit = () => {
  alert('Визит успешно назначен')
  isScheduleVisitModalOpen.value = false
}

const cancelScheduleVisit = () => {
  isScheduleVisitModalOpen.value = false
}

const handleConfirmVisit = (visitId) => {
  isConfirmVisitModalOpen.value = true
}

const confirmVisitConfirmation = (data) => {
  alert('Визит успешно подтвержден')
  isConfirmVisitModalOpen.value = false
  console.log('Visit confirmation data:', data)
}

const cancelVisitConfirmation = () => {
  isConfirmVisitModalOpen.value = false
}
</script>

<style scoped>
.visit-calendar {
  width: 100%;
  min-height: 77px;
  background: #F7F7F7;
  border-radius: 24px;
  padding: 24px;
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.calendar-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.schedule-visit-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: 178px;
  height: 35px;
  background: #FFFFFF;
  border: 1px solid #104D89;
  border-radius: 44px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #104D89;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.schedule-visit-btn:hover {
  background: #f8fafc;
}

.add-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

/* Стили для списка визитов */
.visits-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.visit-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
}

.visit-date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  width: 72px;
  flex-shrink: 0;
}

.time {
  font-weight: 500;
  font-size: 24px;
  line-height: 110%;
  color: #3B7AB8;
  width: 65px;
  height: 26px;
  display: flex;
  align-items: flex-end;
}

.date {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #B8BFC6;
  width: 72px;
  height: 15px;
  display: flex;
  align-items: flex-end;
  text-align: center;
}

.visit-info {
  flex: 1;
  display: flex;
  align-items: flex-end;
}

.description {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #1F2937;
  display: flex;
  align-items: flex-end;
}

.visit-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
}

.confirm-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: 174px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #438E0C;
  border-radius: 44px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #438E0C;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.confirm-btn:hover {
  background: #f8fafc;
}

.action-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  width: 96px;
  height: 36px;
}

.calendar-btn,
.delete-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: 44px;
  height: 36px;
  background: #FFFFFF;
  border-radius: 44px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calendar-btn {
  border: 1px solid #FFB000;
}

.delete-btn {
  border: 1px solid #FF493E;
}

.calendar-btn:hover,
.delete-btn:hover {
  background: #f8fafc;
}

.calendar-btn img,
.delete-btn img {
  width: 20px;
  height: 20px;
}
</style>
