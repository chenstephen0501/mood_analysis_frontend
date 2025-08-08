<template>
  <div class="bg-white bg-opacity-80 p-10 rounded-[22px] backdrop-blur-md">
    <Logo />

    <h1 class="text-3xl font-extrabold text-center text-pink-700 mb-8 drop-shadow-md">
      建立帳號
    </h1>

    <el-form
      :model="form"
      :rules="rules"
      ref="registerForm"
      label-position="top"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="請輸入 Email">
          <template #prefix>
            <i class="el-icon-message text-pink-400"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="密碼" prop="password">
        <el-input v-model="form.password" type="password" placeholder="請輸入密碼">
          <template #prefix>
            <i class="el-icon-lock text-pink-400"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="確認密碼" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" placeholder="請再次輸入密碼">
          <template #prefix>
            <i class="el-icon-lock text-pink-400"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="w-full text-lg font-semibold text-white border-none bg-gradient-to-r from-pink-400 to-yellow-400 hover:brightness-110"
          @click="handleRegister"
        >
          註冊
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import Logo from './Logo.vue';

const registerForm = ref(null);
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  email: [
    { required: true, message: 'Email 為必填', trigger: 'blur' },
    { type: 'email', message: '格式不正確', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密碼為必填', trigger: 'blur' },
    { min: 6, message: '密碼需至少 6 碼', trigger: 'blur' },
  ],
  confirmPassword: [
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('兩次輸入的密碼不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};

function handleRegister() {
  registerForm.value.validate((valid) => {
    if (valid) {
      console.log('註冊資料', form.value);
      ElMessage.success('註冊成功（模擬）');
    } else {
      ElMessage.error('請填寫正確的註冊資料');
    }
  });
}
</script>