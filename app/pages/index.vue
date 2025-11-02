<script setup lang="ts">
import { NuxtLink } from "#components";
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <NuxtLink
      to="/editor"
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
    >
      Open Editor
    </NuxtLink>
  </div>
</template>
