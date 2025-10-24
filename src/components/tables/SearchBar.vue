<template>
  <div class="search-bar">
    <!-- Строка поиска -->
    <div class="search-container">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Поиск" 
        class="search-input"
        @input="handleSearch"
      />
      <img src="/icons/Loop.svg" alt="Поиск" class="search-icon" />
    </div>

    <!-- Кнопка добавления пациента -->
    <button class="add-patient-btn" @click="handleAddPatient">
      <img src="/icons/plus.svg" alt="+" class="add-icon" />
      <span class="add-text">Добавить пациента</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search', 'add-patient'])

const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleAddPatient = () => {
  emit('add-patient')
}
</script>

<style scoped>
/* Плашка с поиском и кнопкой */
.search-bar {
  width: 100%;
  height: 61px;
  background: #A9CFF5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  margin: 0;
  box-sizing: border-box;
}

/* Строка поиска */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 260px;
  min-width: 260px;
  max-width: 358px;
  height: 35px;
  background: #FFFFFF;
  border-radius: 44.5px;
  padding: 0 12px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #1F2937;
  letter-spacing: 0.005em;
}

.search-input::placeholder {
  color: #8C96AB;
}

.search-icon {
  width: 17.49px;
  height: 17.49px;
  flex-shrink: 0;
}

/* Кнопка добавления пациента */
.add-patient-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  gap: 4px;
  width: 220px;
  height: 35px;
  background: #3B7AB8;
  border: none;
  border-radius: 44px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.add-patient-btn:hover {
  background: #2D5A8A;
}

.add-icon {
  width: 15px;
  height: 15px;
  object-fit: contain;
  flex-shrink: 0;
}

.add-text {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  letter-spacing: 0.005em;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
</style>
