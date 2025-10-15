<template>
  <div class="login-page">
    <div class="left-content">
      <div class="bg-gradient">
        <div class="decorative-circles">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
        
        <div class="content">
          <div class="logo-container">
            <img src="/MS_logo_1.webp" alt="Magic Smile" class="logo" />
          </div>
          <h1 class="main-title">Система управления пациентами</h1>
          <p class="subtitle">Стоматологическая клиника "ДенталСмарт"</p>
        </div>
      </div>
    </div>

    <div class="right-content">
      <div class="form-container">
        <h2 class="welcome-title">Добро пожаловать!</h2>
        <p class="welcome-subtitle">Введите ваши данные для авторизации</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <input
              v-model="form.login"
              type="text"
              class="form-input"
              placeholder="Логин"
              required
            />
          </div>

          <div class="input-group">
            <input
              v-model="form.password"
              type="password"
              class="form-input"
              placeholder="Пароль"
              required
            />
          </div>

          <button type="submit" class="login-button" :disabled="isLoading">
            {{ isLoading ? 'Вход...' : 'Войти в аккаунт' }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>

    <div class="footer">
      <p>©2025 Мэджик Смайл. Все права защищены</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  login: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''

  try {
    // Мок
    if (form.value.login === 'admin' && form.value.password === 'admin') {
      localStorage.setItem('doctor', JSON.stringify({
        id: 1,
        name: 'Др. Иванов И.И.',
        clinic: 'Стоматологическая клиника "ДенталСмарт"'
      }))
      
      router.push('/patients')
    } else {
      error.value = 'Неверный логин или пароль'
    }
  } catch (err) {
    error.value = 'Ошибка входа в систему'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #FFFFFF;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* Левая часть с градиентом */
.left-content {
  position: relative;
  width: 70%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.bg-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #5CADFF 0%, #166BBE 84.79%, #0D559C 100%);
}

.decorative-circles {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
}

.circle {
  position: absolute;
  border: 1px solid #BDDEFF;
  border-radius: 50%;
}

.circle-1 {
  width: 557px;
  height: 557px;
  left: -126px;
  bottom: -200px;
}

.circle-2 {
  width: 557px;
  height: 557px;
  left: -207px;
  bottom: -174px;
}

.content {
  position: absolute;
  left: 15%;
  top: 10%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  text-align: left;
}

.logo-container {
  margin-bottom: 90px;
}

.logo {
  width: 140px;
  height: 140px;
  object-fit: contain;
}

.main-title {
  width: 728px;
  height: 116px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  color: #FFFFFF;
  margin: 0;
}

.subtitle {
  width: 100%;
  height: 27px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 27px;
  color: #FFFFFF;
  margin: 0;
}

/* Правая часть с формой */
.right-content {
  width: 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #FFFFFF;
  padding: 0 100px 0 100px;
  margin: 0;
  overflow: hidden;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.welcome-title {
  width: 278px;
  height: 34px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #1F2937;
  margin: 0 0 16px 0;
}

.welcome-subtitle {
  width: 355px;
  height: 22px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #535D6C;
  margin: 0 0 32px 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
}

.form-input {
  width: 100%;
  height: 43px;
  min-width: 260px;
  max-width: 358px;
  padding: 12px 16px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #1F2937;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input::placeholder {
  color: #8C96AB;
}

.form-input:focus {
  outline: none;
  border-color: #3B7AB8;
  box-shadow: 0 0 0 3px rgba(59, 122, 184, 0.1);
}

.login-button {
  width: 100%;
  min-width: 260px;
  max-width: 358px;
  height: 43px;
  background: #3B7AB8;
  border: none;
  border-radius: 44px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.login-button:hover:not(:disabled) {
  background: #2D5A8A;
}

.login-button:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}

.error-message {
  width: 100%;
  min-width: 260px;
  max-width: 358px;
  background: #FEF2F2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

/* Футер */
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #104D89;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.footer p {
  color: #FFFFFF;
  font-size: 14px;
  margin: 0;
}
</style>