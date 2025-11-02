<script setup lang="ts">
import { Search, Trash2, X } from "lucide-vue-next";
import { useEditorStore } from "@/stores/editor";
import { uploadImageToCanvas } from "@/utils/FabricsHelper";

const editor = useEditorStore();

// Reactive list of saved images
const savedImages = ref<Array<{ key: string; url: string; name: string }>>([]);

// Load images from localStorage on mount
onMounted(() => {
  loadImagesFromStorage();
});

// 1. Upload & Save Image
function uploadImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const key = `tempImage_${Date.now()}_${file.name}`;
      localStorage.setItem(key, base64);
      loadImagesFromStorage(); // refresh list
    };
    reader.readAsDataURL(file);
  };

  input.click();
}

// 2. Load all images from localStorage
function loadImagesFromStorage() {
  savedImages.value = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("tempImage_")) {
      const url = localStorage.getItem(key)!;
      const name = key.split("_").slice(2).join("_");
      savedImages.value.push({ key, url, name });
    }
  }
}

// 3. Add image to canvas
function addToCanvas(base64: string) {
  uploadImageToCanvas(base64);
}

// 4. Delete image
function deleteImage(key: string) {
  localStorage.removeItem(key);
  loadImagesFromStorage();
}
</script>

<template>
  <div class="flex items-center justify-between mb-5">
    <h5>Media</h5>
    <X class="cursor-pointer" @click="editor.setIsRightSidebarOpen(false)" />
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
  <div>
    <button
      class="bg-gray-200 hover:bg-gray-200/75 dark:bg-[#1F1F1F] rounded-md py-2.5 w-full mb-5 text-[12px]"
      @click="uploadImage"
    >
      Upload Image
    </button>
  </div>

  <div
    class="flex justify-around items-center mb-5 border w-full p-2 rounded-lg text-[12px]"
  >
    <button>Image</button>
    <div class="border-l w-1 h-full" />
    <button>Video</button>
  </div>

  <!-- Saved Images Grid -->
  <div class="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
    <div
      v-for="img in savedImages"
      :key="img.key"
      class="relative group cursor-pointer border rounded-lg overflow-hidden"
      @click="addToCanvas(img.url)"
    >
      <img :src="img.url" alt="saved" class="w-full h-24 object-cover" />
      <div
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
      >
        <Trash2 class="size-5 text-white" @click.stop="deleteImage(img.key)" />
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div
    v-if="savedImages.length === 0"
    class="text-center text-gray-400 text-sm"
  >
    No images uploaded yet.
  </div>
</template>
