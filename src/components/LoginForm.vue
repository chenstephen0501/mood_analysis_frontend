<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4"
  >
    <div
      class="bg-white p-10 rounded-3xl shadow-2xl max-w-sm w-full"
      style="backdrop-filter: saturate(180%) blur(10px);"
    >
      <h1 class="text-3xl font-extrabold text-center text-blue-900 mb-8 drop-shadow-md">
        心情日記登入
      </h1>
      <el-form :model="form" :rules="rules" ref="loginForm" label-position="top">
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="form.email"
            placeholder="請輸入 Email"
            class="rounded-md"
          ></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="請輸入密碼"
            class="rounded-md"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="w-full text-lg font-semibold"
            @click="handleLogin"
            >登入</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

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
      // 這邊之後串接 API
      console.log("登入資料", form.value);
      ElMessage.success("登入成功（模擬）");
    } else {
      ElMessage.error("請填寫正確的登入資料");
    }
  });
}
</script>

<style scoped></style>
