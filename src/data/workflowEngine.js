import { LLM_PRICING, FRAMEWORKS } from './frameworks'

// ═══════════════════════════════════════════════════════════
// USE-CASE TEMPLATES — Rich domain-specific workflow blueprints
// Each template has: multi-word triggers, detailed nodes with
// real tools/libraries, development steps, and cost profiles
// ═══════════════════════════════════════════════════════════

const USE_CASE_TEMPLATES = [
  {
    id: 'testing_framework',
    triggers: ['test', 'testing', 'qa', 'quality assurance', 'test automation', 'testing framework', 'test agent', 'testing agent', 'e2e test', 'unit test', 'integration test', 'regression', 'bug', 'defect'],
    title: 'AI-Powered Testing Framework',
    complexity: 'complex',
    nodes: [
      { id: 'trigger', icon: '🚀', label: 'CI/CD Trigger', x: 50, y: 30, info: 'Triggered by git push, PR, or scheduled pipeline (GitHub Actions / GitLab CI / Jenkins). Receives codebase diff, branch info, and test configuration. Tools: GitHub Actions, GitLab CI, CircleCI.', tools: ['GitHub Actions', 'GitLab CI'] },
      { id: 'code-analyzer', icon: '🔍', label: 'Code Analyzer Agent', x: 25, y: 120, info: 'Parses the codebase using AST (Abstract Syntax Tree) analysis. Identifies changed files, impacted modules, function signatures, and dependency graph. Uses tree-sitter or Babel parser. Generates a test impact map. Tools: tree-sitter, @babel/parser, madge (dependency graph).', tools: ['tree-sitter', 'Babel', 'madge'] },
      { id: 'test-planner', icon: '📋', label: 'Test Planner Agent', x: 75, y: 120, info: 'LLM-powered agent that reads the code diff and generates a comprehensive test plan. Determines: which test types are needed (unit/integration/e2e), priority order, edge cases to cover, and mutation testing targets. Uses chain-of-thought reasoning. Cost: ~2,000 tokens per plan.', tools: ['GPT-4o', 'Claude 3.5'] },
      { id: 'unit-gen', icon: '🧪', label: 'Unit Test Generator', x: 15, y: 220, info: 'Generates unit tests using framework conventions (Jest, Pytest, JUnit). Analyzes function signatures, return types, and edge cases. Produces test files with proper mocking (jest.mock, unittest.mock). Real output: 50-200 lines of test code per function. Tools: Jest, Pytest, Vitest, Mocha.', tools: ['Jest', 'Pytest', 'Vitest'] },
      { id: 'integration-gen', icon: '🔗', label: 'Integration Test Gen', x: 50, y: 220, info: 'Creates integration tests that verify module interactions, API contracts, and database queries. Handles test fixtures, setup/teardown, and test database seeding. Uses Testcontainers for isolated environments. Tools: Testcontainers, Supertest, Playwright.', tools: ['Testcontainers', 'Supertest'] },
      { id: 'e2e-gen', icon: '🖥️', label: 'E2E Test Generator', x: 85, y: 220, info: 'Generates end-to-end browser tests using Playwright or Cypress. Understands page objects, user flows, and accessibility checks. Produces `.spec.ts` files with proper selectors and assertions. Tools: Playwright, Cypress, Selenium.', tools: ['Playwright', 'Cypress'] },
      { id: 'executor', icon: '⚡', label: 'Parallel Test Executor', x: 50, y: 320, info: 'Runs all generated tests in parallel isolated containers. Collects pass/fail results, coverage reports (Istanbul/c8), and performance metrics. Handles flaky test detection and auto-retry (max 3 attempts). Tools: Docker, Kubernetes Jobs, Jest --workers.', tools: ['Docker', 'c8 coverage'] },
      { id: 'reviewer', icon: '✅', label: 'Results Reviewer Agent', x: 25, y: 410, info: 'LLM analyzes test results: identifies root causes of failures, suggests code fixes, detects false positives, and generates a human-readable test report. Can auto-fix simple issues and re-run. Cost: ~1,500 tokens per review cycle.', tools: ['LLM Analysis', 'Allure Reports'] },
      { id: 'coverage', icon: '📊', label: 'Coverage & Report', x: 75, y: 410, info: 'Generates detailed coverage report (line, branch, function). Compares against thresholds (e.g., 80% minimum). Produces HTML report, posts PR comments with coverage diff, and updates badges. Tools: Istanbul/c8, Codecov, Coveralls.', tools: ['Istanbul', 'Codecov'] },
      { id: 'output', icon: '📤', label: 'PR Comment / Deploy Gate', x: 50, y: 500, info: 'Posts structured test results as PR comment. Acts as deployment gate: blocks merge if tests fail or coverage drops. Sends Slack/Teams notifications for failures. Integrates with GitHub Checks API.', tools: ['GitHub API', 'Slack Webhook'] },
    ],
    edges: [[0,1],[0,2],[1,3],[1,4],[2,3],[2,4],[2,5],[3,6],[4,6],[5,6],[6,7],[6,8],[7,9],[8,9]],
    loopNote: 'Iterative: Reviewer Agent can trigger re-generation if tests fail or coverage is below threshold',
    devSteps: [
      { phase: 'Setup', duration: '3-5 days', tasks: ['Set up CI/CD pipeline (GitHub Actions / GitLab CI)', 'Configure test runners (Jest/Pytest) with coverage', 'Set up Docker for isolated test environments', 'Install tree-sitter for AST parsing'] },
      { phase: 'Code Analyzer', duration: '1 week', tasks: ['Build AST parser for target language(s)', 'Implement dependency graph analysis with madge', 'Create test impact mapping from git diff', 'Handle monorepo support if needed'] },
      { phase: 'Test Generation', duration: '2-3 weeks', tasks: ['Prompt engineering for unit test generation', 'Template system for different test frameworks', 'Integration test scaffolding with Testcontainers', 'E2E test generation with Playwright page objects', 'Mutation testing integration (Stryker)'] },
      { phase: 'Execution & Review', duration: '1-2 weeks', tasks: ['Parallel test runner with result aggregation', 'Flaky test detection and retry logic', 'LLM-based failure analysis and auto-fix', 'Coverage report generation and threshold checking'] },
      { phase: 'Integration', duration: '3-5 days', tasks: ['GitHub Checks API integration', 'PR comment formatting with test summaries', 'Slack/Teams notification webhooks', 'Deployment gate configuration'] },
    ],
    avgTokensPerRun: 8500,
    avgLLMCalls: 12,
  },
  {
    id: 'research_analysis',
    triggers: ['research', 'competitor', 'market', 'analyze competitor', 'market research', 'competitive analysis', 'intelligence', 'monitor competitor', 'pricing analysis', 'trend', 'survey'],
    title: 'AI Research & Competitive Intelligence',
    complexity: 'advanced',
    nodes: [
      { id: 'input', icon: '📥', label: 'Research Query', x: 50, y: 30, info: 'Accepts research topics, competitor URLs, product names, or industry keywords. Can be triggered on-demand or scheduled (weekly/daily). Validates query and deduplicates against previous research.', tools: ['REST API', 'Cron scheduler'] },
      { id: 'planner', icon: '🗺️', label: 'Research Planner', x: 50, y: 110, info: 'LLM decomposes the research query into specific sub-tasks: which competitors to track, what data points to collect, which sources to crawl. Creates a research execution plan with prioritized tasks. Cost: ~1,000 tokens.', tools: ['GPT-4o', 'Claude 3.5'] },
      { id: 'web-scraper', icon: '🕷️', label: 'Web Scraper Agent', x: 20, y: 200, info: 'Crawls competitor websites, product pages, pricing pages, and blog posts. Uses headless browsers for JS-rendered content. Handles pagination, rate limiting, and anti-bot measures. Tools: Puppeteer, Playwright, Crawlee, ScrapingBee.', tools: ['Crawlee', 'Playwright', 'Puppeteer'] },
      { id: 'api-collector', icon: '🔌', label: 'API Data Collector', x: 50, y: 200, info: 'Pulls structured data from APIs: Crunchbase (funding), G2/Capterra (reviews), LinkedIn (headcount), GitHub (repo stats), ProductHunt (launches). Handles auth, pagination, and rate limits.', tools: ['Crunchbase API', 'G2 API', 'GitHub API'] },
      { id: 'social-monitor', icon: '📱', label: 'Social Media Monitor', x: 80, y: 200, info: 'Tracks competitor mentions across Twitter/X, Reddit, HackerNews, LinkedIn. Monitors sentiment trends, product announcements, and community feedback. Tools: Twitter API v2, Reddit API, PRAW.', tools: ['Twitter API', 'Reddit API'] },
      { id: 'analyzer', icon: '🧠', label: 'Analysis Agent', x: 35, y: 300, info: 'LLM performs deep analysis: SWOT analysis, pricing comparison, feature gap analysis, market positioning. Uses structured output (JSON) for consistent data. Chains multiple LLM calls for comprehensive analysis. Cost: ~4,000 tokens.', tools: ['GPT-4o structured output'] },
      { id: 'data-store', icon: '💾', label: 'Vector DB + SQL Store', x: 65, y: 300, info: 'Stores raw data in PostgreSQL (structured) and Pinecone/Weaviate (embeddings for semantic search). Enables historical trend analysis and cross-competitor comparisons. Tools: PostgreSQL, Pinecone, Weaviate.', tools: ['PostgreSQL', 'Pinecone'] },
      { id: 'report-gen', icon: '📊', label: 'Report Generator', x: 50, y: 390, info: 'Generates executive-ready reports with charts (Chart.js), tables, and actionable insights. Exports to PDF (Puppeteer), Notion, Google Slides, or email. Includes trend visualizations and recommendation matrices.', tools: ['Chart.js', 'Puppeteer PDF', 'Notion API'] },
      { id: 'alert', icon: '🔔', label: 'Alert & Notification', x: 50, y: 470, info: 'Sends real-time alerts when: competitor launches new feature, pricing changes detected, significant social media mentions, or funding announcements. Channels: Slack, email, SMS (Twilio).', tools: ['Slack API', 'SendGrid', 'Twilio'] },
    ],
    edges: [[0,1],[1,2],[1,3],[1,4],[2,5],[3,5],[4,5],[2,6],[3,6],[5,7],[6,7],[7,8]],
    loopNote: 'Continuous: Scheduled to run weekly with real-time alerts for critical changes',
    devSteps: [
      { phase: 'Data Collection Setup', duration: '1-2 weeks', tasks: ['Configure web scraping infrastructure (Crawlee + proxies)', 'Set up API integrations (Crunchbase, G2, GitHub)', 'Build social media monitoring pipeline', 'Implement rate limiting and retry logic'] },
      { phase: 'Analysis Engine', duration: '2-3 weeks', tasks: ['Design LLM prompts for SWOT and competitive analysis', 'Build structured output schemas for consistent data', 'Implement multi-step analysis chains', 'Create historical trend comparison logic'] },
      { phase: 'Storage & Retrieval', duration: '1 week', tasks: ['Set up PostgreSQL schema for structured data', 'Configure vector DB for semantic search', 'Build data deduplication and versioning', 'Create comparison query engine'] },
      { phase: 'Reporting & Alerts', duration: '1-2 weeks', tasks: ['Build PDF report generator with charts', 'Set up Slack/email notification system', 'Create alert threshold configuration', 'Design executive dashboard (optional)'] },
    ],
    avgTokensPerRun: 12000,
    avgLLMCalls: 15,
  },
  {
    id: 'customer_support',
    triggers: ['customer', 'support', 'helpdesk', 'ticket', 'chatbot', 'customer service', 'help desk', 'live chat', 'support agent', 'FAQ', 'knowledge base', 'customer agent'],
    title: 'AI Customer Support System',
    complexity: 'complex',
    nodes: [
      { id: 'input', icon: '💬', label: 'Customer Message', x: 50, y: 30, info: 'Multi-channel input: live chat widget, email, Slack, Discord, WhatsApp. Message is normalized and enriched with customer context (account info, previous tickets, sentiment). Tools: Intercom SDK, Zendesk API, Twilio.', tools: ['Intercom', 'Zendesk API'] },
      { id: 'classifier', icon: '🏷️', label: 'Intent Classifier', x: 50, y: 110, info: 'Classifies customer intent into categories: billing, technical, feature request, bug report, general inquiry. Uses fine-tuned classifier or few-shot LLM prompting. Determines urgency level (P0-P3). Accuracy target: 95%+. Cost: ~300 tokens.', tools: ['OpenAI fine-tuning', 'Cohere Classify'] },
      { id: 'rag', icon: '📚', label: 'Knowledge Base RAG', x: 25, y: 200, info: 'Retrieves relevant docs from company knowledge base using vector similarity search. Sources: help articles, API docs, product guides, past resolved tickets. Uses hybrid search (BM25 + vector). Tools: Pinecone, LangChain RAG, LlamaIndex.', tools: ['Pinecone', 'LangChain', 'LlamaIndex'] },
      { id: 'resolver', icon: '🤖', label: 'Auto-Resolver Agent', x: 75, y: 200, info: 'Attempts to resolve common issues automatically: password resets, billing inquiries, status checks, how-to questions. Has access to admin APIs for account actions. Resolution rate target: 40-60%. Cost: ~1,200 tokens per resolution.', tools: ['Admin API', 'Stripe API'] },
      { id: 'escalation', icon: '👤', label: 'Human Escalation', x: 25, y: 300, info: 'Routes complex/sensitive issues to human agents with full context: conversation history, customer sentiment, relevant KB articles, and suggested responses. Integrates with ticketing systems. Tools: Zendesk, Freshdesk, Linear.', tools: ['Zendesk', 'Linear'] },
      { id: 'response-gen', icon: '✍️', label: 'Response Generator', x: 75, y: 300, info: 'Generates empathetic, brand-consistent responses using company tone guidelines. Includes relevant KB links, step-by-step instructions, and follow-up actions. Supports multilingual responses. Cost: ~800 tokens per response.', tools: ['GPT-4o', 'Brand style guide'] },
      { id: 'feedback', icon: '⭐', label: 'CSAT Collection', x: 50, y: 380, info: 'Collects customer satisfaction scores (1-5) after resolution. Tracks NPS, resolution time, and first-contact resolution rate. Feeds data back to improve classifier and response quality.', tools: ['Survey API', 'Analytics DB'] },
      { id: 'analytics', icon: '📊', label: 'Support Analytics', x: 50, y: 460, info: 'Dashboard showing: ticket volume trends, avg resolution time, CSAT scores, top issues, agent performance. Identifies patterns for proactive support. Tools: Metabase, Grafana, custom dashboard.', tools: ['Metabase', 'Grafana'] },
    ],
    edges: [[0,1],[1,2],[1,3],[2,5],[3,4],[3,5],[4,5],[5,6],[6,7]],
    loopNote: 'Real-time: Continuous processing with auto-resolution and human fallback',
    devSteps: [
      { phase: 'Knowledge Base', duration: '1 week', tasks: ['Index help articles into vector DB', 'Build RAG pipeline with LangChain/LlamaIndex', 'Implement hybrid search (keyword + semantic)', 'Create document update pipeline'] },
      { phase: 'Classification & Routing', duration: '1 week', tasks: ['Train intent classifier on historical tickets', 'Build urgency detection system', 'Configure routing rules by category', 'Set up escalation thresholds'] },
      { phase: 'Auto-Resolution', duration: '2 weeks', tasks: ['Build action toolkit (password reset, billing lookup)', 'Design resolution prompts with guardrails', 'Implement conversation memory and context', 'Add multilingual support'] },
      { phase: 'Integration & Analytics', duration: '1-2 weeks', tasks: ['Integrate with ticketing system (Zendesk/Freshdesk)', 'Set up CSAT survey flow', 'Build analytics dashboard', 'Configure SLA monitoring alerts'] },
    ],
    avgTokensPerRun: 5000,
    avgLLMCalls: 6,
  },
  {
    id: 'content_pipeline',
    triggers: ['content', 'blog', 'article', 'write', 'copywriting', 'social media post', 'marketing', 'seo', 'content creation', 'newsletter', 'email campaign', 'content pipeline', 'generate content'],
    title: 'AI Content Generation Pipeline',
    complexity: 'medium',
    nodes: [
      { id: 'brief', icon: '📝', label: 'Content Brief', x: 50, y: 30, info: 'Accepts content brief: topic, target audience, tone, keywords, word count, content type (blog/social/email). Can pull from editorial calendar (Notion/Airtable). Tools: Notion API, Airtable.', tools: ['Notion API', 'Airtable'] },
      { id: 'researcher', icon: '🔍', label: 'Research Agent', x: 30, y: 120, info: 'Researches the topic: pulls top-ranking articles (SERP analysis), competitor content, statistics, and expert quotes. Uses Tavily or Perplexity for web research. Compiles research brief with sources. Cost: ~2,000 tokens.', tools: ['Tavily API', 'Perplexity API', 'SerpAPI'] },
      { id: 'seo', icon: '📈', label: 'SEO Optimizer', x: 70, y: 120, info: 'Performs keyword research, analyzes search intent, generates meta descriptions, and optimizes heading structure. Uses Ahrefs/SEMrush APIs for keyword difficulty and volume data. Tools: Ahrefs API, SEMrush, Clearscope.', tools: ['Ahrefs API', 'SEMrush'] },
      { id: 'writer', icon: '✍️', label: 'Writer Agent', x: 50, y: 220, info: 'Generates the content using brand voice guidelines. Produces structured output with headings, paragraphs, CTAs, and internal links. Supports multiple formats: blog, LinkedIn, Twitter thread, email. Cost: ~3,000-5,000 tokens.', tools: ['GPT-4o', 'Claude 3.5 Sonnet'] },
      { id: 'editor', icon: '📖', label: 'Editor Agent', x: 30, y: 310, info: 'Reviews content for: grammar, readability (Flesch score), fact accuracy, brand consistency, and plagiarism. Suggests improvements and rewrites weak sections. Tools: Grammarly API, Originality.ai.', tools: ['Grammarly API', 'Hemingway'] },
      { id: 'image-gen', icon: '🖼️', label: 'Image Generator', x: 70, y: 310, info: 'Creates featured images, social media graphics, and infographics using DALL-E 3 or Midjourney. Generates alt text for accessibility. Cost: $0.04-0.12 per image. Tools: DALL-E 3 API, Midjourney, Canva API.', tools: ['DALL-E 3', 'Canva API'] },
      { id: 'publish', icon: '🚀', label: 'Auto-Publisher', x: 50, y: 400, info: 'Publishes to configured channels: WordPress (REST API), Ghost, Medium, LinkedIn, Twitter/X. Schedules posts for optimal engagement times. Handles formatting per platform.', tools: ['WordPress API', 'LinkedIn API', 'Buffer'] },
    ],
    edges: [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]],
    loopNote: 'Pipeline: Editor can loop back to Writer for revisions (max 3 iterations)',
    devSteps: [
      { phase: 'Research & SEO', duration: '1 week', tasks: ['Set up web research with Tavily/Perplexity', 'Integrate SEO keyword APIs', 'Build research compilation pipeline'] },
      { phase: 'Content Generation', duration: '1-2 weeks', tasks: ['Design brand voice prompt templates', 'Build multi-format content generation', 'Implement editing and revision loop', 'Add plagiarism checking'] },
      { phase: 'Publishing', duration: '3-5 days', tasks: ['Integrate CMS APIs (WordPress/Ghost)', 'Set up social media auto-posting', 'Configure scheduling and analytics tracking'] },
    ],
    avgTokensPerRun: 10000,
    avgLLMCalls: 8,
  },
  {
    id: 'data_pipeline',
    triggers: ['data pipeline', 'etl', 'data processing', 'data extraction', 'data transform', 'data analysis', 'data agent', 'csv', 'spreadsheet', 'excel', 'data migration', 'data clean'],
    title: 'AI Data Processing Pipeline',
    complexity: 'complex',
    nodes: [
      { id: 'ingest', icon: '📥', label: 'Data Ingestion', x: 50, y: 30, info: 'Ingests data from multiple sources: CSV/Excel uploads, REST APIs, databases, S3 buckets, Google Sheets. Handles schema detection, encoding issues, and large file streaming. Tools: Pandas, Apache Arrow, AWS S3 SDK.', tools: ['Pandas', 'Apache Arrow'] },
      { id: 'profiler', icon: '🔢', label: 'Data Profiler Agent', x: 30, y: 120, info: 'LLM analyzes data profile: column types, distributions, missing values, outliers, and correlations. Generates a data quality report with recommendations. Uses ydata-profiling or Great Expectations. Cost: ~1,500 tokens.', tools: ['ydata-profiling', 'Great Expectations'] },
      { id: 'cleaner', icon: '🧹', label: 'Data Cleaner Agent', x: 70, y: 120, info: 'AI-powered data cleaning: handles missing values (imputation), deduplication, standardization, and format normalization. Generates cleaning scripts that are auditable and reproducible. Tools: Pandas, DuckDB.', tools: ['Pandas', 'DuckDB'] },
      { id: 'transformer', icon: '🔄', label: 'Transform Agent', x: 50, y: 220, info: 'Applies business logic transformations: joins, aggregations, pivots, calculated fields, and feature engineering. LLM generates SQL/Python code from natural language descriptions. Tools: DuckDB, SQLAlchemy, dbt.', tools: ['DuckDB', 'dbt', 'SQLAlchemy'] },
      { id: 'validator', icon: '✅', label: 'Validation Agent', x: 30, y: 310, info: 'Validates transformed data against business rules: referential integrity, range checks, consistency rules, and historical comparisons. Uses Great Expectations for automated validation suites.', tools: ['Great Expectations', 'Pandera'] },
      { id: 'loader', icon: '📤', label: 'Data Loader', x: 70, y: 310, info: 'Loads validated data into destination: data warehouse (BigQuery, Snowflake, Redshift), dashboards, or downstream APIs. Handles incremental loading and schema evolution. Tools: BigQuery API, Snowflake connector.', tools: ['BigQuery', 'Snowflake'] },
      { id: 'monitor', icon: '📊', label: 'Pipeline Monitor', x: 50, y: 400, info: 'Monitors pipeline health: data freshness, volume anomalies, schema drift, and processing latency. Sends alerts on failures. Maintains data lineage. Tools: Monte Carlo, Elementary, custom alerts.', tools: ['Monte Carlo', 'Grafana'] },
    ],
    edges: [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,5],[5,6],[4,6]],
    loopNote: 'Scheduled: Runs on configurable schedule with incremental processing support',
    devSteps: [
      { phase: 'Ingestion Layer', duration: '1 week', tasks: ['Build multi-source data connectors', 'Implement schema auto-detection', 'Add large file streaming support'] },
      { phase: 'Processing Engine', duration: '2-3 weeks', tasks: ['LLM-powered data profiling', 'Automated cleaning pipelines', 'Natural language to SQL/Python transforms', 'Validation suite setup'] },
      { phase: 'Loading & Monitoring', duration: '1 week', tasks: ['Configure warehouse connectors', 'Set up pipeline monitoring and alerting', 'Build data lineage tracking'] },
    ],
    avgTokensPerRun: 6000,
    avgLLMCalls: 8,
  },
  {
    id: 'code_review',
    triggers: ['code review', 'pull request', 'pr review', 'code quality', 'code agent', 'refactor', 'code analysis', 'static analysis', 'linter', 'code assistant', 'developer agent', 'coding agent'],
    title: 'AI Code Review & Development Agent',
    complexity: 'complex',
    nodes: [
      { id: 'pr-hook', icon: '🔗', label: 'PR Webhook', x: 50, y: 30, info: 'GitHub/GitLab webhook triggers on PR creation or update. Fetches full diff, file changes, PR description, and linked issues. Tools: GitHub Webhooks, GitLab Webhooks, Bitbucket Pipelines.', tools: ['GitHub Webhooks'] },
      { id: 'diff-parser', icon: '📄', label: 'Diff Parser', x: 30, y: 120, info: 'Parses git diff into structured change sets. Identifies: added/modified/deleted files, function changes, import changes. Filters out auto-generated files and lockfiles. Tools: parse-diff, gitdiff-parser.', tools: ['parse-diff', 'git API'] },
      { id: 'context-builder', icon: '🧩', label: 'Context Builder', x: 70, y: 120, info: 'Builds full context for each changed file: related files, type definitions, test files, documentation. Uses embedding search to find semantically related code. Ensures LLM has complete understanding of changes.', tools: ['Embedding search', 'AST parser'] },
      { id: 'security-scan', icon: '🔒', label: 'Security Scanner', x: 15, y: 220, info: 'Checks for: SQL injection, XSS, hardcoded secrets, insecure dependencies, and OWASP Top 10 vulnerabilities. Uses Semgrep rules + LLM analysis for zero-day pattern detection. Tools: Semgrep, Snyk, GitGuardian.', tools: ['Semgrep', 'Snyk'] },
      { id: 'quality-check', icon: '📏', label: 'Quality Analyzer', x: 50, y: 220, info: 'Analyzes: code complexity (cyclomatic), naming conventions, SOLID principles, DRY violations, and performance anti-patterns. Suggests refactoring opportunities with concrete code examples. Cost: ~2,500 tokens per file.', tools: ['ESLint', 'SonarQube'] },
      { id: 'logic-review', icon: '🧠', label: 'Logic Reviewer', x: 85, y: 220, info: 'LLM performs deep logic review: checks algorithm correctness, edge case handling, error handling completeness, and race conditions in async code. The most token-intensive step. Cost: ~3,000 tokens per file.', tools: ['GPT-4o', 'Claude 3.5'] },
      { id: 'reviewer', icon: '✍️', label: 'Review Synthesizer', x: 50, y: 320, info: 'Aggregates all findings into a structured review. Prioritizes issues by severity (critical/warning/suggestion). Generates inline GitHub comments with code suggestions. Avoids nitpicking — focuses on real issues.', tools: ['GitHub Checks API'] },
      { id: 'comment', icon: '💬', label: 'PR Comment & Approve', x: 50, y: 410, info: 'Posts review as GitHub PR review with inline annotations. Can auto-approve if no critical issues found. Tracks review metrics: issues found, false positive rate, developer satisfaction. Tools: GitHub REST API, Octokit.', tools: ['Octokit', 'GitHub API'] },
    ],
    edges: [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[5,6],[6,7]],
    loopNote: 'Per-PR: Triggered on PR create/update, re-runs on new commits',
    devSteps: [
      { phase: 'Setup', duration: '3-5 days', tasks: ['GitHub App registration and webhook setup', 'Diff parser and context builder', 'File filtering rules (ignore lockfiles, generated code)'] },
      { phase: 'Analysis Agents', duration: '2-3 weeks', tasks: ['Security scanning with Semgrep + LLM', 'Code quality analysis prompts', 'Logic review with full context injection', 'Performance anti-pattern detection'] },
      { phase: 'Review Output', duration: '1 week', tasks: ['Review aggregation and deduplication', 'GitHub inline comment formatting', 'Auto-approve logic and thresholds', 'Metrics tracking dashboard'] },
    ],
    avgTokensPerRun: 15000,
    avgLLMCalls: 10,
  },
  {
    id: 'devops_automation',
    triggers: ['devops', 'deploy', 'infrastructure', 'ci/cd', 'cloud', 'kubernetes', 'docker', 'terraform', 'monitoring', 'incident', 'sre', 'platform'],
    title: 'AI DevOps & Infrastructure Agent',
    complexity: 'advanced',
    nodes: [
      { id: 'trigger', icon: '🔔', label: 'Event Trigger', x: 50, y: 30, info: 'Multi-source triggers: deployment events, monitoring alerts (PagerDuty/Datadog), Slack commands, or scheduled tasks. Normalizes events into a standard schema. Tools: PagerDuty, Datadog Webhooks, Slack Bot.', tools: ['PagerDuty', 'Datadog'] },
      { id: 'analyzer', icon: '🔍', label: 'Incident Analyzer', x: 30, y: 120, info: 'LLM analyzes incident context: error logs, metrics spikes, recent deployments, and affected services. Performs root cause analysis using correlation with deployment timeline. Cost: ~2,000 tokens.', tools: ['Datadog API', 'CloudWatch'] },
      { id: 'runbook', icon: '📋', label: 'Runbook Agent', x: 70, y: 120, info: 'Searches runbook database for matching incident patterns. Retrieves relevant remediation steps, past incident resolutions, and escalation procedures. Uses RAG over internal documentation. Tools: Confluence API, Notion.', tools: ['Confluence', 'RAG pipeline'] },
      { id: 'executor', icon: '⚡', label: 'Action Executor', x: 30, y: 220, info: 'Executes approved remediation actions: scale up pods, restart services, rollback deployments, update DNS, or apply hotfixes. All actions are audited and reversible. Tools: kubectl, Terraform, AWS CLI.', tools: ['kubectl', 'Terraform', 'AWS CLI'] },
      { id: 'approval', icon: '👤', label: 'Human Approval Gate', x: 70, y: 220, info: 'For high-risk actions (production deployments, data migrations), requires human approval via Slack interactive message or PagerDuty acknowledgment. Includes diff preview and risk assessment.', tools: ['Slack Interactive', 'PagerDuty'] },
      { id: 'infra-gen', icon: '🏗️', label: 'IaC Generator', x: 50, y: 310, info: 'Generates Infrastructure-as-Code from natural language: Terraform modules, Kubernetes manifests, Docker Compose files, GitHub Actions workflows. Follows company conventions and security policies.', tools: ['Terraform', 'Kubernetes', 'Pulumi'] },
      { id: 'monitor', icon: '📊', label: 'Post-Action Monitor', x: 50, y: 400, info: 'Monitors system health after action execution. Verifies: service availability, error rate normalization, latency recovery, and resource utilization. Auto-rollback if metrics degrade. Sends summary report.', tools: ['Prometheus', 'Grafana'] },
    ],
    edges: [[0,1],[0,2],[1,3],[1,4],[2,3],[2,4],[3,5],[4,5],[3,6],[5,6]],
    loopNote: 'Reactive + Scheduled: Real-time incident response with proactive infrastructure management',
    devSteps: [
      { phase: 'Event Integration', duration: '1 week', tasks: ['PagerDuty/Datadog webhook integration', 'Slack bot with slash commands', 'Event normalization and deduplication'] },
      { phase: 'Analysis & Runbooks', duration: '2 weeks', tasks: ['Log analysis pipeline with LLM', 'Runbook RAG system over internal docs', 'Root cause correlation engine', 'Incident pattern matching'] },
      { phase: 'Execution & IaC', duration: '2-3 weeks', tasks: ['Safe action execution framework', 'Human approval workflow', 'Terraform/K8s manifest generation', 'Rollback automation'] },
      { phase: 'Monitoring', duration: '1 week', tasks: ['Post-action health verification', 'Auto-rollback triggers', 'Incident summary report generation'] },
    ],
    avgTokensPerRun: 8000,
    avgLLMCalls: 10,
  },
]

// ═══════════════════════════════════════ FALLBACK FEATURES ═══════

const FEATURE_PATTERNS = [
  { keywords: ['search', 'web', 'browse', 'google', 'scrape', 'crawl'], feature: 'web_search', label: 'Web Search', icon: '🔍', avgTokens: 800, avgCalls: 2 },
  { keywords: ['rag', 'document', 'knowledge', 'pdf', 'vector', 'embedding', 'retrieval'], feature: 'rag', label: 'RAG / Knowledge Base', icon: '📚', avgTokens: 1200, avgCalls: 3 },
  { keywords: ['database', 'sql', 'query', 'postgres', 'mongo'], feature: 'database', label: 'Database Access', icon: '💾', avgTokens: 600, avgCalls: 2 },
  { keywords: ['api', 'endpoint', 'rest', 'webhook', 'integration'], feature: 'api_integration', label: 'API Integration', icon: '🔌', avgTokens: 500, avgCalls: 1 },
  { keywords: ['email', 'notification', 'alert', 'slack', 'message'], feature: 'notifications', label: 'Notifications', icon: '📧', avgTokens: 300, avgCalls: 1 },
  { keywords: ['report', 'pdf', 'chart', 'dashboard', 'analytics'], feature: 'reporting', label: 'Report Generation', icon: '📊', avgTokens: 1500, avgCalls: 3 },
  { keywords: ['code', 'program', 'script', 'execute', 'compile'], feature: 'code_execution', label: 'Code Execution', icon: '⌨️', avgTokens: 1000, avgCalls: 4 },
  { keywords: ['image', 'video', 'audio', 'vision', 'photo'], feature: 'multimodal', label: 'Multi-Modal', icon: '🖼️', avgTokens: 2000, avgCalls: 2 },
  { keywords: ['schedule', 'cron', 'daily', 'weekly', 'periodic'], feature: 'scheduling', label: 'Scheduling', icon: '⏰', avgTokens: 300, avgCalls: 1 },
  { keywords: ['human', 'approval', 'review', 'manual', 'confirm'], feature: 'human_in_loop', label: 'Human-in-the-Loop', icon: '👁️', avgTokens: 200, avgCalls: 1 },
  { keywords: ['memory', 'history', 'context', 'conversation'], feature: 'memory', label: 'Memory', icon: '🧠', avgTokens: 800, avgCalls: 1 },
  { keywords: ['classify', 'categorize', 'label', 'sort', 'triage'], feature: 'classification', label: 'Classification', icon: '🏷️', avgTokens: 400, avgCalls: 1 },
  { keywords: ['translate', 'language', 'multilingual'], feature: 'translation', label: 'Translation', icon: '🌐', avgTokens: 600, avgCalls: 1 },
  { keywords: ['security', 'guard', 'filter', 'moderate', 'safety'], feature: 'guardrails', label: 'Guardrails', icon: '🛡️', avgTokens: 300, avgCalls: 1 },
  { keywords: ['deploy', 'production', 'scale', 'cloud'], feature: 'deployment', label: 'Deployment', icon: '☁️', avgTokens: 0, avgCalls: 0 },
]

const AGENT_ROLES = [
  { keywords: ['research', 'search', 'find', 'investigate', 'gather'], role: 'Researcher', icon: '🔬', description: 'Gathers information from multiple sources' },
  { keywords: ['write', 'create', 'generate', 'draft', 'compose'], role: 'Writer', icon: '✍️', description: 'Creates content and documentation' },
  { keywords: ['analyze', 'evaluate', 'assess', 'compare'], role: 'Analyst', icon: '📊', description: 'Analyzes data and provides insights' },
  { keywords: ['code', 'program', 'develop', 'build', 'implement'], role: 'Developer', icon: '👨‍💻', description: 'Writes and executes code' },
  { keywords: ['coordinate', 'manage', 'orchestrate', 'delegate'], role: 'Coordinator', icon: '👔', description: 'Manages workflow and delegates tasks' },
  { keywords: ['validate', 'check', 'verify', 'quality', 'test'], role: 'QA Reviewer', icon: '✅', description: 'Validates output quality' },
  { keywords: ['customer', 'support', 'respond', 'answer', 'help'], role: 'Support Agent', icon: '💬', description: 'Handles user interactions' },
  { keywords: ['monitor', 'track', 'observe', 'alert', 'watch'], role: 'Monitor', icon: '👀', description: 'Monitors systems and alerts' },
]

// ═══════════════════════════════════════ PARSER ═══════════════════

export function parseRequirements(text) {
  const lower = text.toLowerCase()

  // 1. Try to match a use-case template (compound phrase matching)
  let matchedTemplate = null
  let bestScore = 0
  for (const template of USE_CASE_TEMPLATES) {
    let score = 0
    for (const trigger of template.triggers) {
      if (lower.includes(trigger)) {
        score += trigger.split(' ').length // Multi-word triggers score higher
      }
    }
    if (score > bestScore) {
      bestScore = score
      matchedTemplate = template
    }
  }

  // 2. Extract additional features
  const detectedFeatures = FEATURE_PATTERNS.filter(p => p.keywords.some(kw => lower.includes(kw)))

  // 3. Detect complexity
  let complexity = matchedTemplate?.complexity || 'medium'
  const complexWords = { simple: ['simple', 'basic', 'quick'], medium: ['moderate', 'pipeline'], complex: ['complex', 'enterprise', 'production', 'robust'], advanced: ['multi-agent', 'hierarchical', 'distributed'] }
  for (const [level, words] of Object.entries(complexWords)) {
    if (words.some(w => lower.includes(w))) complexity = level
  }

  // 4. Detect roles
  const detectedRoles = AGENT_ROLES.filter(r => r.keywords.some(kw => lower.includes(kw)))
  if (detectedRoles.length > 1 && !detectedRoles.find(r => r.role === 'Coordinator')) {
    detectedRoles.unshift(AGENT_ROLES.find(r => r.role === 'Coordinator'))
  }
  if (detectedRoles.length === 0) detectedRoles.push(AGENT_ROLES.find(r => r.role === 'Analyst'))

  // 5. Detect frequency
  let frequency = 'on-demand'
  if (/daily|every day/.test(lower)) frequency = 'daily'
  else if (/weekly|every week/.test(lower)) frequency = 'weekly'
  else if (/hourly/.test(lower)) frequency = 'hourly'
  else if (/real.?time|instant|live/.test(lower)) frequency = 'real-time'

  const sourceCount = (lower.match(/(\d+)\s*(source|site|api|database|url)/i) || [])[1]
  const numSources = sourceCount ? parseInt(sourceCount) : 3

  return { matchedTemplate, detectedFeatures, complexity, numSources, detectedRoles, frequency, rawText: text }
}

// ═══════════════════════════════════════ GENERATOR ════════════════

export function generateDynamicWorkflow(parsed, frameworkId, llmId = 'gpt-4o') {
  const fw = FRAMEWORKS.find(f => f.id === frameworkId)
  const llm = LLM_PRICING.find(l => l.id === llmId)
  if (!fw || !llm) return null

  // If a template matched, use it directly with framework-specific enrichment
  if (parsed.matchedTemplate) {
    return generateFromTemplate(parsed, fw, llm)
  }

  // Fallback: generate from detected features/roles
  return generateFromFeatures(parsed, fw, llm)
}

function generateFromTemplate(parsed, fw, llm) {
  const template = parsed.matchedTemplate
  // Enrich template node info with framework-specific details
  const enrichedNodes = template.nodes.map(n => ({
    ...n,
    info: n.info + ` [${fw.name}: ${getFrameworkNote(fw.id, n.id)}]`
  }))

  const costs = calculateCosts(template, fw, llm, parsed)
  const trace = generateTrace(template, fw, llm)

  return {
    title: `${fw.name} — ${template.title}`,
    nodes: enrichedNodes,
    edges: template.edges,
    loopNote: template.loopNote,
    costs,
    exampleTrace: trace,
    complexity: template.complexity,
    frequency: parsed.frequency,
    frameworkId: fw.id,
    devSteps: template.devSteps,
    useCaseId: template.id,
  }
}

function getFrameworkNote(fwId, nodeId) {
  const notes = {
    langgraph: 'Implemented as a state graph node with conditional edges and checkpointing.',
    crewai: 'Defined as a CrewAI Task with role-based agent assignment.',
    autogen: 'Runs as an AutoGen ConversableAgent in group chat.',
    'openai-sdk': 'Uses OpenAI Agents SDK with function tool definitions.',
    'google-adk': 'Deployed as a sub-agent in Google ADK hierarchy.',
    dify: 'Configured as a visual workflow node with drag-and-drop.',
    mastra: 'TypeScript function registered as a Mastra tool.',
    n8n: 'Configured as an n8n node with visual connections.',
  }
  return notes[fwId] || 'Standard agent implementation.'
}

function generateFromFeatures(parsed, fw, llm) {
  const { detectedFeatures, detectedRoles, complexity, numSources, frequency } = parsed
  const nodes = []; const edges = []; let y = 30

  nodes.push({ id: 'input', icon: '📥', label: 'Input', info: `${frequency} input trigger for ${fw.name} pipeline.`, x: 50, y, type: 'input' })
  y += 90

  if (complexity === 'complex' || complexity === 'advanced') {
    nodes.push({ id: 'guard', icon: '🛡️', label: 'Input Validation', info: 'Validates and sanitizes input. Includes prompt injection detection.', x: 50, y })
    edges.push([nodes.length - 2, nodes.length - 1]); y += 90
  }

  const agentRoles = detectedRoles.filter(r => r.role !== 'Coordinator')
  if (detectedRoles.length > 1) {
    nodes.push({ id: 'router', icon: '👔', label: 'Coordinator', info: `Routes to ${agentRoles.length} agents in ${fw.name}.`, x: 50, y })
    edges.push([nodes.length - 2, nodes.length - 1]); y += 100
  }

  const agentStart = nodes.length
  const spacing = agentRoles.length > 0 ? 80 / agentRoles.length : 80
  agentRoles.forEach((role, i) => {
    const xPos = agentRoles.length === 1 ? 50 : 10 + spacing * i + spacing / 2
    nodes.push({ id: `agent-${i}`, icon: role.icon, label: role.role, info: `${role.description}. Powered by ${llm.name}. Cost: ~$${((1200 * (llm.inputCost + llm.outputCost) / 2) / 1_000_000).toFixed(4)}/call.`, x: xPos, y })
    const routerIdx = nodes.findIndex(n => n.id === 'router')
    edges.push([routerIdx >= 0 ? routerIdx : nodes.length - 2, nodes.length - 1])
  })
  if (agentRoles.length > 0) y += 100

  const tools = detectedFeatures.filter(f => f.avgCalls > 0).slice(0, 5)
  const toolSpacing = tools.length > 0 ? 80 / tools.length : 80
  tools.forEach((feat, i) => {
    const xPos = tools.length === 1 ? 50 : 10 + toolSpacing * i + toolSpacing / 2
    nodes.push({ id: `tool-${i}`, icon: feat.icon, label: feat.label, info: `${feat.label}: ~${feat.avgTokens} tokens, ${feat.avgCalls} LLM calls/request.`, x: xPos, y })
    for (let j = agentStart; j < agentStart + agentRoles.length; j++) { if (j < nodes.length - 1) edges.push([j, nodes.length - 1]) }
  })
  if (tools.length > 0) y += 100

  if (agentRoles.length > 1 || tools.length > 2) {
    nodes.push({ id: 'agg', icon: '🔄', label: 'Aggregate', info: 'Merges outputs from all agents and tools.', x: 50, y })
    const prevCount = tools.length || agentRoles.length
    for (let i = 1; i <= Math.min(prevCount, 5); i++) { if (nodes.length - 1 - i >= 0) edges.push([nodes.length - 1 - i, nodes.length - 1]) }
    y += 90
  }

  nodes.push({ id: 'output', icon: '📤', label: 'Output', info: 'Final result delivery.', x: 50, y })
  edges.push([nodes.length - 2, nodes.length - 1])

  // Simulated costs
  const totalTokens = detectedFeatures.reduce((s, f) => s + f.avgTokens * f.avgCalls, 0) || 3000
  const reqPerDay = { 'real-time': 10000, hourly: 24, daily: 1, weekly: 1/7, 'on-demand': 100 }[frequency] || 100
  const monthlyReqs = Math.round(reqPerDay * 30)
  const mult = { simple: 1, medium: 1.5, complex: 2.5, advanced: 4 }[complexity] || 1.5
  const llmCost = (monthlyReqs * totalTokens * mult / 1_000_000) * (llm.inputCost + llm.outputCost) / 2
  const infra = reqPerDay > 1000 ? 50 : reqPerDay > 100 ? 20 : 5

  return {
    title: `${fw.name} — Custom Architecture`,
    nodes, edges,
    loopNote: `${nodes.length} steps, ~${Math.round(fw.benchmark.latency.value + totalTokens / 10)}ms total`,
    costs: { devTimeWeeks: Math.ceil(2 + detectedFeatures.length * 0.5 + agentRoles.length * 0.3), requestsPerDay: Math.round(reqPerDay), monthlyRequests: monthlyReqs, tokensPerRequest: Math.round(totalTokens * mult), monthlyLLMCost: llmCost.toFixed(2), monthlyInfraCost: infra, infraBreakdown: { hosting: infra }, monthlyTotal: (llmCost + infra).toFixed(2), costPerRequest: monthlyReqs > 0 ? ((llmCost + infra) / monthlyReqs).toFixed(4) : '0', yearlyTotal: ((llmCost + infra) * 12).toFixed(2), llmModel: llm.name, framework: fw.name },
    exampleTrace: { steps: [{ step: 1, action: 'Input', detail: 'Received', duration: '10ms', tokens: 0, cost: '$0' }, { step: 2, action: 'Processing', detail: `${agentRoles.length} agents, ${tools.length} tools`, duration: `${fw.benchmark.latency.value * 2}ms`, tokens: Math.round(totalTokens * mult), cost: `$${(totalTokens * mult * (llm.inputCost + llm.outputCost) / 2 / 1_000_000).toFixed(4)}` }, { step: 3, action: 'Output', detail: 'Delivered', duration: '50ms', tokens: 0, cost: '$0' }], totalDuration: `${((fw.benchmark.latency.value * 2 + 60) / 1000).toFixed(2)}s`, totalTokens: Math.round(totalTokens * mult), totalCost: `$${(totalTokens * mult * (llm.inputCost + llm.outputCost) / 2 / 1_000_000).toFixed(4)}` },
    complexity, frequency, frameworkId: fw.id, devSteps: null, useCaseId: null,
  }
}

function calculateCosts(template, fw, llm, parsed) {
  const reqPerDay = { 'real-time': 10000, hourly: 24, daily: 1, weekly: 1/7, 'on-demand': 100 }[parsed.frequency] || 100
  const monthlyReqs = Math.round(reqPerDay * 30)
  const costPerRun = (template.avgTokensPerRun / 1_000_000) * (llm.inputCost * 0.6 + llm.outputCost * 0.4)
  const monthlyLLM = costPerRun * monthlyReqs
  const infraBase = fw.pricing.cloud.includes('Free') ? 0 : 35
  const hosting = reqPerDay > 1000 ? 80 : reqPerDay > 100 ? 30 : 10
  const vectorDb = template.nodes.some(n => n.info.includes('vector') || n.info.includes('Pinecone')) ? 25 : 0
  const monitoring = template.complexity === 'advanced' ? 25 : 15
  const infra = { framework: infraBase, hosting, vectorDb, monitoring }
  const totalInfra = Object.values(infra).reduce((a, b) => a + b, 0)
  const devWeeks = template.devSteps.reduce((sum, s) => {
    const match = s.duration.match(/(\d+)/); return sum + (match ? parseInt(match[1]) : 1)
  }, 0)

  return {
    devTimeWeeks: devWeeks,
    requestsPerDay: Math.round(reqPerDay),
    monthlyRequests: monthlyReqs,
    tokensPerRequest: template.avgTokensPerRun,
    monthlyLLMCost: monthlyLLM.toFixed(2),
    monthlyInfraCost: totalInfra,
    infraBreakdown: infra,
    monthlyTotal: (monthlyLLM + totalInfra).toFixed(2),
    costPerRequest: monthlyReqs > 0 ? ((monthlyLLM + totalInfra) / monthlyReqs).toFixed(4) : '0',
    yearlyTotal: ((monthlyLLM + totalInfra) * 12).toFixed(2),
    llmModel: llm.name,
    framework: fw.name,
  }
}

function generateTrace(template, fw, llm) {
  const steps = []
  let totalMs = 0; let totalTokens = 0
  const latency = fw.benchmark.latency.value

  template.nodes.forEach((node, i) => {
    const tokensForNode = Math.round(template.avgTokensPerRun / template.nodes.length)
    const dur = i === 0 ? 15 : Math.round(latency * 0.5 + Math.random() * latency * 0.5)
    const cost = tokensForNode > 0 ? (tokensForNode / 1_000_000) * (llm.inputCost * 0.6 + llm.outputCost * 0.4) : 0
    steps.push({
      step: i + 1,
      action: node.label,
      detail: node.tools?.slice(0, 2).join(', ') || 'Internal processing',
      duration: `${dur}ms`,
      tokens: tokensForNode,
      cost: `$${cost.toFixed(4)}`,
    })
    totalMs += dur
    totalTokens += tokensForNode
  })

  const totalCost = (totalTokens / 1_000_000) * (llm.inputCost * 0.6 + llm.outputCost * 0.4)
  return {
    steps,
    totalDuration: `${(totalMs / 1000).toFixed(2)}s`,
    totalTokens,
    totalCost: `$${totalCost.toFixed(4)}`,
  }
}
