<template>
  <div class="profile-page">
    <Header />

    <PasswordChangeCard />
    <LogoutCard />
  </div>
</template>

<script setup>
import Header from '../../components/layout/Header.vue'
import PasswordChangeCard from '../../components/doctor/PasswordChangeCard.vue'
import LogoutCard from '../../components/doctor/LogoutCard.vue'
</script>

<style scoped>
.profile-page {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  padding-top: 160px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
}

/* Styles are defined inside child components */
</style>