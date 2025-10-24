<template>
  <div class="pagination-container">
    <div class="pagination">
      <!-- Кнопка "Назад" -->
      <button 
        class="pagination-btn prev-btn" 
        :disabled="currentPage === 1"
        @click="handlePreviousPage"
      >
        <img src="/ui/nav_button_left.svg" alt="Previous" class="nav-icon" />
      </button>

      <!-- Индикатор страницы -->
      <div class="page-indicator">
        <span class="current-page">{{ currentPage }}</span>
        <span class="page-separator">из</span>
        <span class="total-pages">{{ totalPages }}</span>
      </div>

      <!-- Кнопка "Вперед" -->
      <button 
        class="pagination-btn next-btn" 
        :disabled="currentPage === totalPages"
        @click="handleNextPage"
      >
        <img src="/ui/nav_button_right.svg" alt="Next" class="nav-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['previous-page', 'next-page'])

const handlePreviousPage = () => {
  if (props.currentPage > 1) {
    emit('previous-page')
  }
}

const handleNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('next-page')
  }
}
</script>

<style scoped>
/* Пагинатор */
.pagination-container {
  position: absolute;
  width: 100%;
  height: 48px;
  left: 0px;
  background: #A9CFF5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 160px;
  height: 40px;
  flex-shrink: 0;
}

.pagination-btn {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  background: #F7F8FC;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
  margin: 0;
  line-height: 1;
  box-sizing: border-box;
}

.pagination-btn:hover:not(:disabled) {
  background: #E5E7EB;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-icon {
  width: 9px;
  height: 14px;
}

.page-indicator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 6px 8px;
  gap: 4px;
  width: 69px;
  border-radius: 16px;
}

.current-page {
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #1F2937;
  display: flex;
  align-items: center;
}

.page-separator {
  font-size: 14px;
  line-height: 20px;
  color: rgba(31, 41, 55, 0.55);
  display: flex;
  align-items: center;
}

.total-pages {
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  color: rgba(31, 41, 55, 0.55);
  display: flex;
  align-items: center;
}
</style>
