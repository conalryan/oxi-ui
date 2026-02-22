#!/bin/bash
# ci-local.sh
# Run the full CI pipeline locally using Docker
# Usage: ./scripts/ci-local.sh [build|test|lint|all] [--affected]
# Use --affected to only run on changed packages (uses Turborepo)

set -e

COMMAND="${1:-all}"
AFFECTED_FLAG=""

# Check for --affected flag
if [[ "$1" == "--affected" ]] || [[ "$2" == "--affected" ]]; then
    AFFECTED_FLAG="--affected"
    echo "🎯 Running only on affected packages"
    if [[ "$1" == "--affected" ]]; then
        COMMAND="${2:-all}"
    fi
fi

echo "🐳 Running OxiUI CI locally with Docker"
echo "========================================"

# Build the Docker image
docker build --target development -t oxi-ui-ci .

run_in_docker() {
    docker run --rm oxi-ui-ci "$@"
}

case "$COMMAND" in
    "build")
        echo "📦 Building packages..."
        run_in_docker bunx turbo run build $AFFECTED_FLAG
        ;;
    "test")
        echo "🧪 Running tests..."
        run_in_docker bunx turbo run test $AFFECTED_FLAG
        ;;
    "lint")
        echo "🔍 Running linter..."
        run_in_docker bunx turbo run lint $AFFECTED_FLAG
        ;;
    "all")
        echo "🔍 Running linter..."
        run_in_docker bunx turbo run lint $AFFECTED_FLAG
        
        echo ""
        echo "🧪 Running tests..."
        run_in_docker bunx turbo run test $AFFECTED_FLAG
        
        echo ""
        echo "📦 Building packages..."
        run_in_docker bunx turbo run build $AFFECTED_FLAG
        ;;
    *)
        echo "Unknown command: $COMMAND"
        echo "Usage: $0 [build|test|lint|all] [--affected]"
        exit 1
        ;;
esac

echo ""
echo "✅ CI pipeline completed successfully!"
