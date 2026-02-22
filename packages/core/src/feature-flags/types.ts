/**
 * Feature flag definition
 */
export interface FeatureFlag {
  /** Unique identifier for the flag */
  id: string;
  /** Human-readable name */
  name: string;
  /** Whether the flag is enabled */
  enabled: boolean;
  /** Optional description */
  description?: string;
  /** Percentage rollout (0-100) */
  rolloutPercentage?: number;
  /** Target user IDs for gradual rollout */
  targetUsers?: string[];
  /** Target environments */
  environments?: string[];
}

/**
 * Context for evaluating feature flags
 */
export interface FeatureFlagContext {
  /** Current user ID */
  userId?: string;
  /** Current environment */
  environment?: string;
  /** Additional custom attributes */
  attributes?: Record<string, string | number | boolean>;
}

/**
 * Feature flag store interface
 */
export interface FeatureFlagStore {
  /** Map of flag ID to flag definition */
  flags: Map<string, FeatureFlag>;
}
