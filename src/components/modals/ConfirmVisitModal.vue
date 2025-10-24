<template>
  <div v-if="modelValue" class="modal-overlay" @click="onClose">
    <div class="modal-content" @click.stop>
      <!-- Close button -->
      <button class="close-btn" @click="onClose">
        <img src="/icons/close.svg" alt="close" />
      </button>
      
      <!-- Title -->
      <h2 class="modal-title">Подтверждение визита</h2>
      
      <!-- Date and Visit type on one row -->
      <div class="form-row">
        <div class="form-section">
          <label class="form-label">Дата</label>
          <div class="date-field">
            <span class="date-value">{{ visitDate }}</span>
            <img src="/ui/calendar_button_gray.svg" alt="Calendar" class="calendar-icon" />
          </div>
        </div>
        
        <div class="form-section">
          <label class="form-label">Тип визита</label>
          <div class="visit-type-field">
            <span class="visit-type-value">{{ visitType }}</span>
          </div>
        </div>
      </div>
      
      <!-- Doctor comment -->
      <div class="form-section">
        <label class="form-label">Комментарий врача</label>
        <textarea 
          v-model="doctorComment" 
          class="form-textarea"
          placeholder="Введите комментарий..."
        ></textarea>
      </div>
      
      <!-- Notify parent and Notification type on one row -->
      <div class="form-row">
        <div class="form-section">
          <label class="form-label">Уведомить родителя</label>
          <div class="dropdown-container">
            <button 
              class="dropdown-button" 
              @click="toggleNotifyParentDropdown"
              :class="{ active: showNotifyParentDropdown }"
            >
              {{ selectedNotifyParent }}
              <img 
                :src="showNotifyParentDropdown ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-icon" 
              />
            </button>
            <div v-if="showNotifyParentDropdown" class="dropdown-menu">
              <div 
                v-for="option in notifyParentOptions" 
                :key="option"
                class="dropdown-item"
                @click="selectNotifyParent(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <label class="form-label">Тип уведомления</label>
          <div class="dropdown-container">
            <button 
              class="dropdown-button" 
              @click="toggleNotificationTypeDropdown"
              :class="{ active: showNotificationTypeDropdown }"
            >
              {{ selectedNotificationType }}
              <img 
                :src="showNotificationTypeDropdown ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-icon" 
              />
            </button>
            <div v-if="showNotificationTypeDropdown" class="dropdown-menu">
              <div 
                v-for="option in notificationTypeOptions" 
                :key="option"
                class="dropdown-item"
                @click="selectNotificationType(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- File upload -->
      <div class="form-section">
        <label class="form-label">Прикрепить файл</label>
        <FileUpload @files-selected="handleFileUpload" />
      </div>
      
      <!-- Footer buttons -->
      <div class="modal-footer">
        <button class="btn btn-primary" @click="onConfirm">Сохранить описание визита</button>
        <button class="btn btn-secondary" @click="onCancel">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defaultFormData, notifyParentOptions, notificationTypeOptions } from '../../data/mockData'
import FileUpload from '../ui/FileUpload.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  visitDate: {
    type: String,
    default: '25.10.2016'
  },
  visitType: {
    type: String,
    default: 'Плановый'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

const doctorComment = ref(defaultFormData.doctorComment)
const selectedNotifyParent = ref('Да')
const selectedNotificationType = ref('Важно')
const attachedFiles = ref([])

const showNotifyParentDropdown = ref(false)
const showNotificationTypeDropdown = ref(false)


const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onCancel = () => {
  emit('cancel')
  onClose()
}

const onConfirm = () => {
  emit('confirm', {
    doctorComment: doctorComment.value,
    notifyParent: selectedNotifyParent.value,
    notificationType: selectedNotificationType.value,
    files: attachedFiles.value
  })
  onClose()
}

const toggleNotifyParentDropdown = () => {
  showNotifyParentDropdown.value = !showNotifyParentDropdown.value
  showNotificationTypeDropdown.value = false
}

const toggleNotificationTypeDropdown = () => {
  showNotificationTypeDropdown.value = !showNotificationTypeDropdown.value
  showNotifyParentDropdown.value = false
}

const selectNotifyParent = (option) => {
  selectedNotifyParent.value = option
  showNotifyParentDropdown.value = false
}

const selectNotificationType = (option) => {
  selectedNotificationType.value = option
  showNotificationTypeDropdown.value = false
}

const addFile = () => {
  const fileName = `file_${attachedFiles.value.length + 1}.pdf`
  attachedFiles.value.push({ name: fileName })
}

const removeFile = (index) => {
  attachedFiles.value.splice(index, 1)
}

const handleFileUpload = (files) => {
  attachedFiles.value = [...attachedFiles.value, ...files]
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 695px;
  height: 580px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 4px rgba(164, 164, 164, 0.2);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.close-btn {
  position: absolute;
  width: 24px;
  height: 24px;
  right: 16px;
  top: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.modal-title {
  width: 287px;
  height: 29px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
  margin: 0;
  text-align: center;
  align-self: center;
}

.form-row {
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;
}

.form-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.form-label {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.date-field {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  width: 211px;
  height: 44px;
  background: #E6E6E6;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
}

.date-value {
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
}

.visit-type-field {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  width: 412px;
  height: 43px;
  background: #E6E6E6;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
}

.visit-type-value {
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
}

.form-textarea {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  width: 647px;
  height: 81px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 24px;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
  resize: none;
}

.form-textarea:focus {
  outline: none;
  border-color: #3B7AB8;
}

.dropdown-container {
  position: relative;
}

.dropdown-button {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  width: 312px;
  height: 43px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
  cursor: pointer;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
}

.dropdown-button:hover {
  border-color: #3B7AB8;
}

.dropdown-button.active {
  border-color: #3B7AB8;
  box-shadow: 0 0 0 2px rgba(59, 122, 184, 0.2);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #A9CFF5;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
}

.dropdown-item {
  padding: 12px;
  cursor: pointer;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #F3F4F6;
}

.dropdown-icon {
  width: 9px;
  height: 14px;
  transform: rotate(90deg);
  transition: transform 0.2s ease;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: auto;
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
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  width: 105px;
  background: #FFFFFF;
  border: 1px solid #104D89;
  color: #104D89;
}

.btn-secondary:hover {
  background-color: #F8FAFC;
}

.btn-primary {
  width: 250px;
  background: #3B7AB8;
  border: none;
  color: #FFFFFF;
  white-space: nowrap;
}

.btn-primary:hover {
  background: #2d5a8a;
}
</style>
