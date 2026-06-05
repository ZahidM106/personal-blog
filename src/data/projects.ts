export interface Project {
  title:       string;
  description: string;
  longDesc:    string;
  tags:        string[];
  url?:        string;
  github?:     string;
  accent:      string;   // CSS color for card accent
  icon:        string;   // emoji icon
  featured:    boolean;
  wip:         boolean;
}

export const projects: Project[] = [
  {
    title:       'Multi-Jurisdiction Tax Dashboard',
    description: 'A personal dashboard that tracks UAE FTA, UK HMRC, and Pakistan FBR deadlines, pending returns, and compliance status across all client portfolios.',
    longDesc:    'Built to replace a tangle of spreadsheets. Pulls due dates from a local JSON config, highlights overdue items in red, and generates a weekly summary email. Saves ~2 hours per week.',
    tags:        ['TypeScript', 'React', 'Tailwind', 'UAE VAT', 'FBR', 'HMRC'],
    github:      'https://github.com/zahid-mehmood',
    accent:      '#00E5FF',
    icon:        '📊',
    featured:    true,
    wip:         false,
  },
  {
    title:       'VAT Reconciliation Tool',
    description: 'An Excel/VBA-based tool that auto-reconciles output and input VAT from Xero and QuickBooks exports against a UAE VAT 201 return template.',
    longDesc:    'Reduces the monthly reconciliation process from 4 hours to under 30 minutes. Validates rounding, flags mismatched tax codes, and highlights partial exemption adjustments that need manual review.',
    tags:        ['Excel VBA', 'Xero API', 'UAE VAT', 'Automation'],
    accent:      '#7C3AED',
    icon:        '🧮',
    featured:    true,
    wip:         false,
  },
  {
    title:       'FBR IRIS Filing Helper',
    description: 'A Python script that pre-fills Pakistani FBR IRIS income tax return XML from a structured data template, cutting manual data entry errors.',
    longDesc:    'Handles salary, rental income, foreign remittances, and tax credits. Outputs a validated XML that can be imported directly into the IRIS portal. Tested across 20+ individual returns for the 2024–25 tax year.',
    tags:        ['Python', 'XML', 'FBR IRIS', 'Tax Automation'],
    github:      'https://github.com/zahid-mehmood',
    accent:      '#EC4899',
    icon:        '🤖',
    featured:    true,
    wip:         true,
  },
];
