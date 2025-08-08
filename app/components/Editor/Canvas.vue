<script setup lang="ts">
import { Canvas } from "fabric";
import { useEditorStore } from "@/stores/editor";
const editorStore = useEditorStore();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const fabricCanvas = ref<Canvas | null>(null);

onMounted(() => {
  if (canvasRef.value) {
    fabricCanvas.value = new Canvas(canvasRef.value);
    fabricCanvas.value.backgroundColor = "white";
    fabricCanvas.value.setDimensions({ width: 500, height: 500 });
    fabricCanvas.value.selection = true;
    editorStore.canvas = fabricCanvas.value;
    fabricCanvas.value.renderAll();
  }
});

function deleteActiveObject (){
  const activeObject  = fabricCanvas.value?.getActiveObject()
  if(activeObject){
    fabricCanvas.value?.remove(activeObject)
    fabricCanvas.value?.renderAll()
  }
}

const handleDelete = (event: KeyboardEvent) => {
  if (event.key === "Delete" || event.key === "Backspace") {
    deleteActiveObject()
  }
};


onMounted(()=>[
window.addEventListener('keydown', handleDelete)
])

onBeforeUnmount(() => {
  fabricCanvas.value?.dispose();
  fabricCanvas.value = null;
  editorStore.canvas = null;
});
</script>

<template>
  <canvas id="canvas" ref="canvasRef" />
</template>
