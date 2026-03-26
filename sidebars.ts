import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Systems',
      items: [
        'systems/md-ame-autonomous-media-engine',
        'systems/polymarket-trading-agent',
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
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      items: [
        'projects/md-ame',
        'projects/polymarket-agent',
      ],
    },
  ],
};

export default sidebars;
