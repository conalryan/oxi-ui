import { describe, expect, it, beforeEach } from 'bun:test';
import {
  isEnabled,
  initializeFeatureFlags,
  resetFeatureFlags,
  getFeatureFlag,
  getAllFeatureFlags,
  hashUserFlag,
  isInRolloutPercentage,
  isTargetUser,
  isTargetEnvironment,
} from './isEnabled';
import type { FeatureFlag } from './types';

const createFlag = (overrides: Partial<FeatureFlag> = {}): FeatureFlag => ({
  id: 'test-flag',
  name: 'Test Flag',
  enabled: true,
  ...overrides,
});

describe('Feature Flags', () => {
  beforeEach(() => {
    resetFeatureFlags();
  });

  describe('initializeFeatureFlags', () => {
    it('initializes the store with provided flags', () => {
      const flags = [
        createFlag({ id: 'flag-1', name: 'Flag 1' }),
        createFlag({ id: 'flag-2', name: 'Flag 2' }),
      ];
      initializeFeatureFlags(flags);

      expect(getFeatureFlag('flag-1')).toBeDefined();
      expect(getFeatureFlag('flag-2')).toBeDefined();
    });

    it('replaces existing flags on re-initialization', () => {
      initializeFeatureFlags([createFlag({ id: 'old-flag' })]);
      initializeFeatureFlags([createFlag({ id: 'new-flag' })]);

      expect(getFeatureFlag('old-flag')).toBeUndefined();
      expect(getFeatureFlag('new-flag')).toBeDefined();
    });
  });

  describe('getAllFeatureFlags', () => {
    it('returns all registered flags', () => {
      initializeFeatureFlags([
        createFlag({ id: 'flag-1' }),
        createFlag({ id: 'flag-2' }),
        createFlag({ id: 'flag-3' }),
      ]);

      const flags = getAllFeatureFlags();
      expect(flags).toHaveLength(3);
    });

    it('returns empty array when no flags are registered', () => {
      expect(getAllFeatureFlags()).toHaveLength(0);
    });
  });

  describe('hashUserFlag', () => {
    it('returns a number between 0 and 99', () => {
      const hash = hashUserFlag('user-123', 'flag-abc');
      expect(hash).toBeGreaterThanOrEqual(0);
      expect(hash).toBeLessThan(100);
    });

    it('returns consistent results for the same input', () => {
      const hash1 = hashUserFlag('user-123', 'flag-abc');
      const hash2 = hashUserFlag('user-123', 'flag-abc');
      expect(hash1).toBe(hash2);
    });

    it('returns different results for different inputs', () => {
      const hash1 = hashUserFlag('user-123', 'flag-abc');
      const hash2 = hashUserFlag('user-456', 'flag-abc');
      // While theoretically could be same, statistically unlikely
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('isInRolloutPercentage', () => {
    it('returns true when rolloutPercentage is undefined', () => {
      const flag = createFlag();
      expect(isInRolloutPercentage(flag, 'user-123')).toBe(true);
    });

    it('returns true when rolloutPercentage is 100', () => {
      const flag = createFlag({ rolloutPercentage: 100 });
      expect(isInRolloutPercentage(flag, 'user-123')).toBe(true);
    });

    it('returns false when rolloutPercentage is 0', () => {
      const flag = createFlag({ rolloutPercentage: 0 });
      expect(isInRolloutPercentage(flag, 'user-123')).toBe(false);
    });

    it('returns false when no userId is provided for percentage rollout', () => {
      const flag = createFlag({ rolloutPercentage: 50 });
      expect(isInRolloutPercentage(flag, undefined)).toBe(false);
    });

    it('consistently returns same result for same user', () => {
      const flag = createFlag({ id: 'rollout-test', rolloutPercentage: 50 });
      const result1 = isInRolloutPercentage(flag, 'consistent-user');
      const result2 = isInRolloutPercentage(flag, 'consistent-user');
      expect(result1).toBe(result2);
    });
  });

  describe('isTargetUser', () => {
    it('returns true when targetUsers is undefined', () => {
      const flag = createFlag();
      expect(isTargetUser(flag, 'any-user')).toBe(true);
    });

    it('returns true when targetUsers is empty', () => {
      const flag = createFlag({ targetUsers: [] });
      expect(isTargetUser(flag, 'any-user')).toBe(true);
    });

    it('returns true when user is in targetUsers', () => {
      const flag = createFlag({ targetUsers: ['user-1', 'user-2', 'user-3'] });
      expect(isTargetUser(flag, 'user-2')).toBe(true);
    });

    it('returns false when user is not in targetUsers', () => {
      const flag = createFlag({ targetUsers: ['user-1', 'user-2'] });
      expect(isTargetUser(flag, 'user-3')).toBe(false);
    });

    it('returns false when no userId is provided but targetUsers exists', () => {
      const flag = createFlag({ targetUsers: ['user-1'] });
      expect(isTargetUser(flag, undefined)).toBe(false);
    });
  });

  describe('isTargetEnvironment', () => {
    it('returns true when environments is undefined', () => {
      const flag = createFlag();
      expect(isTargetEnvironment(flag, 'any-env')).toBe(true);
    });

    it('returns true when environments is empty', () => {
      const flag = createFlag({ environments: [] });
      expect(isTargetEnvironment(flag, 'any-env')).toBe(true);
    });

    it('returns true when environment is in the list', () => {
      const flag = createFlag({ environments: ['development', 'staging'] });
      expect(isTargetEnvironment(flag, 'staging')).toBe(true);
    });

    it('returns false when environment is not in the list', () => {
      const flag = createFlag({ environments: ['development', 'staging'] });
      expect(isTargetEnvironment(flag, 'production')).toBe(false);
    });

    it('returns false when no environment is provided but environments exist', () => {
      const flag = createFlag({ environments: ['development'] });
      expect(isTargetEnvironment(flag, undefined)).toBe(false);
    });
  });

  describe('isEnabled', () => {
    it('returns false for non-existent flag', () => {
      expect(isEnabled('non-existent')).toBe(false);
    });

    it('returns false for disabled flag', () => {
      initializeFeatureFlags([createFlag({ id: 'disabled-flag', enabled: false })]);
      expect(isEnabled('disabled-flag')).toBe(false);
    });

    it('returns true for simple enabled flag', () => {
      initializeFeatureFlags([createFlag({ id: 'simple-flag', enabled: true })]);
      expect(isEnabled('simple-flag')).toBe(true);
    });

    it('respects environment targeting', () => {
      initializeFeatureFlags([
        createFlag({ id: 'env-flag', environments: ['production'] }),
      ]);

      expect(isEnabled('env-flag', { environment: 'production' })).toBe(true);
      expect(isEnabled('env-flag', { environment: 'development' })).toBe(false);
    });

    it('respects user targeting', () => {
      initializeFeatureFlags([
        createFlag({ id: 'user-flag', targetUsers: ['beta-user'] }),
      ]);

      expect(isEnabled('user-flag', { userId: 'beta-user' })).toBe(true);
      expect(isEnabled('user-flag', { userId: 'regular-user' })).toBe(false);
    });

    it('respects rollout percentage', () => {
      initializeFeatureFlags([
        createFlag({ id: 'rollout-0', rolloutPercentage: 0 }),
        createFlag({ id: 'rollout-100', rolloutPercentage: 100 }),
      ]);

      expect(isEnabled('rollout-0', { userId: 'any-user' })).toBe(false);
      expect(isEnabled('rollout-100', { userId: 'any-user' })).toBe(true);
    });

    it('evaluates all conditions together', () => {
      initializeFeatureFlags([
        createFlag({
          id: 'complex-flag',
          enabled: true,
          environments: ['production'],
          targetUsers: ['vip-user'],
        }),
      ]);

      // All conditions met
      expect(
        isEnabled('complex-flag', { environment: 'production', userId: 'vip-user' })
      ).toBe(true);

      // Wrong environment
      expect(
        isEnabled('complex-flag', { environment: 'staging', userId: 'vip-user' })
      ).toBe(false);

      // Wrong user
      expect(
        isEnabled('complex-flag', { environment: 'production', userId: 'regular-user' })
      ).toBe(false);
    });

    it('works without context', () => {
      initializeFeatureFlags([createFlag({ id: 'no-context-flag' })]);
      expect(isEnabled('no-context-flag')).toBe(true);
    });
  });
});
