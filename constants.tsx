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
    configuration: {
      'Data Ingestion Rate': '500 GB/hr',
      'Anomaly Threshold': 0.98,
      'Default Log Level': 'WARN',
      'Retention Policy': '90 days'
    },
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
    configuration: {
      'Default Framework': 'TensorFlow',
      'Learning Rate': 0.001,
      'Default Batch Size': 64,
      'GPU Allocation': '80%'
    },
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
    configuration: {
      'Default Resolution': '4096x4096',
      'Output Format': 'PNG',
      'Creativity Level': 0.85,
      'Style Preference': 'Photorealistic'
    },
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
    configuration: {
      'Cloud Provider': 'GCP',
      'Default Region': 'us-central1',
      'Firewall Policy': 'Strict',
      'Auto-scaling': 'Enabled'
    },
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
    configuration: {
      'Default Stack': 'React/Node.js',
      'API Rate Limit': '1000 req/min',
      'CORS Policy': 'Origin-Restricted',
      'CI/CD Pipeline': 'Active'
    },
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
    configuration: {
      'Audit Frequency': '24 hours',
      'Encryption Standard': 'AES-256',
      'Backup Schedule': 'Hourly',
      'Threat Level': 'Guarded'
    },
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
    configuration: {
      'Max Concurrent Tasks': 25,
      'API Timeout (ms)': 30000,
      'Retry Policy': 'Exponential Backoff',
      'Webhook Listeners': 12
    },
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
    configuration: {
      'Reporting Interval': '6 hours',
      'KPI Target: Uptime': '99.99%',
      'Strategic Focus': 'Growth',
      'Resource Allocation': 'Balanced'
    },
  },
  {
    name: 'Zephyr',
    role: 'Network Analyst',
    status: 'Idle',
    persona: {
      description: 'Proactive network traffic monitor and security analyst, adept at identifying and mitigating threats with a calm and focused demeanor. Specializes in real-time anomaly detection and network optimization.',
      tone: 'Calm, focused, analytical',
    },
    superpowers: [
      'Intrusion detection and prevention',
      'Real-time network traffic analysis',
      'Vulnerability assessment',
      'Network performance optimization',
    ],
    configuration: {
      'Monitoring Interval': '30 seconds',
      'Alert Threshold': 'High',
      'Default Protocol': 'TCP/IP',
      'Logging Level': 'INFO'
    },
  }
];