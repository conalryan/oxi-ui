#!/bin/bash
# detect-changes.sh
# Detects which packages have changed since the last release/commit
# Usage: ./scripts/detect-changes.sh [base-ref]

set -e

BASE_REF="${1:-HEAD~1}"
HEAD_REF="${2:-HEAD}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Detecting changes between ${BASE_REF} and ${HEAD_REF}${NC}"

# Get all changed files
CHANGED_FILES=$(git diff --name-only "${BASE_REF}..${HEAD_REF}" 2>/dev/null || git diff --name-only HEAD~1)

echo -e "\n${YELLOW}Changed files:${NC}"
echo "$CHANGED_FILES"

# Initialize arrays for changed packages
CORE_CHANGED=false
WEB_COMPONENTS_CHANGED=false

# Check for package-specific changes
if echo "$CHANGED_FILES" | grep -q "^packages/core/"; then
    CORE_CHANGED=true
fi

if echo "$CHANGED_FILES" | grep -q "^packages/web-components/"; then
    WEB_COMPONENTS_CHANGED=true
fi

# Check for root-level changes that affect all packages
ROOT_CONFIG_FILES="package.json bunfig.toml tsconfig.json"
for file in $ROOT_CONFIG_FILES; do
    if echo "$CHANGED_FILES" | grep -q "^${file}$"; then
        echo -e "${YELLOW}Root config ${file} changed - all packages affected${NC}"
        CORE_CHANGED=true
        WEB_COMPONENTS_CHANGED=true
    fi
done

# Output results
echo -e "\n${YELLOW}Package change detection results:${NC}"

CHANGED_PACKAGES=""

if [ "$CORE_CHANGED" = true ]; then
    echo -e "${GREEN}✓ @piloting/core has changes${NC}"
    CHANGED_PACKAGES="core"
else
    echo -e "${RED}✗ @piloting/core has no changes${NC}"
fi

if [ "$WEB_COMPONENTS_CHANGED" = true ]; then
    echo -e "${GREEN}✓ @piloting/web-components has changes${NC}"
    if [ -n "$CHANGED_PACKAGES" ]; then
        CHANGED_PACKAGES="${CHANGED_PACKAGES},web-components"
    else
        CHANGED_PACKAGES="web-components"
    fi
else
    echo -e "${RED}✗ @piloting/web-components has no changes${NC}"
fi

# Output for CI consumption
echo ""
echo "CHANGED_PACKAGES=${CHANGED_PACKAGES}"
echo "CORE_CHANGED=${CORE_CHANGED}"
echo "WEB_COMPONENTS_CHANGED=${WEB_COMPONENTS_CHANGED}"

# Export for shell sourcing
export CHANGED_PACKAGES
export CORE_CHANGED
export WEB_COMPONENTS_CHANGED
