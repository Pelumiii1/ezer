<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditorStore } from "@/stores/editor";
import { underlineText, boldText, italicText } from "@/utils/FabricsHelper";

const editorStore = useEditorStore();
const selectedFont = ref<string | null>(null);

const isBold = computed(() => {
  const activeObject = editorStore.canvas?.getActiveObject();
  return activeObject?.get("fontWeight") === "bold";
});

const isItalic = computed(() => {
  const activeObject = editorStore.canvas?.getActiveObject();
  return activeObject?.get("fontStyle") === "italic";
});

const isUnderline = computed(() => {
  const activeObject = editorStore.canvas?.getActiveObject();
  return activeObject?.get("underline") === true;
});

onMounted(() => {
  selectedFont.value = editorStore.currentFont || null;
});

watch(selectedFont, (newFont) => {
  if (newFont) {
    const activeObject = editorStore.canvas?.getActiveObject();
    if (activeObject) {
      editorStore.currentFont = newFont;
      activeObject.set("fontFamily", newFont);
    }
    editorStore.canvas?.renderAll();
  }
});

const colorMode = useColorMode();
</script>

<template>
  <div
    class="flex items-center justify-between h-[10vh] bg-white dark:bg-[#24242480] border-y px-5"
  >
    <div class="flex">
      <Select v-model="selectedFont">
        <SelectTrigger class="bg-[#D2D2D233]">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Times New Roman"> Times New Roman </SelectItem>
          <SelectItem value="Courier New"> Courier New </SelectItem>
          <SelectItem value="Arial"> Arial </SelectItem>
          <SelectItem value="Verdana"> Verdana </SelectItem>
          <SelectItem value="Georgia"> Georgia </SelectItem>
          <SelectItem value="Tahoma"> Tahoma </SelectItem>
          <SelectItem value="Helvetica"> Helvetica </SelectItem>
          <SelectItem value="Impact"> Impact </SelectItem>
          <SelectItem value="Garamond"> Garamond </SelectItem>
        </SelectContent>
      </Select>
      <div class="w-5" />
      <Select>
        <SelectTrigger class="bg-[#D2D2D233]">
          <SelectValue placeholder="Regular Italic" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Regular Italic"> Regular Italic </SelectItem>
            <SelectItem value="Regular"> Regular </SelectItem>
            <SelectItem value="Bold Italic"> Bold Italic </SelectItem>
            <SelectItem value="Bold"> Bold </SelectItem>
            <SelectItem value="Italic"> Italic </SelectItem>
            <SelectItem value="Light Italic"> Light Italic </SelectItem>
            <SelectItem value="Light"> Light </SelectItem>
            <SelectItem value="Medium Italic"> Medium Italic </SelectItem>
            <SelectItem value="Medium"> Medium </SelectItem>
            <SelectItem value="Semi Bold Italic"> Semi Bold Italic </SelectItem>
            <SelectItem value="Semi Bold"> Semi Bold </SelectItem>
            <SelectItem value="Extra Bold Italic">
              Extra Bold Italic
            </SelectItem>
            <SelectItem value="Extra Bold"> Extra Bold </SelectItem>
            <SelectItem value="Black Italic"> Black Italic </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div class="border-l mx-5" />

      <div class="flex gap-5 items-center">
        <div 
        class="p-2  rounded-sm cursor-pointer"
          :class="isBold ?'bg-gray-200':''"
          @click="boldText"
        >
    <img
          :src="
            colorMode.value === 'dark' ? '/icons/B-white.png' : '/icons/B.png'
          "
          alt=""
          width="15"
          height="15"
        >
        </div>
    

        <img
          :src="
            colorMode.value === 'dark' ? '/icons/U-white.png' : '/icons/U.png'
          "
          alt=""
          width="15"
          height="15"
          class="cursor-pointer"
          @click="underlineText"
        >
        <img
          :src="
            colorMode.value === 'dark' ? '/icons/I-white.png' : '/icons/I.png'
          "
          alt=""
          width="10"
          height="10"
          class="cursor-pointer"
          @click="italicText"
        >
      </div>
      <div class="border-l mx-5" />

      <div class="flex gap-2 items-center">
        <div
          class="h-[28px] w-[28px] rounded-full"
          style="background-image: linear-gradient(to right, #ff1e00, #000899)"
        />

        <div class="h-[28px] w-[28px] bg-[#FF00EE] rounded-full" />

        <div
          class="flex items-center gap-2 bg-[#D2D2D280] border border-[#00000033] px-2 py-[5px] rounded-[20px]"
        >
          <Icon
            name="uil:angle-left-b"
            width="30"
            height="30"
            class="size-5 text-white cursor-pointer"
          />
          <div class="h-[28px] w-[28px] bg-white rounded-full" />
          <div class="h-[28px] w-[28px] bg-[#FF0000] rounded-full" />
          <div class="h-[28px] w-[28px] bg-[#00FF2F] rounded-full" />
          <Icon
            name="uil:angle-right-b"
            width="30"
            height="30"
            class="size-5 text-white cursor-pointer"
          />
        </div>
      </div>

      <div class="border-l mx-5" />

      <div class="flex gap-5 items-center">
        <img
          :src="
            colorMode.value === 'dark'
              ? '/icons/align-left-white.png'
              : '/icons/align-left.png'
          "
          alt=""
          width="20"
          height="20"
        >
        <img
          :src="
            colorMode.value === 'dark'
              ? '/icons/align-center-white.png'
              : '/icons/align-center.png'
          "
          alt=""
          width="20"
          height="20"
        >
        <img
          :src="
            colorMode.value === 'dark'
              ? '/icons/align-right-white.png'
              : '/icons/align-right.png'
          "
          alt=""
          width="20"
          height="20"
        >
      </div>
      <div class="border-l mx-5" />
      <div class="flex gap-5 items-center">
        <img
          :src="
            colorMode.value === 'dark'
              ? '/icons/number-list-white.png'
              : '/icons/number-list.png'
          "
          alt=""
          width="20"
          height="20"
        >
        <img
          :src="
            colorMode.value === 'dark'
              ? '/icons/bullet-list-white.png'
              : '/icons/bullet-list.png'
          "
          alt=""
          width="20"
          height="20"
        >
      </div>
    </div>
    <button
      class="bg-gradient-to-r from-[#FF9500] via-[#FF00D0] to-[#FF9EED] rounded-[24px] p-[1.5px]"
    >
      <div
        class="text-[12px] dark:bg-gray-900 text-black bg-white dark:text-white px-5 py-2 rounded-[18px]"
      >
        Download
      </div>
    </button>
  </div>
</template>
