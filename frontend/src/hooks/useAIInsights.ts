import { useState, useEffect, useCallback } from 'react';
import { Lead } from '@/types/lead';
import { AIService } from '@/services/aiService';

interface AIInsights {
  confidence: number;
  recommendations: string;
  nextActions: string[];
  timing: string;
  loading: boolean;
  error: string | null;
}

interface AIFilterSuggestions {
  recommendedFilters: string[];
  reasoning: string;
  priorityScore: number;
}

interface UseAIInsightsReturn {
  insights: AIInsights;
  generateInsights: (lead: Lead) => Promise<void>;
  generateRecommendations: (leads: Lead[]) => Promise<any>;
  generateOutreach: (lead: Lead) => Promise<any>;
  generateSmartFilters: (leads: Lead[], currentFilters: any) => Promise<AIFilterSuggestions>;
  isAIEnabled: boolean;
  aiProvider: string;
  aiStatus: 'connected' | 'error' | 'disabled';
}

export function useAIInsights(): UseAIInsightsReturn {
  const [insights, setInsights] = useState<AIInsights>({
    confidence: 0,
    recommendations: '',
    nextActions: [],
    timing: '',
    loading: false,
    error: null
  });

  const aiProvider = import.meta.env.VITE_AI_PROVIDER || 'gemini';
  const hasGeminiKey = !!import.meta.env.VITE_GEMINI_API_KEY;
  const hasOpenAIKey = !!import.meta.env.VITE_OPENAI_API_KEY;
  
  // Enable AI if we have keys, even if models fail (we'll use enhanced mock data)
  const isAIEnabled = import.meta.env.VITE_AI_ENABLED === 'true' && 
    ((aiProvider === 'gemini' && hasGeminiKey) || 
     (aiProvider === 'openai' && hasOpenAIKey));

  console.log('useAIInsights - AI Status:', {
    enabled: isAIEnabled,
    provider: aiProvider,
    hasGeminiKey,
    hasOpenAIKey
  });

  const generateInsights = useCallback(async (lead: Lead) => {
    if (!isAIEnabled) {
      console.log('AI disabled, using mock insights');
      return;
    }

    setInsights(prev => ({ ...prev, loading: true, error: null }));

    try {
      const analysis = await AIService.analyzeLeadWithAI(lead);
      
      setInsights({
        confidence: analysis.confidence,
        recommendations: analysis.aiInsights,
        nextActions: [
          'Schedule discovery call',
          'Research decision makers',
          'Prepare value proposition',
          'Plan follow-up sequence'
        ],
        timing: 'Contact within 24-48 hours',
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('AI insights generation failed:', error);
      setInsights(prev => ({
        ...prev,
        loading: false,
        error: 'AI insights temporarily unavailable'
      }));
    }
  }, [isAIEnabled]);

  const generateRecommendations = useCallback(async (leads: Lead[]) => {
    if (!isAIEnabled) {
      return {
        hotProspects: leads.filter(l => l.confidence > 80).slice(0, 3),
        relationshipOpportunities: leads.filter(l => 
          l.relationships.some(r => r.warmth === 'high')
        ).slice(0, 3),
        urgentSignals: leads.filter(l => 
          l.temporalSignals.some(s => s.impact === 'high')
        ).slice(0, 3),
        insights: 'Showing top prospects based on confidence and signals'
      };
    }

    try {
      return await AIService.generateLeadRecommendations(leads);
    } catch (error) {
      console.error('AI recommendations failed:', error);
      return {
        hotProspects: leads.slice(0, 3),
        relationshipOpportunities: leads.slice(0, 3),
        urgentSignals: leads.slice(0, 3),
        insights: 'AI recommendations temporarily unavailable'
      };
    }
  }, [isAIEnabled]);

  const generateOutreach = useCallback(async (lead: Lead) => {
    if (!isAIEnabled) {
      return {
        emailSubject: `Partnership opportunity with ${lead.company.name}`,
        talkingPoints: ['Recent growth', 'Industry challenges', 'ROI potential'],
        timing: 'Within 48 hours',
        approach: 'Direct outreach'
      };
    }

    try {
      return await AIService.generateOutreachSuggestions(lead);
    } catch (error) {
      console.error('AI outreach generation failed:', error);
      return {
        emailSubject: `Partnership opportunity with ${lead.company.name}`,
        talkingPoints: ['Recent growth', 'Industry challenges', 'ROI potential'],
        timing: 'Within 48 hours',
        approach: 'Direct outreach'
      };
    }
  }, [isAIEnabled]);

  const generateSmartFilters = useCallback(async (leads: Lead[], currentFilters: any): Promise<AIFilterSuggestions> => {
    if (!isAIEnabled) {
      return {
        recommendedFilters: ['High Confidence', 'Recent Signals', 'Warm Connections'],
        reasoning: 'AI filtering unavailable - showing standard recommendations',
        priorityScore: 75
      };
    }

    try {
      // For now, return smart filter suggestions based on lead analysis
      const highConfidenceCount = leads.filter(l => l.confidence > 80).length;
      const recentSignalsCount = leads.filter(l => l.temporalSignals.some(s => s.impact === 'high')).length;
      const warmConnectionsCount = leads.filter(l => l.relationships.some(r => r.warmth === 'high')).length;
      
      const suggestions = [];
      let reasoning = "Based on your lead portfolio: ";
      
      if (highConfidenceCount > leads.length * 0.3) {
        suggestions.push('High Confidence');
        reasoning += `${highConfidenceCount} high-confidence leads detected. `;
      }
      
      if (recentSignalsCount > 0) {
        suggestions.push('Recent Signals');
        reasoning += `${recentSignalsCount} leads with urgent signals. `;
      }
      
      if (warmConnectionsCount > 0) {
        suggestions.push('Warm Connections');
        reasoning += `${warmConnectionsCount} leads with warm relationships. `;
      }
      
      return {
        recommendedFilters: suggestions.length > 0 ? suggestions : ['All Leads'],
        reasoning: reasoning || 'Balanced portfolio - consider all leads',
        priorityScore: Math.round((highConfidenceCount + recentSignalsCount + warmConnectionsCount) / leads.length * 100)
      };
    } catch (error) {
      console.error('AI smart filtering failed:', error);
      return {
        recommendedFilters: ['High Confidence', 'Recent Signals', 'Warm Connections'],
        reasoning: 'AI filtering temporarily unavailable',
        priorityScore: 70
      };
    }
  }, [isAIEnabled]);

  // AI status detection
  const aiStatus: 'connected' | 'error' | 'disabled' = 
    !isAIEnabled ? 'disabled' :
    (aiProvider === 'gemini' && hasGeminiKey) || (aiProvider === 'openai' && hasOpenAIKey) ? 'connected' :
    'error';

  return {
    insights,
    generateInsights,
    generateRecommendations,
    generateOutreach,
    generateSmartFilters,
    isAIEnabled,
    aiProvider,
    aiStatus
  };
}