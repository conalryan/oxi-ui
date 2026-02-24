import { describe, expect, it, mock } from 'bun:test';
import {
  debounce,
  throttle,
  deepClone,
  deepEqual,
  generateId,
  sleep,
  safeJsonParse,
  omit,
  pick,
} from './helpers';

describe('Utils', () => {
  describe('debounce', () => {
    it('delays function execution', async () => {
      const fn = mock(() => {});
      const debounced = debounce(fn, 50);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toHaveBeenCalled();

      await sleep(60);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('resets timer on subsequent calls', async () => {
      const fn = mock(() => {});
      const debounced = debounce(fn, 50);

      debounced();
      await sleep(30);
      debounced();
      await sleep(30);
      debounced();
      await sleep(60);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('limits function calls to the throttle interval', async () => {
      const fn = mock(() => {});
      const throttled = throttle(fn, 50);

      throttled();
      throttled();
      throttled();

      expect(fn).toHaveBeenCalledTimes(1);

      await sleep(60);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('deepClone', () => {
    it('clones primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(null)).toBe(null);
    });

    it('clones arrays', () => {
      const arr = [1, 2, [3, 4]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[2]).not.toBe(arr[2]);
    });

    it('clones nested objects', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });
  });

  describe('deepEqual', () => {
    it('returns true for equal primitives', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual('a', 'a')).toBe(true);
    });

    it('returns false for different primitives', () => {
      expect(deepEqual(1, 2)).toBe(false);
      expect(deepEqual('a', 'b')).toBe(false);
    });

    it('returns true for deeply equal objects', () => {
      expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    });

    it('returns false for different objects', () => {
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
      expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('handles null values', () => {
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual(null, {})).toBe(false);
    });

    it('handles different types', () => {
      expect(deepEqual(1, '1')).toBe(false);
    });
  });

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('includes prefix when provided', () => {
      const id = generateId('user');
      expect(id.startsWith('user-')).toBe(true);
    });

    it('generates IDs without prefix', () => {
      const id = generateId();
      expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
    });
  });

  describe('sleep', () => {
    it('pauses execution for specified duration', async () => {
      const start = Date.now();
      await sleep(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(45);
    });
  });

  describe('safeJsonParse', () => {
    it('parses valid JSON', () => {
      expect(safeJsonParse('{"a": 1}', {})).toEqual({ a: 1 });
    });

    it('returns fallback for invalid JSON', () => {
      expect(safeJsonParse('invalid', { default: true })).toEqual({ default: true });
    });

    it('returns fallback for empty string', () => {
      expect(safeJsonParse('', [])).toEqual([]);
    });
  });

  describe('omit', () => {
    it('removes specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('handles multiple keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['a', 'c'])).toEqual({ b: 2 });
    });

    it('returns copy when no keys specified', () => {
      const obj = { a: 1 };
      const result = omit(obj, []);
      expect(result).toEqual(obj);
      expect(result).not.toBe(obj);
    });
  });

  describe('pick', () => {
    it('picks specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('handles missing keys', () => {
      const obj = { a: 1, b: 2 };
      expect(pick(obj, ['a', 'c' as keyof typeof obj])).toEqual({ a: 1 });
    });

    it('returns empty object for empty keys', () => {
      const obj = { a: 1 };
      expect(pick(obj, [])).toEqual({});
    });
  });
});
