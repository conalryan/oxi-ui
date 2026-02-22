#!/bin/bash
# Post-create script for devcontainer

set -e

echo "🚀 Setting up Piloting development environment..."

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Build packages
echo "🔨 Building packages..."
bun run build

# Run tests to verify setup
echo "🧪 Running tests..."
bun run test

echo "✅ Development environment ready!"
echo ""
echo "Available commands:"
echo "  bun run build           - Build all packages"
echo "  bun run test            - Run all tests"
echo "  bun run test:coverage   - Run tests with coverage"
echo "  bun run lint            - Lint all packages"
echo "  bun run format          - Format code with Prettier"
echo ""
echo "Build specific packages:"
echo "  bun run build:core           - Build @piloting/core"
echo "  bun run build:web-components - Build @piloting/web-components"
