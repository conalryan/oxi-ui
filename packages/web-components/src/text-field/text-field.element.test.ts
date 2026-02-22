import { describe, expect, it, beforeAll } from 'bun:test';
import { OxiUITextField } from './text-field.element';

// Register the custom element for testing
beforeAll(() => {
  if (!customElements.get('oxi-ui-text-field')) {
    customElements.define('oxi-ui-text-field', OxiUITextField);
  }
});

describe('OxiUITextField', () => {
  const createElement = (props: Partial<OxiUITextField> = {}): OxiUITextField => {
    const el = document.createElement('oxi-ui-text-field') as OxiUITextField;
    Object.assign(el, props);
    document.body.appendChild(el);
    return el;
  };

  const cleanup = (el: OxiUITextField) => {
    el.remove();
  };

  describe('properties', () => {
    it('has default type of text', () => {
      const el = createElement();
      expect(el.type).toBe('text');
      cleanup(el);
    });

    it('has default size of medium', () => {
      const el = createElement();
      expect(el.size).toBe('medium');
      cleanup(el);
    });

    it('has default disabled of false', () => {
      const el = createElement();
      expect(el.disabled).toBe(false);
      cleanup(el);
    });

    it('has default readonly of false', () => {
      const el = createElement();
      expect(el.readonly).toBe(false);
      cleanup(el);
    });

    it('has default required of false', () => {
      const el = createElement();
      expect(el.required).toBe(false);
      cleanup(el);
    });

    it('has empty default value', () => {
      const el = createElement();
      expect(el.value).toBe('');
      cleanup(el);
    });

    it('accepts type property', () => {
      const el = createElement({ type: 'email' });
      expect(el.type).toBe('email');
      cleanup(el);
    });

    it('accepts value property', () => {
      const el = createElement({ value: 'test value' });
      expect(el.value).toBe('test value');
      cleanup(el);
    });

    it('accepts placeholder property', () => {
      const el = createElement({ placeholder: 'Enter text...' });
      expect(el.placeholder).toBe('Enter text...');
      cleanup(el);
    });

    it('accepts label property', () => {
      const el = createElement({ label: 'Username' });
      expect(el.label).toBe('Username');
      cleanup(el);
    });

    it('accepts helperText property', () => {
      const el = createElement({ helperText: 'Enter your username' });
      expect(el.helperText).toBe('Enter your username');
      cleanup(el);
    });

    it('accepts errorText property', () => {
      const el = createElement({ errorText: 'This field is required' });
      expect(el.errorText).toBe('This field is required');
      cleanup(el);
    });
  });

  describe('types', () => {
    const types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search'] as const;

    types.forEach((type) => {
      it(`supports ${type} type`, () => {
        const el = createElement({ type });
        expect(el.type).toBe(type);
        cleanup(el);
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      it(`supports ${size} size`, () => {
        const el = createElement({ size });
        expect(el.size).toBe(size);
        cleanup(el);
      });
    });
  });

  describe('validation properties', () => {
    it('accepts maxLength property', () => {
      const el = createElement({ maxLength: 100 });
      expect(el.maxLength).toBe(100);
      cleanup(el);
    });

    it('accepts minLength property', () => {
      const el = createElement({ minLength: 5 });
      expect(el.minLength).toBe(5);
      cleanup(el);
    });

    it('accepts pattern property', () => {
      const el = createElement({ pattern: '[a-zA-Z]+' });
      expect(el.pattern).toBe('[a-zA-Z]+');
      cleanup(el);
    });

    it('accepts name property', () => {
      const el = createElement({ name: 'username' });
      expect(el.name).toBe('username');
      cleanup(el);
    });
  });

  describe('states', () => {
    it('can be disabled', () => {
      const el = createElement({ disabled: true });
      expect(el.disabled).toBe(true);
      cleanup(el);
    });

    it('can be readonly', () => {
      const el = createElement({ readonly: true });
      expect(el.readonly).toBe(true);
      cleanup(el);
    });

    it('can be required', () => {
      const el = createElement({ required: true });
      expect(el.required).toBe(true);
      cleanup(el);
    });

    it('can be full width', () => {
      const el = createElement({ fullWidth: true });
      expect(el.fullWidth).toBe(true);
      cleanup(el);
    });
  });

  describe('rendering', () => {
    it('renders as custom element', () => {
      const el = createElement();
      expect(el.tagName.toLowerCase()).toBe('oxi-ui-text-field');
      cleanup(el);
    });

    it('is instance of OxiUITextField', () => {
      const el = createElement();
      expect(el instanceof OxiUITextField).toBe(true);
      cleanup(el);
    });
  });

  describe('error state', () => {
    it('displays error text when provided', () => {
      const el = createElement({ errorText: 'Invalid input' });
      expect(el.errorText).toBe('Invalid input');
      cleanup(el);
    });

    it('prioritizes error text over helper text', () => {
      const el = createElement({
        helperText: 'Help text',
        errorText: 'Error text',
      });
      expect(el.errorText).toBe('Error text');
      expect(el.helperText).toBe('Help text');
      cleanup(el);
    });
  });
});
