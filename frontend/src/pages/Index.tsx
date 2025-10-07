import React, { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { LeadTable } from "@/components/dashboard/IntelligenceTable";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { LeadDetailModal } from "@/components/dashboard/LeadDetailModal";
import { AIDemoMode } from "@/components/dashboard/AIDemoMode";
import { AIChatAssistant } from "@/components/dashboard/AIChatAssistant";
import { PredictiveAnalytics } from "@/components/dashboard/PredictiveAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lead } from "@/types/lead";

// Mock data for demonstration
const mockLeads: Lead[] = [
  {
    id: '1',
    company: {
      name: 'TechFlow Inc',
      logo: 'T',
      industry: 'SaaS',
      size: '201-500',
      location: 'San Francisco, CA'
    },
    priority: 'hot',
    temporalSignals: [
      {
        type: 'funding',
        confidence: 0.9,
        impact: 'high',
        details: 'Raised $20M Series B - 2 weeks ago',
        timestamp: '2024-01-15'
      },
      {
        type: 'leadership',
        confidence: 0.7,
        impact: 'medium',
        details: 'New CTO hired from Google',
        timestamp: '2024-01-10'
      }
    ],
    relationships: [
      {
        type: 'alumni',
        warmth: 'high',
        details: 'CTO Stanford 2015 - same as your CEO',
        connectionPath: ['CTO', 'Stanford', 'CEO']
      },
      {
        type: 'investor',
        warmth: 'medium',
        details: 'Shared VC: Sequoia Capital',
        connectionPath: ['Sequoia Capital']
      }
    ],
    competitiveContext: [
      {
        opportunity: 'migration',
        evidence: 'Job post mentions "Migrating from Salesforce"',
        confidence: 0.8,
        competitor: 'Salesforce'
      }
    ],
    confidence: 85,
    lastUpdated: '2024-01-20'
  },
  {
    id: '2',
    company: {
      name: 'DataSync Corp',
      logo: 'D',
      industry: 'Analytics',
      size: '101-200',
      location: 'Austin, TX'
    },
    priority: 'warm',
    temporalSignals: [
      {
        type: 'growth',
        confidence: 0.8,
        impact: 'high',
        details: 'Expanding to European markets',
        timestamp: '2024-01-18'
      }
    ],
    relationships: [
      {
        type: 'employment',
        warmth: 'medium',
        details: 'VP Engineering ex-Microsoft',
        connectionPath: ['VP Engineering', 'Microsoft']
      }
    ],
    competitiveContext: [
      {
        opportunity: 'expansion',
        evidence: 'Hiring 25+ engineers across Europe',
        confidence: 0.7,
        competitor: 'Tableau'
      }
    ],
    confidence: 72,
    lastUpdated: '2024-01-19'
  },
  {
    id: '3',
    company: {
      name: 'CloudScale Inc',
      logo: 'C',
      industry: 'Cloud Infrastructure',
      size: '51-100',
      location: 'Seattle, WA'
    },
    priority: 'warm',
    temporalSignals: [
      {
        type: 'funding',
        confidence: 0.9,
        impact: 'high',
        details: 'Series A $10M raised',
        timestamp: '2024-01-12'
      }
    ],
    relationships: [
      {
        type: 'alumni',
        warmth: 'high',
        details: 'CEO Stanford 2012 - your network',
        connectionPath: ['CEO', 'Stanford']
      }
    ],
    competitiveContext: [
      {
        opportunity: 'dissatisfaction',
        evidence: 'Negative reviews of current vendor',
        confidence: 0.6,
        competitor: 'AWS'
      }
    ],
    confidence: 78,
    lastUpdated: '2024-01-17'
  },
  {
    id: '4',
    company: {
      name: 'InnovateLabs',
      logo: 'I',
      industry: 'AI/ML',
      size: '11-50',
      location: 'Palo Alto, CA'
    },
    priority: 'cold',
    temporalSignals: [
      {
        type: 'event',
        confidence: 0.7,
        impact: 'medium',
        details: 'Speaking at AI Conference next month',
        timestamp: '2024-02-01'
      }
    ],
    relationships: [
      {
        type: 'tech',
        warmth: 'low',
        details: 'Using competitor technology stack',
        connectionPath: ['Tech Stack']
      }
    ],
    competitiveContext: [
      {
        opportunity: 'migration',
        evidence: 'Exploring new ML platforms',
        confidence: 0.5,
        competitor: 'TensorFlow'
      }
    ],
    confidence: 45,
    lastUpdated: '2024-01-16'
  }
];

export default function Index() {
  const [allLeads] = useState<Lead[]>(mockLeads);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("intelligence");
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  
  // AI Configuration with debug logging
  const hasGeminiKey = !!import.meta.env.VITE_GEMINI_API_KEY;
  const aiEnabled = import.meta.env.VITE_AI_ENABLED === 'true';
  const aiProvider = import.meta.env.VITE_AI_PROVIDER || 'gemini';
  
  console.log('Index.tsx - AI Config Debug:');
  console.log('Has Gemini Key:', hasGeminiKey);
  console.log('AI Enabled Flag:', aiEnabled);
  console.log('AI Provider:', aiProvider);
  
  const [isAIEnabled, setIsAIEnabled] = useState(
    aiEnabled && hasGeminiKey
  );
  
  console.log('Index.tsx - Final AI Enabled:', isAIEnabled);

  // Apply filters and search
  const applyFilters = (leads: Lead[], currentFilters: any, query: string) => {
    let filtered = [...leads];

    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(lead => 
        lead.company.name.toLowerCase().includes(query.toLowerCase()) ||
        lead.company.industry.toLowerCase().includes(query.toLowerCase()) ||
        lead.company.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply priority filters
    if (currentFilters.priorities?.length > 0) {
      filtered = filtered.filter(lead => 
        currentFilters.priorities.includes(lead.priority)
      );
    }

    // Apply signal filters
    if (currentFilters.signals?.length > 0) {
      filtered = filtered.filter(lead => 
        lead.temporalSignals.some(signal => 
          currentFilters.signals.includes(signal.type)
        )
      );
    }

    // Apply relationship filters
    if (currentFilters.relationships?.length > 0) {
      filtered = filtered.filter(lead => 
        lead.relationships.some(rel => 
          currentFilters.relationships.includes(rel.type)
        )
      );
    }

    return filtered;
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = applyFilters(allLeads, filters, query);
    setFilteredLeads(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    console.log('Index.tsx - Filter change received:', newFilters);
    console.log('Index.tsx - Previous filters:', filters);
    setFilters(newFilters);
    const filtered = applyFilters(allLeads, newFilters, searchQuery);
    console.log('Index.tsx - Filtered leads count:', filtered.length);
    setFilteredLeads(filtered);
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleAddLead = () => {
    alert("Add New Lead form would open here. This would include fields for company info, contact details, etc.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} onAddLead={handleAddLead} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* AI Demo Mode Toggle */}
        <AIDemoMode 
          isAIEnabled={isAIEnabled} 
          onToggleAI={setIsAIEnabled} 
        />
        
        <MetricCards leads={filteredLeads} />
        
        {/* 🎯 AI FEATURES NAVIGATION */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8 space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="intelligence">📊 Lead Intelligence</TabsTrigger>
            <TabsTrigger value="predictive">🎯 Predictive Analytics</TabsTrigger>
            <TabsTrigger value="insights">🧠 AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="intelligence" className="space-y-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Lead Intelligence Dashboard
              </h2>
              <div className="text-sm text-gray-600">
                Showing {filteredLeads.length} of {allLeads.length} leads
                {searchQuery && (
                  <span className="ml-2 text-blue-600">
                    • Filtered by "{searchQuery}"
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <FilterPanel filters={filters} onFilterChange={handleFilterChange} leads={mockLeads} />
              </div>
              <div className="lg:col-span-3">
                <LeadTable leads={filteredLeads} onLeadSelect={handleLeadSelect} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                🎯 AI Predictive Analytics
              </h2>
              <div className="text-sm text-gray-600">
                AI-powered success probability modeling and deal forecasting
              </div>
            </div>
            <PredictiveAnalytics leads={allLeads} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                🧠 AI Strategic Insights
              </h2>
              <div className="text-sm text-gray-600">
                Real-time AI analysis and strategic recommendations
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Portfolio Overview</h3>
                <MetricCards leads={allLeads} />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Top Priority Leads</h3>
                <LeadTable 
                  leads={filteredLeads.filter(l => l.confidence > 75).slice(0, 5)} 
                  onLeadSelect={handleLeadSelect} 
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* 🎯 AI FEATURE #5: Real-time AI Chat Assistant */}
      <AIChatAssistant 
        leads={allLeads}
        isMinimized={isChatMinimized}
        onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
      />
      
      <LeadDetailModal 
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
