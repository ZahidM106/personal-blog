import { motion, useReducedMotion } from 'framer-motion';

interface TimelineItem {
  year:    string;
  role:    string;
  org:     string;
  desc:    string;
  current: boolean;
  type:    'work' | 'edu';
}

const TIMELINE: TimelineItem[] = [
  {
    year:    'Apr 2026 – Present',
    role:    'CIMA (UK) — Strategic Case Study',
    org:     'Chartered Institute of Management Accountants',
    desc:    '15 of 16 exemptions awarded based on my BS degree. Only the Strategic Case Study exam remains for the full CGMA designation.',
    current: true,
    type:    'edu',
  },
  {
    year:    'Aug 2025 – Present',
    role:    'Assistant Accountant',
    org:     'HA & Co. Chartered Certified Accountants',
    desc:    'UK bookkeeping, VAT workings, Self Assessment returns, and Corporate Tax preparation using Xero, FreeAgent, TaxCalc, and Capium across a portfolio of SME clients.',
    current: true,
    type:    'work',
  },
  {
    year:    'Jul 2024 – Present',
    role:    'Accounts Executive',
    org:     '1Financial-FZCO',
    desc:    'End-to-end bookkeeping for UAE-based clients using QuickBooks, Zoho Books, and Xero. Quarterly VAT and Corporate Tax returns under UAE FTA regulations. FBR IRIS income tax filing.',
    current: true,
    type:    'work',
  },
  {
    year:    'Aug 2021 – Jul 2025',
    role:    'BS Accounting and Finance',
    org:     'Hailey College of Commerce, University of the Punjab',
    desc:    'CGPA 3.80/4.0 · OPM 85/100 · 135 Credit Hours. Coursework: Financial Accounting, Corporate Finance, Financial Risk Management, Audit & Assurance, Financial Reporting, Forensic Accounting.',
    current: false,
    type:    'edu',
  },
  {
    year:    'Jan 2024 – Mar 2024',
    role:    'Internal Audit Internship',
    org:     'Bizware Pvt. Ltd.',
    desc:    'On-ground internal audit visits: sales vouching, bank reconciliation, inventory count verification. Excel-based tax calculation workings.',
    current: false,
    type:    'work',
  },
];

const TYPE_COLORS = {
  work: 'bg-neon-cyan border-neon-cyan',
  edu:  'bg-neon-violet border-neon-violet',
};

export default function Timeline() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-transparent"
        aria-hidden="true"
      />

      <ul className="space-y-10 pl-12">
        {TIMELINE.map((item, i) => (
          <motion.li
            key={i}
            initial={reduce ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {/* Dot */}
            <div
              className={`absolute left-[11px] w-2.5 h-2.5 rounded-full border-2 bg-base ${
                item.current ? TYPE_COLORS[item.type] : 'border-white/20 bg-base'
              }`}
              style={{ marginTop: '6px' }}
              aria-hidden="true"
            />

            {/* Card */}
            <div className="glass p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-display font-semibold text-text-primary text-lg leading-snug">
                    {item.role}
                  </h3>
                  <p className="text-sm text-neon-cyan font-medium mt-0.5">{item.org}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.current && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                      Current
                    </span>
                  )}
                  <time className="text-xs text-text-muted whitespace-nowrap">{item.year}</time>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
