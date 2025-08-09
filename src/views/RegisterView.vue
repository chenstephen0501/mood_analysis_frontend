<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-200 to-green-200 px-4">
    <div class="relative p-[2px] rounded-3xl bg-gradient-to-br from-pink-300 via-yellow-200 to-green-200 shadow-2xl max-w-sm w-full animate-fade-in">
      <!-- 毛玻璃白卡 -->
      <div
        class="bg-white bg-opacity-80 p-10 rounded-[22px] backdrop-blur-md"
        style="backdrop-filter: saturate(180%) blur(10px);"
      >
        <LoginForm />
        <SocialLoginButtons
            class="mt-6"
            actionText="註冊"
            @line-login="handleLineLogin"
            @fb-login="handleFbLogin"
            @ig-login="handleIgLogin"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from "@/components/RegisterForm.vue";
import SocialLoginButtons from "@/components/SocialLoginButtons.vue";
import { ElMessage } from "element-plus";

function handleLineLogin() {
  ElMessage.info("LINE 登入流程尚未實作");
}
function handleFbLogin() {
  ElMessage.info("Facebook 登入流程尚未實作");
}
function loginWithInstagram() {
  ElMessage.info("Instagram 登入流程尚未實作");
}
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