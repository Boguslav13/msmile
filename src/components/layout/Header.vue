<template>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <router-link to="/patients" class="logo">
          <div class="logo-container">
            <img src="/logos/logo_white.svg" alt="Magic Smile" class="logo-img" />
          </div>
        </router-link>
        
        <div class="tabs" v-if="!isProfileRoute">
          <router-link to="/patients" class="tab" :class="{ active: $route.path === '/patients' }">
            Пациенты
          </router-link>
          <router-link to="/archive" class="tab" :class="{ active: $route.path === '/archive' }">
            Архив
          </router-link>
        </div>
        <div class="profile-title" v-else>
          Профиль
        </div>
      </div>

      <div class="header-right">
        <router-link v-if="isProfileRoute" to="/patients" class="patient-panel-btn">
          Панель пациентов
        </router-link>
        <div class="doctor-profile" @click="goToProfile">
          <div class="doctor-info">
            <div class="doctor-name">
              <div class="name-line">{{ doctorLastName }} {{ doctorFirstName }}</div>
              <div class="name-line">{{ doctorMiddleName }}</div>
            </div>
          </div>
          <div class="doctor-avatar">
            <img src="/default/profile_picture_default.svg" :alt="doctorName" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const doctorLastName = computed(() => 'Иванов')
const doctorFirstName = computed(() => 'Иван')
const doctorMiddleName = computed(() => 'Иванович')
const doctorName = computed(() => `${doctorLastName.value} ${doctorFirstName.value} ${doctorMiddleName.value}`)

const goToProfile = () => {
  router.push('/doctor/profile')
}

const isProfileRoute = computed(() => route.path === '/doctor/profile')
</script>

<style scoped>
.header {
  position: absolute;
  width: 100%;
  height: 160px;
  left: 0px;
  top: 0px;
  background: #104D89;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  position: relative;
}

.header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding-top: 10px;
}

.logo {
  
  display: flex;
  align-items: center;
  text-decoration: none;
}

.tabs {
  display: flex;
  gap: 32px;
  align-items: center;
  margin-left: 0;
  margin-top: -10px;
}

.tab {
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0.5%;
  color: #C4C4C4;
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s;
}

.tab.active {
  font-weight: 600;
  color: #FFFFFF;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 4px;
  background: #FCC929;
  border-radius: 2px 2px 0 0;
}

.profile-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0.5%;
  color: #FFFFFF;
  padding: 8px 0;
  margin-top: -10px;
  position: relative;
}

.profile-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 4px;
  background: #FCC929;
  border-radius: 2px 2px 0 0;
}

.logo-container {
  width: 82px;
  height: 82px;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.doctor-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 16px;
  transition: opacity 0.2s;
}

.doctor-profile:hover {
  opacity: 0.8;
}

.doctor-info {
  text-align: right;
}

.doctor-name {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
}

.name-line {
  white-space: nowrap;
}

.doctor-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.doctor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.patient-panel-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  width: 173px;
  height: 35px;
  background: #3B7AB8;
  border-radius: 44px;
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
}
</style>
