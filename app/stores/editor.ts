import type { Canvas } from "fabric";
import { defineStore } from "pinia";

export enum ObjectsTypes {
  itext = "i-text",
}

export const useEditorStore = defineStore("editor", {
  state: () => ({
    canvas: null as Canvas | null,
    currentFont: "Times New Roman",
    current: 400,
    active: "" as ObjectsTypes,
    showTextToolBar: false,
    currentColor: "#000000",
    isRightSidebarOpen: false,
    isLeftSidebarOpen: false,
  }),
  actions: {
    setIsRightSidebarOpen(value: boolean) {
      this.isRightSidebarOpen = value;
    },

    setIsLeftSidebarOpen(value: boolean) {
      this.isLeftSidebarOpen = value;
    },

    setShowTextToolBar(value: boolean) {
      this.showTextToolBar = value;
    },

    setActive(value: ObjectsTypes) {
      this.active = value;
    },
  },
});
