<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div id="app">
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.main-content {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
