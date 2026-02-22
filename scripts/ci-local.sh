#!/bin/bash
# ci-local.sh
# Run the full CI pipeline locally using Docker
# Usage: ./scripts/ci-local.sh [build|test|lint|all]

set -e

COMMAND="${1:-all}"

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
        run_in_docker bun run build
        ;;
    "test")
        echo "🧪 Running tests..."
        run_in_docker bun run test
        ;;
    "lint")
        echo "🔍 Running linter..."
        run_in_docker bun run lint
        ;;
    "all")
        echo "🔍 Running linter..."
        run_in_docker bun run lint
        
        echo ""
        echo "🧪 Running tests..."
        run_in_docker bun run test
        
        echo ""
        echo "📦 Building packages..."
        run_in_docker bun run build
        ;;
    *)
        echo "Unknown command: $COMMAND"
        echo "Usage: $0 [build|test|lint|all]"
        exit 1
        ;;
esac

echo ""
echo "✅ CI pipeline completed successfully!"
