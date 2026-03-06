import type { FeatureFlag, FeatureFlagContext, FeatureFlagStore } from './types';

// Global feature flag store
let globalStore: FeatureFlagStore = { flags: new Map() };

/**
 * Initialize the feature flag store with flags
 * @param flags - Array of feature flags to initialize
 */
export function initializeFeatureFlags(flags: FeatureFlag[]): void {
  globalStore = {
    flags: new Map(flags.map((flag) => [flag.id, flag])),
  };
}

/**
 * Get the current feature flag store
 * @returns The current feature flag store
 */
export function getFeatureFlagStore(): FeatureFlagStore {
  return globalStore;
}

/**
 * Reset the feature flag store (useful for testing)
 */
export function resetFeatureFlags(): void {
  globalStore = { flags: new Map() };
}

/**
 * Generate a deterministic hash for percentage-based rollouts
 * Uses a simple hash function to ensure consistent results for the same user/flag combo
 * @param userId - The user ID
 * @param flagId - The flag ID
 * @returns A number between 0 and 99
 */
export function hashUserFlag(userId: string, flagId: string): number {
  const str = `${userId}:${flagId}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % 100;
}

/**
 * Check if a user is in the rollout percentage
 * @param flag - The feature flag
 * @param userId - The user ID
 * @returns true if the user is in the rollout
 */
export function isInRolloutPercentage(flag: FeatureFlag, userId?: string): boolean {
  if (flag.rolloutPercentage === undefined || flag.rolloutPercentage >= 100) {
    return true;
  }
  if (flag.rolloutPercentage <= 0) {
    return false;
  }
  if (!userId) {
    return false;
  }
  const userHash = hashUserFlag(userId, flag.id);
  return userHash < flag.rolloutPercentage;
}

/**
 * Check if a user is in the target users list
 * @param flag - The feature flag
 * @param userId - The user ID
 * @returns true if target users is empty or user is in the list
 */
export function isTargetUser(flag: FeatureFlag, userId?: string): boolean {
  if (!flag.targetUsers || flag.targetUsers.length === 0) {
    return true;
  }
  if (!userId) {
    return false;
  }
  return flag.targetUsers.includes(userId);
}

/**
 * Check if the current environment matches the flag's target environments
 * @param flag - The feature flag
 * @param environment - The current environment
 * @returns true if environments is empty or current env matches
 */
export function isTargetEnvironment(flag: FeatureFlag, environment?: string): boolean {
  if (!flag.environments || flag.environments.length === 0) {
    return true;
  }
  if (!environment) {
    return false;
  }
  return flag.environments.includes(environment);
}

/**
 * Checks if a feature flag is enabled for the given context
 *
 * @param flagId - The unique identifier of the feature flag
 * @param context - Optional context for evaluating the flag
 * @returns true if the feature flag is enabled
 *
 * @example
 * ```typescript
 * // Initialize flags
 * initializeFeatureFlags([
 *   { id: 'new-dashboard', name: 'New Dashboard', enabled: true },
 *   { id: 'beta-feature', name: 'Beta Feature', enabled: true, rolloutPercentage: 50 }
 * ]);
 *
 * // Check if flag is enabled
 * if (isEnabled('new-dashboard')) {
 *   // Show new dashboard
 * }
 *
 * // Check with user context
 * if (isEnabled('beta-feature', { userId: 'user-123' })) {
 *   // Show beta feature
 * }
 * ```
 */
export function isEnabled(flagId: string, context: FeatureFlagContext = {}): boolean {
  const flag = globalStore.flags.get(flagId);

  // Flag doesn't exist - default to disabled
  if (!flag) {
    return false;
  }

  // Flag is explicitly disabled
  if (!flag.enabled) {
    return false;
  }

  // Check environment targeting
  if (!isTargetEnvironment(flag, context.environment)) {
    return false;
  }

  // Check user targeting
  if (!isTargetUser(flag, context.userId)) {
    return false;
  }

  // Check rollout percentage
  if (!isInRolloutPercentage(flag, context.userId)) {
    return false;
  }

  return true;
}

/**
 * Get the value of a feature flag
 * @param flagId - The unique identifier of the feature flag
 * @returns The feature flag or undefined if not found
 */
export function getFeatureFlag(flagId: string): FeatureFlag | undefined {
  return globalStore.flags.get(flagId);
}

/**
 * Get all feature flags
 * @returns Array of all feature flags
 */
export function getAllFeatureFlags(): FeatureFlag[] {
  return Array.from(globalStore.flags.values());
}
