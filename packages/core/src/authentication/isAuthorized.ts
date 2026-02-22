import type { UserSession, AuthorizationOptions, AuthorizationResult } from "./types";

/**
 * Checks if a user session is expired
 * @param session - The user session to check
 * @returns true if the session is expired
 */
export function isSessionExpired(session: UserSession): boolean {
  const expirationDate = new Date(session.expiresAt);
  return expirationDate.getTime() < Date.now();
}

/**
 * Checks if a user has at least one of the required roles
 * @param userRoles - The user's roles
 * @param requiredRoles - The roles to check against
 * @param requireAll - If true, user must have all roles
 * @returns true if the user has the required roles
 */
export function hasRequiredRoles(
  userRoles: string[],
  requiredRoles: string[],
  requireAll = false,
): boolean {
  if (requiredRoles.length === 0) return true;

  if (requireAll) {
    return requiredRoles.every((role) => userRoles.includes(role));
  }

  return requiredRoles.some((role) => userRoles.includes(role));
}

/**
 * Checks if a user has all the required permissions
 * @param userPermissions - The user's permissions
 * @param requiredPermissions - The permissions to check
 * @returns true if the user has all required permissions
 */
export function hasRequiredPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  if (requiredPermissions.length === 0) return true;
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Determines if a user is authorized based on their session and options
 *
 * @param session - The current user session
 * @param options - Authorization requirements
 * @returns AuthorizationResult indicating if authorized and reason if not
 *
 * @example
 * ```typescript
 * const session = {
 *   userId: 'user-123',
 *   roles: ['admin', 'user'],
 *   expiresAt: '2026-12-31T23:59:59Z',
 *   permissions: ['read', 'write']
 * };
 *
 * const result = isAuthorized(session, {
 *   requiredRoles: ['admin'],
 *   requiredPermissions: ['read']
 * });
 *
 * if (result.authorized) {
 *   // User has access
 * }
 * ```
 */
export function isAuthorized(
  session: UserSession | null | undefined,
  options: AuthorizationOptions = {},
): AuthorizationResult {
  // Check for valid session
  if (!session) {
    return { authorized: false, reason: "No active session" };
  }

  // Check session expiration
  if (isSessionExpired(session)) {
    return { authorized: false, reason: "Session expired" };
  }

  // Check roles if specified
  const { requiredRoles = [], requiredPermissions = [], requireAllRoles = false } = options;

  if (!hasRequiredRoles(session.roles, requiredRoles, requireAllRoles)) {
    return {
      authorized: false,
      reason: requireAllRoles
        ? `Missing required roles: ${requiredRoles.filter((r) => !session.roles.includes(r)).join(", ")}`
        : `User does not have any of the required roles: ${requiredRoles.join(", ")}`,
    };
  }

  // Check permissions if specified
  if (!hasRequiredPermissions(session.permissions || [], requiredPermissions)) {
    const missingPerms = requiredPermissions.filter(
      (p) => !(session.permissions || []).includes(p),
    );
    return {
      authorized: false,
      reason: `Missing required permissions: ${missingPerms.join(", ")}`,
    };
  }

  return { authorized: true };
}
