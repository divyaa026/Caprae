export type PriorityTier = 'hot' | 'warm' | 'cold';

export interface TemporalSignal {
  type: 'funding' | 'leadership' | 'growth' | 'event';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  details: string;
  timestamp: string;
}

export interface RelationshipAsset {
  type: 'alumni' | 'employment' | 'investor' | 'tech';
  warmth: 'high' | 'medium' | 'low';
  details: string;
  connectionPath: string[];
}

export interface CompetitiveContext {
  opportunity: 'migration' | 'expansion' | 'dissatisfaction';
  evidence: string;
  confidence: number;
  competitor: string;
}

export interface Company {
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
}

export interface Lead {
  id: string;
  company: Company;
  priority: PriorityTier;
  temporalSignals: TemporalSignal[];
  relationships: RelationshipAsset[];
  competitiveContext: CompetitiveContext[];
  confidence: number;
  lastUpdated: string;
}
