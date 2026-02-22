#!/bin/bash
# bump-version.sh
# Bumps the version of a specific package
# Usage: ./scripts/bump-version.sh <package-name> <version-type>
# Example: ./scripts/bump-version.sh core patch

set -e

PACKAGE_NAME="${1}"
VERSION_TYPE="${2:-patch}"

if [ -z "$PACKAGE_NAME" ]; then
    echo "Usage: $0 <package-name> <version-type>"
    echo "  package-name: core | web-components"
    echo "  version-type: major | minor | patch"
    exit 1
fi

# Map package name to directory
case "$PACKAGE_NAME" in
    "core")
        PACKAGE_DIR="packages/core"
        ;;
    "web-components")
        PACKAGE_DIR="packages/web-components"
        ;;
    *)
        echo "Unknown package: $PACKAGE_NAME"
        exit 1
        ;;
esac

PACKAGE_JSON="${PACKAGE_DIR}/package.json"

if [ ! -f "$PACKAGE_JSON" ]; then
    echo "Package not found: $PACKAGE_JSON"
    exit 1
fi

# Read current version
CURRENT_VERSION=$(jq -r '.version' "$PACKAGE_JSON")
echo "Current version: $CURRENT_VERSION"

# Parse version components
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# Bump version based on type
case "$VERSION_TYPE" in
    "major")
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
    "minor")
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    "patch")
        PATCH=$((PATCH + 1))
        ;;
    *)
        echo "Unknown version type: $VERSION_TYPE"
        echo "Use: major | minor | patch"
        exit 1
        ;;
esac

NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
echo "New version: $NEW_VERSION"

# Update package.json
jq --arg version "$NEW_VERSION" '.version = $version' "$PACKAGE_JSON" > "${PACKAGE_JSON}.tmp"
mv "${PACKAGE_JSON}.tmp" "$PACKAGE_JSON"

echo "Updated $PACKAGE_JSON to version $NEW_VERSION"

# Output for CI consumption
echo "NEW_VERSION=${NEW_VERSION}"
