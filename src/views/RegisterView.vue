<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-green-100 to-pink-200">
    <div class="relative p-[2px] rounded-3xl bg-gradient-to-br from-pink-300 via-yellow-200 to-green-200 shadow-2xl max-w-sm w-full animate-fade-in">
      <RegisterForm />
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}
</style>