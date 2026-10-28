// Bio SDK 产品页的版本与数量唯一入口 —— 页面里不要再硬编码。
//
// snapshot 由 scripts/fetch-bio-sdk-data.mjs 生成:
//   版本/能力/领域 <- Cargo.toml + capabilities/catalog.json
//   文档/skills/工作流 <- git tree
//   运行时 <- runtimes/catalog.json
// 部署时构建前会刷新;取不到就沿用仓库里的快照,页面永远有值。
import snapshot from './bio-sdk.json';

export type BioSdkFacts = {
  version: string;
  capabilities: {
    total: number;
    available: number;
    experimental: number;
    planned: number;
    categories: number;
  };
  docs: number;
  skills: number;
  workflows: number;
  runtimes: number;
  fetchedAt: string;
  source: string;
};

export const bioSdk = snapshot as BioSdkData;

type BioSdkData = BioSdkFacts;
