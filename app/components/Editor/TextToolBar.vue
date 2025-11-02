<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AcceptableValue } from "reka-ui";

const editor = useEditorStore();
const fontSize = ref("");
const fontWeight = ref("");
const fontFamily = ref("");
const isItalic = ref(false);
const isUnderline = ref(false);
const color = ref("#fffff");

watch(
  editor,
  (value) => {
    if (value.showTextToolBar === true) {
      const activeObject = editor.canvas?.getActiveObject();

      if (activeObject && activeObject.type === "i-text") {
        const currentFontSize = activeObject.get("fontSize");
        const currentFontStyle = activeObject.get("fontStyle");
        const currentFontWeight = activeObject.get("fontWeight");
        const currentFontFamily = activeObject.get("fontFamily");
        const currentUnderline = activeObject.get("underline");

        if (currentFontStyle === "italic") {
          isItalic.value = true;
        } else {
          isItalic.value = false;
        }

        if (currentUnderline === true) {
          isUnderline.value = true;
        } else {
          isUnderline.value = false;
        }
        fontWeight.value = currentFontWeight;
        fontFamily.value = currentFontFamily;
        fontSize.value = currentFontSize;
      }
    }
  },
  { immediate: true }
);

// Handle font size change directly from Select
function handleFontSizeChange(value: AcceptableValue) {
  if (!value) return;

  const newSize = Number(value);
  updateFontChange(newSize);
}

function handleFontStyleChange(value: AcceptableValue) {
  updateFontStyle(Number(value));
}

function handleFontFamilyChange(value: AcceptableValue) {
  if (!value) return;

  updateFontFamily(value.toString());
}

function handleColorChange(color: string) {
  const activeObject = editor.canvas?.getActiveObject();
  if (activeObject) {
    activeObject.set("fill", color);
    editor.canvas?.renderAll();
  }
}
</script>

<template>
  <div
    v-if="editor.showTextToolBar"
    class="bg-white absolute top-15 p-2 rounded-md border z-50"
  >
    <div class="flex items-center space-x-3">
      <div class="flex items-center gap-3">
        <!-- Font Family  -->
        <Select
          v-model="fontFamily"
          @update:model-value="handleFontFamilyChange"
        >
          <SelectTrigger class="rounded-[7px] text-[12px]">
            <SelectValue :placeholder="fontFamily || 'Style'" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="font in FontFamilies"
                :key="font"
                :value="font.toString()"
                class="capitalize"
              >
                {{ font }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <!-- Font Style  -->
        <Select
          v-model="fontWeight"
          @update:model-value="handleFontStyleChange"
        >
          <SelectTrigger class="rounded-[7px] h-[32px] text-[12px]">
            <SelectValue :placeholder="fontWeight || 'Style'" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="weight in [400, 500, 600, 700]"
                :key="weight"
                :value="weight.toString()"
                class="capitalize"
              >
                {{ weight }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <!-- Font Size  -->
        <Select v-model="fontSize" @update:model-value="handleFontSizeChange">
          <SelectTrigger class="rounded-[7px] h-[32px] text-[12px]">
            <SelectValue :placeholder="fontSize || 'Size'" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="size in [
                  8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72,
                ]"
                :key="size"
                :value="size.toString()"
              >
                {{ size }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <img src="/icons/Line.png" alt="" width="1" height="1" />

      <div class="flex items-center gap-2">
        <!-- bold Text Icon  -->
        <button @click="() => boldText()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-bold-icon lucide-bold dark:text-white"
          >
            <path
              d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
            />
          </svg>
        </button>

        <!-- Italic Text Icon  -->
        <button
          :class="isItalic ? 'bg-gray-200 rounded-md' : ''"
          class="p-2"
          @click="
            () => {
              italicText();
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-italic-icon lucide-italic dark:text-white"
          >
            <line x1="19" x2="10" y1="4" y2="4" />
            <line x1="14" x2="5" y1="20" y2="20" />
            <line x1="15" x2="9" y1="4" y2="20" />
          </svg>
        </button>

        <!-- Underline Text Icon  -->
        <button
          :class="isUnderline ? 'bg-gray-200 rounded-md' : ''"
          class="p-2"
          @click="() => underlineText()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-underline-icon lucide-underline dark:text-white"
          >
            <path d="M6 4v6a6 6 0 0 0 12 0V4" />
            <line x1="4" x2="20" y1="20" y2="20" />
          </svg>
        </button>
      </div>

      <img src="/icons/Line.png" alt="" width="1" height="1" />

      <input
        v-model="color"
        type="color"
        class="cursor-pointer"
        @input="(e) => {
                const target = e.target as HTMLInputElement
                handleColorChange(target.value)
            }"
      />

      <img src="/icons/Line.png" alt="" width="1" height="1" />

      <div class="flex items-center gap-3">
        <!-- Left Align Icon  -->
        <button @click="alignText('left')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-text-align-start-icon lucide-text-align-start dark:text-white"
          >
            <path d="M21 5H3" />
            <path d="M15 12H3" />
            <path d="M17 19H3" />
          </svg>
        </button>

        <!-- center align icon  -->
        <button @click="alignText('center')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-text-align-justify-icon lucide-text-align-justify dark:text-white"
          >
            <path d="M3 5h18" />
            <path d="M3 12h18" />
            <path d="M3 19h18" />
          </svg>
        </button>

        <!-- Right Align Icon  -->
        <button @click="alignText('right')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-text-align-end-icon lucide-text-align-end dark:text-white"
          >
            <path d="M21 5H3" />
            <path d="M21 12H9" />
            <path d="M21 19H7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
