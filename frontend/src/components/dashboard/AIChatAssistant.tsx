import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useAIInsights } from '@/hooks/useAIInsights';
import { Lead } from '@/types/lead';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatAssistantProps {
  leads: Lead[];
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

/**
 * 🎯 AI FEATURE #5: Real-time AI Assistance
 * Interactive AI chatbot for sales intelligence and lead insights
 */
export function AIChatAssistant({ leads, isMinimized = false, onToggleMinimize }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI sales assistant. I can help you analyze leads, suggest outreach strategies, and provide market insights. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'Analyze my top leads',
        'Suggest outreach strategies',
        'Show market trends',
        'Find warm connections'
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { aiStatus, aiProvider } = useAIInsights();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content, leads);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-16 h-16 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardContent 
          className="p-0 h-full flex items-center justify-center"
          onClick={onToggleMinimize}
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-purple-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-2xl bg-white border border-gray-200 flex flex-col z-50">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="w-5 h-5" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <div>
              <CardTitle className="text-sm">AI Sales Assistant</CardTitle>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <div className={`w-2 h-2 rounded-full ${
                  aiStatus === 'connected' ? 'bg-green-400' : 
                  aiStatus === 'error' ? 'bg-red-400' : 'bg-gray-400'
                }`} />
                {aiProvider === 'gemini' ? 'Gemini AI' : 'OpenAI'} • {aiStatus}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMinimize}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className="flex items-start gap-2">
                  {message.type === 'ai' && <Bot className="w-4 h-4 mt-0.5 text-purple-600" />}
                  {message.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 w-full justify-start"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about leads, strategies, or insights..."
            className="flex-1"
          />
          <Button 
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-1 mt-2 text-xs text-gray-500">
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            {leads.length} leads analyzed
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Target className="w-3 h-3 mr-1" />
            AI insights active
          </Badge>
        </div>
      </div>
    </Card>
  );
}

/**
 * Generate AI response based on user input and lead data
 */
function generateAIResponse(userInput: string, leads: Lead[]): Message {
  const input = userInput.toLowerCase();
  let content = '';
  let suggestions: string[] = [];

  if (input.includes('top leads') || input.includes('analyze')) {
    const topLeads = leads.filter(l => l.confidence > 80).slice(0, 3);
    content = `I found ${topLeads.length} high-confidence leads:\n\n${topLeads.map(l => 
      `• ${l.company.name} (${l.confidence}% confidence) - ${l.temporalSignals.length} active signals`
    ).join('\n')}\n\nThese leads show strong potential based on recent market activity and growth indicators.`;
    suggestions = ['Generate outreach for top lead', 'Show relationship opportunities', 'Analyze market trends'];
  }
  else if (input.includes('outreach') || input.includes('email')) {
    content = `For effective outreach, I recommend focusing on:\n\n• Recent company signals (funding, leadership changes)\n• Warm relationship connections\n• Industry-specific value propositions\n• Timing based on market activity\n\nWould you like me to generate personalized outreach for a specific lead?`;
    suggestions = ['Generate email template', 'Find warm introductions', 'Suggest timing strategy'];
  }
  else if (input.includes('trends') || input.includes('market')) {
    const industries = [...new Set(leads.map(l => l.company.industry))];
    content = `Current market trends in your lead portfolio:\n\n• ${industries.length} industries represented\n• ${leads.filter(l => l.temporalSignals.some(s => s.type === 'funding')).length} companies with recent funding\n• ${leads.filter(l => l.temporalSignals.some(s => s.type === 'growth')).length} companies showing growth signals\n\nTech sector shows particularly strong activity with AI and cloud adoption driving expansion.`;
    suggestions = ['Industry deep-dive', 'Competitive analysis', 'Timing recommendations'];
  }
  else if (input.includes('warm') || input.includes('connections')) {
    const warmLeads = leads.filter(l => l.relationships.some(r => r.warmth === 'high'));
    content = `I found ${warmLeads.length} leads with warm connections:\n\n${warmLeads.slice(0, 3).map(l => 
      `• ${l.company.name} - ${l.relationships.filter(r => r.warmth === 'high').length} warm connection(s)`
    ).join('\n')}\n\nLeverage these relationships for higher response rates and faster deal progression.`;
    suggestions = ['Introduction templates', 'Connection mapping', 'Referral strategies'];
  }
  else {
    content = `I can help you with:\n\n• Lead analysis and prioritization\n• Personalized outreach strategies\n• Market trends and timing insights\n• Relationship mapping and warm introductions\n• Competitive intelligence\n\nWhat specific area would you like to explore?`;
    suggestions = ['Analyze my top leads', 'Suggest outreach strategies', 'Show market trends', 'Find warm connections'];
  }

  return {
    id: Date.now().toString(),
    type: 'ai',
    content,
    timestamp: new Date(),
    suggestions
  };
}