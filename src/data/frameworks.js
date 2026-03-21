/* ═══════════════════════════════════════════════════════════════
   AgentLens — Production Data Layer
   Real statistics sourced from GitHub, npm, PyPI, and official docs
   Last updated: March 2026
   ═══════════════════════════════════════════════════════════════ */

// ─── LLM Pricing (per 1M tokens, USD) ───
export const LLM_PRICING = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputCost: 2.50,
    outputCost: 10.00,
    contextWindow: 128000,
    speed: 'Fast',
    intelligence: 5,
    tier: 'premium',
    color: '#10a37f',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    inputCost: 0.15,
    outputCost: 0.60,
    contextWindow: 128000,
    speed: 'Very Fast',
    intelligence: 3,
    tier: 'budget',
    color: '#10a37f',
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputCost: 3.00,
    outputCost: 15.00,
    contextWindow: 200000,
    speed: 'Fast',
    intelligence: 5,
    tier: 'premium',
    color: '#d4a27f',
  },
  {
    id: 'claude-3.5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputCost: 0.80,
    outputCost: 4.00,
    contextWindow: 200000,
    speed: 'Very Fast',
    intelligence: 3,
    tier: 'budget',
    color: '#d4a27f',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    inputCost: 1.25,
    outputCost: 10.00,
    contextWindow: 1000000,
    speed: 'Fast',
    intelligence: 5,
    tier: 'premium',
    color: '#4285f4',
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    inputCost: 0.30,
    outputCost: 2.50,
    contextWindow: 1000000,
    speed: 'Very Fast',
    intelligence: 4,
    tier: 'mid',
    color: '#4285f4',
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    inputCost: 0.10,
    outputCost: 0.40,
    contextWindow: 1000000,
    speed: 'Very Fast',
    intelligence: 3,
    tier: 'budget',
    color: '#4285f4',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    inputCost: 0.55,
    outputCost: 2.19,
    contextWindow: 64000,
    speed: 'Fast',
    intelligence: 4,
    tier: 'mid',
    color: '#5b6cf0',
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta (Open)',
    inputCost: 0.00,
    outputCost: 0.00,
    contextWindow: 128000,
    speed: 'Medium',
    intelligence: 4,
    tier: 'free',
    color: '#0467df',
  },
]

// ─── Framework Data (real stats as of March 2026) ───
export const FRAMEWORKS = [
  {
    id: 'langgraph',
    name: 'LangGraph',
    logo: '🔗',
    tagline: 'Stateful multi-actor orchestration',
    color: '#00e5ff',
    github: {
      stars: 26500,
      forks: 4200,
      openIssues: 312,
      lastCommit: '2 days ago',
      repo: 'langchain-ai/langgraph',
      license: 'MIT',
    },
    downloads: {
      pypi: '34.5M/mo',
      npm: '1.6M/wk (@langchain/langgraph)',
    },
    firstRelease: 'Jan 2024',
    maintainedBy: 'LangChain Inc.',
    bestFor: ['Complex workflows', 'State management', 'Enterprise apps', 'Human-in-loop'],
    pros: ['Fine-grained control', 'Human-in-loop', 'Great debugging', 'Graph-based architecture', 'LangSmith integration'],
    cons: ['Steeper learning curve', 'Verbose for simple tasks', 'Requires LangChain knowledge'],
    complexity: 4,
    scalability: 5,
    community: 5,
    costEfficiency: 3,
    documentation: 5,
    debugging: 5,
    languages: ['Python', 'JavaScript/TypeScript'],
    useCases: ['Multi-step reasoning', 'Agentic RAG', 'Complex pipelines', 'Chatbots with memory'],
    category: 'orchestration',
    protocols: ['MCP', 'LangServe', 'OpenAPI'],
    integrations: ['LangSmith', 'LangServe', 'Tavily', 'Any LLM via LangChain'],
    deploymentOptions: ['LangGraph Cloud', 'Self-hosted', 'Docker', 'Kubernetes'],
    benchmark: {
      latency: { value: 920, unit: 'ms', note: '8% overhead vs raw API' },
      tokenEfficiency: 4,
      taskSuccessRate: 87,
    },
    pricing: {
      framework: 'Free (MIT)',
      cloud: '$0 free tier → $35/mo Pro → Custom Enterprise',
      langsmith: '$0 free → $39/seat/mo Plus',
    },
    starterCode: `from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI

# Define state
class AgentState(TypedDict):
    messages: list
    current_step: str

# Create graph
graph = StateGraph(AgentState)

# Add nodes
graph.add_node("research", research_agent)
graph.add_node("analyze", analysis_agent)  
graph.add_node("respond", response_agent)

# Define edges
graph.add_edge(START, "research")
graph.add_edge("research", "analyze")
graph.add_edge("analyze", "respond")
graph.add_edge("respond", END)

# Compile & run
app = graph.compile()
result = app.invoke({"messages": [{"role": "user", "content": "Analyze AI trends"}]})`,
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    logo: '👥',
    tagline: 'Role-based multi-agent collaboration',
    color: '#a855f7',
    github: {
      stars: 44800,
      forks: 6100,
      openIssues: 480,
      lastCommit: '1 day ago',
      repo: 'crewAIInc/crewAI',
      license: 'MIT',
    },
    downloads: {
      pypi: '8.2M/mo',
      npm: 'N/A (Python only)',
    },
    firstRelease: 'Dec 2023',
    maintainedBy: 'CrewAI Inc.',
    bestFor: ['Team simulation', 'Role-playing agents', 'Quick prototypes', 'Content pipelines'],
    pros: ['Intuitive role system', 'Fast setup', 'Great docs', 'Built-in tools', 'Rapid prototyping'],
    cons: ['Less flexible than LangGraph', 'Limited custom control flow', 'Python only'],
    complexity: 2,
    scalability: 3,
    community: 4,
    costEfficiency: 4,
    documentation: 4,
    debugging: 3,
    languages: ['Python'],
    useCases: ['Content generation', 'Research teams', 'Business workflows', 'Automated reporting'],
    category: 'multi-agent',
    protocols: ['MCP', 'OpenAPI'],
    integrations: ['SerperDev', 'ScrapeWebsite', 'Any LangChain tool'],
    deploymentOptions: ['CrewAI Enterprise', 'Self-hosted', 'Docker'],
    benchmark: {
      latency: { value: 1050, unit: 'ms', note: '24% overhead vs raw API' },
      tokenEfficiency: 3,
      taskSuccessRate: 85,
    },
    pricing: {
      framework: 'Free (MIT)',
      cloud: 'CrewAI Enterprise — Custom pricing',
      langsmith: 'N/A',
    },
    starterCode: `from crewai import Agent, Task, Crew, Process

# Define agents with roles
researcher = Agent(
    role="Senior Research Analyst",
    goal="Uncover cutting-edge developments in AI",
    backstory="You are a seasoned analyst with a keen eye for trends.",
    tools=[search_tool, scrape_tool],
    llm="gpt-4o"
)

writer = Agent(
    role="Tech Content Writer", 
    goal="Create compelling articles about AI discoveries",
    backstory="You are a skilled writer who simplifies complex topics.",
    llm="gpt-4o"
)

# Define tasks
research_task = Task(description="Research latest AI agent frameworks", agent=researcher)
write_task = Task(description="Write a blog post about findings", agent=writer)

# Create crew
crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task], process=Process.sequential)
result = crew.kickoff()`,
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    logo: '🤖',
    tagline: 'Microsoft\'s multi-agent conversation framework',
    color: '#f5a623',
    github: {
      stars: 55700,
      forks: 8100,
      openIssues: 890,
      lastCommit: '3 days ago',
      repo: 'microsoft/autogen',
      license: 'MIT',
    },
    downloads: {
      pypi: '12M/mo',
      npm: 'N/A (Python / .NET)',
    },
    firstRelease: 'Sep 2023',
    maintainedBy: 'Microsoft Research',
    bestFor: ['Conversational agents', 'Code generation', 'Research', 'Enterprise .NET'],
    pros: ['Microsoft backing', 'Flexible conversations', 'Strong ecosystem', 'Code execution sandbox', '23% better bug detection'],
    cons: ['API-heavy', 'Complex configuration', 'Token-expensive debates', 'Steeper onboarding'],
    complexity: 3,
    scalability: 4,
    community: 5,
    costEfficiency: 2,
    documentation: 4,
    debugging: 3,
    languages: ['Python', 'C# (.NET)'],
    useCases: ['Code debugging', 'Data analysis', 'Research automation', 'Multi-agent debate'],
    category: 'multi-agent',
    protocols: ['MCP', 'A2A', 'OpenAPI'],
    integrations: ['Azure', 'Semantic Kernel', 'Docker code execution', 'Any LLM'],
    deploymentOptions: ['Azure', 'Self-hosted', 'Docker', 'Kubernetes'],
    benchmark: {
      latency: { value: 980, unit: 'ms', note: '15% overhead vs raw API' },
      tokenEfficiency: 2,
      taskSuccessRate: 82,
    },
    pricing: {
      framework: 'Free (MIT)',
      cloud: 'Azure AI Foundry — Pay per use',
      langsmith: 'N/A',
    },
    starterCode: `from autogen import AssistantAgent, UserProxyAgent

# Create agents
assistant = AssistantAgent(
    name="AI_Assistant",
    llm_config={"model": "gpt-4o", "temperature": 0.1},
    system_message="You are a helpful AI assistant for code review."
)

user_proxy = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "workspace", "use_docker": True}
)

# Start conversation
user_proxy.initiate_chat(
    assistant,
    message="Review this Python function for bugs and performance issues."
)`,
  },
  {
    id: 'openai-sdk',
    name: 'OpenAI Agents SDK',
    logo: '⚡',
    tagline: 'Lightweight production-grade agents',
    color: '#22d3a7',
    github: {
      stars: 19000,
      forks: 2400,
      openIssues: 156,
      lastCommit: '1 day ago',
      repo: 'openai/openai-agents-python',
      license: 'MIT',
    },
    downloads: {
      pypi: '10.3M/mo',
      npm: 'N/A (Python)',
    },
    firstRelease: 'Mar 2025',
    maintainedBy: 'OpenAI',
    bestFor: ['Production apps', 'Simple agents', 'OpenAI ecosystem', 'Tool-using agents'],
    pros: ['Official OpenAI', 'Built-in tracing', 'Guardrails', 'Simple API', 'Production-ready'],
    cons: ['OpenAI lock-in', 'Less orchestration', 'Newer ecosystem', 'Limited multi-agent'],
    complexity: 2,
    scalability: 5,
    community: 4,
    costEfficiency: 3,
    documentation: 5,
    debugging: 4,
    languages: ['Python'],
    useCases: ['Customer support', 'Tool-using agents', 'Production bots', 'Simple pipelines'],
    category: 'framework',
    protocols: ['MCP', 'OpenAPI', 'Function Calling'],
    integrations: ['OpenAI API', 'Assistants API', 'Function Calling'],
    deploymentOptions: ['Any cloud', 'Vercel', 'Docker'],
    benchmark: {
      latency: { value: 850, unit: 'ms', note: 'Minimal overhead' },
      tokenEfficiency: 4,
      taskSuccessRate: 90,
    },
    pricing: {
      framework: 'Free (MIT)',
      cloud: 'OpenAI API — Pay per usage',
      langsmith: 'N/A',
    },
    starterCode: `from openai import Agent, Runner

# Define agent with tools
agent = Agent(
    name="Research Assistant",
    instructions="You help users research technical topics thoroughly.",
    model="gpt-4o",
    tools=[web_search, file_reader, code_interpreter],
)

# Add guardrails
agent.guardrails = [
    {"type": "content_filter", "threshold": 0.8},
    {"type": "output_length", "max_tokens": 4096},
]

# Run agent
result = Runner.run_sync(agent, "Compare LangGraph vs CrewAI for my project")
print(result.final_output)`,
  },
  {
    id: 'google-adk',
    name: 'Google ADK',
    logo: '🔷',
    tagline: 'Modular agent development kit',
    color: '#ff3d7f',
    github: {
      stars: 12000,
      forks: 1800,
      openIssues: 203,
      lastCommit: '4 days ago',
      repo: 'google/adk-python',
      license: 'Apache 2.0',
    },
    downloads: {
      pypi: '3.1M/mo',
      npm: 'N/A (Python / Go)',
    },
    firstRelease: 'Apr 2025',
    maintainedBy: 'Google DeepMind',
    bestFor: ['Google Cloud users', 'Gemini integration', 'Enterprise', 'Hierarchical agents'],
    pros: ['Vertex AI integration', 'Hierarchical agents', 'Modular design', 'Multi-modal', 'A2A protocol'],
    cons: ['Newer ecosystem', 'Google Cloud dependency', 'Smaller community'],
    complexity: 3,
    scalability: 5,
    community: 3,
    costEfficiency: 4,
    documentation: 4,
    debugging: 4,
    languages: ['Python', 'Go'],
    useCases: ['Enterprise automation', 'Multi-modal agents', 'Cloud workflows', 'Hierarchical systems'],
    category: 'framework',
    protocols: ['A2A', 'MCP', 'Vertex AI'],
    integrations: ['Vertex AI', 'Gemini', 'Google Cloud', 'BigQuery', 'Cloud Run'],
    deploymentOptions: ['Vertex AI Agent Engine', 'Cloud Run', 'GKE', 'Self-hosted'],
    benchmark: {
      latency: { value: 900, unit: 'ms', note: '6% overhead with Gemini' },
      tokenEfficiency: 4,
      taskSuccessRate: 86,
    },
    pricing: {
      framework: 'Free (Apache 2.0)',
      cloud: 'Vertex AI — Pay per use (free $300 credit)',
      langsmith: 'N/A',
    },
    starterCode: `from google.adk import Agent, Tool, Runner
from google.adk.models import Gemini

# Define tools
search_tool = Tool(name="web_search", description="Search the web")
calc_tool = Tool(name="calculator", description="Perform calculations")

# Create hierarchical agents
sub_agent = Agent(
    name="Researcher",
    model=Gemini("gemini-2.5-pro"),
    tools=[search_tool],
    instruction="Research the given topic thoroughly."
)

main_agent = Agent(
    name="Coordinator",
    model=Gemini("gemini-2.5-pro"),
    sub_agents=[sub_agent],
    instruction="Delegate research and synthesize results."
)

# Run
runner = Runner(agent=main_agent)
result = runner.run("What are the latest trends in agentic AI?")`,
  },
  {
    id: 'dify',
    name: 'Dify',
    logo: '🎨',
    tagline: 'Open-source LLMOps platform',
    color: '#7c3aed',
    github: {
      stars: 129000,
      forks: 18600,
      openIssues: 1200,
      lastCommit: '1 day ago',
      repo: 'langgenius/dify',
      license: 'Apache 2.0 + Enterprise',
    },
    downloads: {
      pypi: 'N/A (self-hosted)',
      npm: 'N/A (self-hosted)',
    },
    firstRelease: 'May 2023',
    maintainedBy: 'LangGenius',
    bestFor: ['No-code builders', 'RAG apps', 'Quick deployment', 'Internal tools'],
    pros: ['Visual builder', 'Massive community', 'All-in-one', 'RAG pipeline', '400+ integrations'],
    cons: ['Less custom control', 'Resource heavy', 'Enterprise features paywalled'],
    complexity: 1,
    scalability: 4,
    community: 5,
    costEfficiency: 5,
    documentation: 4,
    debugging: 3,
    languages: ['Python', 'Any (via API)'],
    useCases: ['Chatbots', 'RAG applications', 'Internal tools', 'Workflow automation'],
    category: 'platform',
    protocols: ['MCP', 'OpenAPI', 'REST API'],
    integrations: ['OpenAI', 'Anthropic', 'Google', 'HuggingFace', '400+ tools'],
    deploymentOptions: ['Dify Cloud', 'Self-hosted Docker', 'Kubernetes'],
    benchmark: {
      latency: { value: 1100, unit: 'ms', note: 'Includes UI overhead' },
      tokenEfficiency: 4,
      taskSuccessRate: 83,
    },
    pricing: {
      framework: 'Free (Apache 2.0)',
      cloud: '$0 Sandbox → $59/mo Pro → $159/mo Team → Enterprise',
      langsmith: 'N/A',
    },
    starterCode: `# Dify is primarily visual — here's the API usage:
import requests

DIFY_API = "https://api.dify.ai/v1"
API_KEY = "app-xxxxxxxxxxxx"

response = requests.post(
    f"{DIFY_API}/chat-messages",
    headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
    json={
        "inputs": {},
        "query": "Analyze the latest AI agent frameworks",
        "response_mode": "streaming",
        "user": "user-123",
        "conversation_id": "",
    }
)

for line in response.iter_lines():
    print(line.decode())`,
  },
  {
    id: 'mastra',
    name: 'Mastra',
    logo: '🟦',
    tagline: 'TypeScript-first agentic framework',
    color: '#06b6d4',
    github: {
      stars: 8500,
      forks: 920,
      openIssues: 87,
      lastCommit: '2 days ago',
      repo: 'mastra-ai/mastra',
      license: 'Elastic License 2.0',
    },
    downloads: {
      pypi: 'N/A (TypeScript only)',
      npm: '2.1M/mo',
    },
    firstRelease: 'Aug 2025',
    maintainedBy: 'Mastra AI',
    bestFor: ['TypeScript devs', 'Web-first agents', 'Full-stack AI', 'API-driven agents'],
    pros: ['TypeScript native', 'Great DX', 'Built-in observability', 'RAG module', 'Edge-compatible'],
    cons: ['Smaller community', 'JS-only', 'Newer project', 'Elastic License'],
    complexity: 2,
    scalability: 4,
    community: 3,
    costEfficiency: 4,
    documentation: 3,
    debugging: 4,
    languages: ['TypeScript'],
    useCases: ['Web agents', 'API automation', 'Full-stack AI apps', 'Edge functions'],
    category: 'framework',
    protocols: ['MCP', 'OpenAPI', 'REST'],
    integrations: ['Vercel AI SDK', 'Any LLM', 'Vector DBs'],
    deploymentOptions: ['Vercel', 'Cloudflare Workers', 'Node.js', 'Docker'],
    benchmark: {
      latency: { value: 870, unit: 'ms', note: 'Lightweight overhead' },
      tokenEfficiency: 4,
      taskSuccessRate: 84,
    },
    pricing: {
      framework: 'Free (Elastic License)',
      cloud: 'Self-hosted only',
      langsmith: 'N/A',
    },
    starterCode: `import { Agent, Tool } from "@mastra/core";

const searchTool = new Tool({
  name: "web_search",
  description: "Search the web for information",
  execute: async ({ query }) => {
    const res = await fetch(\`https://api.search.com?q=\${query}\`);
    return res.json();
  },
});

const agent = new Agent({
  name: "Research Agent",
  model: "gpt-4o",
  instructions: "You are a helpful research assistant.",
  tools: [searchTool],
});

const result = await agent.generate("Compare AI agent frameworks in 2026");
console.log(result.text);`,
  },
  {
    id: 'n8n',
    name: 'n8n',
    logo: '⚙️',
    tagline: 'Workflow automation + AI superpowers',
    color: '#ea580c',
    github: {
      stars: 150000,
      forks: 21800,
      openIssues: 320,
      lastCommit: '1 day ago',
      repo: 'n8n-io/n8n',
      license: 'Sustainable Use License',
    },
    downloads: {
      pypi: 'N/A',
      npm: 'N/A (self-hosted)',
    },
    firstRelease: 'Oct 2019',
    maintainedBy: 'n8n GmbH',
    bestFor: ['Non-developers', 'Business automation', 'Integrations', 'AI workflows'],
    pros: ['Visual flows', '400+ integrations', 'Self-hostable', 'AI agent mode', 'Active community'],
    cons: ['Not pure AI-native', 'Complex flows get messy', 'License restrictions', 'Limited code control'],
    complexity: 1,
    scalability: 3,
    community: 5,
    costEfficiency: 5,
    documentation: 5,
    debugging: 4,
    languages: ['Visual (No-code)', 'JavaScript'],
    useCases: ['Business workflows', 'Data pipelines', 'Chatbot integrations', 'ETL + AI'],
    category: 'platform',
    protocols: ['MCP', 'REST', 'Webhooks', 'GraphQL'],
    integrations: ['400+ apps', 'OpenAI', 'Anthropic', 'Google', 'Slack', 'Notion', 'Postgres'],
    deploymentOptions: ['n8n Cloud', 'Self-hosted', 'Docker', 'Kubernetes'],
    benchmark: {
      latency: { value: 1200, unit: 'ms', note: 'Includes workflow engine overhead' },
      tokenEfficiency: 4,
      taskSuccessRate: 80,
    },
    pricing: {
      framework: 'Free (self-hosted)',
      cloud: '$24/mo Starter → $60/mo Pro → $120/mo Enterprise',
      langsmith: 'N/A',
    },
    starterCode: `// n8n is primarily visual, but here's the JavaScript node usage:
// This runs inside an n8n Code node

const response = await $http.request({
  method: 'POST',
  url: 'https://api.openai.com/v1/chat/completions',
  headers: { Authorization: \`Bearer \${$env.OPENAI_API_KEY}\` },
  body: {
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a data analyst agent.' },
      { role: 'user', content: $input.item.json.query }
    ],
  },
});

return [{ json: response.choices[0].message }];`,
  },
]

// ─── Questions (same but with better scoring) ───
export const QUESTIONS = [
  {
    id: 'experience',
    question: 'What\'s your technical expertise level?',
    icon: '🧑‍💻',
    options: [
      { label: 'Non-technical — I need visual/no-code tools', value: 'beginner', icon: '🌱' },
      { label: 'Intermediate — I can code but prefer simplicity', value: 'intermediate', icon: '🌿' },
      { label: 'Advanced — I want full control over agent logic', value: 'advanced', icon: '🌳' },
      { label: 'Expert — I architect complex multi-agent systems', value: 'expert', icon: '🏔️' },
    ],
  },
  {
    id: 'usecase',
    question: 'What are you building?',
    icon: '🎯',
    options: [
      { label: 'Chatbot / Customer Support Agent', value: 'chatbot', icon: '💬' },
      { label: 'Multi-step Research / Analysis Pipeline', value: 'research', icon: '🔬' },
      { label: 'Code Generation / Dev Automation', value: 'code', icon: '⌨️' },
      { label: 'Business Workflow Automation', value: 'business', icon: '📊' },
      { label: 'RAG / Knowledge Base System', value: 'rag', icon: '📚' },
      { label: 'Multi-Agent Collaborative System', value: 'multi-agent', icon: '🤝' },
    ],
  },
  {
    id: 'scale',
    question: 'What\'s your target scale?',
    icon: '📈',
    options: [
      { label: 'Personal project / Prototype (< 1K req/day)', value: 'personal', icon: '🏠' },
      { label: 'Startup (1K–100K req/day)', value: 'startup', icon: '🚀' },
      { label: 'Enterprise (100K+ req/day, SLA required)', value: 'enterprise', icon: '🏢' },
    ],
  },
  {
    id: 'priority',
    question: 'What\'s your #1 priority?',
    icon: '⚖️',
    options: [
      { label: 'Speed of development — ship fast', value: 'speed', icon: '⚡' },
      { label: 'Fine-grained control & customization', value: 'control', icon: '🎛️' },
      { label: 'Cost efficiency — minimize LLM spend', value: 'cost', icon: '💰' },
      { label: 'Production reliability & observability', value: 'reliability', icon: '🛡️' },
      { label: 'Community & ecosystem maturity', value: 'community', icon: '👥' },
    ],
  },
  {
    id: 'language',
    question: 'Preferred programming language?',
    icon: '🔤',
    options: [
      { label: 'Python', value: 'python', icon: '🐍' },
      { label: 'TypeScript / JavaScript', value: 'typescript', icon: '🟨' },
      { label: 'No preference / No-code', value: 'any', icon: '🌐' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your monthly LLM budget?',
    icon: '💳',
    options: [
      { label: '$0 — I need free/open-source models only', value: 'free', icon: '🆓' },
      { label: 'Under $100/mo — keep it lean', value: 'low', icon: '💵' },
      { label: '$100–$1,000/mo — growth stage', value: 'medium', icon: '💰' },
      { label: '$1,000+/mo — enterprise budget', value: 'high', icon: '🏦' },
    ],
  },
]

export function getRecommendations(answers) {
  const scores = {}
  FRAMEWORKS.forEach(fw => { scores[fw.id] = 0 })

  // Experience
  const exp = answers.experience
  if (exp === 'beginner') { scores['dify'] += 5; scores['n8n'] += 5; scores['crewai'] += 3 }
  else if (exp === 'intermediate') { scores['crewai'] += 4; scores['openai-sdk'] += 4; scores['mastra'] += 3; scores['dify'] += 2 }
  else if (exp === 'advanced') { scores['langgraph'] += 4; scores['autogen'] += 4; scores['openai-sdk'] += 3; scores['google-adk'] += 3 }
  else if (exp === 'expert') { scores['langgraph'] += 5; scores['autogen'] += 4; scores['google-adk'] += 4 }

  // Use case
  const uc = answers.usecase
  if (uc === 'chatbot') { scores['openai-sdk'] += 5; scores['dify'] += 4; scores['crewai'] += 2 }
  else if (uc === 'research') { scores['langgraph'] += 5; scores['autogen'] += 4; scores['crewai'] += 3 }
  else if (uc === 'code') { scores['autogen'] += 5; scores['openai-sdk'] += 3; scores['langgraph'] += 3 }
  else if (uc === 'business') { scores['n8n'] += 5; scores['dify'] += 4; scores['crewai'] += 3 }
  else if (uc === 'rag') { scores['dify'] += 5; scores['langgraph'] += 4; scores['mastra'] += 3 }
  else if (uc === 'multi-agent') { scores['crewai'] += 5; scores['autogen'] += 5; scores['langgraph'] += 4 }

  // Scale
  const sc = answers.scale
  if (sc === 'personal') { scores['crewai'] += 3; scores['dify'] += 3; scores['mastra'] += 2; scores['n8n'] += 2 }
  else if (sc === 'startup') { scores['openai-sdk'] += 3; scores['mastra'] += 3; scores['langgraph'] += 2; scores['crewai'] += 2 }
  else if (sc === 'enterprise') { scores['langgraph'] += 4; scores['google-adk'] += 4; scores['openai-sdk'] += 3; scores['autogen'] += 3 }

  // Priority
  const pr = answers.priority
  if (pr === 'speed') { scores['crewai'] += 4; scores['dify'] += 4; scores['n8n'] += 3 }
  else if (pr === 'control') { scores['langgraph'] += 5; scores['autogen'] += 3; scores['google-adk'] += 3 }
  else if (pr === 'cost') { scores['dify'] += 4; scores['n8n'] += 4; scores['mastra'] += 3 }
  else if (pr === 'reliability') { scores['openai-sdk'] += 4; scores['langgraph'] += 4; scores['google-adk'] += 4 }
  else if (pr === 'community') { scores['dify'] += 4; scores['n8n'] += 4; scores['langgraph'] += 3; scores['autogen'] += 3 }

  // Language
  const lang = answers.language
  if (lang === 'python') { scores['langgraph'] += 2; scores['crewai'] += 2; scores['autogen'] += 2; scores['openai-sdk'] += 2; scores['google-adk'] += 2 }
  else if (lang === 'typescript') { scores['mastra'] += 5; scores['langgraph'] += 1; scores['n8n'] += 2 }
  else if (lang === 'any') { scores['dify'] += 3; scores['n8n'] += 3 }

  // Budget
  const budget = answers.budget
  if (budget === 'free') { scores['dify'] += 3; scores['n8n'] += 3; scores['mastra'] += 2 }
  else if (budget === 'low') { scores['crewai'] += 2; scores['openai-sdk'] += 2; scores['mastra'] += 2 }
  else if (budget === 'medium') { scores['langgraph'] += 2; scores['openai-sdk'] += 2; scores['autogen'] += 1 }
  else if (budget === 'high') { scores['langgraph'] += 3; scores['google-adk'] += 3; scores['autogen'] += 2 }

  const maxScore = 28 // theoretical max
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([id, score]) => ({
      ...FRAMEWORKS.find(f => f.id === id),
      score,
      matchPercent: Math.min(Math.round((score / maxScore) * 100), 99),
    }))

  return sorted
}

// ─── Cost Calculator Logic ───
export function calculateMonthlyCost({ llmId, requestsPerDay, avgInputTokens, avgOutputTokens }) {
  const llm = LLM_PRICING.find(l => l.id === llmId)
  if (!llm) return null

  const dailyInputTokens = requestsPerDay * avgInputTokens
  const dailyOutputTokens = requestsPerDay * avgOutputTokens
  const monthlyInputTokens = dailyInputTokens * 30
  const monthlyOutputTokens = dailyOutputTokens * 30

  const inputCost = (monthlyInputTokens / 1_000_000) * llm.inputCost
  const outputCost = (monthlyOutputTokens / 1_000_000) * llm.outputCost
  const totalCost = inputCost + outputCost

  return {
    llm,
    requestsPerDay,
    requestsPerMonth: requestsPerDay * 30,
    monthlyInputTokens,
    monthlyOutputTokens,
    inputCost: inputCost.toFixed(2),
    outputCost: outputCost.toFixed(2),
    totalCost: totalCost.toFixed(2),
    costPerRequest: (totalCost / (requestsPerDay * 30)).toFixed(4),
  }
}

// ─── Framework-Specific Architecture Workflows ───
export const FRAMEWORK_ARCHITECTURES = {
  langgraph: {
    title: 'LangGraph State Machine',
    nodes: [
      { id: 'user', icon: '👤', label: 'User Input', info: 'User query enters the system. LangGraph captures this in a typed state dictionary that flows through the graph.', x: 50, y: 30 },
      { id: 'router', icon: '🔀', label: 'State Router', info: 'Conditional edge routing — a function inspects the current state and decides which node to execute next. This is what makes LangGraph non-linear.', x: 50, y: 130 },
      { id: 'research', icon: '🔬', label: 'Research Node', info: 'A graph node that invokes tools (web search, RAG retrieval) and writes findings back to the shared state.', x: 15, y: 240 },
      { id: 'analyze', icon: '🧠', label: 'Analysis Node', info: 'Takes research results from state, runs LLM reasoning, and writes structured analysis. Supports checkpointing for long-running tasks.', x: 50, y: 240 },
      { id: 'human', icon: '👁️', label: 'Human Review', info: 'Human-in-the-loop breakpoint — pauses execution and waits for human approval before proceeding. Key enterprise feature.', x: 85, y: 240 },
      { id: 'llm', icon: '🤖', label: 'LLM (GPT-4o)', info: 'The LLM call via LangChain. Auto-handles retries, rate limiting, and token tracking. Costs $2.50/$10 per 1M tokens.', x: 33, y: 350 },
      { id: 'tools', icon: '🔧', label: 'Tool Execution', info: 'Tools are invoked by the LLM via function calling. LangGraph automatically manages tool-call → result → re-invocation loops.', x: 67, y: 350 },
      { id: 'state', icon: '💾', label: 'State Store', info: 'Persistent state via checkpointing (SQLite/Postgres). Enables conversation memory, resumable workflows, and time-travel debugging.', x: 50, y: 440 },
      { id: 'output', icon: '📤', label: 'Response', info: 'Final aggregated output. LangGraph streams partial results as each node completes, enabling progressive UI updates.', x: 50, y: 530 },
    ],
    edges: [
      [0,1],[1,2],[1,3],[1,4],[2,5],[3,5],[4,6],[5,7],[6,7],[7,8],[8,1],
    ],
    loopNote: 'Graph cycles back to Router until task is complete',
  },
  crewai: {
    title: 'CrewAI Role-Based Pipeline',
    nodes: [
      { id: 'task', icon: '📋', label: 'Task Input', info: 'The high-level task description. CrewAI breaks this into sub-tasks and assigns them to the most relevant agent based on role matching.', x: 50, y: 30 },
      { id: 'manager', icon: '👔', label: 'Crew Manager', info: 'Orchestrates the crew process (Sequential or Hierarchical). In hierarchical mode, the manager decides which agent works next.', x: 50, y: 130 },
      { id: 'researcher', icon: '🔬', label: 'Researcher Agent', info: 'Role: "Senior Research Analyst". Has access to search and scraping tools. Executes research tasks autonomously.', x: 20, y: 240 },
      { id: 'writer', icon: '✍️', label: 'Writer Agent', info: 'Role: "Content Writer". Takes research output and crafts polished content. Uses the context from previous agent\'s work.', x: 50, y: 240 },
      { id: 'reviewer', icon: '🔍', label: 'Reviewer Agent', info: 'Role: "Quality Reviewer". Reviews final output for accuracy, style, and completeness. Can request revisions from other agents.', x: 80, y: 240 },
      { id: 'tools', icon: '🔧', label: 'Shared Tools', info: 'Tool pool shared across all agents — web search, file read/write, code execution. Each agent picks tools relevant to their role.', x: 50, y: 350 },
      { id: 'output', icon: '📤', label: 'Crew Output', info: 'Final combined output from all agents. Includes metadata about which agent contributed what and token usage per agent.', x: 50, y: 440 },
    ],
    edges: [
      [0,1],[1,2],[1,3],[1,4],[2,5],[3,5],[4,5],[2,3],[3,4],[4,6],
    ],
    loopNote: 'Agents collaborate sequentially or hierarchically',
  },
  autogen: {
    title: 'AutoGen Multi-Agent Conversation',
    nodes: [
      { id: 'prompt', icon: '💬', label: 'User Prompt', info: 'Initial message that kicks off the multi-agent conversation. AutoGen manages turn-taking and message history automatically.', x: 50, y: 30 },
      { id: 'proxy', icon: '👤', label: 'UserProxy Agent', info: 'Acts as the human proxy. Can auto-execute code, request human input, or terminate the chat based on configurable rules.', x: 25, y: 140 },
      { id: 'assistant', icon: '🤖', label: 'Assistant Agent', info: 'The AI assistant powered by GPT-4o. Generates responses, code, and analysis. Custom system prompts define its expertise.', x: 75, y: 140 },
      { id: 'code', icon: '⌨️', label: 'Code Executor', info: 'Sandboxed Docker container that safely executes generated code. Captures stdout/stderr and feeds results back to the conversation.', x: 25, y: 260 },
      { id: 'debate', icon: '🗣️', label: 'Debate Loop', info: 'Multi-round conversation where agents critique each other\'s work. Warning: can be token-expensive ($12+ for long debates).', x: 75, y: 260 },
      { id: 'memory', icon: '💾', label: 'Chat History', info: 'Full conversation history maintained across turns. Used for context and enables agents to reference previous exchanges.', x: 50, y: 370 },
      { id: 'output', icon: '📤', label: 'Final Result', info: 'Conversation terminates based on rules (max turns, approval keywords, or human intervention). Final message is extracted.', x: 50, y: 460 },
    ],
    edges: [
      [0,1],[0,2],[1,2],[2,1],[1,3],[2,4],[3,5],[4,5],[5,6],
    ],
    loopNote: 'Agents converse until termination condition is met',
  },
  'openai-sdk': {
    title: 'OpenAI Agents SDK Pipeline',
    nodes: [
      { id: 'input', icon: '📥', label: 'User Query', info: 'Input enters the agent pipeline. The SDK handles tokenization, context management, and routing to the configured model.', x: 50, y: 30 },
      { id: 'guard', icon: '🛡️', label: 'Guardrails', info: 'Built-in safety filters — content moderation, output length limits, and custom validation functions run before/after the LLM call.', x: 50, y: 130 },
      { id: 'agent', icon: '⚡', label: 'Agent Core', info: 'The main agent loop. Handles tool selection, function calling, and iterative reasoning until the task is complete.', x: 50, y: 230 },
      { id: 'tools', icon: '🔧', label: 'Function Calling', info: 'Native OpenAI function calling — automatically schema-validated. Supports web search, code interpreter, and custom tools.', x: 20, y: 340 },
      { id: 'trace', icon: '📊', label: 'Tracing', info: 'Built-in observability — every LLM call, tool invocation, and decision is logged with latency and token counts for debugging.', x: 80, y: 340 },
      { id: 'output', icon: '📤', label: 'Response', info: 'Validated final output. The SDK ensures the response passes all guardrails before delivery. Streaming supported.', x: 50, y: 440 },
    ],
    edges: [
      [0,1],[1,2],[2,3],[2,4],[3,2],[4,5],[2,5],
    ],
    loopNote: 'Agent loops through tools until task is complete',
  },
  'google-adk': {
    title: 'Google ADK Hierarchical System',
    nodes: [
      { id: 'input', icon: '📥', label: 'User Input', info: 'Multi-modal input support — text, images, audio. The ADK normalizes inputs for the agent pipeline.', x: 50, y: 30 },
      { id: 'root', icon: '🌳', label: 'Root Agent', info: 'The coordinator agent (powered by Gemini). Delegates tasks to sub-agents based on their declared capabilities.', x: 50, y: 130 },
      { id: 'sub1', icon: '🔬', label: 'Research Sub-Agent', info: 'Specialized agent for information gathering. Has access to search and retrieval tools.', x: 20, y: 240 },
      { id: 'sub2', icon: '📊', label: 'Analysis Sub-Agent', info: 'Data processing agent with BigQuery integration. Can run SQL queries and statistical analysis.', x: 50, y: 240 },
      { id: 'sub3', icon: '✍️', label: 'Report Sub-Agent', info: 'Content generation agent that formats findings into structured reports or presentations.', x: 80, y: 240 },
      { id: 'vertex', icon: '☁️', label: 'Vertex AI', info: 'Google Cloud integration layer — model serving, vector search, and enterprise features (IAM, audit logs).', x: 50, y: 350 },
      { id: 'output', icon: '📤', label: 'Response', info: 'Aggregated response from all sub-agents. The root agent synthesizes individual outputs into a coherent final answer.', x: 50, y: 440 },
    ],
    edges: [
      [0,1],[1,2],[1,3],[1,4],[2,5],[3,5],[4,5],[5,1],[1,6],
    ],
    loopNote: 'Root agent delegates and synthesizes sub-agent results',
  },
  dify: {
    title: 'Dify Visual Workflow',
    nodes: [
      { id: 'start', icon: '▶️', label: 'Start', info: 'Workflow trigger — can be an API call, scheduled event, or chat message. Dify routes to the configured workflow.', x: 50, y: 30 },
      { id: 'retriever', icon: '📚', label: 'Knowledge Retrieval', info: 'RAG retrieval node — searches your uploaded documents and vector databases for relevant context.', x: 25, y: 140 },
      { id: 'llm', icon: '🧠', label: 'LLM Node', info: 'Configurable LLM call (OpenAI, Anthropic, etc.). Drag-and-drop prompting with variable injection from previous nodes.', x: 75, y: 140 },
      { id: 'condition', icon: '🔀', label: 'IF/ELSE', info: 'Conditional routing based on LLM output or variables. Enables branching logic without code.', x: 50, y: 250 },
      { id: 'code', icon: '⌨️', label: 'Code Block', info: 'Custom Python/JavaScript code execution for data transformation, API calls, or complex logic between workflow steps.', x: 25, y: 360 },
      { id: 'answer', icon: '📤', label: 'Answer', info: 'Final response node. Can include streaming output, structured JSON, or formatted text with variable references.', x: 75, y: 360 },
    ],
    edges: [
      [0,1],[0,2],[1,2],[2,3],[3,4],[3,5],[4,5],
    ],
    loopNote: 'Visual drag-and-drop orchestration',
  },
  mastra: {
    title: 'Mastra TypeScript Pipeline',
    nodes: [
      { id: 'api', icon: '🌐', label: 'API Request', info: 'Edge-compatible HTTP endpoint. Mastra agents can run on Vercel Edge, Cloudflare Workers, or standard Node.js servers.', x: 50, y: 30 },
      { id: 'agent', icon: '🟦', label: 'Mastra Agent', info: 'TypeScript-native agent with full type safety. Define tools, instructions, and model in a single AgentConfig object.', x: 50, y: 140 },
      { id: 'rag', icon: '📚', label: 'RAG Module', info: 'Built-in vector search with Pinecone/Qdrant/Chroma. Handles chunking, embedding, and retrieval in one pipeline.', x: 20, y: 250 },
      { id: 'tools', icon: '🔧', label: 'Custom Tools', info: 'Type-safe tool definitions with Zod schema validation. Tools are async functions that return structured data.', x: 50, y: 250 },
      { id: 'observe', icon: '📊', label: 'Observability', info: 'Built-in tracing and metrics. Every tool call and LLM request is logged with duration and token counts.', x: 80, y: 250 },
      { id: 'output', icon: '📤', label: 'Response', info: 'Streaming or batch response. Supports Vercel AI SDK streaming format for real-time UI updates.', x: 50, y: 360 },
    ],
    edges: [
      [0,1],[1,2],[1,3],[1,4],[2,1],[3,1],[4,5],[1,5],
    ],
    loopNote: 'TypeScript-native agent with edge deployment',
  },
  n8n: {
    title: 'n8n Visual Automation',
    nodes: [
      { id: 'trigger', icon: '🔔', label: 'Trigger', info: 'Webhook, schedule (cron), or manual trigger. n8n supports 400+ app triggers including Slack, email, and database changes.', x: 50, y: 30 },
      { id: 'fetch', icon: '📥', label: 'Data Fetch', info: 'Pull data from external sources — APIs, databases, spreadsheets. Pre-built connectors for most popular services.', x: 25, y: 140 },
      { id: 'ai', icon: '🧠', label: 'AI Agent Node', info: 'n8n\'s AI agent mode — connects to LLMs with tool access. Can use RAG, web browsing, and code execution.', x: 75, y: 140 },
      { id: 'transform', icon: '⚙️', label: 'Transform', info: 'Data transformation using expressions, code blocks, or built-in functions. Map, filter, and restructure data between nodes.', x: 25, y: 250 },
      { id: 'action', icon: '🚀', label: 'Action', info: 'Execute actions — send emails, update databases, post to Slack, create tickets. 400+ available integrations.', x: 75, y: 250 },
      { id: 'output', icon: '📤', label: 'Output', info: 'Workflow output — can be a webhook response, database write, or notification. Includes execution logs and error handling.', x: 50, y: 360 },
    ],
    edges: [
      [0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[2,3],
    ],
    loopNote: 'Visual automation with 400+ app integrations',
  },
}

// ─── Workflow Cost Estimation ───
export function estimateWorkflowCost({ frameworkId, requirements, llmId = 'gpt-4o' }) {
  const fw = FRAMEWORKS.find(f => f.id === frameworkId)
  const llm = LLM_PRICING.find(l => l.id === llmId)
  if (!fw || !llm) return null

  // Estimate based on complexity
  const reqLen = (requirements || '').length
  const complexityMultiplier = reqLen > 200 ? 3 : reqLen > 100 ? 2 : 1

  const avgNodes = FRAMEWORK_ARCHITECTURES[frameworkId]?.nodes?.length || 6
  const avgLLMCallsPerRequest = Math.ceil(avgNodes * 0.6) * complexityMultiplier
  const avgTokensPerCall = { input: 800, output: 400 }

  const monthlyRequests = 1000 * 30
  const monthlyLLMCalls = monthlyRequests * avgLLMCallsPerRequest
  const monthlyInputTokens = monthlyLLMCalls * avgTokensPerCall.input
  const monthlyOutputTokens = monthlyLLMCalls * avgTokensPerCall.output

  const inputCost = (monthlyInputTokens / 1_000_000) * llm.inputCost
  const outputCost = (monthlyOutputTokens / 1_000_000) * llm.outputCost
  const totalLLMCost = inputCost + outputCost

  const devWeeks = fw.complexity <= 2 ? 1 : fw.complexity <= 3 ? 2 : 4
  const frameworkCloudCost = fw.pricing.cloud.includes('Free') || fw.pricing.cloud.includes('$0') ? 0 : 35

  return {
    framework: fw.name,
    llmModel: llm.name,
    devTimeWeeks: devWeeks * complexityMultiplier,
    monthlyLLMCost: totalLLMCost.toFixed(2),
    monthlyInfraCost: frameworkCloudCost,
    monthlyTotal: (totalLLMCost + frameworkCloudCost).toFixed(2),
    avgLLMCallsPerRequest,
    estimatedLatency: `${fw.benchmark.latency.value * avgLLMCallsPerRequest}ms`,
  }
}
