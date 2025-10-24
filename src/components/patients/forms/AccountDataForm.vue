<template>
  <div class="account-data-form">
    <h2 class="form-title">Данные аккаунта</h2>
    
    <div class="form-content">
      <div class="form-row">
        <!-- Тип аккаунта -->
        <div class="form-field">
          <label class="field-label">Тип аккаунта</label>
          <div class="input-container">
            <div class="dropdown-field" :class="{ 'error': errors.accountType }" @click="toggleDropdown">
              <span class="dropdown-text">{{ selectedAccountType || 'Выбрать' }}</span>
              <img 
                :src="dropdownOpen ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-arrow"
              />
            </div>
            <div v-if="errors.accountType" class="error-message">{{ errors.accountType }}</div>
            
            <!-- Dropdown Menu -->
            <div v-if="dropdownOpen" class="dropdown-menu">
              <div 
                v-for="option in accountTypeOptions" 
                :key="option.value"
                class="dropdown-option"
                @click="selectOption(option.value, option.label)"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { accountTypeOptions } from '../../../data/mockData'

const emit = defineEmits(['data-changed'])

const formData = ref({
  accountType: ''
})

const selectedAccountType = ref('')

const errors = ref({})
const isSubmitted = ref(false)

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (value, label) => {
  formData.value.accountType = value
  selectedAccountType.value = label
  dropdownOpen.value = false
  
  emit('data-changed', formData.value)
}

const validateForm = () => {
  errors.value = {}
  isSubmitted.value = true
  
  if (!formData.value.accountType) {
    errors.value.accountType = 'Заполните поле'
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

watch(formData, emitData, { deep: true })
</script>

<style scoped>
.account-data-form {
  width: 100%;
  height: 200px;
  background: #F7F7F7;
  border-radius: 24px;
  padding: 24px;
  box-sizing: border-box;
  margin-top: 24px;
  position: relative;
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
  width: 434px;
  position: relative;
}

.field-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.dropdown-field {
  width: 100%;
  height: 43px;
  padding: 12px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}

.dropdown-field.error {
  border-color: #EB1818;
}

.dropdown-text {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
}

.dropdown-arrow {
  width: 9px;
  height: 14px;
  flex-shrink: 0;
  transform: rotate(90deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 4px;
}

.dropdown-option {
  padding: 12px;
  font-size: 16px;
  line-height: 19px;
  color: #1F2937;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-option:hover {
  background: #F8FAFC;
}

.dropdown-option:first-child {
  border-radius: 12px 12px 0 0;
}

.dropdown-option:last-child {
  border-radius: 0 0 12px 12px;
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
