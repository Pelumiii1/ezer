<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const colorMode = useColorMode();

const editor = useEditorStore();
const activeSidebar = ref<string | null>(null);

onMounted(() => {
  editor.setIsRightSidebarOpen(false);
});

watch(
  editor,
  (value) => {
    if (value.isRightSidebarOpen === false) activeSidebar.value = null;
  },
  { immediate: true }
);

function toogleSidebar(item: string) {
  editor.setIsRightSidebarOpen(!editor.isRightSidebarOpen);

  if (activeSidebar.value === item) return (activeSidebar.value = null);
  activeSidebar.value = item;
}
</script>

<template>
  <TooltipProvider>
    <div
      class="w-[90px] bg-white dark:bg-[#24242480] h-full space-y-12 flex flex-col items-center py-10"
    >
      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/layer-white.png'
            : '/icons/layer.png'
        "
        alt=""
        width="20"
        height="20"
      />
      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/grid-white.png'
            : '/icons/grid.png'
        "
        alt=""
        width="20"
        height="20"
      />

      <!-- Image Upload Button -->
      <Tooltip>
        <TooltipTrigger>
          <button
            :class="[
              activeSidebar === 'Image Upload'
                ? 'bg-gray-200 dark:bg-[#1F1F1F] rounded-lg'
                : '',
              colorMode.value === 'dark' ? 'text-white' : 'text-black',
            ]"
            class="p-3"
            @click="toogleSidebar('Image Upload')"
          >
            <img
              :src="
                colorMode.value === 'dark'
                  ? '/icons/folder-white.png'
                  : '/icons/folder.png'
              "
              alt=""
              width="20"
              height="20"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upload Image</p>
        </TooltipContent>
      </Tooltip>

      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/grid-white.png'
            : '/icons/grid.png'
        "
        alt=""
        width="20"
        height="20"
      />
      <img
        :src="
          colorMode.value === 'dark'
            ? '/icons/grid-white.png'
            : '/icons/grid.png'
        "
        alt=""
        width="20"
        height="20"
      />
    </div>
  </TooltipProvider>
</template>
