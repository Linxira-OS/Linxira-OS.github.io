---
title: "AI 贡献公约：我们鼓励用 AI 写代码——但请如实披露你的模型与 Agent"
date: 2026-10-07
tag: announcement
lang: zh
desc: "Linxira OS 本身就深度使用 AI 工具构建——我们不是禁止 AI 贡献，而是要求诚实。外部贡献者必须披露实际使用的全部模型与 Agent 工具。我们按模型能力档位（参照 Artificial Analysis Intelligence Index 公开榜单）决定人工/AI 审阅深度，分五档。组织内合作人员凭 AGENTS.md 信任链豁免逐次披露。"
---

# AI 贡献公约：我们鼓励用 AI 写代码——但请如实披露你的模型与 Agent

> 2026-10-07 · 立场声明

## 我们的出发点

Linxira OS 本身就推崇系统自带的 agent 工具和 AI 工具——这个发行版的
构建脚本、安装器修复、发布链、文档、测试，大量由 AI agent 完成。
**我们鼓励 AI 贡献代码，而且希望你用好。**

但"用好"的前提是**我们知道你用了什么**。

## 为什么要求披露模型和 Agent

不同模型的代码质量差异巨大。只有如实披露实际使用的**每一个模型、
每一个 Agent 工具、运行时环境**，我们才能：

1. **判断代码的大体质量档位**
2. **决定审阅深度**——是人工逐行审，还是 AI 辅助快速验证
3. **建立信任档案**——多次高质量贡献获得更快审阅通道

## 公约六条

### 1. 我们鼓励 AI 贡献——用好它

不是"允许"而是"鼓励"。用最好的模型、最好的 Agent 工具。AI 是这个
项目的一部分。

### 2. 外部贡献者：必须完整披露

**非组织内合作人员的所有外部贡献**，提交 PR 时必须披露**实际使用的
每一个模型和每一个 Agent 工具**——用了几个报几个，中途换过也报。

- **使用的全部模型**：例如 GLM-5.1、Claude Opus 4.5、GPT-5.1
- **使用的全部 Agent 工具**：例如 OMP/zeta-c、Claude Code、Cursor
- **运行时环境**：在什么系统上开发

格式示例：
```
AI Disclosure:
- Models: GLM-5.1 (max), Claude Sonnet 4.5
- Agents: zeta-c (OMP), Claude Code
- Runtime: Linxira WSL (Arch Linux)
```

### 3. 诚实是底线

**如实报告你实际用了什么**。用了两个模型报两个，用了三个 Agent 报
三个。谎报比用差模型严重一个量级——虚假披露直接拒 PR，多次发现拉黑。

### 4. 按模型档位分级审阅（五档）

参照 [Artificial Analysis Intelligence Index](https://artificialanalysis.ai)
公开榜单，结合我们的实际经验，做如下调整：

| 档位 | 模型 | 审阅方式 |
|---|---|---|
| **S 级** | Claude Opus 4.5 (max)、Claude Sonnet 4.5 (max)、Astra GPT-6、Gemini 4、GPT-5.1、Muse Spark 1.3 (max)、GLM-5.3 (max) | AI 辅助审阅 + 抽样人工 |
| **A 级** | **DeepSeek V4 全系（上调一档）**、Gemini 3 Flash、Gemini 3 Flash (high)、Kimi K2.5 (max)、Mistral Large 3 | AI 全审 + 关键路径人工 |
| **B 级** | **Grok 4.7（中间档）**、**MiMo-V2.5-Pro（放低）**、DeepSeek V4 (high)、Mistral Large 4 Preview | 人工全审 |
| **C 级** | **Step 5 Preview（放低）**、Luna 27B 27B (high)、Qwen 3.8 27B (high)、K2.5 32B (medium)、MiniMax M3 (medium) | 人工逐行审 |
| **D 级**（本地部署） | **仅收 Qwen 3.8 27B**——其余本地部署小模型提交的代码不予接收 | 人工逐行审 + 补充测试 |

### 5. 组织内合作人员：信任链豁免

已签署 AGENTS.md 并被组织认可的合作人员，凭已建立的信任链**豁免逐次
披露**——但 AGENTS.md 本身必须声明使用的 Agent 工具链。

### 6. 测试是入场券，不看出身

无论什么模型写的：行为变更必须带能失败的测试；发布链变更必须本地
跑通全链。模型档位影响**审阅方式**，不影响**测试标准**。

## 这不是门槛，这是加速器

- **S/A 级模型的 PR** → 走快速通道（AI 审 + 抽样人工），合并更快
- **知道质量档位** → 维护者把人工时间用在真正需要人的地方
- **实证数据** → "什么模型在什么场景好用"反哺我们自身工具链选型

---

*Linxira OS 项目组 · 本文由 GLM-5.1 (max) 起草，人类裁决定稿。*
