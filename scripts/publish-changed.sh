#!/bin/bash
# publish-changed.sh
# Publishes only packages that have changes
# Usage: ./scripts/publish-changed.sh [--dry-run]

set -e

DRY_RUN=false
if [ "$1" = "--dry-run" ]; then
    DRY_RUN=true
    echo "Running in dry-run mode"
fi

# Source change detection
source "$(dirname "$0")/detect-changes.sh"

echo ""
echo "==================================="
echo "Publishing changed packages"
echo "==================================="

publish_package() {
    local package_name=$1
    local package_dir=$2
    
    echo ""
    echo "Publishing @piloting/${package_name}..."
    
    cd "$package_dir"
    
    # Ensure built
    bun run build
    
    if [ "$DRY_RUN" = true ]; then
        echo "[DRY-RUN] Would publish @piloting/${package_name}"
        npm publish --dry-run --access public
    else
        npm publish --access public
        echo "Successfully published @piloting/${package_name}"
    fi
    
    cd - > /dev/null
}

# Publish changed packages
if [ "$CORE_CHANGED" = true ]; then
    publish_package "core" "packages/core"
fi

if [ "$WEB_COMPONENTS_CHANGED" = true ]; then
    publish_package "web-components" "packages/web-components"
fi

echo ""
echo "==================================="
echo "Publishing complete"
echo "==================================="
