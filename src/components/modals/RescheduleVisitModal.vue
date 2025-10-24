<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="onClose">
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" @click="onClose" aria-label="Close">
        <img src="/icons/close.svg" alt="close" />
      </button>

      <div class="modal-title">Перенести визит</div>

      <!-- Текущая информация о визите -->
      <div class="current-visit-info">
        <div class="field-group">
          <label class="field-label">Назначенная дата</label>
          <div class="field-disabled">
            <span class="field-text">{{ currentDate }}</span>
            <img src="/ui/calendar_button_gray.svg" alt="Calendar" class="calendar-icon" />
          </div>
        </div>
        
        <div class="field-group">
          <label class="field-label">Тип визита</label>
          <div class="field-disabled">
            <span class="field-text">{{ currentType }}</span>
          </div>
        </div>
      </div>

      <!-- Новая информация о визите -->
      <div class="new-visit-info">
        <div class="field-group">
          <label class="field-label">Новая дата</label>
          <div class="field-active" @click="toggleDatePicker">
            <span class="field-text">{{ newDate }}</span>
            <img src="/ui/calendar_button_blue.svg" alt="Calendar" class="calendar-icon" />
          </div>
          <!-- Date Picker -->
          <div v-if="showDatePicker" class="date-picker-container">
            <DatePicker @date-selected="onDateSelected" />
          </div>
        </div>
        
        <div class="field-group visit-type-field">
          <label class="field-label">Тип визита</label>
          <div class="field-active" @click="toggleVisitTypeDropdown">
            <span class="field-text">{{ newType }}</span>
            <img 
              :src="showVisitTypeDropdown ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
              alt="Dropdown" 
              class="visit-type-dropdown-icon" 
            />
          </div>
          <div v-if="showVisitTypeDropdown" class="visit-type-options">
            <div 
              v-for="type in visitTypes" 
              :key="type"
              class="visit-type-option"
              @click="selectVisitType(type)"
            >
              {{ type }}
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="modal-actions">
        <button class="btn btn-primary" @click="onReschedule">Перенести</button>
        <button class="btn btn-secondary" @click="onCancel">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DatePicker from '../ui/DatePicker.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  currentDate: { type: String, default: '25.10.2016' },
  currentType: { type: String, default: 'Плановый' }
})

const emit = defineEmits(['update:modelValue', 'reschedule', 'cancel', 'close'])

import { defaultFormData, visitTypes } from '../../data/mockData'
const newDate = ref(defaultFormData.newDate)
const newType = ref('Плановый')
const showDatePicker = ref(false)
const showVisitTypeDropdown = ref(false)

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onReschedule = () => {
  alert('Визит успешно перенесен')
  emit('reschedule')
  onClose()
}

const onCancel = () => {
  emit('cancel')
  onClose()
}

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
}

const onDateSelected = (date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  newDate.value = `${day}.${month}.${year}`
  showDatePicker.value = false
}

const toggleVisitTypeDropdown = () => {
  showVisitTypeDropdown.value = !showVisitTypeDropdown.value
}

const selectVisitType = (type) => {
  newType.value = type
  showVisitTypeDropdown.value = false
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  position: relative;
  width: 470px;
  height: 367px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 4px rgba(164, 164, 164, 0.2);
  border-radius: 24px;
  padding: 24px;
  box-sizing: border-box;
}

.modal-close {
  position: absolute;
  width: 24px;
  height: 24px;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close img {
  width: 14px;
  height: 14px;
}

.modal-title {
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  height: 29px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
  text-align: center;
  white-space: nowrap;
}

.current-visit-info,
.new-visit-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  width: 100%;
  margin-bottom: 24px;
}

.current-visit-info {
  margin-top: 60px;
}

.new-visit-info {
  margin-top: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.field-group:first-child {
  width: 164px;
}

.field-group:last-child {
  width: 242px;
}

.field-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #1F2937;
  white-space: nowrap;
}

.field-disabled,
.field-active {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  width: 100%;
  height: 44px;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
  box-sizing: border-box;
}

.field-disabled {
  background: #E6E6E6;
}

.field-active {
  background: #FFFFFF;
}

.field-text {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
  text-align: left;
  flex: 1;
  white-space: nowrap;
}

.calendar-icon {
  width: 18px;
  height: 20px;
  flex-shrink: 0;
}

.visit-type-dropdown-icon {
  width: 9px;
  height: 14px;
  transform: rotate(90deg);
  transition: all 0.2s;
  flex-shrink: 0;
}

.visit-type-field {
  position: relative;
}

.visit-type-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
}

.visit-type-option {
  padding: 8px 12px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
  cursor: pointer;
  transition: background-color 0.2s;
}

.visit-type-option:hover {
  background-color: #F3F4F6;
}

.visit-type-option:first-child {
  border-radius: 8px 8px 0 0;
}

.visit-type-option:last-child {
  border-radius: 0 0 8px 8px;
}

.modal-actions {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  height: 35px;
  border-radius: 44px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.btn-primary {
  width: 113px;
  background: #3B7AB8;
  color: #FFFFFF;
  border: none;
}

.btn-primary:hover {
  background: #2d5a8a;
}

.btn-secondary {
  width: 105px;
  background: #FFFFFF;
  border: 1px solid #104D89;
  color: #104D89;
}

.btn-secondary:hover {
  background: #f8fafc;
}

.date-picker-container {
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  z-index: 1000;
  margin-right: 16px;
}
</style>
