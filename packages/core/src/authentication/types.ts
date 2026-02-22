/**
 * User session information
 */
export interface UserSession {
  /** Unique user identifier */
  userId: string;
  /** User's assigned roles */
  roles: string[];
  /** Session expiration timestamp (ISO 8601) */
  expiresAt: string;
  /** User's explicit permissions */
  permissions?: string[];
}

/**
 * Authorization options for checking user access
 */
export interface AuthorizationOptions {
  /** Required roles (user must have at least one) */
  requiredRoles?: string[];
  /** Required permissions (user must have all) */
  requiredPermissions?: string[];
  /** If true, requires all roles instead of at least one */
  requireAllRoles?: boolean;
}

/**
 * Result of an authorization check
 */
export interface AuthorizationResult {
  /** Whether the user is authorized */
  authorized: boolean;
  /** Reason for denial if not authorized */
  reason?: string;
}
