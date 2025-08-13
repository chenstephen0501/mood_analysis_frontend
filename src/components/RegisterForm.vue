<template>
  <div class="bg-white bg-opacity-80 p-12 rounded-[22px] backdrop-blur-md w-full max-w-xl mx-auto">
    <!-- 使用模組化頭貼上傳 -->
    <AvatarUploader v-model="modelValue" />

    <el-form :model="form" :rules="rules" ref="registerForm" label-position="top" class="space-y-6">
      <!-- 名字 -->
      <el-form-item label="名字" prop="name">
        <el-input v-model="form.name" placeholder="請輸入您的名字">
          <template #prefix><i class="el-icon-user text-pink-400"></i></template>
        </el-input>
      </el-form-item>

      <!-- 性別 + 年齡 並排（間距縮小） -->
      <el-form-item label-width="0">
        <div class="flex flex-row gap-2 w-full">
          <el-form-item label="性別" prop="gender" class="flex-1">
            <el-select v-model="form.gender" placeholder="請選擇性別" class="w-full">
              <el-option label="男" value="male" />
              <el-option label="女" value="female" />
              <el-option label="不願透露" value="other" />
            </el-select>
          </el-form-item>

          <el-form-item label="年齡" prop="age" class="flex-1">
            <el-input v-model="form.age" type="number" min="1" placeholder="選填">
              <template #prefix><i class="el-icon-date text-pink-400"></i></template>
            </el-input>
          </el-form-item>
        </div>
      </el-form-item>

      <!-- Email -->
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="請輸入 Email">
          <template #prefix><i class="el-icon-message text-pink-400"></i></template>
        </el-input>
      </el-form-item>

      <!-- 密碼 -->
      <el-form-item label="密碼" prop="password">
        <el-input v-model="form.password" type="password" placeholder="請輸入密碼">
          <template #prefix><i class="el-icon-lock text-pink-400"></i></template>
        </el-input>
      </el-form-item>

      <!-- 確認密碼 -->
      <el-form-item label="確認密碼" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" placeholder="請再次輸入密碼">
          <template #prefix><i class="el-icon-lock text-pink-400"></i></template>
        </el-input>
      </el-form-item>

      <!-- 註冊按鈕 + 返回按鈕 -->
      <el-form-item>
        <div class="flex gap-2 w-full">
          <el-button
            class="flex-1 text-lg font-semibold text-white border-none bg-gradient-to-r from-pink-400 to-yellow-400 hover:brightness-110"
            @click="goBack"
          >
            返回
          </el-button>
          <el-button
            class="flex-1 text-lg font-semibold text-white border-none bg-gradient-to-r from-pink-400 to-yellow-400 hover:brightness-110"
            @click="handleRegister"
          >
            註冊
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import AvatarUploader from './AvatarUpload.vue';
import { useRouter } from 'vue-router';
const registerForm = ref(null);
const modelValue = ref('');


const router = useRouter();

function goBack() {
  router.push('/login');
}

const form = ref({
  name: '',
  gender: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  name: [{ required: true, message: '名字為必填', trigger: 'blur' }],
  gender: [{ required: true, message: '請選擇性別', trigger: 'change' }],
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
  age: [
    {
      validator: (rule, value, callback) => {
        if (value && (isNaN(value) || value <= 0)) {
          callback(new Error('年齡需為正整數'));
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
      console.log('頭貼圖片(base64)', modelValue.value);
      ElMessage.success('註冊成功（模擬）');
    } else {
      ElMessage.error('請填寫正確的註冊資料');
    }
  });
}
</script>
