import { Circle, IText, Polygon, Rect, Triangle } from "fabric";

export function addText() {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const text = new IText("Enter Text", {
    // Size
    left: 100,
    top: 100,
    minWidth: 100,

    //Style
    underline: false,
    fontFamily: editorStore.currentFont,
    fill: "black",
    fontSize: 16,

    // Interactivity
    selectable: true,
    editable: true,

    //Border styles and colors
    // cornerStyle: "circle",
    // cornerColor: "blue",
    // cornerSize: 20,
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

export function addRectangle() {
  const editorStore = useEditorStore();
  if (!editorStore.canvas) return;
  const rect = new Rect({
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    fill: "black",
    selectable: true,
    // borderColor: "black",
  });
  editorStore.canvas.add(rect);
  editorStore.canvas.setActiveObject(rect);
  editorStore.canvas.renderAll();
}

export function addCircle() {
  const editorStore = useEditorStore();
  if (!editorStore.canvas) return;
  const circle = new Circle({
    radius: 50,
    left: 100,
    top: 100,
    fill: "black",
    selectable: true,
  });
  editorStore.canvas.add(circle);
  editorStore.canvas.setActiveObject(circle);
  editorStore.canvas.renderAll();
}

export function addTriangle() {
  const editorStore = useEditorStore();
  if (!editorStore.canvas) return;
  const triangle = new Triangle({
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    fill: "black",
    selectable: true,
  });
  editorStore.canvas.add(triangle);
  editorStore.canvas.setActiveObject(triangle);
  editorStore.canvas.renderAll();
}

export function addStar() {
  const editorStore = useEditorStore();
  if (!editorStore.canvas) return;
  const points = [];
  const spikes = 5;
  const outerRadius = 50;
  const innerRadius = 20;
  const angle = Math.PI / spikes;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    points.push({
      x: Math.cos(i * angle) * r,
      y: Math.sin(i * angle) * r,
    });
  }
  const star = new Polygon(points, {
    left: 100,
    top: 100,
    fill: "black",
    selectable: true,
  });
  editorStore.canvas.add(star);
  editorStore.canvas.setActiveObject(star);
  editorStore.canvas.renderAll();
}
