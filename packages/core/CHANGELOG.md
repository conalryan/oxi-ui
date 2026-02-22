# Changelog

All notable changes to @piloting/core will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-21

### Added

- Initial release
- `isAuthorized` - Authorization checking with roles and permissions
- `isEnabled` - Feature flag system with percentage rollout support
- `hasPermission`, `hasAllPermissions`, `hasAnyPermission` - Permission utilities
- `debounce`, `throttle` - Function rate limiting utilities
- `deepClone`, `deepEqual` - Object comparison utilities
- `generateId`, `sleep`, `safeJsonParse` - General utilities
- `omit`, `pick` - Object manipulation utilities
- Tree-shakable exports via subpath imports
