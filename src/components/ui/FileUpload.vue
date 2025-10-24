<template>
  <div 
    class="file-upload"
    :class="{ 'drag-over': isDragOver }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      class="file-input"
      @change="handleFileSelect"
      accept="*/*"
      multiple
    />
    
    <div class="upload-icon">
      <img src="/icons/upload.svg" alt="Upload" />
    </div>
    
    <div class="upload-content">
      <div class="upload-text">
        Перетащите файл в ячейку
      </div>
      
      <div class="upload-divider">
        <div class="divider-line"></div>
        <span class="divider-text">или</span>
        <div class="divider-line"></div>
      </div>
      
      <button class="upload-button">
        Загрузить с компьютера
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['files-selected'])

const fileInput = ref(null)
const isDragOver = ref(false)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    emit('files-selected', files)
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  isDragOver.value = false
}

const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = Array.from(event.dataTransfer.files)
  if (files.length > 0) {
    emit('files-selected', files)
  }
}
</script>

<style scoped>
.file-upload {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 12px;
  width: 240px;
  height: 137px;
  background: #FFFFFF;
  border: 1px dashed #A9CFF5;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.file-upload:hover {
  border-color: #3B7AB8;
  background: #F8FAFC;
}

.file-upload.drag-over {
  border-color: #3B7AB8;
  background: #E0F2FE;
  border-style: solid;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}

.upload-icon {
  width: 24px;
  height: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 73px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.upload-text {
  width: 100%;
  height: 20px;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  color: #0B0B0B;
  text-align: center;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.upload-divider {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 100%;
  height: 12px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.divider-line {
  flex: 1;
  height: 0.97px;
  background: #E7E7E7;
}

.divider-text {
  width: 18px;
  height: 18px;
  font-style: normal;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  color: #6D6D6D;
  flex-shrink: 0;
}

.upload-button {
  width: auto;
  min-width: 175px;
  height: 17px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.005em;
  text-decoration-line: underline;
  color: #104D89;
  background: none;
  border: none;
  cursor: pointer;
  flex: none;
  order: 2;
  flex-grow: 0;
  transition: all 0.2s ease;
  white-space: nowrap;
  margin: 0 auto;
  padding: 0 8px;
}

.upload-button:hover {
  color: #0B3A6B;
  text-decoration-thickness: 2px;
}
</style>
