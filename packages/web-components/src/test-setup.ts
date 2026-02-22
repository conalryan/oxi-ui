import { Window } from "happy-dom";

// Create happy-dom window and register globals for DOM testing
const window = new Window();

// Register DOM globals
Object.assign(globalThis, {
  window,
  document: window.document,
  customElements: window.customElements,
  HTMLElement: window.HTMLElement,
  Element: window.Element,
  Node: window.Node,
  Event: window.Event,
  CustomEvent: window.CustomEvent,
  MutationObserver: window.MutationObserver,
});
