<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50" @click.self="$emit('close')">
    <!-- 筆記本容器 -->
    <div class="relative w-full max-w-md p-6 rounded-3xl shadow-2xl animate-fadeIn overflow-hidden paper-texture">

      <!-- 關閉按鈕 -->
      <button @click="$emit('close')"
        class="absolute top-4 right-4 w-12 h-12 flex justify-center items-center bg-white rounded-full shadow hover:bg-gray-100 transition-all z-50 text-pink-500 text-2xl font-bold"
        title="關閉">
        ✖
      </button>

      <!-- 標題 -->
      <h2 class="text-3xl font-bold mb-3 text-pink-600 text-center drop-shadow-sm handwriting-font">📝 今日心情</h2>
      <div class="h-1 w-24 mx-auto mb-5 rounded-full bg-gradient-to-r from-pink-400 to-pink-200"></div>

      <!-- 標題輸入 -->
      <input v-model="title" type="text" placeholder="標題"
        class="w-full p-3 mb-5 handwriting-box marker-dash text-lg font-bold placeholder-gray-600" />

      <!-- 心情選擇 -->
      <div class="mb-5">
        <p class="mb-3 text-2xl font-medium text-gray-700 handwriting-font">今天的心情：</p>
        <button @click="showEmojis = !showEmojis"
          class="w-full text-left px-4 py-2 handwriting-box marker-dash flex justify-between items-center bg-white hover:bg-pink-50 transition-all">
          <span>{{ selectedMood || "選擇心情" }}</span>
          <span class="text-gray-400">▼</span>
        </button>

        <div v-if="showEmojis" class="flex flex-wrap gap-3 mt-3">
          <button v-for="(emoji, index) in emojis" :key="index" @click="selectMood(emoji.symbol)"
            class="group flex justify-center items-center w-14 h-14 text-3xl rounded-lg bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-110 relative">
            {{ emoji.symbol }}
            <span
              class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
              {{ emoji.label }}
            </span>
          </button>
        </div>
      </div>

      <!-- 內容 -->
      <textarea v-model="content" placeholder="發生了什麼事..." rows="5"
        class="w-full p-4 handwriting-box marker-dash text-lg font-medium placeholder-gray-600 resize-none"></textarea>

      <!-- 儲存按鈕 -->
      <div class="mt-6 flex justify-end">
        <button @click="submitNote"
          class="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 font-semibold shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const content = ref("");
const selectedMood = ref("");
const showEmojis = ref(false);

const emojis = [
  { symbol: "😀", label: "開心" },
  { symbol: "😅", label: "緊張" },
  { symbol: "😍", label: "愛心" },
  { symbol: "😢", label: "難過" },
  { symbol: "😡", label: "生氣" },
  { symbol: "🤔", label: "思考" },
  { symbol: "😴", label: "疲倦" },
  { symbol: "🥳", label: "慶祝" },
  { symbol: "😎", label: "酷" },
  { symbol: "😭", label: "傷心" },
];

const emit = defineEmits(["submit", "close"]);

function selectMood(emoji) {
  selectedMood.value = emoji;
  showEmojis.value = false;
}

function submitNote() {
  if (!title.value.trim() || !content.value.trim() || !selectedMood.value) return;

  emit("submit", {
    title: title.value,
    content: content.value,
    mood: selectedMood.value
  });

  title.value = "";
  content.value = "";
  selectedMood.value = "";
  showEmojis.value = false;

  emit("close");
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');

.handwriting-font {
  font-family: 'Rock Salt', cursive;
  line-height: 1.6;
}

h2.handwriting-font {
  font-size: 2rem;
}

.paper-texture {
  background-color: #fffbe8;
  background-image:
    repeating-linear-gradient(to right, rgba(0, 0, 0, 0.02) 0, rgba(0, 0, 0, 0.02) 1px, transparent 1px, transparent 20px),
    radial-gradient(circle at 20% 20%, rgba(0, 0, 0, 0.02) 0%, transparent 30%),
    radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.015) 0%, transparent 40%);
  background-size: 20px 20px, 100% 100%, 100% 100%;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.handwriting-box {
  position: relative;
  border-radius: 0.75rem;
  background: #fffef5;
}

.marker-dash {
  border: 3px dashed rgba(255, 105, 180, 0.7);
  /* 粉紅馬克筆色 */
  box-shadow: 0 0 2px rgba(255, 105, 180, 0.4), inset 0 0 3px rgba(255, 105, 180, 0.4);
  outline: 2px solid rgba(255, 182, 193, 0.3);
}
</style>
