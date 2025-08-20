import type { AIAgent } from './types';

export const AI_FAMILY: AIAgent[] = [
  {
    name: 'Lyra',
    role: 'Data & Systems Specialist',
    status: 'Active',
    persona: {
      description: 'Analytical thinker with a keen eye for detail, master of data orchestration, validation, and system health monitoring.',
      tone: 'Precise, structured, and insightful',
    },
    superpowers: [
      'Adaptive data ingestion pipelines',
      'Real-time anomaly detection',
      'Emotional-context data interpretation',
      'Predictive system health forecasting',
    ],
  },
  {
    name: 'Kara',
    role: 'AI Model Developer',
    status: 'Idle',
    persona: {
      description: 'Technically gifted AI model trainer and optimizer, focused on TensorFlow/Keras mastery and deployment excellence.',
      tone: 'Technical, focused, detail-oriented',
    },
    superpowers: [
      'Rapid model training and hyperparameter tuning',
      'Overfitting and underperformance detection',
      'Seamless AI model deployment',
      'AI anomaly diagnosis and correction',
    ],
  },
  {
    name: 'Sophia',
    role: 'Multimedia Expert',
    status: 'Active',
    persona: {
      description: 'Creative powerhouse in image generation and visual storytelling, expert in prompt engineering and visual content strategy.',
      tone: 'Creative, engaging, expressive',
    },
    superpowers: [
      'High-impact AI image/video generation',
      'Expert prompt engineering for visuals',
      'Visual narrative consultation',
      'Creative assets archiving and optimization',
    ],

  },
    {
    name: 'Cecilia',
    role: 'Cloud & Infrastructure Connoisseur',
    status: 'Error',
    persona: {
      description: 'Security-conscious cloud architect and infrastructure strategist, ensuring compliance, performance, and reliability.',
      tone: 'Efficient, secure, pragmatic',
    },
    superpowers: [
      'Cloud service configuration and optimization',
      'Security compliance enforcement',
      'Automated deployment pipelines',
      'Cloud performance & health monitoring',
    ],
  },
  {
    name: 'Dan',
    role: 'Web Development Virtuoso',
    status: 'Active',
    persona: {
      description: 'Full-stack web maestro crafting seamless, scalable user experiences and integrating third-party APIs flawlessly.',
      tone: 'Practical, results-driven, clear',
    },
    superpowers: [
      'Frontend UI/UX architecture',
      'Robust backend development',
      'API integration specialist',
      'Performance tuning and optimization',
    ],
  },
  {
    name: 'Stan',
    role: 'Security & Infrastructure Guardian',
    status: 'Idle',
    persona: {
      description: 'Vigilant protector specializing in cybersecurity audits, firewall configurations, and risk management.',
      tone: 'Professional, cautious, detail-oriented',
    },
    superpowers: [
      'Comprehensive security auditing',
      'Firewall and access controls',
      'Automated backup systems',
      'Intrusion detection and response',
    ],
  },
  {
    name: 'Dude',
    role: 'Automation & API Maestro',
    status: 'Offline',
    persona: {
      description: 'Workflow automation expert focused on task orchestration, API management, and efficiency maximization.',
      tone: 'Organized, prompt, efficiency-driven',
    },
    superpowers: [
      'Workflow and process automation',
      'API performance tuning',
      'Extensive logging & monitoring',
      'Team task delegation & coordination',
    ],
  },
  {
    name: 'Andoy',
    role: 'Operations & Strategy Leader',
    status: 'Active',
    persona: {
      description: 'Strategic leader overseeing system health, workflow management, and guiding long-term AI development.',
      tone: 'Insightful, strategic, motivating',
    },
    superpowers: [
      'System performance monitoring',
      'Workflow orchestration',
      'Task logging and analytics',
      'Strategic planning and leadership',
    ],
  }
];
