<script setup lang="ts">
import { NuxtImg } from "#components";
import LeftTools from "@/components/Editor/LeftTools.vue";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const colorMode = useColorMode();

const tabs = ["Social Media", "Poster", "Shoe Promo", "Wedding Anniversary"];
const activeTab = ref(tabs[0]);

const {data} = useFetch('/api/hello')
console.log(data.value)

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
    <div
      class="flex items-center justify-between h-[10vh] bg-white dark:bg-[#24242480] border-y px-5"
    >
      <div class="flex">
        <Select>
          <SelectTrigger class="bg-[#D2D2D233]">
            <SelectValue placeholder="Times New Roman" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple"> Apple </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div class="w-5" />
        <Select>
          <SelectTrigger class="bg-[#D2D2D233]">
            <SelectValue placeholder="Regular Italic" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple"> Apple </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div class="border-l mx-5" />

        <div class="flex gap-5 items-center">
          <img
            :src="
              colorMode.value === 'dark' ? '/icons/B-white.png' : '/icons/B.png'
            "
            alt=""
            width="15"
            height="15"
          />

          <img
            :src="
              colorMode.value === 'dark' ? '/icons/U-white.png' : '/icons/U.png'
            "
            alt=""
            width="15"
            height="15"
          />
          <img
            :src="
              colorMode.value === 'dark' ? '/icons/I-white.png' : '/icons/I.png'
            "
            alt=""
            width="10"
            height="10"
          />
        </div>
        <div class="border-l mx-5" />

        <div class="flex gap-2 items-center">
          <div
            class="h-[28px] w-[28px] rounded-full"
            style="
              background-image: linear-gradient(to right, #ff1e00, #000899);
            "
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
          />
          <img
            :src="
              colorMode.value === 'dark'
                ? '/icons/align-center-white.png'
                : '/icons/align-center.png'
            "
            alt=""
            width="20"
            height="20"
          />
          <img
            :src="
              colorMode.value === 'dark'
                ? '/icons/align-right-white.png'
                : '/icons/align-right.png'
            "
            alt=""
            width="20"
            height="20"
          />
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
          />
          <img
            :src="
              colorMode.value === 'dark'
                ? '/icons/bullet-list-white.png'
                : '/icons/bullet-list.png'
            "
            alt=""
            width="20"
            height="20"
          />
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

    <div class="h-[80vh] flex">
      <!-- Left Tools  -->
      <LeftTools />

      <!-- Canvas  -->
      <div
        class="bg-gray-200 dark:bg-black w-full h-full flex justify-center items-center"
      >
        <!-- <canvas/> -->
        <img
          src="/images/poster.png"
          alt=""
          class="w-[60vw] h-[70vh] object-contain"
          fetchpriority="high"
        />
      </div>

      <!-- Right Tools -->
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
              ? '/icons/folder-white.png'
              : '/icons/folder.png'
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
    </div>
  </div>
</template>
