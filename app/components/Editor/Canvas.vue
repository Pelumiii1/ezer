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
    fabricCanvas.value.preserveObjectStacking = true;

    editorStore.canvas = fabricCanvas.value;
    fabricCanvas.value.renderAll();
  }

  window.addEventListener("keydown", handleDelete);

  // Handle Scaling events
  // fabricCanvas.value?.on("object:scaling", handleScaling);
  // fabricCanvas.value?.on("object:resizing", handleResizing);

  // Handle mouse down events
  fabricCanvas.value?.on("mouse:down", handleMouseDown);

  fabricCanvas.value?.on("selection:created", handleSelectionCreated);
  fabricCanvas.value?.on("selection:updated", handleSelectionCreated);
  fabricCanvas.value?.on("selection:cleared", handleSelectionCleared);

  // Handle double click events
  fabricCanvas.value?.on("mouse:dblclick", handleDoubleClick);

  // Handle object modified to update coordinates
  fabricCanvas.value?.on("object:modified", (e) => {
    e.target?.setCoords();
    console.log("Object Modified");
  });
});

// function handleScaling() {
//   const activeObject = fabricCanvas.value?.getActiveObject();
//   if (!activeObject) return;

//   if (activeObject.type === "i-text") {
//     activeObject.set({
//       scaleX: 1,
//       scaleY: 1,
//     });
//   } else if (activeObject.type === "image") {
//     console.log("image", activeObject);
//   }
// }

// function handleResizing() {
//   const activeObject = fabricCanvas.value?.getActiveObject();
//   if (!activeObject) return;

//   if (activeObject.type === "i-text") {
//     activeObject.set({
//       scaleX: 1,
//       scaleY: 1,
//     });
//   }
//   if (activeObject.type === "image") {
//     console.log("image", activeObject);
//   }

//   fabricCanvas.value?.renderAll();
// }

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
    console.log("Exiting editing mode");
    (activeObject as IText).exitEditing();
  }

  if (activeObject && activeObject.type === "i-text") {
    editorStore.setShowTextToolBar(true);
  } else {
    editorStore.setShowTextToolBar(false);
  }
}

function handleDoubleClick() {
  const activeObject = editorStore.canvas?.getActiveObject();

  if (activeObject && activeObject.type === "i-text") {
    (activeObject as IText).enterEditing();
  }

  if (activeObject && activeObject.type === "image") {
    console.log("image", activeObject);
  }
}

function handleSelectionCreated() {
  const activeObject = editorStore.canvas?.getActiveObject();
  if (activeObject && activeObject.type === "i-text") {
    console.log("Selection Created");
    editorStore.setShowTextToolBar(true);
  }
}

function handleSelectionCleared() {
  const activeObject = editorStore.canvas?.getActiveObject();
  if (activeObject && activeObject.type === "i-text") {
    console.log("Selection Cleared");
    editorStore.setShowTextToolBar(false);
  }
}

const handleDelete = (event: KeyboardEvent) => {
  if (event.key === "Delete" || event.key === "Backspace") {
    deleteActiveObject();
  }
};

onBeforeUnmount(() => {
  fabricCanvas.value?.off("object:scaling");
  fabricCanvas.value?.off("object:modified");
  fabricCanvas.value?.off("mouse:down");
  fabricCanvas.value?.off("mouse:dblclick");
  fabricCanvas.value?.dispose();
  fabricCanvas.value = null;
  editorStore.canvas = null;
  window.removeEventListener("keydown", handleDelete);
});
</script>

<template>
  <canvas id="canvas" ref="canvasRef" />
</template>
