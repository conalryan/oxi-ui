import { describe, expect, it } from "bun:test";
import {
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  permissionGrantsAccess,
  filterPermissions,
} from "./permissions";
import type { Permission } from "./types";

describe("Permissions", () => {
  describe("hasPermission", () => {
    it("returns true when user has the permission", () => {
      expect(hasPermission(["read", "write"], "read")).toBe(true);
    });

    it("returns false when user lacks the permission", () => {
      expect(hasPermission(["read"], "write")).toBe(false);
    });

    it("handles empty permissions array", () => {
      expect(hasPermission([], "read")).toBe(false);
    });
  });

  describe("hasAllPermissions", () => {
    it("returns true when user has all permissions", () => {
      expect(hasAllPermissions(["read", "write", "delete"], ["read", "write"])).toBe(true);
    });

    it("returns false when user is missing a permission", () => {
      expect(hasAllPermissions(["read"], ["read", "write"])).toBe(false);
    });

    it("returns true for empty required permissions", () => {
      expect(hasAllPermissions(["read"], [])).toBe(true);
    });

    it("returns true when user has exact permissions", () => {
      expect(hasAllPermissions(["read", "write"], ["read", "write"])).toBe(true);
    });
  });

  describe("hasAnyPermission", () => {
    it("returns true when user has one of the permissions", () => {
      expect(hasAnyPermission(["read"], ["read", "write"])).toBe(true);
    });

    it("returns false when user has none of the permissions", () => {
      expect(hasAnyPermission(["delete"], ["read", "write"])).toBe(false);
    });

    it("returns true for empty required permissions", () => {
      expect(hasAnyPermission(["read"], [])).toBe(true);
    });

    it("handles empty user permissions", () => {
      expect(hasAnyPermission([], ["read"])).toBe(false);
    });
  });

  describe("permissionGrantsAccess", () => {
    const createPerm = (overrides: Partial<Permission> = {}): Permission => ({
      id: "test-perm",
      name: "Test Permission",
      resource: "documents",
      actions: ["read", "write"],
      ...overrides,
    });

    it("returns true when no options specified", () => {
      const perm = createPerm();
      expect(permissionGrantsAccess(perm, {})).toBe(true);
    });

    it("returns true when resource matches", () => {
      const perm = createPerm({ resource: "documents" });
      expect(permissionGrantsAccess(perm, { resource: "documents" })).toBe(true);
    });

    it("returns false when resource does not match", () => {
      const perm = createPerm({ resource: "documents" });
      expect(permissionGrantsAccess(perm, { resource: "users" })).toBe(false);
    });

    it("returns true when action is in actions list", () => {
      const perm = createPerm({ actions: ["read", "write"] });
      expect(permissionGrantsAccess(perm, { action: "read" })).toBe(true);
    });

    it("returns false when action is not in actions list", () => {
      const perm = createPerm({ actions: ["read"] });
      expect(permissionGrantsAccess(perm, { action: "write" })).toBe(false);
    });

    it("returns true when permission has no actions array", () => {
      const perm = createPerm({ actions: undefined });
      expect(permissionGrantsAccess(perm, { action: "any" })).toBe(true);
    });

    it("validates both resource and action", () => {
      const perm = createPerm({ resource: "documents", actions: ["read"] });
      expect(permissionGrantsAccess(perm, { resource: "documents", action: "read" })).toBe(true);
      expect(permissionGrantsAccess(perm, { resource: "documents", action: "write" })).toBe(false);
      expect(permissionGrantsAccess(perm, { resource: "users", action: "read" })).toBe(false);
    });
  });

  describe("filterPermissions", () => {
    const permissions: Permission[] = [
      { id: "doc-read", name: "Doc Read", resource: "documents", actions: ["read"] },
      { id: "doc-write", name: "Doc Write", resource: "documents", actions: ["write"] },
      { id: "user-read", name: "User Read", resource: "users", actions: ["read"] },
      { id: "admin", name: "Admin", resource: "admin", actions: ["read", "write", "delete"] },
    ];

    it("filters by resource", () => {
      const result = filterPermissions(permissions, { resource: "documents" });
      expect(result).toHaveLength(2);
      expect(result.map((p) => p.id)).toContain("doc-read");
      expect(result.map((p) => p.id)).toContain("doc-write");
    });

    it("filters by action", () => {
      const result = filterPermissions(permissions, { action: "read" });
      expect(result).toHaveLength(3);
    });

    it("filters by both resource and action", () => {
      const result = filterPermissions(permissions, { resource: "documents", action: "read" });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("doc-read");
    });

    it("returns all permissions when no options provided", () => {
      const result = filterPermissions(permissions, {});
      expect(result).toHaveLength(4);
    });

    it("returns empty array when no matches", () => {
      const result = filterPermissions(permissions, { resource: "nonexistent" });
      expect(result).toHaveLength(0);
    });
  });
});
