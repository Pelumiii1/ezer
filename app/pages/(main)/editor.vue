<script setup lang="ts">
import { NuxtImg } from "#components";

const colorMode = useColorMode();

const tabs = ["Social Media", "Poster", "Shoe Promo", "Wedding Anniversary"];
const activeTab = ref(tabs[0]);

function setActiveTab(tab: string) {
  activeTab.value = tab;
}

</script>

<template>
  <div>
    <!-- Tabs  -->
    <div class="flex items-center bg-white dark:bg-[#24242480] h-[10vh]">
      <div class="px-8">
        <NuxtImg
          :src="
            colorMode.value === 'dark'
              ? '/icons/logo-white.png'
              : '/icons/logo-black.png'
          "
          width="30"
          height="30"
          alt="Ezer"
        />
      </div>

      <button
        v-for="tab in tabs"
        :key="tab"
        class="cursor-pointer border-l p-7 py-4 text-center"
        @click="setActiveTab(tab)"
      >
        <p class="font-bold text-[12px]">
          {{ tab }}
        </p>
      </button>
    </div>
    <!-- Top Tools  -->
    <EditorTopTools />

    <div class="h-[80vh] flex">
      <!-- Left Tools  -->
      <EditorLeftTools />

      <!-- Canvas  -->
      <div
        class="bg-gray-200 dark:bg-black w-full h-full flex justify-center items-center"
      >
      <ClientOnly>
        <EditorCanvas />
      </ClientOnly>
        <!-- <img
          src="/images/poster.png"
          alt=""
          class="w-[60vw] h-[70vh] object-contain"
          fetchpriority="high"
        /> -->
      </div>

      <!-- Right Tools -->
      <EditorRightTools />
    </div>
  </div>
</template>
