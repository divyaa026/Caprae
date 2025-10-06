import { useState } from "react";

interface AdvancedFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

export function FilterPanel({ filters, onFilterChange }: AdvancedFiltersProps) {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [selectedRelationships, setSelectedRelationships] = useState<string[]>([]);

  const handlePriorityChange = (priority: string) => {
    const updated = selectedPriorities.includes(priority)
      ? selectedPriorities.filter(p => p !== priority)
      : [...selectedPriorities, priority];
    setSelectedPriorities(updated);
    onFilterChange({ ...filters, priorities: updated });
  };

  const handleSignalChange = (signal: string) => {
    const updated = selectedSignals.includes(signal)
      ? selectedSignals.filter(s => s !== signal)
      : [...selectedSignals, signal];
    setSelectedSignals(updated);
    onFilterChange({ ...filters, signals: updated });
  };

  const handleRelationshipChange = (relationship: string) => {
    const updated = selectedRelationships.includes(relationship)
      ? selectedRelationships.filter(r => r !== relationship)
      : [...selectedRelationships, relationship];
    setSelectedRelationships(updated);
    onFilterChange({ ...filters, relationships: updated });
  };

  const handleAISuggestion = (type: string) => {
    // Reset all filters and apply AI suggestion
    setSelectedPriorities(type === 'hot' ? ['hot'] : []);
    setSelectedSignals(type === 'funding' ? ['funding'] : []);
    setSelectedRelationships(type === 'relationships' ? ['alumni', 'investor'] : []);
    
    onFilterChange({ 
      priorities: type === 'hot' ? ['hot'] : [],
      signals: type === 'funding' ? ['funding'] : [],
      relationships: type === 'relationships' ? ['alumni', 'investor'] : []
    });
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
          <h4 className="text-sm font-medium text-gray-700 mb-3">AI Suggestions</h4>
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
