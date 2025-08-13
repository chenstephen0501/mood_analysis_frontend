<template>
  <section class="bg-white bg-opacity-60 rounded-xl p-4 shadow-md">
    <h2 class="text-lg font-semibold mb-2">📊 心情統計</h2>
    <canvas ref="chartRef" height="200"></canvas>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const chartRef = ref(null);

function loadChart() {
  new Chart(chartRef.value, {
    type: "pie",
    data: {
      labels: ["開心", "難過", "平靜", "焦慮"],
      datasets: [
        {
          data: [5, 2, 8, 3],
          backgroundColor: ["#fbbf24", "#3b82f6", "#a3e635", "#ef4444"],
        },
      ],
    },
  });
}

onMounted(() => {
  loadChart();
});
</script>
