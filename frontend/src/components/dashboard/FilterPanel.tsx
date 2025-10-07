import { useState, useEffect } from "react";
import { Brain, Loader2, TrendingUp, Users, Zap } from "lucide-react";
import { useAIInsights } from "@/hooks/useAIInsights";
import { Lead } from "@/types/lead";

interface AdvancedFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  leads: Lead[]; // Add leads for AI analysis
}

export function FilterPanel({ filters, onFilterChange, leads }: AdvancedFiltersProps) {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [selectedRelationships, setSelectedRelationships] = useState<string[]>([]);
  const [aiRecommendations, setAIRecommendations] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  
  const { generateRecommendations, isAIEnabled } = useAIInsights();

  // Sync local state with parent filters
  useEffect(() => {
    console.log('FilterPanel - Syncing with parent filters:', filters);
    setSelectedPriorities(filters?.priorities || []);
    setSelectedSignals(filters?.signals || []);
    setSelectedRelationships(filters?.relationships || []);
  }, [filters]);

  // Generate AI recommendations when leads change
  useEffect(() => {
    console.log('FilterPanel - Leads/AI state changed:', { 
      leadsCount: leads.length, 
      isAIEnabled 
    });
    if (leads.length > 0 && isAIEnabled) {
      generateAIRecommendations();
    }
  }, [leads, isAIEnabled]);

  const generateAIRecommendations = async () => {
    console.log('FilterPanel - Generating AI recommendations...');
    setLoadingAI(true);
    try {
      const recommendations = await generateRecommendations(leads);
      console.log('FilterPanel - AI recommendations received:', recommendations);
      setAIRecommendations(recommendations);
    } catch (error) {
      console.error('FilterPanel - Failed to generate AI recommendations:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  const handlePriorityChange = (priority: string) => {
    console.log('Priority filter clicked:', priority);
    const updated = selectedPriorities.includes(priority)
      ? selectedPriorities.filter(p => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(updated);
    console.log('Updated priorities:', updated);
    onFilterChange({ ...filters, priorities: updated });
  };

  const handleSignalChange = (signal: string) => {
    console.log('Signal filter clicked:', signal);
    const updated = selectedSignals.includes(signal)
      ? selectedSignals.filter(s => s !== signal)
      : [...selectedSignals, signal];
    setSelectedSignals(updated);
    console.log('Updated signals:', updated);
    onFilterChange({ ...filters, signals: updated });
  };

  const handleRelationshipChange = (relationship: string) => {
    console.log('Relationship filter clicked:', relationship);
    const updated = selectedRelationships.includes(relationship)
      ? selectedRelationships.filter(r => r !== relationship)
      : [...selectedRelationships, relationship];
    setSelectedRelationships(updated);
    console.log('Updated relationships:', updated);
    onFilterChange({ ...filters, relationships: updated });
  };

  const handleAISuggestion = (type: string) => {
    console.log('AI Suggestion clicked:', type);
    let updatedFilters = { ...filters };
    
    if (type === 'hot') {
      updatedFilters.priorities = ['hot'];
      setSelectedPriorities(['hot']);
    } else if (type === 'relationships') {
      updatedFilters.relationships = ['alumni', 'investor'];
      setSelectedRelationships(['alumni', 'investor']);
    } else if (type === 'urgent') {
      updatedFilters.signals = ['funding', 'leadership'];
      setSelectedSignals(['funding', 'leadership']);
    }
    
    console.log('Applying filters:', updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Powered Filters</h3>
      
      <div className="space-y-4">
        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Tier</label>
          <div className="space-y-2">
            {['hot', 'warm', 'cold'].map((tier) => (
              <label key={tier} className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedPriorities.includes(tier)}
                  onChange={() => handlePriorityChange(tier)}
                />
                <span className="ml-2 text-sm text-gray-600 capitalize">{tier}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Temporal Signals Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temporal Signals</label>
          <div className="space-y-2">
            {['funding', 'leadership', 'growth', 'event'].map((signal) => (
              <label key={signal} className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedSignals.includes(signal)}
                  onChange={() => handleSignalChange(signal)}
                />
                <span className="ml-2 text-sm text-gray-600 capitalize">{signal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Relationship Types Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Relationship Types</label>
          <div className="space-y-2">
            {['alumni', 'employment', 'investor', 'tech'].map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedRelationships.includes(type)}
                  onChange={() => handleRelationshipChange(type)}
                />
                <span className="ml-2 text-sm text-gray-600 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Brain className="h-4 w-4 mr-1 text-purple-600" />
              AI Recommendations
              {isAIEnabled && (
                <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  Live
                </span>
              )}
            </h4>
            {loadingAI && (
              <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
            )}
          </div>

          {/* AI-Generated Recommendations */}
          {aiRecommendations && (
            <div className="space-y-3 mb-4">
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <h5 className="text-xs font-medium text-purple-700 uppercase tracking-wide mb-2">
                  AI Insights
                </h5>
                <p className="text-sm text-purple-800">
                  {aiRecommendations.insights}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {/* Hot Prospects */}
                <button 
                  onClick={() => {
                    const hotIds = aiRecommendations.hotProspects.map((lead: Lead) => lead.id);
                    onFilterChange({ ...filters, specificLeads: hotIds });
                  }}
                  className="flex items-center justify-between text-left text-sm text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors border border-red-200"
                >
                  <span className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    🔥 Hottest Prospects ({aiRecommendations.hotProspects.length})
                  </span>
                  <span className="text-xs text-red-500">Click to filter</span>
                </button>

                {/* Relationship Opportunities */}
                <button 
                  onClick={() => {
                    const relationshipIds = aiRecommendations.relationshipOpportunities.map((lead: Lead) => lead.id);
                    onFilterChange({ ...filters, specificLeads: relationshipIds });
                  }}
                  className="flex items-center justify-between text-left text-sm text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors border border-green-200"
                >
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    🤝 Warm Connections ({aiRecommendations.relationshipOpportunities.length})
                  </span>
                  <span className="text-xs text-green-500">Click to filter</span>
                </button>

                {/* Urgent Signals */}
                <button 
                  onClick={() => {
                    const urgentIds = aiRecommendations.urgentSignals.map((lead: Lead) => lead.id);
                    onFilterChange({ ...filters, specificLeads: urgentIds });
                  }}
                  className="flex items-center justify-between text-left text-sm text-orange-600 hover:text-orange-800 p-2 hover:bg-orange-50 rounded transition-colors border border-orange-200"
                >
                  <span className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    ⚡ Urgent Signals ({aiRecommendations.urgentSignals.length})
                  </span>
                  <span className="text-xs text-orange-500">Click to filter</span>
                </button>
              </div>
            </div>
          )}

          {/* Manual AI Suggestions */}
          <div className="space-y-2">
            <button 
              onClick={() => handleAISuggestion('hot')}
              className="w-full text-left text-sm text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
            >
              💡 Companies most likely to convert this week
            </button>
            <button 
              onClick={() => handleAISuggestion('relationships')}
              className="w-full text-left text-sm text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
            >
              🤝 Highest relationship warmth leads
            </button>
            <button 
              onClick={() => handleAISuggestion('urgent')}
              className="w-full text-left text-sm text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
            >
              ⚡ Urgent time-sensitive opportunities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
