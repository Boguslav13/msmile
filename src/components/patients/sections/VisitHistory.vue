<template>
  <div class="visit-history">
    <div class="visit-history-title">История визитов</div>
    
    <div v-if="visits.length === 0" class="no-visits">
      Визитов не было
    </div>
    
    <div v-else class="visits-content">
      <!-- Table header -->
      <div class="visits-header">
        <div class="header-cell date-col">Дата</div>
        <div class="header-cell purpose-col">Цель визита</div>
        <div class="header-cell comments-col">Комментарии врача</div>
        <div class="header-cell files-col">Файлы</div>
      </div>
      
      <!-- Visit rows -->
      <div class="visits-list">
        <div v-for="visit in visits" :key="visit.id" class="visit-row">
          <div class="visit-date">{{ visit.date }}</div>
          <div class="visit-purpose">{{ visit.type || visit.purpose }}</div>
          <div class="visit-comments">{{ visit.notes || visit.comments }}</div>
          <div class="visit-files">
            <div class="files-grid">
              <div v-for="file in (visit.files || [])" :key="file.id" class="file-thumbnail" @click="openImagePopup(file)">
                <img :src="file.thumbnail" :alt="file.name" />
                <div class="file-overlay">
                  <img src="/icons/zoom.svg" alt="Zoom" class="zoom-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image popup modal -->
    <div v-if="selectedImage" class="image-popup-overlay" @click="closeImagePopup">
      <div class="image-popup-content" @click.stop>
        <img src="/icons/close.svg" alt="Close" class="close-icon" @click="closeImagePopup" />
        <img :src="selectedImage.thumbnail" :alt="selectedImage.name" class="popup-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  visits: {
    type: Array,
    default: () => []
  }
})

const selectedImage = ref(null)

const openImagePopup = (file) => {
  selectedImage.value = file
}

const closeImagePopup = () => {
  selectedImage.value = null
}
</script>

<style scoped>
.visit-history {
  width: 100%;
  min-height: 385px;
  background: #F7F7F7;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.visit-history-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
  margin-bottom: 24px;
}

.no-visits {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #DBDBDB;
}

.visits-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.visits-header {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 24px;
  background: #FDF3C8;
  border-radius: 12px;
  margin-bottom: 0;
}

.header-cell {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.date-col {
  width: 94px;
  flex: none;
}

.purpose-col {
  flex: 1;
  min-width: 327px;
}

.comments-col {
  flex: 1;
  min-width: 327px;
}

.files-col {
  width: 204px;
  flex: none;
}

.visits-list {
  display: flex;
  flex-direction: column;
}

.visit-row {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 24px;
  border-radius: 12px;
}

.visit-date {
  width: 94px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #1F2937;
  flex: none;
}

.visit-purpose {
  flex: 1;
  min-width: 327px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.visit-comments {
  flex: 1;
  min-width: 327px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.visit-files {
  width: 204px;
  flex: none;
}

.files-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.file-thumbnail {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.file-thumbnail:hover {
  transform: scale(1.05);
}

.file-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
  opacity: 0;
  transition: opacity 0.2s;
}

.file-thumbnail:hover .file-overlay {
  opacity: 1;
}

.file-thumbnail .file-overlay .zoom-icon {
  width: 25px;
  height: 25px;
  opacity: 0.9;
}

/* Image popup styles */
.image-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.image-popup-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 8px;
  transition: background-color 0.2s;
}

.close-icon:hover {
  background: rgba(255, 255, 255, 1);
}

.popup-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
</style>
