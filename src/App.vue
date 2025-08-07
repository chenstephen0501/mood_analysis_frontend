<template>
  <div id="app-root">
    <header>
      <router-link :to="{ name: 'Home' }">Home</router-link> /
      <router-link :to="{ name: 'About' }">About</router-link> /
    </header>
    <main>
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>

<script setup>
</script>


<style scoped>
</style>
