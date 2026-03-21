# AgentLens 🚀

**Production-grade, Multi-Agent Framework Visualizer & Dynamic Workflow Generator**

AgentLens is a cutting-edge web application tailored for Enterprise and Multinational Corporation (MNC) engineering teams. It allows architects to seamlessly visualize, design, and bootstrap autonomous AI agent workflows dynamically by describing their core project requirements.

## 🌟 Key Features

### 1. ⚡ Dynamic AI Workflow Generation
Leverage a suite of industry-leading AI models to generate production-ready architectures instantly:
* **7+ Top-Tier AI Providers Supported:** Seamlessly switch between **Google Gemini**, **OpenRouter**, **Groq**, **OpenAI**, **Anthropic**, **DeepSeek**, and **xAI (Grok)**.
* **Smart Rate Limiter & Fallback Mitigation:** Generous built-in APIs combined with elegant logic that automatically retries rate-limited generations and prevents service interruption.
* **Bring Your Own Key (BYOK):** End-users can firmly secure their platform by inserting discrete API Keys *per provider*, directly injected into `localStorage` with zero backend exposure.

### 2. 🛡 Supported Framework Architectures
The output correctly identifies exact logic flows required by current industry standards:
* **CrewAI** (Sequential & Hierarchical Delegation)
* **LangChain / LangGraph** (Stateful Multi-Actor graphs)
* **Microsoft AutoGen** (Conversational Swarm Optimization)
* **OpenAI Swarm** (Routine-managed handoffs)

### 3. 💸 Real-time Cost Profiling
Each dynamically generated node is evaluated with live pricing data:
* Instant Cost-Per-Run estimations for standard execution models.
* Token Usage predictions ensuring budget management isn't an afterthought.

## 🚀 Getting Started

Ensure you have Node.js 18+ installed on your system.

### 1. Clone & Install
```bash
git clone https://github.com/Vuttisai/AgentLense/t
cd agentlens
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory to utilize the built-in free tier allocations. Example config:
```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_GROQ_API_KEY=your_groq_key
```

### 3. Start the Dev Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to experience the dynamic visualizer.

## 🔧 Technology Stack
* **Frontend:** React 18, Vite, Vanilla CSS Modules
* **Icons:** Phosphor Icons
* **Hosting (Recommended):** Cloudflare Pages, Vercel, or Netlify

## 📝 Troubleshooting & FAQ

**"Present API Limit May Exceed"**
AgentLens limits its free built-in quota mathematically to prevent massive overages. If you see our sleek overlay asking you to connect your provider, simply click the button and supply an API key of your choice to ungate the platform to unlimited usage!

## 🤝 Contributing
For bug reports, feature requests, or enterprise SLA inquiries, please file an issue or submit a pull request. We ensure code reviews within 12 business hours.

---
*Built for scale. Designed for autonomy.*
