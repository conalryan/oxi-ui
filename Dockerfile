# Piloting Monorepo Development Container
# Multi-stage build for development and CI/CD

# =============================================================================
# Base stage - Common Bun runtime
# =============================================================================
FROM oven/bun:1.1-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    jq \
    bash \
    openssh-client \
    ca-certificates

# Set working directory
WORKDIR /app

# =============================================================================
# Dependencies stage - Install all dependencies
# =============================================================================
FROM base AS dependencies

# Copy package files for dependency installation
COPY package.json bun.lock* bunfig.toml ./
COPY packages/core/package.json ./packages/core/
COPY packages/web-components/package.json ./packages/web-components/

# Install dependencies
RUN bun install --frozen-lockfile

# =============================================================================
# Development stage - Full development environment
# =============================================================================
FROM dependencies AS development

# Copy all source files
COPY . .

# Expose common development ports
EXPOSE 3000 5173 8080

# Default command for development
CMD ["bun", "run", "test"]

# =============================================================================
# Builder stage - Build packages
# =============================================================================
FROM dependencies AS builder

# Copy source files
COPY . .

# Build all packages
RUN bun run build

# =============================================================================
# Test stage - Run tests with coverage
# =============================================================================
FROM dependencies AS test

# Copy source files
COPY . .

# Run tests with coverage
RUN bun run test:coverage

# =============================================================================
# Lint stage - Run linting
# =============================================================================
FROM dependencies AS lint

# Copy source files
COPY . .

# Run linting
RUN bun run lint

# =============================================================================
# CI stage - Full CI pipeline (build, test, lint)
# =============================================================================
FROM dependencies AS ci

# Copy source files
COPY . .

# Run lint, test, and build
RUN bun run lint && \
    bun run test:coverage && \
    bun run build

# =============================================================================
# Production stage - Minimal image with built packages
# =============================================================================
FROM base AS production

# Copy built packages only
COPY --from=builder /app/packages/core/dist ./packages/core/dist
COPY --from=builder /app/packages/core/package.json ./packages/core/
COPY --from=builder /app/packages/web-components/dist ./packages/web-components/dist
COPY --from=builder /app/packages/web-components/package.json ./packages/web-components/

# Copy root package files
COPY package.json ./

# Labels for container metadata
LABEL org.opencontainers.image.title="Piloting Monorepo"
LABEL org.opencontainers.image.description="Piloting frontend library packages"
LABEL org.opencontainers.image.source="https://github.com/your-org/piloting"

CMD ["echo", "Piloting packages ready for publishing"]
