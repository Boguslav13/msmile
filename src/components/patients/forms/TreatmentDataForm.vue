<template>
  <div class="treatment-data-form">
    <h2 class="form-title">Данные лечения</h2>
    
    <div class="form-content">
      <div class="form-row">
        <!-- Тип лечения -->
        <div class="form-field">
          <label class="field-label">Тип лечения</label>
          <div class="input-container">
            <div class="dropdown-field" :class="{ 'error': errors.treatmentType }" @click="toggleDropdown('treatmentType')">
              <span class="dropdown-text">{{ selectedTreatmentType || 'Выбрать' }}</span>
              <img 
                :src="dropdownStates.treatmentType ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-arrow"
              />
            </div>
            <div v-if="errors.treatmentType" class="error-message">{{ errors.treatmentType }}</div>
            
            <!-- Dropdown Menu -->
            <div v-if="dropdownStates.treatmentType" class="dropdown-menu">
              <div 
                v-for="option in treatmentTypeOptions" 
                :key="option.value"
                class="dropdown-option"
                @click="selectOption('treatmentType', option.value, option.label)"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Система капп -->
        <div class="form-field">
          <label class="field-label">Система капп</label>
          <div class="input-container">
            <div class="dropdown-field" :class="{ 'error': errors.capSystem }" @click="toggleDropdown('capSystem')">
              <span class="dropdown-text">{{ selectedCapSystem || 'Выбрать' }}</span>
              <img 
                :src="dropdownStates.capSystem ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-arrow"
              />
            </div>
            <div v-if="errors.capSystem" class="error-message">{{ errors.capSystem }}</div>
            
            <!-- Dropdown Menu -->
            <div v-if="dropdownStates.capSystem" class="dropdown-menu">
              <div 
                v-for="option in capSystemOptions" 
                :key="option.value"
                class="dropdown-option"
                @click="selectOption('capSystem', option.value, option.label)"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Кол-во капп -->
        <div class="form-field">
          <label class="field-label">Кол-во капп</label>
          <div class="input-container">
            <div class="dropdown-field" :class="{ 'error': errors.capCount }" @click="toggleDropdown('capCount')">
              <span class="dropdown-text">{{ selectedCapCount || 'Выбрать' }}</span>
              <img 
                :src="dropdownStates.capCount ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-arrow"
              />
            </div>
            <div v-if="errors.capCount" class="error-message">{{ errors.capCount }}</div>
            
            <!-- Dropdown Menu -->
            <div v-if="dropdownStates.capCount" class="dropdown-menu">
              <div 
                v-for="option in capCountOptions" 
                :key="option.value"
                class="dropdown-option"
                @click="selectOption('capCount', option.value, option.label)"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Цикл смены -->
        <div class="form-field">
          <label class="field-label">Цикл смены</label>
          <div class="input-container">
            <div class="dropdown-field" :class="{ 'error': errors.changeCycle }" @click="toggleDropdown('changeCycle')">
              <span class="dropdown-text">{{ selectedChangeCycle || 'Выбрать' }}</span>
              <img 
                :src="dropdownStates.changeCycle ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
                alt="Dropdown" 
                class="dropdown-arrow"
              />
            </div>
            <div v-if="errors.changeCycle" class="error-message">{{ errors.changeCycle }}</div>
            
            <!-- Dropdown Menu -->
            <div v-if="dropdownStates.changeCycle" class="dropdown-menu">
              <div 
                v-for="option in changeCycleOptions" 
                :key="option.value"
                class="dropdown-option"
                @click="selectOption('changeCycle', option.value, option.label)"
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
import { 
  treatmentTypeOptions, 
  capSystemOptions, 
  capCountOptions, 
  changeCycleOptions 
} from '../../../data/mockData'

const emit = defineEmits(['data-changed'])

const formData = ref({
  treatmentType: '',
  capSystem: '',
  capCount: '',
  changeCycle: ''
})

const errors = ref({})
const isSubmitted = ref(false)

const selectedTreatmentType = ref('')
const selectedCapSystem = ref('')
const selectedCapCount = ref('')
const selectedChangeCycle = ref('')

const dropdownStates = ref({
  treatmentType: false,
  capSystem: false,
  capCount: false,
  changeCycle: false
})


const toggleDropdown = (field) => {
  Object.keys(dropdownStates.value).forEach(key => {
    if (key !== field) {
      dropdownStates.value[key] = false
    }
  })
  
  dropdownStates.value[field] = !dropdownStates.value[field]
}

const selectOption = (field, value, label) => {
  formData.value[field] = value
  
  switch(field) {
    case 'treatmentType':
      selectedTreatmentType.value = label
      break
    case 'capSystem':
      selectedCapSystem.value = label
      break
    case 'capCount':
      selectedCapCount.value = label
      break
    case 'changeCycle':
      selectedChangeCycle.value = label
      break
  }
  
  dropdownStates.value[field] = false
  
  emit('data-changed', formData.value)
}

const validateForm = () => {
  errors.value = {}
  isSubmitted.value = true
  
  if (!formData.value.treatmentType) {
    errors.value.treatmentType = 'Заполните поле'
  }
  if (!formData.value.capSystem) {
    errors.value.capSystem = 'Заполните поле'
  }
  if (!formData.value.capCount) {
    errors.value.capCount = 'Заполните поле'
  }
  if (!formData.value.changeCycle) {
    errors.value.changeCycle = 'Заполните поле'
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
.treatment-data-form {
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
  flex: 1;
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
  align-items: left;
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
