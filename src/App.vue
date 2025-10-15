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
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.main-content {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
