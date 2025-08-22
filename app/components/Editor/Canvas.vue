<script setup lang="ts">
import { Canvas, type IText } from "fabric";
import { onMounted, ref } from "vue";
import { useEditorStore } from "@/stores/editor";
const editorStore = useEditorStore();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const fabricCanvas = ref<Canvas | null>(null);

onMounted(() => {
  //initialize canvas
  if (canvasRef.value) {
    fabricCanvas.value = new Canvas(canvasRef.value);
    fabricCanvas.value.backgroundColor = "white";
    fabricCanvas.value.setDimensions({ width: 600, height: 600 });
    fabricCanvas.value.selection = true;
    editorStore.canvas = fabricCanvas.value;
    fabricCanvas.value.renderAll();
  }

  window.addEventListener("keydown", handleDelete);

  // Handle Scaling events
  fabricCanvas.value?.on("object:scaling", handleScaling);

  // Handle mouse down events
  fabricCanvas.value?.on("mouse:down", handleMouseDown);
  // Handle double click events
  fabricCanvas.value?.on("mouse:dblclick", handleDoubleClick);
});

function handleScaling() {
  const activeObject = fabricCanvas.value?.getActiveObject();
  if (!activeObject) return;

  if (activeObject.type === "i-text") {
    activeObject.set({
      scaleX: 1,
      scaleY: 1,
    });
  }
}

function deleteActiveObject() {
  const activeObject = fabricCanvas.value?.getActiveObject();
  if (
    activeObject &&
    activeObject.type === "i-text" &&
    (activeObject as IText).isEditing
  )
    return;

  if (activeObject) {
    fabricCanvas.value?.remove(activeObject);
    fabricCanvas.value?.renderAll();
  }
}

function handleMouseDown() {
  const activeObject = editorStore.canvas?.getActiveObject();
  if (
    activeObject &&
    activeObject.type === "i-text" &&
    (activeObject as IText).isEditing
  ) {
    (activeObject as IText).exitEditing();
  }
}

function handleDoubleClick() {
  const activeObject = editorStore.canvas?.getActiveObject();

  if (activeObject) {
    (activeObject as IText).enterEditing();
  }
}

const handleDelete = (event: KeyboardEvent) => {
  if (event.key === "Delete" || event.key === "Backspace") {
    deleteActiveObject();
  }
};

onBeforeUnmount(() => {
  fabricCanvas.value?.dispose();
  fabricCanvas.value = null;
  editorStore.canvas = null;
  window.removeEventListener("keydown", handleDelete);
});
</script>

<template>
  <canvas id="canvas" ref="canvasRef" />
</template>
