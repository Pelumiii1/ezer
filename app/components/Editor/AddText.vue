<script setup lang="ts">
import { addText } from "@/utils/FabricsHelper";
import { ChevronDown, Search, X } from "lucide-vue-next";

const editor = useEditorStore();

const isTextStyleExpanded = ref(false);
</script>

<template>
  <div class="flex items-center justify-between mb-5">
    <h5>Text</h5>
    <X class="cursor-pointer" @click="editor.setIsLeftSidebarOpen(false)" />
  </div>

  <!-- Search  -->
  <div class="flex items-center gap-3 mb-5 bg-gray-50 rounded-lg p-3">
    <Search class="size-5" />
    <input
      type="text"
      placeholder="Type to search"
      class="w-full outline-none placeholder:text-[12px] text-[12px]"
    />
  </div>

  <button
    class="w-full rounded-[8px] p-[1.5px] bg-gradient-to-r from-[#FFA304] to-[#D400FF] mb-5"
    @click="
      () => {
        addText({ content: 'Enter Paragraph' });
        editor.setIsLeftSidebarOpen(false);
        editor.setShowTextToolBar(true);
      }
    "
  >
    <div class="bg-white dark:bg-black rounded-[9px] py-1">Add Text Box</div>
  </button>

  <!-- Text Style  -->
  <div>
    <div
      class="flex items-center justify-between mb-5 cursor-pointer"
      @click="
        () => {
          isTextStyleExpanded = !isTextStyleExpanded;
        }
      "
    >
      <h5>Text Styles</h5>
      <ChevronDown
        class="transition-all duration-300 ease-in"
        :class="isTextStyleExpanded ? '' : 'rotate-180'"
      />
    </div>
    <div v-if="isTextStyleExpanded" class="grid space-y-4 mb-5">
      <button
        class="text-[20px] font-bold bg-gray-100 py-2 rounded-[8px]"
        @click="
          () => {
            addText({ content: 'Add Heading', fontWeight: 700 });
          }
        "
      >
        Add Heading
      </button>
      <button
        class="text-[14px] font-[500] bg-gray-100 py-2 rounded-[8px]"
        @click="
          () => {
            addText({
              content: 'Add Subheading',
              fontSize: 14,
              fontWeight: 500,
            });
          }
        "
      >
        Add Subheading
      </button>
      <button
        class="text-[12px] font-[400] bg-gray-100 py-2 rounded-[8px]"
        @click="
          () => {
            addText({
              content: 'Add body text',
              fontSize: 12,
              fontWeight: 400,
            });
          }
        "
      >
        Add body text
      </button>
    </div>
  </div>

  <div class="flex items-center justify-between mb-5">
    <h5>Font Combinations</h5>
    <ChevronDown class="cursor-pointer" />
  </div>
</template>
