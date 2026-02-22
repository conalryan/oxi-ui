/**
 * Permission definition
 */
export interface Permission {
  /** Unique identifier for the permission */
  id: string;
  /** Human-readable name */
  name: string;
  /** Optional description */
  description?: string;
  /** Resource this permission applies to */
  resource?: string;
  /** Actions allowed by this permission */
  actions?: string[];
}

/**
 * Permission check options
 */
export interface PermissionCheckOptions {
  /** Resource to check permission for */
  resource?: string;
  /** Action to check permission for */
  action?: string;
}
