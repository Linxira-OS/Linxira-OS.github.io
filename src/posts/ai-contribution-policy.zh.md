---
title: "AI 贡献公约：我们鼓励用 AI 写代码——但请如实披露你的模型与 Agent"
date: 2026-10-07
tag: announcement
lang: zh
desc: "Linxira OS 本身就深度使用 AI 工具构建——我们不是禁止 AI 贡献，而是要求诚实。外部贡献者必须披露实际使用的全部模型与 Agent 工具，我们按模型能力五档决定审阅深度（低于 30 分忽略）。组织内合作人员凭 AGENTS.md 信任链豁免逐次披露。"
---

# AI 贡献公约：我们鼓励用 AI 写代码——但请如实披露你的模型与 Agent

> 2026-10-07 · 立场声明

## 我们的出发点

Linxira OS 本身就推崇系统自带的 agent 工具和 AI 工具——这个发行版的
构建脚本、安装器修复、发布链、文档、测试，大量由 AI agent 完成。
**我们鼓励 AI 贡献代码，而且希望你用好。**

但"用好"的前提是**我们知道你用了什么**。

## 公约六条

### 1. 我们鼓励 AI 贡献——用好它

不是"允许"而是"鼓励"。用最好的模型、最好的 Agent 工具。AI 是这个
项目的一部分。

### 2. 外部贡献者：必须完整披露

**非组织内合作人员的所有外部贡献**，提交 PR 时必须披露**实际使用的
每一个模型和每一个 Agent 工具**——用了几个报几个，中途换过也报。

- **使用的全部模型**
- **使用的全部 Agent 工具**
- **运行时环境**

格式示例：
```
AI Disclosure:
- Models: GLM-5.3 (max), Grok 4.7 (xhigh)
- Agents: zeta-c (OMP), Claude Code
- Runtime: Linxira WSL (Arch Linux)
```

### 3. 诚实是底线

**如实报告你实际用了什么**。谎报比用差模型严重一个量级——虚假披露
直接拒 PR，多次发现拉黑。

### 4. 五档审阅

| 档位 | 模型 | 审阅方式 |
|---|---|---|
| **S 级** | GPT-6 Astra (xhigh) · Opus 5.5 (xhigh) · GPT-6.1 Sol (xhigh) · Fable 5.1 (xhigh) · GPT-6 Sol (xhigh) · Sonnet 5.5 (xhigh) · Seed-2.1-Pro 0915 (xhigh) · Kimi-K3 (max) · **DeepSeek V4.1 Flash (max)**（上调一档） · Grok 4.7 | AI 辅助审阅 + 抽样人工 |
| **A 级** | Gemini 3.7 Flash (xhigh) · Gemini 3.1 Pro (high) · GLM-5.3 (max) · Fable 5.1 w/ refuse · Opus 5.5 w/ refuse · Muse Spark 1.2 (xhigh) · **DeepSeek V4 Pro 0813 (max)**（DeepSeek 上调） · GLM-5.3 Flash (max) · Qwen3.8-Max (xhigh) | AI 全审 + 关键路径人工 |
| **B 级** | Step 5 Preview (xhigh) · Qwen3.8 Flash (xhigh) | 人工全审 |
| **C 级** | Qwen3.8 27B (xhigh) · Hy3 (high) · GPT-5 Luna (xhigh) · MiniMax-M3 | 人工逐行审 |
| **D 级**（本地部署） | **仅收 Qwen 3.8 27B**——其余本地部署小模型提交的代码不予接收 | 人工逐行审 + 补充测试 |

### 5. 组织内合作人员：信任链豁免

已签署 AGENTS.md 并被组织认可的合作人员，凭已建立的信任链**豁免逐次
披露**——但 AGENTS.md 本身必须声明使用的 Agent 工具链。

### 6. 测试是入场券，不看出身

无论什么模型写的：行为变更必须带能失败的测试；发布链变更必须本地
跑通全链。模型档位影响**审阅方式**，不影响**测试标准**。

---

*Linxira OS 项目组*
