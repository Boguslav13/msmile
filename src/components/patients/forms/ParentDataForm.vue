<template>
  <div class="parent-data-form">
    <h2 class="form-title">Данные родителя</h2>
    
    <div class="form-content">
      <!-- Первая строка полей -->
      <div class="form-row">
        <div class="form-field">
          <label class="field-label">Фамилия родителя</label>
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
          <label class="field-label">Имя родителя</label>
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
          <label class="field-label">Отчество родителя</label>
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
          <label class="field-label">Номер телефона</label>
          <div class="input-container">
            <input 
              v-model="formData.phone"
              type="tel" 
              class="field-input"
              :class="{ 'error': errors.phone }"
              placeholder="+375 (29) 000 00 00"
            />
            <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
          </div>
        </div>
      </div>

      <!-- Вторая строка - только email -->
      <div class="form-row">
        <div class="form-field email-field">
          <label class="field-label">Эл. почта</label>
          <div class="input-container">
            <input 
              v-model="formData.email"
              type="email" 
              class="field-input"
              :class="{ 'error': errors.email }"
              placeholder="example@email.com"
            />
            <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  parentData: {
    type: Object,
    default: () => null
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['data-changed'])

const formData = ref({
  lastName: '',
  firstName: '',
  middleName: '',
  phone: '',
  email: ''
})

const errors = ref({})
const isSubmitted = ref(false)

const validateForm = () => {
  errors.value = {}
  isSubmitted.value = true
  
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = 'Заполните поле'
  }
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = 'Заполните поле'
  }
  if (!formData.value.middleName.trim()) {
    errors.value.middleName = 'Заполните поле'
  }
  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Заполните поле'
  }
  if (!formData.value.email.trim()) {
    errors.value.email = 'Заполните поле'
  }
  
  return Object.keys(errors.value).length === 0
}

defineExpose({
  validateForm,
  errors
})

const emitData = () => {
  emit('data-changed', formData.value)
}

onMounted(() => {
  if (props.parentData && props.isEditMode) {
    formData.value = {
      lastName: props.parentData.lastName || '',
      firstName: props.parentData.firstName || '',
      middleName: props.parentData.middleName || '',
      phone: props.parentData.phone || '',
      email: props.parentData.email || ''
    }
  }
})

watch(formData, emitData, { deep: true })
</script>

<style scoped>
.parent-data-form {
  width: 100%;
  height: 263px;
  background: #F7F7F7;
  border-radius: 24px;
  padding: 24px;
  box-sizing: border-box;
  margin-top: 24px;
}

.form-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
  margin: 0 0 24px 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.email-field {
  max-width: 430px;
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
</style>
