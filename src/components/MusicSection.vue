<template>
  <section class="music-section relative bg-white bg-opacity-60 rounded-xl p-4 shadow-md overflow-hidden">
    <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
      <img src="@/assets/Spotify_logo.png" alt="Spotify Logo" class="w-6 h-6"/>
      今日推薦音樂
    </h2>

    <div v-if="musicList.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(song, index) in musicList" :key="index" class="flex items-center gap-4 bg-white bg-opacity-70 rounded-lg p-3 shadow hover:shadow-md transition">
        <img :src="song.cover" alt="封面" class="w-16 h-16 rounded-md object-cover"/>
        <div class="flex-1">
          <p class="font-medium">{{ song.title }}</p>
          <p class="text-sm text-gray-600">{{ song.artist }}</p>
        </div>
        <button class="text-green-500 hover:text-green-600" @click="playSong(song)">
          ▶️
        </button>
      </div>
    </div>

    <div v-else>載入中...</div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const musicList = ref([]);

function loadMusic() {
  musicList.value = [
    { title: "Good Vibes Only", artist: "Lo-fi Beats", cover: "https://picsum.photos/100/100?random=1", url: "#" },
    { title: "Sunny Days", artist: "Chillhop", cover: "https://picsum.photos/100/100?random=2", url: "#" }
  ];
}

function playSong(song) {
  console.log("播放", song.title);
}

onMounted(() => {
  loadMusic();
});
</script>
