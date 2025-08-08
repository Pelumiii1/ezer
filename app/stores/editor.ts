import type { Canvas } from "fabric";
import { defineStore } from "pinia";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    canvas: null as Canvas | null,
    currentFont: "Times New Roman",
    current: 400,
  }),
  actions: {},
});
