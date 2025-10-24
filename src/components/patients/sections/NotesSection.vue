<template>
  <div class="notes-section">
    <div class="notes-header">
      <div class="notes-title">Примечания</div>
      <button class="add-note-btn" @click="handleAddNote">
        <img src="/icons/plus_blue.svg" alt="Add" class="add-icon" />
        <span class="add-text">Добавить примечание</span>
      </button>
    </div>
    
    <!-- Список примечаний -->
    <div v-if="notes.length > 0" class="notes-list">
      <div v-for="note in notes" :key="note.id" class="note-item">
        <div class="note-text">{{ note.text }}</div>
        <button class="delete-note-btn" @click="handleDeleteNote(note.id)">
          <img src="/icons/trashcan.svg" alt="Delete" class="delete-icon" />
        </button>
      </div>
    </div>
    
    <!-- Delete note confirmation modal -->
    <BaseConfirmationModal
      v-model="isDeleteNoteModalOpen"
      title="Удалить примечание"
      message="Вы уверены, что хотите удалить примечание по пациенту?"
      primary-text="Нет, оставить"
      secondary-text="Удалить"
      @primary="cancelDeleteNote"
      @secondary="confirmDeleteNote"
    />
    
    <!-- Add note modal -->
    <AddNoteModal
      v-model="isAddNoteModalOpen"
      @add="confirmAddNote"
      @cancel="cancelAddNote"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { additionalNotes } from '../../../data/mockData'
import BaseConfirmationModal from '../../modals/BaseConfirmationModal.vue'
import AddNoteModal from '../../modals/AddNoteModal.vue'

const notes = ref([...additionalNotes])

const isDeleteNoteModalOpen = ref(false)
const pendingDeleteNoteId = ref(null)

const isAddNoteModalOpen = ref(false)

const handleDeleteNote = (noteId) => {
  pendingDeleteNoteId.value = noteId
  isDeleteNoteModalOpen.value = true
}

const confirmDeleteNote = () => {
  alert('Примечание успешно удалено')
  isDeleteNoteModalOpen.value = false
  pendingDeleteNoteId.value = null
}

const cancelDeleteNote = () => {
  isDeleteNoteModalOpen.value = false
  pendingDeleteNoteId.value = null
}

const handleAddNote = () => {
  isAddNoteModalOpen.value = true
}

const confirmAddNote = (data) => {
  const newNote = {
    id: Date.now(), // Simple ID generation
    text: data.text
  }
  notes.value.push(newNote)
  isAddNoteModalOpen.value = false
}

const cancelAddNote = () => {
  isAddNoteModalOpen.value = false
}
</script>

<style scoped>
.notes-section {
  width: 100%;
  min-height: 77px;
  background: #F7F7F7;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.notes-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.notes-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.add-note-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: 224px;
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

.add-note-btn:hover {
  background: #f8fafc;
}

.add-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

/* Стили для списка примечаний */
.notes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.note-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  gap: 8px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
}

.note-text {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #1F2937;
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 361px;
  height: 19px;
}

.delete-note-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.delete-note-btn:hover {
  background: #f3f4f6;
}

.delete-icon {
  width: 18px;
  height: 23px;
}
</style>
