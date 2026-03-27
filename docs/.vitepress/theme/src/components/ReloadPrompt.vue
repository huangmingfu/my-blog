<script setup lang="ts">
import { ref, onMounted } from "vue";

// 只在客户端才注册Service Worker
const offlineReady = ref(false);
const needRefresh = ref(false);
let updateServiceWorker: () => Promise<void> = () => Promise.resolve();

// 使用onMounted确保只在客户端执行
onMounted(async () => {
  // 动态导入，避免SSR时执行
  const { useRegisterSW } = await import("virtual:pwa-register/vue");
  const result = useRegisterSW({
    onRegisteredSW(swUrl) {
      console.log(`Service Worker at: ${swUrl}`);
    },
  });
  // 同步响应式状态
  offlineReady.value = result.offlineReady.value;
  needRefresh.value = result.needRefresh.value;
  updateServiceWorker = result.updateServiceWorker;
  
  // 监听变化
  watch(result.offlineReady, (val) => {
    offlineReady.value = val;
  });
  watch(result.needRefresh, (val) => {
    needRefresh.value = val;
  });
});

// 导入watch用于响应式监听
import { watch } from "vue";

function close() {
  offlineReady.value = false;
  needRefresh.value = false;
}

async function handleUpdate() {
  await updateServiceWorker();
}
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady"> 应用程序准备离线工作... </span>
      <span v-else> 有新内容变化，点击重新加载按钮更新。 </span>
    </div>
    <button v-if="needRefresh" @click="handleUpdate">重新加载</button>
    <button @click="close">关闭</button>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 9999;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
  background-color: #fff;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
  cursor: pointer;
}
.pwa-toast button:hover {
  background-color: #f5f5f5;
}
</style>
