<template>
  <div class="mt-6 text-center">
    <p class="mb-4 text-pink-600 font-medium">或使用社群帳號{{ actionText }}</p>
    <div class="flex justify-between items-center gap-4">
      <button
        @click="$emit('line-login')"
        class="flex-1 py-2 bg-green-50 hover:bg-green-100 transition rounded-lg shadow-sm"
        aria-label="LINE 登入"
      >
        <img src="@/assets/LINE_logo.svg" alt="LINE 登入" class="h-6 mx-auto" />
      </button>

      <button
        @click="$emit('fb-login')"
        class="flex-1 py-2 bg-blue-50 hover:bg-blue-100 transition rounded-lg shadow-sm"
        aria-label="Facebook 登入"
      >
        <img src="@/assets/Facebook_Logo.png" alt="Facebook 登入" class="h-6 mx-auto" />
      </button>

      <button
        @click="$emit('ig-login')"
        class="flex-1 py-2 bg-pink-50 hover:bg-pink-100 transition rounded-lg shadow-sm"
        aria-label="Instagram 登入"
      >
        <img src="@/assets/Instagram_logo.png" alt="Instagram 登入" class="h-6 mx-auto" />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  actionText: {
    type: String,
    default: '登入', // 預設為登入
  },
});
</script>
<style scoped></style>
