<template>
  <div class="weather-scene" :style="sceneStyle">
    <!-- 雲 -->
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>

    <!-- 雨滴 -->
    <div
      v-for="drop in rainDrops"
      :key="drop.id"
      class="rain-drop"
      :style="{
        left: drop.left + '%',
        animationDuration: drop.duration + 's',
        animationDelay: drop.delay + 's',
        opacity: rainOpacity
      }"
    ></div>

    <!-- 太陽 -->
    <div class="sun" :style="{ transform: `translateY(${sunPosition}%)`, opacity: sunOpacity }"></div>

    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const rainDrops = ref([]);
const rainOpacity = ref(1);
const sunOpacity = ref(0);
const sunPosition = ref(150);
const bgProgress = ref(0); // 0 = 深灰, 1 = 淺灰, 2 = 藍天

function createRainDrops(count) {
  rainDrops.value = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.7 + Math.random() * 1.3
  }));
}

onMounted(() => {
  createRainDrops(80);

  // 雨量減少 & 天漸亮
  let drops = 80;
  const rainInterval = setInterval(() => {
    drops -= 1.5;
    rainOpacity.value = Math.max(drops / 80, 0);
    bgProgress.value = 1 - rainOpacity.value; // 背景循序漸亮
    if (drops <= 0) {
      clearInterval(rainInterval);
      rainDrops.value = [];
      startSunAnimation();
    } else {
      createRainDrops(Math.ceil(drops));
    }
  }, 250);
});

function startSunAnimation() {
  let pos = 150;
  const sunInterval = setInterval(() => {
    pos -= 1.5;
    sunPosition.value = pos;
    sunOpacity.value += 0.015;
    if (pos <= 0) {
      clearInterval(sunInterval);
      startBlueSkyTransition();
    }
  }, 200);
}

function startBlueSkyTransition() {
  let progress = 1; // 從淺灰開始
  const interval = setInterval(() => {
    progress += 0.02; // 5 秒內慢慢過渡到藍天
    bgProgress.value = Math.min(progress, 2);
    if (bgProgress.value >= 2) clearInterval(interval);
  }, 50);
}

// 背景顏色循序漸進
const sceneStyle = computed(() => {
  const darkGray = { r: 75, g: 85, b: 99 };    // 深灰
  const lightGray = { r: 162, g: 187, b: 213 }; // 淺灰
  const blueSky = { r: 135, g: 206, b: 235 };   // 藍天

  let r, g, b;
  if (bgProgress.value <= 1) {
    // 深灰 -> 淺灰
    r = darkGray.r + (lightGray.r - darkGray.r) * bgProgress.value;
    g = darkGray.g + (lightGray.g - darkGray.g) * bgProgress.value;
    b = darkGray.b + (lightGray.b - darkGray.b) * bgProgress.value;
  } else {
    // 淺灰 -> 藍天
    const p = bgProgress.value - 1;
    r = lightGray.r + (blueSky.r - lightGray.r) * p;
    g = lightGray.g + (blueSky.g - lightGray.g) * p;
    b = lightGray.b + (blueSky.b - lightGray.b) * p;
  }

  return {
    background: `linear-gradient(to bottom, rgb(${r},${g},${b}), rgb(${r - 10},${g - 10},${b - 10}))`,
    transition: "background 0.25s linear"
  };
});
</script>

<style>
.weather-scene {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
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
  animation: raindrop linear infinite;
  z-index: 2;
}

/* 雲 */
.cloud {
  position: absolute;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  z-index: 1;
}
.cloud-1 { width: 220px; height: 70px; top: 20px; left: 10%; animation: cloudFloat 120s linear infinite; }
.cloud-2 { width: 250px; height: 80px; top: 60px; left: 50%; animation: cloudFloat 150s linear infinite; opacity: 0.7; }
.cloud-3 { width: 180px; height: 50px; top: 40px; left: 75%; animation: cloudFloat 180s linear infinite; opacity: 0.6; }
@keyframes cloudFloat { 0% { transform: translateX(0); } 100% { transform: translateX(120vw); } }

/* 太陽 */
.sun {
  position: absolute;
  top: 50px;
  right: 10%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle at center, #FFD700 0%, #FFA500 70%);
  border-radius: 50%;
  box-shadow: 0 0 50px 15px rgba(255, 215, 0, 0.5);
  animation: sunGlow 6s ease-in-out infinite alternate;
}
@keyframes sunGlow {
  0% { transform: scale(1); box-shadow: 0 0 30px 10px rgba(255,215,0,0.5); }
  100% { transform: scale(1.05); box-shadow: 0 0 60px 20px rgba(255,215,0,0.6); }
}
</style>
