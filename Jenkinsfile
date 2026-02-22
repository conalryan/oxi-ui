#!/usr/bin/env groovy

/**
 * Piloting Monorepo CI/CD Pipeline
 * 
 * Features:
 * - Builds, tests, lints only changed packages
 * - Independent semver for each package
 * - Docker-based builds for consistency
 * - Parallel execution where possible
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
        GIT_AUTHOR_EMAIL = 'ci@piloting.dev'
        GIT_COMMITTER_NAME = 'Jenkins CI'
        GIT_COMMITTER_EMAIL = 'ci@piloting.dev'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    parameters {
        booleanParam(
            name: 'FORCE_ALL',
            defaultValue: false,
            description: 'Force build/test/publish all packages regardless of changes'
        )
        booleanParam(
            name: 'DRY_RUN',
            defaultValue: false,
            description: 'Run without actually publishing packages'
        )
        choice(
            name: 'VERSION_BUMP',
            choices: ['auto', 'patch', 'minor', 'major', 'none'],
            description: 'Version bump type (auto detects from commit messages)'
        )
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    // Install dependencies
                    sh 'bun install --frozen-lockfile'
                    
                    // Detect changed packages
                    env.CHANGED_PACKAGES = detectChangedPackages()
                    echo "Changed packages: ${env.CHANGED_PACKAGES ?: 'none'}"
                    
                    // Parse into list
                    env.CORE_CHANGED = env.CHANGED_PACKAGES?.contains('core') ?: params.FORCE_ALL
                    env.WEB_COMPONENTS_CHANGED = env.CHANGED_PACKAGES?.contains('web-components') ?: params.FORCE_ALL
                    
                    echo "Core changed: ${env.CORE_CHANGED}"
                    echo "Web Components changed: ${env.WEB_COMPONENTS_CHANGED}"
                }
            }
        }

        stage('Quality Gates') {
            parallel {
                stage('Lint: Core') {
                    when {
                        expression { return env.CORE_CHANGED == 'true' }
                    }
                    steps {
                        sh 'bun run --filter @piloting/core lint || oxlint packages/core'
                    }
                }
                
                stage('Lint: Web Components') {
                    when {
                        expression { return env.WEB_COMPONENTS_CHANGED == 'true' }
                    }
                    steps {
                        sh 'bun run --filter @piloting/web-components lint || oxlint packages/web-components'
                    }
                }
                
                stage('Format Check') {
                    steps {
                        sh 'bun run format:check'
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Test: Core') {
                    when {
                        expression { return env.CORE_CHANGED == 'true' }
                    }
                    steps {
                        sh 'bun run --filter @piloting/core test:coverage'
                    }
                    post {
                        always {
                            publishHTML(target: [
                                allowMissing: true,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'packages/core/coverage',
                                reportFiles: 'index.html',
                                reportName: 'Core Coverage Report'
                            ])
                        }
                    }
                }
                
                stage('Test: Web Components') {
                    when {
                        expression { return env.WEB_COMPONENTS_CHANGED == 'true' }
                    }
                    steps {
                        sh 'bun run --filter @piloting/web-components test:coverage'
                    }
                    post {
                        always {
                            publishHTML(target: [
                                allowMissing: true,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'packages/web-components/coverage',
                                reportFiles: 'index.html',
                                reportName: 'Web Components Coverage Report'
                            ])
                        }
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build: Core') {
                    when {
                        expression { return env.CORE_CHANGED == 'true' }
                    }
                    steps {
                        sh 'bun run --filter @piloting/core build'
                    }
                }
                
                stage('Build: Web Components') {
                    when {
                        expression { return env.WEB_COMPONENTS_CHANGED == 'true' }
                    }
                    steps {
                        sh 'bun run --filter @piloting/web-components build'
                    }
                }
            }
        }

        stage('Version & Publish') {
            when {
                allOf {
                    branch 'main'
                    expression { return env.CORE_CHANGED == 'true' || env.WEB_COMPONENTS_CHANGED == 'true' }
                }
            }
            stages {
                stage('Version: Core') {
                    when {
                        expression { return env.CORE_CHANGED == 'true' }
                    }
                    steps {
                        script {
                            def versionType = determineVersionBump('packages/core')
                            if (versionType != 'none') {
                                dir('packages/core') {
                                    def newVersion = bumpVersion(versionType)
                                    env.CORE_VERSION = newVersion
                                    echo "Core bumped to version: ${newVersion}"
                                }
                            }
                        }
                    }
                }
                
                stage('Version: Web Components') {
                    when {
                        expression { return env.WEB_COMPONENTS_CHANGED == 'true' }
                    }
                    steps {
                        script {
                            def versionType = determineVersionBump('packages/web-components')
                            if (versionType != 'none') {
                                dir('packages/web-components') {
                                    def newVersion = bumpVersion(versionType)
                                    env.WEB_COMPONENTS_VERSION = newVersion
                                    echo "Web Components bumped to version: ${newVersion}"
                                }
                            }
                        }
                    }
                }
                
                stage('Publish Packages') {
                    when {
                        expression { return !params.DRY_RUN }
                    }
                    steps {
                        script {
                            // Configure npm for publishing
                            sh 'echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc'
                            
                            if (env.CORE_CHANGED == 'true' && env.CORE_VERSION) {
                                dir('packages/core') {
                                    sh 'npm publish --access public'
                                    echo "Published @piloting/core@${env.CORE_VERSION}"
                                }
                            }
                            
                            if (env.WEB_COMPONENTS_CHANGED == 'true' && env.WEB_COMPONENTS_VERSION) {
                                dir('packages/web-components') {
                                    sh 'npm publish --access public'
                                    echo "Published @piloting/web-components@${env.WEB_COMPONENTS_VERSION}"
                                }
                            }
                        }
                    }
                }
                
                stage('Git Tag & Push') {
                    when {
                        expression { return !params.DRY_RUN }
                    }
                    steps {
                        script {
                            sshagent(['github-ssh-key']) {
                                if (env.CORE_VERSION) {
                                    sh "git tag -a core-v${env.CORE_VERSION} -m 'Release @piloting/core@${env.CORE_VERSION}'"
                                }
                                if (env.WEB_COMPONENTS_VERSION) {
                                    sh "git tag -a web-components-v${env.WEB_COMPONENTS_VERSION} -m 'Release @piloting/web-components@${env.WEB_COMPONENTS_VERSION}'"
                                }
                                
                                // Commit version changes and push
                                sh '''
                                    git add packages/*/package.json
                                    git commit -m "chore: release packages [skip ci]" || true
                                    git push origin HEAD:main --tags
                                '''
                            }
                        }
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
            script {
                if (env.CORE_VERSION || env.WEB_COMPONENTS_VERSION) {
                    def message = "✅ Piloting Release Successful\n"
                    if (env.CORE_VERSION) {
                        message += "- @piloting/core@${env.CORE_VERSION}\n"
                    }
                    if (env.WEB_COMPONENTS_VERSION) {
                        message += "- @piloting/web-components@${env.WEB_COMPONENTS_VERSION}\n"
                    }
                    echo message
                }
            }
        }
        failure {
            echo "❌ Pipeline failed. Check logs for details."
        }
    }
}

/**
 * Detect which packages have changed since the last successful build
 */
def detectChangedPackages() {
    def changedPackages = []
    
    // Get the commit range
    def baseCommit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: 'HEAD~1'
    def headCommit = env.GIT_COMMIT ?: 'HEAD'
    
    // Get changed files
    def changedFiles = sh(
        script: "git diff --name-only ${baseCommit}..${headCommit} 2>/dev/null || git diff --name-only HEAD~1",
        returnStdout: true
    ).trim()
    
    echo "Changed files:\n${changedFiles}"
    
    if (changedFiles.contains('packages/core/')) {
        changedPackages.add('core')
    }
    
    if (changedFiles.contains('packages/web-components/')) {
        changedPackages.add('web-components')
    }
    
    // Root changes affect all packages
    def rootFiles = ['package.json', 'bunfig.toml', 'tsconfig.json']
    rootFiles.each { file ->
        if (changedFiles.contains(file) && !changedFiles.contains('packages/')) {
            changedPackages.add('core')
            changedPackages.add('web-components')
        }
    }
    
    return changedPackages.unique().join(',')
}

/**
 * Determine version bump type from commit messages
 */
def determineVersionBump(String packagePath) {
    if (params.VERSION_BUMP != 'auto') {
        return params.VERSION_BUMP
    }
    
    def baseCommit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: 'HEAD~1'
    def commitMessages = sh(
        script: "git log --oneline ${baseCommit}..HEAD -- ${packagePath} 2>/dev/null || echo ''",
        returnStdout: true
    ).trim()
    
    // Conventional commits parsing
    if (commitMessages.contains('BREAKING CHANGE') || commitMessages.contains('!:')) {
        return 'major'
    } else if (commitMessages.contains('feat:') || commitMessages.contains('feat(')) {
        return 'minor'
    } else if (commitMessages.contains('fix:') || commitMessages.contains('fix(')) {
        return 'patch'
    }
    
    // Default to patch for any other changes
    return 'patch'
}

/**
 * Bump package version and return new version
 */
def bumpVersion(String versionType) {
    // Read current version
    def packageJson = readJSON file: 'package.json'
    def currentVersion = packageJson.version
    
    def (major, minor, patch) = currentVersion.tokenize('.').collect { it.toInteger() }
    
    switch (versionType) {
        case 'major':
            major++
            minor = 0
            patch = 0
            break
        case 'minor':
            minor++
            patch = 0
            break
        case 'patch':
            patch++
            break
    }
    
    def newVersion = "${major}.${minor}.${patch}"
    
    // Update package.json
    packageJson.version = newVersion
    writeJSON file: 'package.json', json: packageJson, pretty: 2
    
    return newVersion
}
