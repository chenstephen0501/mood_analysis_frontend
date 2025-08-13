<template>
  <WeatherBackground :weather="weather">
    <!-- 頁首 -->
    <header class="p-4 flex justify-between items-center bg-white bg-opacity-50 shadow-md backdrop-blur-md z-10 relative">
      <h1 class="text-2xl font-bold text-gray-800">心情筆記</h1>
      <el-button
        type="primary"
        class="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all duration-300"
        @click="showMoodNote = true"
      >
        <span class="text-xl">📝</span>
        <span>新增筆記</span>
      </el-button>
    </header>

    <!-- 主要內容 -->
    <main class="flex-1 p-4 space-y-6 z-10 relative">
      <MoodNote v-if="showMoodNote" @submit="handleFormSubmit" @close="showMoodNote=false" />
      <MusicSection />
      <MoodChart />
    </main>
  </WeatherBackground>
</template>

<script setup>
import { ref } from "vue";
import WeatherBackground from "@/components/WeatherBackground.vue";
import MoodNote from "@/components/MoodNote.vue";
import MusicSection from "@/components/MusicSection.vue";
import MoodChart from "@/components/MoodChart.vue";

const weather = ref("rainy"); // sunny 或 rainy
const showMoodNote = ref(false);

function handleFormSubmit(note) {
  console.log("新筆記", note);
  showMoodNote.value = false;
}
</script>