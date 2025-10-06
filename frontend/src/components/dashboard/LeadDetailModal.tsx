import React from "react";
import { X, Clock, Users as NetworkIcon, TrendingUp, Target } from "lucide-react";
import { Lead } from "@/types/lead";

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailModal({ lead, isOpen, onClose }: LeadDetailModalProps) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{lead.company.name}</h2>
              <p className="text-gray-600">{lead.company.industry} • {lead.company.size} • {lead.company.location}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Intelligence Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Temporal Relevance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Temporal Relevance
              </h3>
              <div className="space-y-2">
                {lead.temporalSignals.map((signal, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">{signal.details}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relationship Map */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <NetworkIcon className="h-5 w-5 mr-2 text-green-600" />
                Relationship Assets
              </h3>
              <div className="space-y-2">
                {lead.relationships.map((rel, index) => (
                  <div key={index} className="text-sm">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      rel.warmth === 'high' ? 'bg-green-500' : 
                      rel.warmth === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></span>
                    <span className="text-gray-700">{rel.details}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Context */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Competitive Landscape
              </h3>
              <div className="space-y-2">
                {lead.competitiveContext.map((context, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-purple-600 mr-2">•</span>
                    <span className="text-gray-700">{context.evidence}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Action Plan */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              Recommended Action Plan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">🎯 Recommended Approach</h4>
                <p className="text-sm text-gray-600">
                  Leverage warm introduction through Stanford alumni network. Focus on their recent funding and expansion plans.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">📞 Talking Points</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Reference their Series B funding and growth trajectory</li>
                  <li>Mention shared Stanford connection with CTO</li>
                  <li>Discuss migration from current solution pain points</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">🤝 Introduction Strategy</h4>
              <p className="text-sm text-gray-600">
                Warm intro available through Mark Johnson (Stanford '15). Schedule 30-min discovery call focusing on their migration timeline.
              </p>
            </div>

            <div className="mt-4 flex space-x-3">
              <button 
                onClick={() => {
                  alert(`Scheduling meeting with ${lead.company.name}... This would open a calendar integration.`);
                  onClose();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Schedule Meeting
              </button>
              <button 
                onClick={() => {
                  alert(`${lead.company.name} saved for later review. This would add to a saved leads list.`);
                  onClose();
                }}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
