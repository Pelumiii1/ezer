<script setup lang="ts">
const colorMode = useColorMode();
const toggle = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <div
    class="w-[90px] bg-white dark:bg-[#24242480] h-full space-y-15 flex flex-col items-center py-10"
  >
    <img
      :src="
        colorMode.value === 'dark'
          ? '/icons/cursor-white.png'
          : '/icons/cursor.png'
      "
      alt=""
      width="20"
      height="20"
      @click="toggle"
    />
    <img
      :src="
        colorMode.value === 'dark' ? '/icons/text-white.png' : '/icons/text.png'
      "
      alt=""
      width="15"
      height="15"
    />
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
        colorMode.value === 'dark' ? '/icons/crop-white.png' : '/icons/crop.png'
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
</template>
