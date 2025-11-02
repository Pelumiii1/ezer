<script setup lang="ts">
import { Plus } from "lucide-vue-next";

import { useEditorStore } from "@/stores/editor";

const colorMode = useColorMode();
const editor = useEditorStore();

const tabs = ["Social Media", "Poster", "Shoe Promo", "Wedding Anniversary"];
const activeTab = ref(tabs[0]);

function setActiveTab(tab: string) {
  activeTab.value = tab;
}
</script>

<template>
  <div class="[--navbar-height:7vh]">
    <!-- Tabs  -->
    <div
      class="flex items-center bg-white dark:bg-[#24242480] h-[var(--navbar-height)]"
    >
      <div class="px-8">
        <img
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

      <div class="cursor-pointer border-l p-7 py-3 text-center">
        <Plus :color="colorMode.value === 'dark' ? 'white' : 'black'" />
      </div>
    </div>
    <!-- Top Tools  -->
    <!-- <EditorTopTools /> -->

    <div class="h-[93vh] flex">
      <!-- Left Sidebar  -->
      <section
        v-if="editor.isLeftSidebarOpen"
        class="absolute top-[var(--navbar-height)] left-[80px] w-[400px] bg-white dark:bg-black h-full border-x p-5 z-50"
      >
        <EditorAddText />
      </section>

      <!-- Left Tools  -->
      <EditorLeftTools />

      <!-- Canvas  -->
      <div
        class="bg-gray-200 dark:bg-black w-full h-full flex justify-center items-center relative"
      >
        <EditorTextToolBar />

        <ClientOnly>
          <EditorCanvas />
        </ClientOnly>
      </div>

      <div class="flex relative">
        <!-- right sidebar  -->
        <section
          v-if="editor.isRightSidebarOpen"
          class="absolute top-0 right-[90px] w-[400px] bg-white dark:bg-black h-full border-x p-5 z-50"
        >
          <EditorUploadImage />
        </section>

        <!-- Right Tools -->
        <EditorRightTools />
      </div>
    </div>
  </div>
</template>
