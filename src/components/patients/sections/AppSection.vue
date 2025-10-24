<template>
  <div class="app-section">
    <div class="app-header">
      <div class="app-title">Приложение</div>
      <button class="print-btn">
        <img src="/icons/print.svg" alt="Print" class="print-icon" />
        <span class="print-text">Печатать</span>
      </button>
    </div>
    
    <div class="app-content">
      <div class="qr-code">
        <img src="/default/qr_code.svg" alt="QR Code" class="qr-image" />
      </div>
      
      <div class="app-info">
        <div class="info-row">
          <span class="info-label">Тип аккаунта:</span>
          <span class="info-value">{{ accountType }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Статус аккаунта:</span>
          <span class="info-value">{{ accountStatus }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Дата генерации:</span>
          <span class="info-value">{{ generationDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { appData } from '../../../data/mockData'

const accountType = ref(appData.accountType)
const accountStatus = ref(appData.accountStatus)
const generationDate = ref(appData.generationDate)
</script>

<style scoped>
.app-section {
  width: 100%;
  min-height: 241px;
  background: #F7F7F7;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.app-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.print-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: 120px;
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

.print-btn:hover {
  background: #f8fafc;
}

.print-icon {
  width: 16px;
  height: 15px;
  flex-shrink: 0;
}

.app-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  flex: 1;
}

.app-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.info-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.info-label {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #8C96AB;
}

.info-value {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border: 1px solid #A9CFF5;
  border-radius: 16px;
  background: #FFFFFF;
  flex-shrink: 0;
}

.qr-image {
  width: 120px;
  height: 120px;
  border-radius: 16px;
}
</style>
