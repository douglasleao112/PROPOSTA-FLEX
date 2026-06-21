export interface TrainingModule {
  id: number;
  title: string;
  category: 'technical' | 'soft-skills' | 'business-retention';
  description: string;
  points: string[];
}

export interface TrainingImage {
  url: string;
  title: string;
  description: string;
}

export interface AuthorityBadge {
  title: string;
  sub: string;
}

export interface ImpactCard {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface ProposalApproval {
  id: string;
  reviewerName: string;
  position: string;
  unit: string;
  message?: string;
  approvedAt: string;
}
