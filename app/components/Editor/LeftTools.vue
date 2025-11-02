<script setup lang="ts">
import { handleCursor } from "@/utils/FabricsHelper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const activeTab = ref<string | null>(null);
const editor = useEditorStore();

const colorMode = useColorMode();
// const toggle = () => {
//   colorMode.value = colorMode.value === "dark" ? "light" : "dark";
// };

onMounted(() => {
  editor.setIsLeftSidebarOpen(false);
});

function handleText() {
  if (editor.isLeftSidebarOpen) {
    editor.setIsLeftSidebarOpen(false);
    return;
  }

  editor.setIsLeftSidebarOpen(true);
  // addText();
}

watch(
  editor,
  (value) => {
    if (value.isLeftSidebarOpen === false) activeTab.value = null;
  },
  { immediate: true }
);
</script>

<template>
  <TooltipProvider>
    <div
      class="w-[90px] bg-white dark:bg-[#24242480] h-full space-y-5 flex flex-col items-center py-10"
    >
      <Tooltip>
        <TooltipTrigger>
          <button
            class="cursor-pointer p-3"
            :class="
              activeTab === 'Cursor'
                ? 'bg-gray-200 dark:bg-[#1F1F1F] rounded-lg'
                : ''
            "
            @click="handleCursor"
          >
            <img
              :src="
                colorMode.value === 'dark'
                  ? '/icons/cursor-white.png'
                  : '/icons/cursor.png'
              "
              alt=""
              width="25"
              height="25"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cursor</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button
            :class="
              activeTab === 'Text'
                ? 'bg-gray-200 dark:bg-[#1F1F1F] rounded-lg'
                : ''
            "
            class="cursor-pointer p-3"
            @click="handleText"
          >
            <img
              :src="
                colorMode.value === 'dark'
                  ? '/icons/text-white.png'
                  : '/icons/text.png'
              "
              alt=""
              width="15"
              height="15"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Text</p>
        </TooltipContent>
      </Tooltip>

      <img
        :src="
          colorMode.value === 'dark' ? '/icons/pen-white.png' : '/icons/pen.png'
        "
        alt=""
        width="20"
        height="20"
      />
      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/brush-white.png'
            : '/icons/brush.png'
        "
        alt=""
        width="20"
        height="20"
      />
      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/resize-white.png'
            : '/icons/resize.png'
        "
        alt=""
        width="20"
        height="20"
      />
      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/crop-white.png'
            : '/icons/crop.png'
        "
        alt=""
        width="20"
        height="20"
      />
      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/paint-white.png'
            : '/icons/paint.png'
        "
        alt=""
        width="20"
        height="20"
      />
    </div>
  </TooltipProvider>
</template>
