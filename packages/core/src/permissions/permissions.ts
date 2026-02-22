import type { Permission, PermissionCheckOptions } from './types';

/**
 * Check if a user has a specific permission
 * @param userPermissions - Array of permission IDs the user has
 * @param permissionId - The permission ID to check
 * @returns true if the user has the permission
 */
export function hasPermission(userPermissions: string[], permissionId: string): boolean {
  return userPermissions.includes(permissionId);
}

/**
 * Check if a user has all of the specified permissions
 * @param userPermissions - Array of permission IDs the user has
 * @param requiredPermissions - Array of permission IDs to check
 * @returns true if the user has all permissions
 */
export function hasAllPermissions(
  userPermissions: string[],
  requiredPermissions: string[]
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if a user has any of the specified permissions
 * @param userPermissions - Array of permission IDs the user has
 * @param anyPermissions - Array of permission IDs to check
 * @returns true if the user has at least one permission
 */
export function hasAnyPermission(userPermissions: string[], anyPermissions: string[]): boolean {
  if (anyPermissions.length === 0) return true;
  return anyPermissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Check if a permission grants access to a specific resource and action
 * @param permission - The permission definition
 * @param options - The resource and action to check
 * @returns true if the permission grants access
 */
export function permissionGrantsAccess(
  permission: Permission,
  options: PermissionCheckOptions
): boolean {
  if (options.resource && permission.resource !== options.resource) {
    return false;
  }
  if (options.action && permission.actions && !permission.actions.includes(options.action)) {
    return false;
  }
  return true;
}

/**
 * Filter permissions that grant access to a specific resource/action
 * @param permissions - Array of permission definitions
 * @param options - The resource and action to filter by
 * @returns Array of matching permissions
 */
export function filterPermissions(
  permissions: Permission[],
  options: PermissionCheckOptions
): Permission[] {
  return permissions.filter((perm) => permissionGrantsAccess(perm, options));
}
