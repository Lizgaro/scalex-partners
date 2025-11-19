
export interface Project {
  id: string;
  title: string;
  category: 'CONSUMER' | 'ENTERPRISE' | 'FINTECH';
  tags: string[];
  description: string;
  rocketReason: {
    title: string;
    points: string[];
  };
  imageUrl: string;
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  iconName: 'TrendingDown' | 'Lock' | 'Shuffle' | 'EggOff';
}

export interface SolutionStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'Zap' | 'Users' | 'Coins';
}

export interface WorkStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'Zap' | 'Users' | 'Coins'; // Added iconName to match potential usage
}