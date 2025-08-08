<template>
  <div class="mb-5">
    <div class="relative w-24 h-24 mx-auto">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-change="handleChange"
        :http-request="dummyRequest"
      >
        <img
          v-if="modelValue"
          :src="modelValue"
          alt="avatar"
          class="w-24 h-24 rounded-full object-cover border-4 border-pink-300 shadow"
        />
        <div
          v-else
          class="w-24 h-24 rounded-full border-4 border-pink-300 shadow overflow-hidden flex items-center justify-center bg-transparent"
        >
          <Logo class="w-full h-full object-contain" />
        </div>
      </el-upload>

      <!-- 清除按鈕 -->
      <button
        v-if="modelValue"
        @click.prevent="clearImage"
        class="absolute top-0 right-0 -mt-2 -mr-2 bg-white rounded-full p-1 shadow hover:bg-pink-100"
        title="清除頭貼"
        type="button"
      >
        <i class="el-icon-close text-pink-600 text-sm"></i>
      </button>
    </div>

    <p class="text-sm text-pink-500 mt-2 text-center">上傳頭貼（可選）</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import Logo from './Logo.vue';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

function beforeAvatarUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('僅支援 JPG/PNG 格式');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('檔案大小需小於 2MB');
    return false;
  }

  return true;
}

function dummyRequest({ onSuccess }) {
  // 阻止上傳，模擬成功
  setTimeout(() => onSuccess('ok'), 0);
}

function handleChange(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    emit('update:modelValue', e.target.result);
  };
  reader.readAsDataURL(file.raw);
}

function clearImage() {
  emit('update:modelValue', '');
}
</script>