<template>
  <div class="bg-white bg-opacity-70 rounded-xl p-4 shadow-md">
    <h2 class="text-lg font-semibold mb-2">✏️ 新增筆記</h2>
    <form @submit.prevent="submitNote">
      <textarea
        v-model="note"
        placeholder="今天的心情是..."
        class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
        rows="4"
      ></textarea>
      <div class="mt-3 flex justify-end">
        <button
          type="submit"
          class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          儲存
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const note = ref("");

function submitNote() {
  if (!note.value.trim()) return;
  // 把內容傳給父層
  emit("submit", note.value);
  note.value = "";
}
</script>
