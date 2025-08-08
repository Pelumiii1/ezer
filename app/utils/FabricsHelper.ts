import { Textbox } from "fabric";

export function addText() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const text = new Textbox("Hello World", {
    left: 100,
    top: 100,
    minWidth: 100,
    underline: false,
    fontFamily: editorStore.currentFont,
    // fontWeight: "bold",
    fill: "black",
    fontSize: 16,
  });
  text.editable = true;
  editorStore.canvas.add(text);
  editorStore.canvas.setActiveObject(text);
  editorStore.canvas.renderAll();
}

export function underlineText() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const activeObject = editorStore.canvas.getActiveObject();

  if (activeObject && activeObject.type === "textbox") {
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

  if (activeObject && activeObject.type === "textbox") {
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

  if (activeObject && activeObject.type === "textbox") {
    const isItalic = activeObject.get("fontStyle") === "italic";

    activeObject.set({
      fontStyle: isItalic ? "normal" : "italic",
    });
    editorStore.canvas.renderAll();
  }
}
