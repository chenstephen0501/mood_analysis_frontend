<template>
  <div :class="['min-h-screen w-full relative overflow-hidden', weatherClass]">
    <!-- 雲朵 -->
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>

    <!-- 陰雨天：雨滴 -->
    <div v-if="weather === 'rainy'" v-for="drop in rainDrops" :key="drop.id"
         class="rain-drop"
         :style="{ left: drop.left + '%', animationDuration: drop.duration + 's', animationDelay: drop.delay + 's' }">
    </div>

    <!-- 晴天：太陽 -->
    <div v-if="weather === 'sunny'" class="sun"></div>

    <!-- slot: 可以放頁面內容 -->
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps({
  weather: {
    type: String,
    default: "rainy", // 預設陰雨天
  },
});

const rainDrops = ref([]);

function createRainDrops(count) {
  rainDrops.value = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.7 + Math.random() * 1.3
  }));
}

// 監聽天氣切換
watch(() => props.weather, (newWeather) => {
  if (newWeather === "rainy") {
    createRainDrops(80);
  } else {
    rainDrops.value = [];
  }
}, { immediate: true });

const weatherClass = computed(() => {
  return props.weather === "rainy"
    ? "bg-overcast-animated"
    : "bg-sunny-animated";
});
</script>

<style>
/* 陰雨天背景漸變 */
@keyframes overcastGradient {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.bg-overcast-animated {
  background: linear-gradient(to bottom, #4b5563, #6b7280, #374151);
  background-size: 400% 400%;
  animation: overcastGradient 20s ease infinite;
  position: relative;
}

/* 晴天背景 */
@keyframes sunnyGradient {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
.bg-sunny-animated {
  background: linear-gradient(to bottom, #aee1f9, #60c0f3, #3b82f6);
  background-size: 400% 400%;
  animation: sunnyGradient 30s ease infinite;
  position: relative;
}

/* 雨滴動畫 */
@keyframes raindrop {
  0% { transform: translateY(-20px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(110vh); opacity: 0; }
}
.rain-drop {
  position: absolute;
  width: 2px;
  height: 15px;
  background: rgba(255,255,255,0.7);
  top: -20px;
  animation-name: raindrop;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  z-index: 2;
}

/* 真實雲朵（陰雨+晴天共用） */
.cloud {
  position: absolute;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  z-index: 1;
  opacity: 0.9;
}

/* 雲1 */
.cloud-1 { width: 220px; height: 70px; top: 20px; left: 10%; animation: cloudFloat 120s linear infinite; }
.cloud-1::before { content: ''; position: absolute; width: 130px; height: 60px; top: -20px; left: 20px; background: rgba(255,255,255,0.8); border-radius: 50%; }
.cloud-1::after { content: ''; position: absolute; width: 100px; height: 50px; top: 10px; left: 80px; background: rgba(255,255,255,0.8); border-radius: 50%; }
/* 雲2 */
.cloud-2 { width: 250px; height: 80px; top: 60px; left: 50%; animation: cloudFloat 150s linear infinite; opacity: 0.7; }
.cloud-2::before { content: ''; position: absolute; width: 150px; height: 70px; top: -25px; left: 30px; background: rgba(255,255,255,0.7); border-radius: 50%; }
.cloud-2::after { content: ''; position: absolute; width: 120px; height: 60px; top: 10px; left: 100px; background: rgba(255,255,255,0.7); border-radius: 50%; }
/* 雲3 */
.cloud-3 { width: 180px; height: 50px; top: 40px; left: 75%; animation: cloudFloat 180s linear infinite; opacity: 0.6; }
.cloud-3::before { content: ''; position: absolute; width: 100px; height: 40px; top: -15px; left: 20px; background: rgba(255,255,255,0.7); border-radius: 50%; }
.cloud-3::after { content: ''; position: absolute; width: 90px; height: 35px; top: 5px; left: 60px; background: rgba(255,255,255,0.7); border-radius: 50%; }

/* 雲漂浮動畫 */
@keyframes cloudFloat { 0% { transform: translateX(0); } 100% { transform: translateX(120vw); } }

/* 晴天太陽 */
.sun {
  position: absolute;
  top: 50px;
  right: 10%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle at center, #FFD700 0%, #FFA500 70%);
  border-radius: 50%;
  box-shadow: 0 0 50px 15px rgba(255, 215, 0, 0.5);
  z-index: 1;
  animation: sunGlow 6s ease-in-out infinite alternate;
}

@keyframes sunGlow {
  0% { transform: scale(1); box-shadow: 0 0 30px 10px rgba(255,215,0,0.5); }
  100% { transform: scale(1.05); box-shadow: 0 0 60px 20px rgba(255,215,0,0.6); }
}
</style>