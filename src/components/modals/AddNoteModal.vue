<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="onClose">
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" @click="onClose" aria-label="Close">
        <img src="/icons/close.svg" alt="close" />
      </button>

      <div class="modal-title">Добавить примечание</div>

      <!-- Form fields -->
      <div class="form-fields">
        <!-- Текст примечания -->
        <div class="field-group full-width">
          <label class="field-label">Текст примечания</label>
          <textarea 
            v-model="noteText"
            class="note-textarea"
            placeholder="Введите текст примечания..."
          ></textarea>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="modal-actions">
        <button class="btn btn-primary" @click="onAdd">Добавить примечание</button>
        <button class="btn btn-secondary" @click="onCancel">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'add', 'cancel', 'close'])

const noteText = ref('')

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onAdd = () => {
  if (!noteText.value.trim()) {
    alert('Пожалуйста, введите текст примечания')
    return
  }
  
  alert('Примечание успешно добавлено')
  emit('add', { text: noteText.value })
  noteText.value = ''
  onClose()
}

const onCancel = () => {
  noteText.value = ''
  emit('cancel')
  onClose()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  position: relative;
  width: 695px;
  height: 300px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 4px rgba(164, 164, 164, 0.2);
  border-radius: 24px;
  padding: 24px;
  box-sizing: border-box;
}

.modal-close {
  position: absolute;
  width: 24px;
  height: 24px;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close img {
  width: 14px;
  height: 14px;
}

.modal-title {
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  height: 29px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
  text-align: center;
  white-space: nowrap;
}

.form-fields {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  position: relative;
}

.full-width {
  width: 100%;
}

.field-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #1F2937;
  white-space: nowrap;
}

.note-textarea {
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid #A9CFF5;
  border-radius: 16px;
  background: #FFFFFF;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: #000000;
  resize: none;
  overflow-y: auto;
  box-sizing: border-box;
}

.note-textarea:focus {
  outline: none;
  border-color: #3B7AB8;
}

.modal-actions {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
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
  transition: background-color 0.2s;
}

.btn-primary {
  width: 212px;
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
</style>
