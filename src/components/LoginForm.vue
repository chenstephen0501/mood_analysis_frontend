<template>
  <div
    class="bg-white bg-opacity-80 p-10 rounded-[22px] backdrop-blur-md"
    style="backdrop-filter: saturate(180%) blur(10px);"
  >
    <!-- LOGO -->
    <Logo />

    <!-- 標題 -->
    <h1
      class="text-3xl font-extrabold text-center text-pink-700 mb-8 drop-shadow-md"
    >
      心情日記登入
    </h1>

    <!-- 登入表單 -->
    <el-form
      :model="form"
      :rules="rules"
      ref="loginForm"
      label-position="top"
    >
      <!-- Email -->
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="form.email"
          placeholder="請輸入 Email"
          class="rounded-md"
        >
          <template #prefix>
            <i class="el-icon-message text-pink-400"></i>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密碼 -->
      <el-form-item label="密碼" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="請輸入密碼"
          class="rounded-md"
        >
          <template #prefix>
            <i class="el-icon-lock text-pink-400"></i>
          </template>
        </el-input>
      </el-form-item>

      <!-- 登入按鈕 -->
      <el-form-item>
        <el-button
          class="w-full text-lg font-semibold text-white border-none bg-gradient-to-r from-pink-400 to-yellow-400 hover:brightness-110"
          @click="handleLogin"
        >
          登入
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 註冊連結 -->
    <p class="mt-4 text-center text-sm text-gray-600">
      還沒有帳號嗎？
      <router-link
        to="/register"
        class="text-pink-500 hover:underline font-medium"
      >
        立即註冊
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import Logo from "./Logo.vue";

const loginForm = ref(null);
const form = ref({ email: "", password: "" });

const rules = {
  email: [
    { required: true, message: "Email 為必填", trigger: "blur" },
    { type: "email", message: "格式不正確", trigger: "blur" },
  ],
  password: [{ required: true, message: "密碼為必填", trigger: "blur" }],
};

function handleLogin() {
  loginForm.value.validate((valid) => {
    if (valid) {
      console.log("登入資料", form.value);
      ElMessage.success("登入成功（模擬）");
    } else {
      ElMessage.error("請填寫正確的登入資料");
    }
  });
}
</script>

<style scoped>
/* 這裡可以針對 form 做額外樣式調整 */
</style>