<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="onClose">
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" @click="onClose" aria-label="Close">
        <img src="/icons/close.svg" alt="close" />
      </button>

      <div class="modal-title" v-if="title">{{ title }}</div>
      <div class="modal-message" v-if="message">{{ message }}</div>

      <div class="modal-actions">
        <button class="btn btn-primary" @click="onPrimary">{{ primaryText }}</button>
        <button class="btn btn-secondary" @click="onSecondary">{{ secondaryText }}</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  primaryText: { type: String, default: 'OK' },
  secondaryText: { type: String, default: 'Cancel' }
})

const emit = defineEmits(['update:modelValue', 'primary', 'secondary', 'close'])

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onPrimary = () => {
  emit('primary')
}

const onSecondary = () => {
  emit('secondary')
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
  width: 400px;
  height: 230px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 4px rgba(164, 164, 164, 0.2);
  border-radius: 24px;
  padding-top: 16px; /* to give space for close */
}

.modal-close {
  position: absolute;
  width: 24px;
  height: 24px;
  left: 360px;
  top: 16px;
  background: transparent;
  border: none;
  padding: 0;
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

.modal-message {
  position: absolute;
  left: 24px;
  top: 93px;
  width: 352px;
  height: 38px;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.modal-actions {
  position: absolute;
  left: 69px;
  top: 163px;
  width: 263px;
  height: 35px;
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
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  width: 134px;
  background: #3B7AB8;
  color: #FFFFFF;
  border: none;
}

.btn-secondary {
  width: 113px;
  background: #FFFFFF;
  color: #104D89;
  border: 1px solid #104D89;
}
</style>


