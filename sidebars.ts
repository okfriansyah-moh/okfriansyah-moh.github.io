import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Systems',
      items: [
        'systems/md-ame-autonomous-media-engine',
        'systems/polymarket-trading-agent',
        'systems/shorts-generator-pipeline',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/deterministic-ai-pipelines',
        'concepts/database-state-machines',
        'concepts/ai-orchestration-patterns',
        'concepts/llm-guardrails',
        'concepts/ai-document-coherence',
        'concepts/deterministic-agentic-orchestrator',
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/md-ame',
        'projects/polymarket-agent',
        'projects/ares',
      ],
    },
  ],
};

export default sidebars;
