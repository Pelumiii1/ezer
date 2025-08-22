import { IText } from "fabric";

export function addText() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const text = new IText("Enter Text", {
    left: 100,
    top: 100,
    minWidth: 100,
    underline: false,
    fontFamily: editorStore.currentFont,
    fill: "black",
    fontSize: 16,
    selectable: true,
    editable: true,
  });

  // text.enterEditing();
  editorStore.canvas.add(text);
  editorStore.canvas.setActiveObject(text);
  editorStore.canvas.renderAll();
}

export function handleCursor() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;
  editorStore.canvas.discardActiveObject();
  editorStore.canvas.renderAll();
}
export function underlineText() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const activeObject = editorStore.canvas.getActiveObject();

  if (activeObject && activeObject.type === "i-text") {
    const isUnderlined = activeObject.get("underline") === true;

    activeObject.set({
      underline: !isUnderlined,
    });
    editorStore.canvas.renderAll();
  }
}

export function boldText() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const activeObject = editorStore.canvas.getActiveObject();

  if (activeObject && activeObject.type === "i-text") {
    const isBold = activeObject.get("fontWeight") === "bold";

    activeObject.set({
      fontWeight: isBold ? "normal" : "bold",
    });
    editorStore.canvas.renderAll();
  }
}

export function italicText() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const activeObject = editorStore.canvas.getActiveObject();

  if (activeObject && activeObject.type === "i-text") {
    const isItalic = activeObject.get("fontStyle") === "italic";

    activeObject.set({
      fontStyle: isItalic ? "normal" : "italic",
    });
    editorStore.canvas.renderAll();
  }
}

export function handleColorChange(color: string) {
  const editorStore = useEditorStore();

  const activeObject = editorStore.canvas?.getActiveObject();
  if (activeObject) {
    activeObject.set("fill", color);
    editorStore.canvas?.renderAll();
  }
}

export function alignText(alignment: string) {
  const editorStore = useEditorStore();

  const activeObject = editorStore.canvas?.getActiveObject();
  if (activeObject) {
    activeObject.set("textAlign", alignment);
    editorStore.canvas?.renderAll();
  }
}
