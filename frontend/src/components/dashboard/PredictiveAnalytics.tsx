import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  DollarSign,
  Calendar,
  BarChart3,
  Brain,
  Zap
} from 'lucide-react';
import { Lead } from '@/types/lead';

interface PredictiveAnalyticsProps {
  leads: Lead[];
}

interface PredictiveMetrics {
  conversionProbability: number;
  dealSizeEstimate: number;
  timeToClose: number;
  riskFactors: string[];
  opportunityScore: number;
  nextBestAction: string;
  confidenceLevel: number;
}

/**
 * 🎯 AI FEATURE #6: Predictive Analytics
 * AI-powered success probability modeling and deal forecasting
 */
export function PredictiveAnalytics({ leads }: PredictiveAnalyticsProps) {
  const analytics = generatePredictiveAnalytics(leads);
  
  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Brain className="w-5 h-5" />
            AI Predictive Analytics
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Zap className="w-3 h-3 mr-1" />
              Live Insights
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.portfolioValue.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Portfolio Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${analytics.totalPipelineValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Predicted Pipeline Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.avgTimeToClose}</div>
              <div className="text-sm text-gray-600">Avg. Time to Close</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Predictive Leads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            High-Probability Prospects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topPredictiveLeads.map((prediction, index) => (
              <PredictiveLeadCard key={index} prediction={prediction} rank={index + 1} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Market Trend Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.marketTrends.map((trend, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{trend.industry}</h4>
                  <Badge variant={trend.direction === 'up' ? 'default' : 'secondary'}>
                    {trend.direction === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{trend.insight}</p>
                <div className="mt-2">
                  <Progress value={trend.confidence} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">{trend.confidence}% confidence</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface PredictiveLeadCardProps {
  prediction: LeadPrediction;
  rank: number;
}

interface LeadPrediction {
  lead: Lead;
  metrics: PredictiveMetrics;
}

function PredictiveLeadCard({ prediction, rank }: PredictiveLeadCardProps) {
  const { lead, metrics } = prediction;
  
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">#{rank}</Badge>
            <h4 className="font-medium">{lead.company.name}</h4>
          </div>
          <p className="text-sm text-gray-600">{lead.company.industry}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            {metrics.conversionProbability}%
          </div>
          <div className="text-xs text-gray-500">Success Probability</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-center">
          <DollarSign className="w-4 h-4 mx-auto text-green-600 mb-1" />
          <div className="text-sm font-medium">${metrics.dealSizeEstimate.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Est. Deal Size</div>
        </div>
        <div className="text-center">
          <Clock className="w-4 h-4 mx-auto text-blue-600 mb-1" />
          <div className="text-sm font-medium">{metrics.timeToClose} days</div>
          <div className="text-xs text-gray-500">Time to Close</div>
        </div>
        <div className="text-center">
          <Calendar className="w-4 h-4 mx-auto text-purple-600 mb-1" />
          <div className="text-sm font-medium">{metrics.opportunityScore}/100</div>
          <div className="text-xs text-gray-500">Opportunity Score</div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Confidence Level</span>
            <span>{metrics.confidenceLevel}%</span>
          </div>
          <Progress value={metrics.confidenceLevel} className="h-2" />
        </div>
        
        <div className="text-sm">
          <span className="text-gray-600">Next Action: </span>
          <span className="font-medium text-purple-600">{metrics.nextBestAction}</span>
        </div>
        
        {metrics.riskFactors.length > 0 && (
          <div className="text-sm">
            <span className="text-gray-600">Risk Factors: </span>
            <span className="text-orange-600">{metrics.riskFactors.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Generate predictive analytics for lead portfolio
 */
function generatePredictiveAnalytics(leads: Lead[]) {
  // Calculate portfolio metrics
  const portfolioValue = leads.reduce((sum, lead) => sum + lead.confidence, 0) / leads.length;
  const totalPipelineValue = leads.reduce((sum, lead) => {
    const dealSize = calculateDealSize(lead);
    return sum + (dealSize * (lead.confidence / 100));
  }, 0);
  
  const avgTimeToClose = Math.round(
    leads.reduce((sum, lead) => sum + calculateTimeToClose(lead), 0) / leads.length
  );

  // Generate predictive metrics for top leads
  const topPredictiveLeads = leads
    .map(lead => ({
      lead,
      metrics: generateLeadPrediction(lead)
    }))
    .sort((a, b) => b.metrics.conversionProbability - a.metrics.conversionProbability)
    .slice(0, 5);

  // Market trend analysis
  const industries = [...new Set(leads.map(l => l.company.industry))];
  const marketTrends = industries.slice(0, 4).map(industry => {
    const industryLeads = leads.filter(l => l.company.industry === industry);
    const avgConfidence = industryLeads.reduce((sum, l) => sum + l.confidence, 0) / industryLeads.length;
    const hasGrowthSignals = industryLeads.some(l => 
      l.temporalSignals.some(s => s.type === 'growth' || s.type === 'funding')
    );
    
    return {
      industry,
      direction: avgConfidence > 75 ? 'up' : 'down' as 'up' | 'down',
      confidence: Math.round(avgConfidence),
      insight: hasGrowthSignals 
        ? `Strong growth signals detected in ${industry} sector with expansion opportunities`
        : `Moderate activity in ${industry} - focus on relationship building and value demonstration`
    };
  });

  return {
    portfolioValue,
    totalPipelineValue,
    avgTimeToClose: `${avgTimeToClose} days`,
    topPredictiveLeads,
    marketTrends
  };
}

/**
 * Generate predictive metrics for a single lead
 */
function generateLeadPrediction(lead: Lead): PredictiveMetrics {
  const baseConfidence = lead.confidence;
  
  // Factor in signals
  const signalBoost = lead.temporalSignals.reduce((boost, signal) => {
    return boost + (signal.impact === 'high' ? 10 : signal.impact === 'medium' ? 5 : 2);
  }, 0);
  
  // Factor in relationships
  const relationshipBoost = lead.relationships.reduce((boost, rel) => {
    return boost + (rel.warmth === 'high' ? 15 : rel.warmth === 'medium' ? 8 : 3);
  }, 0);
  
  // Factor in competitive context
  const competitiveBoost = lead.competitiveContext.length * 5;
  
  const conversionProbability = Math.min(
    Math.round(baseConfidence + (signalBoost + relationshipBoost + competitiveBoost) * 0.3),
    95
  );
  
  const dealSizeEstimate = calculateDealSize(lead);
  const timeToClose = calculateTimeToClose(lead);
  const opportunityScore = Math.round((conversionProbability + (dealSizeEstimate / 1000)) / 2);
  
  const riskFactors = [];
  if (lead.relationships.length === 0) riskFactors.push('No warm connections');
  if (lead.temporalSignals.length === 0) riskFactors.push('Limited market signals');
  if (lead.competitiveContext.length === 0) riskFactors.push('Unknown competitive landscape');
  
  const nextBestAction = determineNextAction(lead, conversionProbability);
  
  return {
    conversionProbability,
    dealSizeEstimate,
    timeToClose,
    riskFactors,
    opportunityScore,
    nextBestAction,
    confidenceLevel: Math.round((conversionProbability + baseConfidence) / 2)
  };
}

function calculateDealSize(lead: Lead): number {
  const sizeMultipliers = {
    '1-10 employees': 5000,
    '10-50 employees': 25000,
    '50-200 employees': 75000,
    '200-1000 employees': 150000,
    '1000+ employees': 300000
  };
  
  const baseSize = sizeMultipliers[lead.company.size as keyof typeof sizeMultipliers] || 50000;
  const confidenceMultiplier = lead.confidence / 100;
  
  return Math.round(baseSize * confidenceMultiplier);
}

function calculateTimeToClose(lead: Lead): number {
  let baseDays = 90; // Default 3 months
  
  // Reduce time for warm connections
  if (lead.relationships.some(r => r.warmth === 'high')) baseDays -= 30;
  
  // Reduce time for urgent signals
  if (lead.temporalSignals.some(s => s.impact === 'high')) baseDays -= 20;
  
  // Increase time for larger companies
  if (lead.company.size.includes('1000+')) baseDays += 60;
  else if (lead.company.size.includes('200-1000')) baseDays += 30;
  
  return Math.max(baseDays, 30); // Minimum 30 days
}

function determineNextAction(lead: Lead, probability: number): string {
  if (probability > 80) {
    return 'Schedule demo immediately';
  } else if (lead.relationships.some(r => r.warmth === 'high')) {
    return 'Request warm introduction';
  } else if (lead.temporalSignals.some(s => s.impact === 'high')) {
    return 'Send timely outreach referencing signals';
  } else {
    return 'Build relationship through value-add content';
  }
}