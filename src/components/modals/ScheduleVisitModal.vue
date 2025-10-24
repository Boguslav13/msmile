<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="onClose">
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" @click="onClose" aria-label="Close">
        <img src="/icons/close.svg" alt="close" />
      </button>

      <div class="modal-title">Назначение визита</div>

      <!-- Поля формы -->
      <div class="form-fields">
        <!-- Дата и Время -->
        <div class="row">
          <div class="field-group">
            <label class="field-label">Дата</label>
            <div class="field-active" @click="toggleDatePicker">
              <span class="field-text">{{ selectedDate }}</span>
              <img src="/ui/calendar_button_blue.svg" alt="Calendar" class="calendar-icon" />
            </div>
            <!-- Date Picker -->
            <div v-if="showDatePicker" class="date-picker-container">
              <DatePicker @date-selected="onDateSelected" />
            </div>
          </div>
          
          <div class="field-group">
            <label class="field-label">Время</label>
            <div class="field-active" @click="toggleTimePicker">
              <span class="field-text">{{ selectedTime }}</span>
              <img src="/icons/clock.svg" alt="Clock" class="clock-icon" />
            </div>
            <!-- Time Picker -->
            <div v-if="showTimePicker" class="time-picker-container">
              <div class="time-picker">
                <div class="time-selector">
                  <div class="time-column">
                    <div class="time-label">Часы</div>
                    <div class="time-scroll">
                      <div 
                        v-for="hour in hours" 
                        :key="hour"
                        :class="['time-option', { active: selectedHour === hour }]"
                        @click="selectHour(hour)"
                      >
                        {{ hour.toString().padStart(2, '0') }}
                      </div>
                    </div>
                  </div>
                  <div class="time-separator">:</div>
                  <div class="time-column">
                    <div class="time-label">Минуты</div>
                    <div class="time-scroll">
                      <div 
                        v-for="minute in minutes" 
                        :key="minute"
                        :class="['time-option', { active: selectedMinute === minute }]"
                        @click="selectMinute(minute)"
                      >
                        {{ minute.toString().padStart(2, '0') }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="time-actions">
                  <button class="time-btn time-btn-confirm" @click="confirmTimeSelection">ОК</button>
                  <button class="time-btn time-btn-cancel" @click="cancelTimeSelection">Отмена</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Тип визита -->
        <div class="field-group full-width">
          <label class="field-label">Тип визита</label>
          <div class="field-active" @click="toggleVisitTypeDropdown">
            <span class="field-text">{{ selectedVisitType }}</span>
            <img 
              :src="showVisitTypeDropdown ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
              alt="Dropdown" 
              class="dropdown-icon" 
            />
          </div>
          <div v-if="showVisitTypeDropdown" class="dropdown-options">
            <div 
              v-for="type in visitTypes" 
              :key="type"
              class="dropdown-option"
              @click="selectVisitType(type)"
            >
              {{ type }}
            </div>
          </div>
        </div>

        <!-- Уведомить родителя и Тип уведомления -->
        <div class="row">
          <div class="field-group">
            <label class="field-label">Уведомить родителя</label>
            <div class="field-active" @click="toggleNotifyParentDropdown">
              <span class="field-text">{{ selectedNotifyParent }}</span>
              <img 
                :src="showNotifyParentDropdown ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-icon" 
              />
            </div>
            <div v-if="showNotifyParentDropdown" class="dropdown-options">
              <div 
                v-for="option in notifyParentOptions" 
                :key="option"
                class="dropdown-option"
                @click="selectNotifyParent(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
          
          <div class="field-group">
            <label class="field-label">Тип уведомления</label>
            <div class="field-active" @click="toggleNotificationTypeDropdown">
              <span class="field-text">{{ selectedNotificationType }}</span>
              <img 
                :src="showNotificationTypeDropdown ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-icon" 
              />
            </div>
            <div v-if="showNotificationTypeDropdown" class="dropdown-options">
              <div 
                v-for="type in notificationTypeOptions" 
                :key="type"
                class="dropdown-option"
                @click="selectNotificationType(type)"
              >
                {{ type }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="modal-actions">
        <button class="btn btn-primary" @click="onSchedule">Сохранить и назначить</button>
        <button class="btn btn-secondary" @click="onCancel">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DatePicker from '../ui/DatePicker.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'schedule', 'cancel', 'close'])

import { defaultFormData } from '../../data/mockData'
const selectedDate = ref(defaultFormData.selectedDate)
const selectedTime = ref('14:00')
const selectedVisitType = ref('Плановый')
const selectedNotifyParent = ref('Да')
const selectedNotificationType = ref('Важно')

const selectedHour = ref(14)
const selectedMinute = ref(0)
const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

const showDatePicker = ref(false)
const showTimePicker = ref(false)
const showVisitTypeDropdown = ref(false)
const showNotifyParentDropdown = ref(false)
const showNotificationTypeDropdown = ref(false)

import { visitTypes, notifyParentOptions, notificationTypeOptions } from '../../data/mockData'

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onSchedule = () => {
  alert('Визит успешно назначен')
  emit('schedule')
  onClose()
}

const onCancel = () => {
  emit('cancel')
  onClose()
}

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
  showTimePicker.value = false
}

const onDateSelected = (date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  selectedDate.value = `${day}.${month}.${year}`
  showDatePicker.value = false
}

const toggleTimePicker = () => {
  showTimePicker.value = !showTimePicker.value
  showDatePicker.value = false
  closeOtherDropdowns('time')
}

const selectHour = (hour) => {
  selectedHour.value = hour
}

const selectMinute = (minute) => {
  selectedMinute.value = minute
}

const confirmTimeSelection = () => {
  const hour = selectedHour.value.toString().padStart(2, '0')
  const minute = selectedMinute.value.toString().padStart(2, '0')
  selectedTime.value = `${hour}:${minute}`
  showTimePicker.value = false
}

const cancelTimeSelection = () => {
  showTimePicker.value = false
}

const toggleVisitTypeDropdown = () => {
  showVisitTypeDropdown.value = !showVisitTypeDropdown.value
  closeOtherDropdowns('visitType')
}

const selectVisitType = (type) => {
  selectedVisitType.value = type
  showVisitTypeDropdown.value = false
}

const toggleNotifyParentDropdown = () => {
  showNotifyParentDropdown.value = !showNotifyParentDropdown.value
  closeOtherDropdowns('notifyParent')
}

const selectNotifyParent = (option) => {
  selectedNotifyParent.value = option
  showNotifyParentDropdown.value = false
}

const toggleNotificationTypeDropdown = () => {
  showNotificationTypeDropdown.value = !showNotificationTypeDropdown.value
  closeOtherDropdowns('notificationType')
}

const selectNotificationType = (type) => {
  selectedNotificationType.value = type
  showNotificationTypeDropdown.value = false
}

const closeOtherDropdowns = (current) => {
  if (current !== 'visitType') showVisitTypeDropdown.value = false
  if (current !== 'notifyParent') showNotifyParentDropdown.value = false
  if (current !== 'notificationType') showNotificationTypeDropdown.value = false
  if (current !== 'time') showTimePicker.value = false
  showDatePicker.value = false
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
  width: 695px;
  height: 460px;
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

.form-fields {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 23px;
}

.field-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  position: relative;
}

.field-group:not(.full-width) {
  width: 312px;
}

.full-width {
  width: 647px;
}

.field-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #1F2937;
  white-space: nowrap;
}

.field-active {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  width: 100%;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: border-color 0.2s;
}

.field-active:hover {
  border-color: #9CA3AF;
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

.clock-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.dropdown-icon {
  width: 9px;
  height: 14px;
  transform: rotate(90deg);
  transition: all 0.2s;
  flex-shrink: 0;
}

.date-picker-container {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 4px;
}

.time-picker-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
}

.time-picker {
  background: white;
  border: 1px solid #A9CFF5;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  padding: 20px;
  min-width: 280px;
}

.time-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}

.time-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.time-label {
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  text-align: center;
  letter-spacing: 0.5px;
}

.time-scroll {
  height: 140px;
  overflow-y: auto;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  background: #FAFBFC;
  padding: 4px 0;
  scrollbar-width: thin;
  scrollbar-color: #A9CFF5 #F3F4F6;
}

.time-scroll::-webkit-scrollbar {
  width: 6px;
}

.time-scroll::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.time-scroll::-webkit-scrollbar-thumb {
  background: #A9CFF5;
  border-radius: 3px;
}

.time-scroll::-webkit-scrollbar-thumb:hover {
  background: #3B7AB8;
}

.time-option {
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 50px;
  border-radius: 6px;
  margin: 2px 4px;
}

.time-option:hover {
  background-color: #E0F2FE;
  color: #0369A1;
  transform: scale(1.05);
}

.time-option.active {
  background: linear-gradient(135deg, #3B7AB8, #2D5A8A);
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(59, 122, 184, 0.3);
  transform: scale(1.1);
}

.time-separator {
  font-size: 24px;
  font-weight: 700;
  color: #3B7AB8;
  margin-top: 24px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.time-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
  border-top: 1px solid #E5E7EB;
}

.time-btn {
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
  border: none;
  min-width: 80px;
}

.time-btn-confirm {
  background: #3B7AB8;
  color: #FFFFFF;
}

.time-btn-confirm:hover {
  background: #2d5a8a;
}

.time-btn-cancel {
  background: #FFFFFF;
  border: 1px solid #104D89;
  color: #104D89;
}

.time-btn-cancel:hover {
  background: #f8fafc;
}

.dropdown-options {
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

.dropdown-option {
  padding: 8px 12px;
  font-size: 16px;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-option:hover {
  background-color: #F3F4F6;
}

.dropdown-option:first-child {
  border-radius: 8px 8px 0 0;
}

.dropdown-option:last-child {
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
  width: 212px;
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
</style>
