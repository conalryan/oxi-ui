import { describe, expect, it } from "bun:test";
import {
  isAuthorized,
  isSessionExpired,
  hasRequiredRoles,
  hasRequiredPermissions,
} from "./isAuthorized";
import type { UserSession } from "./types";

// Helper to create a valid session
const createSession = (overrides: Partial<UserSession> = {}): UserSession => ({
  userId: "user-123",
  roles: ["user"],
  expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
  permissions: [],
  ...overrides,
});

// Helper to create an expired session
const createExpiredSession = (overrides: Partial<UserSession> = {}): UserSession => ({
  userId: "user-123",
  roles: ["user"],
  expiresAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  permissions: [],
  ...overrides,
});

describe("isSessionExpired", () => {
  it("returns false for a valid session", () => {
    const session = createSession();
    expect(isSessionExpired(session)).toBe(false);
  });

  it("returns true for an expired session", () => {
    const session = createExpiredSession();
    expect(isSessionExpired(session)).toBe(true);
  });

  it("returns true when expiration time equals current time", () => {
    const session = createSession({ expiresAt: new Date(Date.now() - 1).toISOString() });
    expect(isSessionExpired(session)).toBe(true);
  });
});

describe("hasRequiredRoles", () => {
  it("returns true when no roles are required", () => {
    expect(hasRequiredRoles(["user"], [])).toBe(true);
  });

  it("returns true when user has one of the required roles", () => {
    expect(hasRequiredRoles(["user", "admin"], ["admin", "superadmin"])).toBe(true);
  });

  it("returns false when user has none of the required roles", () => {
    expect(hasRequiredRoles(["user"], ["admin", "superadmin"])).toBe(false);
  });

  it("returns true when requireAll is true and user has all roles", () => {
    expect(hasRequiredRoles(["user", "admin", "editor"], ["admin", "editor"], true)).toBe(true);
  });

  it("returns false when requireAll is true and user is missing a role", () => {
    expect(hasRequiredRoles(["user", "admin"], ["admin", "editor"], true)).toBe(false);
  });

  it("handles empty user roles", () => {
    expect(hasRequiredRoles([], ["admin"])).toBe(false);
  });
});

describe("hasRequiredPermissions", () => {
  it("returns true when no permissions are required", () => {
    expect(hasRequiredPermissions(["read"], [])).toBe(true);
  });

  it("returns true when user has all required permissions", () => {
    expect(hasRequiredPermissions(["read", "write", "delete"], ["read", "write"])).toBe(true);
  });

  it("returns false when user is missing a permission", () => {
    expect(hasRequiredPermissions(["read"], ["read", "write"])).toBe(false);
  });

  it("handles empty user permissions", () => {
    expect(hasRequiredPermissions([], ["read"])).toBe(false);
  });
});

describe("isAuthorized", () => {
  it("returns unauthorized when session is null", () => {
    const result = isAuthorized(null);
    expect(result.authorized).toBe(false);
    expect(result.reason).toBe("No active session");
  });

  it("returns unauthorized when session is undefined", () => {
    const result = isAuthorized(undefined);
    expect(result.authorized).toBe(false);
    expect(result.reason).toBe("No active session");
  });

  it("returns unauthorized when session is expired", () => {
    const session = createExpiredSession();
    const result = isAuthorized(session);
    expect(result.authorized).toBe(false);
    expect(result.reason).toBe("Session expired");
  });

  it("returns authorized for valid session with no requirements", () => {
    const session = createSession();
    const result = isAuthorized(session);
    expect(result.authorized).toBe(true);
    expect(result.reason).toBeUndefined();
  });

  it("returns authorized when user has required role", () => {
    const session = createSession({ roles: ["admin", "user"] });
    const result = isAuthorized(session, { requiredRoles: ["admin"] });
    expect(result.authorized).toBe(true);
  });

  it("returns unauthorized when user lacks required role", () => {
    const session = createSession({ roles: ["user"] });
    const result = isAuthorized(session, { requiredRoles: ["admin"] });
    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("admin");
  });

  it("returns authorized when user has all required roles with requireAllRoles", () => {
    const session = createSession({ roles: ["admin", "editor", "user"] });
    const result = isAuthorized(session, {
      requiredRoles: ["admin", "editor"],
      requireAllRoles: true,
    });
    expect(result.authorized).toBe(true);
  });

  it("returns unauthorized when user is missing a role with requireAllRoles", () => {
    const session = createSession({ roles: ["admin", "user"] });
    const result = isAuthorized(session, {
      requiredRoles: ["admin", "editor"],
      requireAllRoles: true,
    });
    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("editor");
  });

  it("returns authorized when user has all required permissions", () => {
    const session = createSession({ permissions: ["read", "write"] });
    const result = isAuthorized(session, { requiredPermissions: ["read", "write"] });
    expect(result.authorized).toBe(true);
  });

  it("returns unauthorized when user is missing a permission", () => {
    const session = createSession({ permissions: ["read"] });
    const result = isAuthorized(session, { requiredPermissions: ["read", "write"] });
    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("write");
  });

  it("handles missing permissions array in session", () => {
    const session = createSession();
    delete session.permissions;
    const result = isAuthorized(session, { requiredPermissions: ["read"] });
    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("read");
  });

  it("validates both roles and permissions together", () => {
    const session = createSession({ roles: ["admin"], permissions: ["read", "write"] });
    const result = isAuthorized(session, {
      requiredRoles: ["admin"],
      requiredPermissions: ["read"],
    });
    expect(result.authorized).toBe(true);
  });

  it("fails when roles pass but permissions fail", () => {
    const session = createSession({ roles: ["admin"], permissions: ["read"] });
    const result = isAuthorized(session, {
      requiredRoles: ["admin"],
      requiredPermissions: ["read", "write"],
    });
    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("permissions");
  });

  it("fails when permissions pass but roles fail", () => {
    const session = createSession({ roles: ["user"], permissions: ["read", "write"] });
    const result = isAuthorized(session, {
      requiredRoles: ["admin"],
      requiredPermissions: ["read"],
    });
    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("roles");
  });
});
