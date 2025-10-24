<template>
  <div class="patient-edit-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        ← Назад к пациенту
      </button>
      <h1 class="page-title">Редактировать пациента</h1>
    </div>

    <form @submit.prevent="savePatient" class="edit-form">
      <!-- Данные пациента -->
      <div class="form-section">
        <h3>Данные пациента</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="lastName">Фамилия</label>
            <input
              id="lastName"
              v-model="form.patient.lastName"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="firstName">Имя</label>
            <input
              id="firstName"
              v-model="form.patient.firstName"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="middleName">Отчество</label>
            <input
              id="middleName"
              v-model="form.patient.middleName"
              type="text"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="birthDate">Дата рождения</label>
            <input
              id="birthDate"
              v-model="form.patient.birthDate"
              type="date"
              required
            />
          </div>
          <div class="form-group">
            <label for="photo">Фото пациента</label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              @change="handlePhotoChange"
            />
          </div>
        </div>
      </div>

      <!-- Данные родителя -->
      <div class="form-section">
        <h3>Данные родителя</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="parentLastName">Фамилия</label>
            <input
              id="parentLastName"
              v-model="form.parent.lastName"
              type="text"
            />
          </div>
          <div class="form-group">
            <label for="parentFirstName">Имя</label>
            <input
              id="parentFirstName"
              v-model="form.parent.firstName"
              type="text"
            />
          </div>
          <div class="form-group">
            <label for="parentMiddleName">Отчество</label>
            <input
              id="parentMiddleName"
              v-model="form.parent.middleName"
              type="text"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="parentPhone">Телефон</label>
            <input
              id="parentPhone"
              v-model="form.parent.phone"
              type="tel"
            />
          </div>
          <div class="form-group">
            <label for="parentEmail">Email</label>
            <input
              id="parentEmail"
              v-model="form.parent.email"
              type="email"
            />
          </div>
        </div>
      </div>

      <!-- Данные лечения -->
      <div class="form-section">
        <h3>Данные лечения</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="treatmentType">Тип лечения</label>
            <select id="treatmentType" v-model="form.treatment.type" required>
              <option value="main">Основной</option>
              <option value="additional">Дополнительный</option>
            </select>
          </div>
          <div class="form-group">
            <label for="capSystem">Система кап</label>
            <select id="capSystem" v-model="form.treatment.capSystem" required>
              <option value="invisalign">Invisalign</option>
              <option value="clearalign">ClearAlign</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="capCount">Количество кап</label>
            <select id="capCount" v-model="form.treatment.capCount" required>
              <option v-for="n in 50" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cycleDays">Цикл смены (дни)</label>
            <select id="cycleDays" v-model="form.treatment.cycleDays" required>
              <option value="7">7 дней</option>
              <option value="10">10 дней</option>
              <option value="12">12 дней</option>
              <option value="14">14 дней</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="accountType">Тип аккаунта</label>
            <select id="accountType" v-model="form.treatment.accountType" required>
              <option value="child">Детский</option>
              <option value="teen">Подростковый</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Примечание -->
      <div class="form-section">
        <h3>Примечание</h3>
        <div class="form-group">
          <label for="note">Примечание</label>
          <textarea
            id="note"
            v-model="form.note"
            rows="4"
            placeholder="Дополнительная информация о пациенте..."
          ></textarea>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="form-actions">
        <button type="button" class="btn-cancel" @click="goBack">
          Отмена
        </button>
        <button type="submit" class="btn-save" :disabled="isLoading">
          {{ isLoading ? 'Сохранение...' : 'Сохранить изменения' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLoading = ref(false)

const form = ref({
  patient: {
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    photo: null
  },
  parent: {
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    email: ''
  },
  treatment: {
    type: 'main',
    capSystem: 'invisalign',
    capCount: 1,
    cycleDays: 7,
    accountType: 'child'
  },
  note: ''
})

onMounted(() => {
  loadPatientData()
})

const loadPatientData = () => {
  const patientId = route.params.id
  console.log('Загружаем данные пациента:', patientId)
}

const handlePhotoChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.patient.photo = file
  }
}

const savePatient = async () => {
  isLoading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Данные пациента успешно сохранены')
    goBack()
  } catch (error) {
    alert('Ошибка при сохранении данных')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push(`/patients/${route.params.id}`)
}
</script>

<style scoped>
.patient-edit-page {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.back-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background: #e5e7eb;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.edit-form {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-cancel:hover {
  background: #e5e7eb;
}

.btn-save {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-save:hover:not(:disabled) {
  background: #4338ca;
}

.btn-save:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
