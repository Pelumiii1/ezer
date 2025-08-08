<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <div
    class="w-[90px] bg-white dark:bg-[#24242480] h-full space-y-15 flex flex-col items-center py-10"
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
        colorMode.value === 'dark' ? '/icons/grid-white.png' : '/icons/grid.png'
      "
      alt=""
      width="20"
      height="20"
    />
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
    <img
      :src="
        colorMode.value === 'dark' ? '/icons/grid-white.png' : '/icons/grid.png'
      "
      alt=""
      width="20"
      height="20"
    />
    <img
      :src="
        colorMode.value === 'dark' ? '/icons/grid-white.png' : '/icons/grid.png'
      "
      alt=""
      width="20"
      height="20"
    />
  </div>
</template>
