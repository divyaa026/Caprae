import React, { useState, useEffect } from "react";
import { X, Clock, Users as NetworkIcon, TrendingUp, Target, Brain, Loader2, Lightbulb } from "lucide-react";
import { Lead } from "@/types/lead";
import { useAIInsights } from "@/hooks/useAIInsights";

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadDetailModal({ lead, isOpen, onClose }: LeadDetailModalProps) {
  const { insights, generateInsights, generateOutreach, isAIEnabled } = useAIInsights();
  const [outreachSuggestions, setOutreachSuggestions] = useState<any>(null);
  const [loadingOutreach, setLoadingOutreach] = useState(false);

  useEffect(() => {
    if (lead && isOpen) {
      generateInsights(lead);
    }
  }, [lead, isOpen, generateInsights]);

  const handleGenerateOutreach = async () => {
    if (!lead) return;
    
    setLoadingOutreach(true);
    try {
      const suggestions = await generateOutreach(lead);
      setOutreachSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to generate outreach suggestions:', error);
    } finally {
      setLoadingOutreach(false);
    }
  };

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

          {/* AI-Powered Insights Section */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                AI-Powered Intelligence
                {isAIEnabled && (
                  <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    Live AI
                  </span>
                )}
              </h3>
              
              {insights.loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-2" />
                  <span className="text-gray-600">Analyzing lead with AI...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* AI Confidence Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">AI Confidence Score</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${insights.confidence > 80 ? 'bg-green-500' : insights.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${insights.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{insights.confidence}%</span>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  {insights.recommendations && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
                        AI Recommendations
                      </h4>
                      <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                        {insights.recommendations}
                      </p>
                    </div>
                  )}

                  {/* Next Actions */}
                  {insights.nextActions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">🚀 Suggested Next Actions</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {insights.nextActions.map((action, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* AI-Generated Outreach */}
                  <div className="pt-4 border-t border-purple-100">
                    <button
                      onClick={handleGenerateOutreach}
                      disabled={loadingOutreach}
                      className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      {loadingOutreach ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Brain className="h-4 w-4 mr-2" />
                      )}
                      Generate AI Outreach Strategy
                    </button>
                  </div>

                  {/* Outreach Suggestions */}
                  {outreachSuggestions && (
                    <div className="mt-4 bg-white p-4 rounded border">
                      <h4 className="font-medium text-gray-700 mb-3">💬 Personalized Outreach Strategy</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Subject</span>
                          <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded mt-1">
                            {outreachSuggestions.emailSubject}
                          </p>
                        </div>

                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Key Talking Points</span>
                          <ul className="text-sm text-gray-700 mt-1 space-y-1">
                            {outreachSuggestions.talkingPoints.map((point: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Timing</span>
                            <p className="text-sm text-gray-700 mt-1">{outreachSuggestions.timing}</p>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Approach</span>
                            <p className="text-sm text-gray-700 mt-1">{outreachSuggestions.approach}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {insights.error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
                  {insights.error}
                </div>
              )}
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
