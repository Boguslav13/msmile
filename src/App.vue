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
  height: calc(100% - 160px);
  margin: 0;
  padding: 0;
  margin-top: 160px;
}
</style>
