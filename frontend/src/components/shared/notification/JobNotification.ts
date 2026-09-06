export interface JobNotification {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  publishedDate: string;
  sourceUrl: string;
  status: 'Active' | 'Closed';
}

export const JobNotifications: JobNotification[] = [
  {
    id: 'upsc-nda-2-admit-card-2026',
    title: 'UPSC NDA 2 Admit Card 2026',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'Defence',
    description:
      'UPSC NDA 2 Admit Card 2026 is now available. Candidates can download their hall ticket and check examination details.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/upsc-nda-2-admit-card-2026-3066177',
    status: 'Active',
  },

  {
    id: 'upsc-cds-2-admit-card-2026',
    title: 'UPSC CDS 2 Admit Card 2026',
    organization: 'Union Public Service Commission (UPSC)',
    category: 'Defence',
    description:
      'UPSC CDS 2 Admit Card 2026 notification. Candidates can check and download the admit card from the official source.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/upsc-cds-2-admit-card-2026-3066127',
    status: 'Active',
  },

  {
    id: 'drdo-cvrde-iti-apprentice-2026',
    title: 'DRDO CVRDE ITI Apprentice Trainees 2026',
    organization: 'DRDO - CVRDE',
    category: 'Defence',
    description:
      'ITI Apprentice Trainees recruitment notification for defence research opportunities.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/drdo-cvrde-iti-apprentice-trainees-recruitment-2026-walk-in-for-93-posts-3065949',
    status: 'Active',
  },

  {
    id: 'drdo-npol-jrf-2026',
    title: 'DRDO NPOL Junior Research Fellow 2026',
    organization: 'DRDO - NPOL',
    category: 'Defence',
    description:
      'Junior Research Fellow recruitment notification for defence research.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/drdo-npol-junior-research-fellow-recruitment-2026-walk-in-3065748',
    status: 'Active',
  },

  {
    id: 'bel-deputy-engineer-2026',
    title: 'BEL Deputy Engineer Recruitment 2026',
    organization: 'Bharat Electronics Limited',
    category: 'Defence & Aerospace',
    description: 'BEL Deputy Engineer online recruitment notification.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/bel-deputy-engineer-recruitment-2026-apply-online-for-14-posts-3065890',
    status: 'Active',
  },

  {
    id: 'bel-apprentice-2026',
    title: 'BEL Apprentice Recruitment 2026',
    organization: 'Bharat Electronics Limited',
    category: 'Defence',
    description: 'BEL Apprentice recruitment and walk-in notification.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/bel-apprentice-recruitment-2026-3066146',
    status: 'Active',
  },

  {
    id: 'cisf-asi-paramedical-2026',
    title: 'CISF ASI Paramedical Staff PST/DV Admit Card 2026',
    organization: 'Central Industrial Security Force',
    category: 'Defence',
    description: 'CISF ASI Paramedical Staff PST/DV admit card notification.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/cisf-asi-paramedical-staff-pst-and-dv-admit-card-2026-3065692',
    status: 'Active',
  },

  {
    id: 'gsl-trainee-project-executive-2026',
    title: 'GSL Trainee Project Executive Recruitment 2026',
    organization: 'Goa Shipyard Limited',
    category: 'Defence & Shipbuilding',
    description: 'Trainee Project Executive online recruitment notification.',
    publishedDate: '06 Sep 2026',
    sourceUrl:
      'https://www.freejobalert.com/articles/gsl-trainee-project-executive-recruitment-2026-apply-online-for-31-posts-3066096',
    status: 'Active',
  },

  {
    id: 'beml-apprentice-2026',
    title: 'BEML 1346 Apprentice Recruitment 2026',
    organization: 'BEML Limited',
    category: 'Defence & Aerospace',
    description:
      'BEML Apprentice recruitment notification for defence and aerospace opportunities.',
    publishedDate: '06 Sep 2026',
    sourceUrl: 'url?id=263',
    status: 'Active',
  },
];



export interface RibbonMessage {
  id: string;
  message: string;
  link: string;
  className?: string;
}

export const RibbonMessages: RibbonMessage[] = [
  {
    id: 'upsc-nda-2-admit-card-2026',
    message: 'UPSC NDA 2 Admit Card 2026 Out – Download your hall ticket.',
    link: 'https://www.freejobalert.com/articles/upsc-nda-2-admit-card-2026-3066177',
  },
  {
    id: 'upsc-cds-2-admit-card-2026',
    message: 'UPSC CDS 2 Admit Card 2026 Out – Check your exam center.',
    link: 'https://www.freejobalert.com/articles/upsc-cds-2-admit-card-2026-3066127',
  },
  {
    id: 'drdo-cvrde-iti-apprentice-2026',
    message:
      'DRDO CVRDE ITI Apprentice Trainees Walkin 2026 – Apply for Defense Research.',
    link: 'https://www.freejobalert.com/articles/drdo-cvrde-iti-apprentice-trainees-recruitment-2026-walk-in-for-93-posts-3065949',
  },
  {
    id: 'drdo-npol-jrf-2026',
    message: 'DRDO NPOL Junior Research Fellow Walkin 2026',
    link: 'https://www.freejobalert.com/articles/drdo-npol-junior-research-fellow-recruitment-2026-walk-in-3065748',
  },
  {
    id: 'bel-deputy-engineer-2026',
    message:
      'BEL (Bharat Electronics Limited) Deputy Engineer Online Form 2026',
    link: 'https://www.freejobalert.com/articles/bel-deputy-engineer-recruitment-2026-apply-online-for-14-posts-3065890',
  },
  {
    id: 'bel-apprentice-2026',
    message: 'BEL Apprentice Walkin 2026',
    link: 'https://www.freejobalert.com/articles/bel-apprentice-recruitment-2026-3066146',
  },
  {
    id: 'cisf-asi-paramedical-2026',
    message: 'CISF ASI Paramedical Staff PST/DV Admit Card 2026',
    link: 'https://www.freejobalert.com/articles/cisf-asi-paramedical-staff-pst-and-dv-admit-card-2026-3065692',
  },
  {
    id: 'gsl-trainee-project-executive-2026',
    message:
      'GSL (Goa Shipyard Limited) Trainee Project Executive Online Form 2026',
    link: 'https://www.freejobalert.com/articles/gsl-trainee-project-executive-recruitment-2026-apply-online-for-31-posts-3066096',
  },
  {
    id: 'beml-apprentice-2026',
    message: 'BEML 1346 Apprentice Online Form 2026 (Defence & Aerospace)',
    link: 'url?id=263',
  },
];