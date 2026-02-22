import { describe, expect, it } from "bun:test";
import { OxiButton } from "./button.element";

// Element is auto-registered via @customElement decorator when imported

describe("OxiButton", () => {
  const createElement = (props: Partial<OxiButton> = {}): OxiButton => {
    const el = document.createElement("oxi-button") as OxiButton;
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  };

  const cleanup = (el: OxiButton) => {
    el.remove();
  };

  describe("properties", () => {
    it("has default variant of primary", () => {
      const el = createElement();
      expect(el.variant).toBe("primary");
      cleanup(el);
    });

    it("has default size of medium", () => {
      const el = createElement();
      expect(el.size).toBe("medium");
      cleanup(el);
    });

    it("has default disabled of false", () => {
      const el = createElement();
      expect(el.disabled).toBe(false);
      cleanup(el);
    });

    it("has default loading of false", () => {
      const el = createElement();
      expect(el.loading).toBe(false);
      cleanup(el);
    });

    it("has default type of button", () => {
      const el = createElement();
      expect(el.type).toBe("button");
      cleanup(el);
    });

    it("has default fullWidth of false", () => {
      const el = createElement();
      expect(el.fullWidth).toBe(false);
      cleanup(el);
    });

    it("accepts variant property", () => {
      const el = createElement({ variant: "secondary" });
      expect(el.variant).toBe("secondary");
      cleanup(el);
    });

    it("accepts size property", () => {
      const el = createElement({ size: "large" });
      expect(el.size).toBe("large");
      cleanup(el);
    });

    it("accepts disabled property", () => {
      const el = createElement({ disabled: true });
      expect(el.disabled).toBe(true);
      cleanup(el);
    });

    it("accepts loading property", () => {
      const el = createElement({ loading: true });
      expect(el.loading).toBe(true);
      cleanup(el);
    });
  });

  describe("variants", () => {
    const variants = ["primary", "secondary", "outline", "ghost", "danger"] as const;

    variants.forEach((variant) => {
      it(`supports ${variant} variant`, () => {
        const el = createElement({ variant });
        expect(el.variant).toBe(variant);
        cleanup(el);
      });
    });
  });

  describe("sizes", () => {
    const sizes = ["small", "medium", "large"] as const;

    sizes.forEach((size) => {
      it(`supports ${size} size`, () => {
        const el = createElement({ size });
        expect(el.size).toBe(size);
        cleanup(el);
      });
    });
  });

  describe("types", () => {
    const types = ["button", "submit", "reset"] as const;

    types.forEach((type) => {
      it(`supports ${type} type`, () => {
        const el = createElement({ type });
        expect(el.type).toBe(type);
        cleanup(el);
      });
    });
  });

  describe("states", () => {
    it("can be disabled", () => {
      const el = createElement({ disabled: true });
      expect(el.disabled).toBe(true);
      cleanup(el);
    });

    it("can be in loading state", () => {
      const el = createElement({ loading: true });
      expect(el.loading).toBe(true);
      cleanup(el);
    });

    it("can be full width", () => {
      const el = createElement({ fullWidth: true });
      expect(el.fullWidth).toBe(true);
      cleanup(el);
    });
  });

  describe("rendering", () => {
    it("renders as custom element", () => {
      const el = createElement();
      expect(el.tagName.toLowerCase()).toBe("oxi-button");
      cleanup(el);
    });

    it("is instance of OxiButton", () => {
      const el = createElement();
      expect(el instanceof OxiButton).toBe(true);
      cleanup(el);
    });
  });
});
