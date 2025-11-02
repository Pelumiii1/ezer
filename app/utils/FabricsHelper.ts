import { Circle, FabricImage, IText, Polygon, Rect, Triangle } from "fabric";
import { markRaw } from "vue";

interface Text {
  content?: string;
  fontSize?: number;
  fontWeight?: number;
}

export function addText({
  content = "",
  fontSize = 20,
  fontWeight = 700,
}: Text) {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const text = markRaw(
    new IText(content ? content : "Enter Text", {
      // Size
      left: 200,
      top: 100,
      minWidth: 100,

      //Style
      underline: false,
      fontFamily: editorStore.currentFont,
      fill: "black",
      fontSize: fontSize,
      fontWeight: fontWeight,

      // Interactivity
      selectable: true,
      editable: true,
      hasControls: true,
      hasBorders: true,

      lockRotation: false,
      lockScalingX: false,
      lockScalingY: false,

      //Border styles and colors
      cornerStyle: "circle",
      cornerColor: "blue",
      cornerSize: 12,
      borderColor: "blue",
      transparentCorners: false,
    })
  );

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

  console.log("underlining text");

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

export function updateFontChange(size: number) {
  console.log("updating font size");
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const activeObject = editorStore.canvas?.getActiveObject();
  if (activeObject) {
    activeObject.set("fontSize", size);
    editorStore.canvas?.renderAll();
  }
}

export function updateFontStyle(style: number) {
  console.log("updating font style");
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const activeObject = editorStore.canvas?.getActiveObject();
  if (activeObject) {
    activeObject.set("fontWeight", style);
    editorStore.canvas?.renderAll();
  }
}

export function updateFontFamily(family: string) {
  console.log("updating font family");
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  const activeObject = editorStore.canvas?.getActiveObject();
  if (activeObject) {
    activeObject.set("fontFamily", family);
    editorStore.canvas?.renderAll();
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

export function alignText(alignment: "left" | "center" | "right") {
  console.log(`aligning text to the ${alignment}`);
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

  markRaw(rect);
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

export function uploadImageToCanvas(base64: string) {
  const editorStore = useEditorStore();

  if (!editorStore.canvas) return;

  FabricImage.fromURL(base64).then((img) => {
    // Size
    img.set({
      left: 100,
      top: 100,
      scaleX: 0.2,
      scaleY: 0.2,
    });

    // Interactivity
    img.set({
      // evented: true,
      // selectable: true,
      // hasBorders: true,
      lockScalingX: false,
      lockScalingY: false,
      lockMovementX: false,
      lockMovementY: false,
      lockRotation: false,
    });

    // Border styles
    img.set({
      cornerStyle: "circle",
      cornerColor: "blue",
      cornerSize: 12,
      transparentCorners: false,
      borderColor: "blue",
      borderScaleFactor: 2.5,
      borderOpacityWhenMoving: 0.5,
    });

    markRaw(img);
    // Add the image to the canvas
    editorStore.canvas?.add(img);
    editorStore.canvas?.centerObject(img);

    editorStore.canvas?.setActiveObject(img);
    editorStore.canvas?.renderAll();
  });
}
