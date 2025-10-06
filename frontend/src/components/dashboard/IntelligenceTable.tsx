import React from "react";
import { Lead, TemporalSignal, RelationshipAsset, CompetitiveContext } from "@/types/lead";

interface IntelligenceTableProps {
  leads: Lead[];
  onLeadSelect: (lead: Lead) => void;
}

export function LeadTable({ leads, onLeadSelect }: IntelligenceTableProps) {
  
  const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
    const config = {
      hot: { label: '🔥 HOT', color: 'bg-red-100 text-red-800' },
      warm: { label: '☀️ WARM', color: 'bg-orange-100 text-orange-800' },
      cold: { label: '💨 COLD', color: 'bg-blue-100 text-blue-800' }
    };
    
    const { label, color } = config[priority as keyof typeof config];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const SignalIndicator: React.FC<{ signals: TemporalSignal[] }> = ({ signals }) => {
    const icons = {
      funding: '💰',
      leadership: '👑',
      growth: '📈',
      event: '🎯'
    };

    return (
      <div className="flex space-x-1">
        {signals.slice(0, 3).map((signal, index) => (
          <div key={index} className="relative group">
            <span className="text-sm">{icons[signal.type]}</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
              <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {signal.details}
              </div>
            </div>
          </div>
        ))}
        {signals.length > 3 && (
          <span className="text-xs text-gray-500">+{signals.length - 3}</span>
        )}
      </div>
    );
  };

  const RelationshipIndicator: React.FC<{ relationships: RelationshipAsset[] }> = ({ relationships }) => {
    const icons = {
      alumni: '🎓',
      employment: '💼',
      investor: '🤝',
      tech: '🔗'
    };

    return (
      <div className="flex space-x-1">
        {relationships.slice(0, 3).map((rel, index) => (
          <div key={index} className="relative group">
            <span className={`text-sm ${
              rel.warmth === 'high' ? 'text-green-600' : 
              rel.warmth === 'medium' ? 'text-yellow-600' : 'text-blue-600'
            }`}>
              {icons[rel.type]}
            </span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
              <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {rel.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const CompetitiveBadge: React.FC<{ context: CompetitiveContext[] }> = ({ context }) => {
    const badges = context.map((item, index) => (
      <span
        key={index}
        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mr-1 mb-1"
      >
        {item.opportunity === 'migration' ? '🔄 Migration' :
         item.opportunity === 'expansion' ? '🚀 Expansion' : '💔 Dissatisfaction'}
      </span>
    ));

    return <div className="flex flex-wrap">{badges}</div>;
  };

  const ConfidenceBar: React.FC<{ confidence: number }> = ({ confidence }) => {
    const getColor = (score: number) => {
      if (score >= 80) return 'bg-green-500';
      if (score >= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColor(confidence)}`}
          style={{ width: `${confidence}%` }}
        ></div>
        <div className="text-xs text-gray-500 mt-1 text-center">{confidence}%</div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Lead Intelligence</h2>
        <p className="text-sm text-gray-600">AI-powered prioritization and insights</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temporal Signals
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Relationships
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Competitive Context
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {lead.company.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{lead.company.name}</div>
                      <div className="text-sm text-gray-500">{lead.company.industry}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <PriorityBadge priority={lead.priority} />
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <SignalIndicator signals={lead.temporalSignals} />
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <RelationshipIndicator relationships={lead.relationships} />
                </td>
                
                <td className="px-6 py-4">
                  <CompetitiveBadge context={lead.competitiveContext} />
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-20">
                    <ConfidenceBar confidence={lead.confidence} />
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onLeadSelect(lead)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                  >
                    View Insights
                  </button>
                  <button 
                    onClick={() => {
                      alert(`Initiating contact with ${lead.company.name}... This would open email/phone integration.`);
                    }}
                    className="text-green-600 hover:text-green-900 transition-colors"
                  >
                    Contact Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}