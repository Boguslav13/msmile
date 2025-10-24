<template>
  <div class="add-patient-form">
    <div class="form-header">
      <h2 class="form-title">Данные пациента</h2>
      <div class="form-actions">
        <button class="btn btn-primary" @click="handleCreate">
          {{ isEditMode ? 'Сохранить' : 'Создать' }}
        </button>
        <button class="btn btn-secondary" @click="handleCancel">Отменить</button>
      </div>
    </div>

    <div class="form-content">
      <!-- Основные поля -->
      <div class="form-row">
        <div class="form-field">
          <label class="field-label">Фамилия пациента</label>
          <div class="input-container">
            <input 
              v-model="formData.lastName"
              type="text" 
              class="field-input"
              :class="{ 'error': errors.lastName }"
              placeholder="Введите фамилию"
            />
            <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
          </div>
        </div>
        
        <div class="form-field">
          <label class="field-label">Имя пациента</label>
          <div class="input-container">
            <input 
              v-model="formData.firstName"
              type="text" 
              class="field-input"
              :class="{ 'error': errors.firstName }"
              placeholder="Введите имя"
            />
            <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
          </div>
        </div>
        
        <div class="form-field">
          <label class="field-label">Отчество пациента</label>
          <div class="input-container">
            <input 
              v-model="formData.middleName"
              type="text" 
              class="field-input"
              :class="{ 'error': errors.middleName }"
              placeholder="Введите отчество"
            />
            <div v-if="errors.middleName" class="error-message">{{ errors.middleName }}</div>
          </div>
        </div>
        
        <div class="form-field">
          <label class="field-label">Дата рождения</label>
          <div class="input-container">
            <div class="date-field">
              <input 
                v-model="formData.birthDate"
                type="text" 
                class="field-input"
                :class="{ 'error': errors.birthDate }"
                placeholder="Выберите дату"
                readonly
              />
              <button class="date-button" @click="toggleDatePicker">
                <img src="/ui/calendar_button_blue.svg" alt="Calendar" />
              </button>
            </div>
            <div v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</div>
          </div>
        </div>
      </div>

      <!-- Фото и примечания -->
      <div class="form-row">
        <div class="photo-section">
          <label class="field-label">Фото пациента</label>
          <div class="input-container">
            <div class="photo-upload-container">
              <FileUpload @files-selected="handlePhotoUpload" />
              
              <!-- Photo Preview -->
              <div v-if="formData.photo" class="photo-preview">
                <div class="preview-image">
                  <img :src="photoPreviewUrl" alt="Photo preview" />
                  <button class="delete-photo" @click="removePhoto">
                    <img src="/icons/trashcan_white.svg" alt="Delete" />
                  </button>
                  <div class="photo-filename">{{ formData.photo.name }}</div>
                </div>
              </div>
            </div>
            <div v-if="errors.photo" class="error-message">{{ errors.photo }}</div>
          </div>
        </div>
        
        <div class="notes-section">
          <label class="field-label">Примечания</label>
          <textarea 
            v-model="formData.notes"
            class="notes-textarea"
            placeholder="Введите примечания..."
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Date Picker Modal -->
    <div v-if="showDatePicker" class="date-picker-overlay" @click="closeDatePicker">
      <div class="date-picker-container" @click.stop>
        <DatePicker @date-selected="handleDateSelect" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import FileUpload from '../../ui/FileUpload.vue'
import DatePicker from '../../ui/DatePicker.vue'

const props = defineProps({
  patientData: {
    type: Object,
    default: () => null
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['create', 'cancel', 'update'])

const formData = ref({
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  photo: null,
  notes: ''
})

const photoPreviewUrl = ref('')

const errors = ref({})
const isSubmitted = ref(false)

const showDatePicker = ref(false)

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
}

const closeDatePicker = () => {
  showDatePicker.value = false
}

const handleDateSelect = (date) => {
  formData.value.birthDate = date.toLocaleDateString('ru-RU')
  closeDatePicker()
}

const handlePhotoUpload = (files) => {
  formData.value.photo = files[0]
  if (files[0]) {
    photoPreviewUrl.value = URL.createObjectURL(files[0])
  }
}

const removePhoto = () => {
  formData.value.photo = null
  if (photoPreviewUrl.value) {
    URL.revokeObjectURL(photoPreviewUrl.value)
    photoPreviewUrl.value = ''
  }
}

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = 'Заполните поле'
  }
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = 'Заполните поле'
  }
  if (!formData.value.middleName.trim()) {
    errors.value.middleName = 'Заполните поле'
  }
  if (!formData.value.birthDate.trim()) {
    errors.value.birthDate = 'Заполните поле'
  }
  if (!formData.value.photo) {
    errors.value.photo = 'Заполните поле'
  }
  
  return Object.keys(errors.value).length === 0
}

onMounted(() => {
  if (props.patientData && props.isEditMode) {
    formData.value = {
      lastName: props.patientData.lastName || '',
      firstName: props.patientData.firstName || '',
      middleName: props.patientData.middleName || '',
      birthDate: props.patientData.birthDate || '',
      photo: props.patientData.photo || null,
      notes: props.patientData.notes || ''
    }
    
    if (props.patientData.photo) {
      if (typeof props.patientData.photo === 'string') {
        photoPreviewUrl.value = props.patientData.photo
      } else if (props.patientData.photo instanceof File) {
        photoPreviewUrl.value = URL.createObjectURL(props.patientData.photo)
      }
    }
  }
})

const handleCreate = () => {
  isSubmitted.value = true
  
  if (props.isEditMode) {
    emit('update', formData.value)
  } else {
    emit('create', formData.value)
  }
}

const handleCancel = () => {
  emit('cancel')
}

defineExpose({
  validateForm,
  errors
})
</script>

<style scoped>
.add-patient-form {
  width: 100%;
  height: 370px;
  background: #F7F7F7;
  border-radius: 24px;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
}

.form-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.form-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
  margin: 0;
}

.form-actions {
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
  transition: all 0.2s;
}

.btn-primary {
  min-width: 92px;
  width: auto;
  padding: 8px 12px;
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

.form-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
}

.form-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
}

.field-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.field-input {
  width: 100%;
  height: 43px;
  padding: 12px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
  font-size: 16px;
  color: #1F2937;
  box-sizing: border-box;
}

.field-input:focus {
  outline: none;
  border-color: #3B7AB8;
}

.field-input.error {
  border-color: #EB1818;
}

.input-container {
  position: relative;
  width: 100%;
}

.error-message {
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px;
  color: #EB1818;
  white-space: nowrap;
}

.date-field {
  position: relative;
  width: 100%;
}

.date-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-button img {
  width: 18px;
  height: 20px;
}

.photo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 240px;
}

.photo-upload-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
}

.photo-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-image {
  position: relative;
  width: 137px;
  height: 137px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-photo {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.delete-photo:hover {
  opacity: 0.8;
}

.delete-photo img {
  width: 18px;
  height: 23px;
}

.photo-filename {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 132px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  color: #D9D9D9;
  text-align: center;
  word-break: break-all;
}

.notes-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 1000px;
  margin-left: auto;
}

.notes-textarea {
  width: 100%;
  height: 136px;
  padding: 12px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 24px;
  font-size: 16px;
  color: #1F2937;
  resize: none;
  box-sizing: border-box;
}

.notes-textarea:focus {
  outline: none;
  border-color: #3B7AB8;
}

.date-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.date-picker-container {
  background: white;
  border-radius: 16px;
  padding: 20px;
}
</style>
