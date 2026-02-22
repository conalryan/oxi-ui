#!/usr/bin/env groovy

/**
 * OxiUI Monorepo CI/CD Pipeline
 * 
 * Features:
 * - Uses Turborepo for build/test/lint with automatic change detection
 * - Uses Changesets for versioning and publishing
 * - Docker-based builds for consistency
 */

pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            additionalBuildArgs '--target development'
            args '-v $HOME/.bun:/home/bun/.bun:rw'
        }
    }

    environment {
        CI = 'true'
        NPM_TOKEN = credentials('npm-token')
        GIT_AUTHOR_NAME = 'Jenkins CI'
        GIT_AUTHOR_EMAIL = 'ci@oxi-ui.dev'
        GIT_COMMITTER_NAME = 'Jenkins CI'
        GIT_COMMITTER_EMAIL = 'ci@oxi-ui.dev'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Install') {
            steps {
                sh 'bun install --frozen-lockfile'
            }
        }

        stage('Quality') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'bunx turbo run lint --affected'
                    }
                }
                stage('Format') {
                    steps {
                        sh 'bun run format:check'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                sh 'bunx turbo run test:coverage --affected'
            }
            post {
                always {
                    // Publish coverage reports (dynamically finds all coverage dirs)
                    sh '''
                        for dir in packages/*/coverage; do
                            if [ -d "$dir" ]; then
                                pkg=$(basename $(dirname $dir))
                                echo "Found coverage for $pkg"
                            fi
                        done
                    '''
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'packages/core/coverage',
                        reportFiles: 'index.html',
                        reportName: 'Core Coverage'
                    ])
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'packages/web-components/coverage',
                        reportFiles: 'index.html',
                        reportName: 'Web Components Coverage'
                    ])
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'packages/theme/coverage',
                        reportFiles: 'index.html',
                        reportName: 'Theme Coverage'
                    ])
                }
            }
        }

        stage('Build') {
            steps {
                sh 'bunx turbo run build --affected'
            }
        }

        stage('Release') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Configure npm
                    sh 'echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc'
                    
                    sshagent(['github-ssh-key']) {
                        // Changesets handles versioning, changelogs, and publishing
                        sh '''
                            # Version packages (applies changesets, updates package.json, generates changelogs)
                            bunx changeset version
                            
                            # Build all packages before publishing
                            bunx turbo run build
                            
                            # Publish changed packages to npm
                            bunx changeset publish
                            
                            # Push version commits and tags
                            git push --follow-tags
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed. Check logs for details.'
        }
    }
}
