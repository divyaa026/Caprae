import React, { useState } from 'react';
import { Brain, Settings, ToggleLeft, ToggleRight, Info, TestTube } from 'lucide-react';
import { AIService } from '@/services/aiService';

interface AIDemoModeProps {
  isAIEnabled: boolean;
  onToggleAI: (enabled: boolean) => void;
}

export function AIDemoMode({ isAIEnabled, onToggleAI }: AIDemoModeProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  
  const aiProvider = import.meta.env.VITE_AI_PROVIDER || 'gemini';
  const hasGeminiKey = !!import.meta.env.VITE_GEMINI_API_KEY;
  const hasOpenAIKey = !!import.meta.env.VITE_OPENAI_API_KEY;

  // Debug logging
  console.log('🔍 AI Debug Info:');
  console.log('AI Provider:', aiProvider);
  console.log('Has Gemini Key:', hasGeminiKey);
  console.log('AI Enabled Flag:', import.meta.env.VITE_AI_ENABLED);
  console.log('Is AI Enabled:', isAIEnabled);

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      const result = await AIService.testGeminiConnection();
      setTestResult(result.success ? `✅ ${result.message}` : `❌ ${result.message}`);
    } catch (error: any) {
      setTestResult(`❌ Test failed: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  const getAIStatus = () => {
    if (aiProvider === 'gemini' && hasGeminiKey) return 'Live Gemini AI';
    if (aiProvider === 'openai' && hasOpenAIKey) return 'Live OpenAI';
    return 'Mock Data';
  };

  const getStatusColor = () => {
    if ((aiProvider === 'gemini' && hasGeminiKey) || (aiProvider === 'openai' && hasOpenAIKey)) {
      return 'text-green-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Brain className="h-5 w-5 text-purple-600 mr-2" />
          <span className="font-medium text-gray-900">AI Demo Mode</span>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`text-sm ${getStatusColor()}`}>
            {getAIStatus()}
          </span>
          {hasGeminiKey && (
            <button
              onClick={testConnection}
              disabled={testing}
              className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded transition-colors disabled:opacity-50"
            >
              {testing ? (
                <>
                  <TestTube className="h-3 w-3 inline mr-1 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube className="h-3 w-3 inline mr-1" />
                  Test API
                </>
              )}
            </button>
          )}
          <button
            onClick={() => onToggleAI(!isAIEnabled)}
            className="flex items-center"
            disabled={!hasGeminiKey && !hasOpenAIKey}
          >
            {isAIEnabled && (hasGeminiKey || hasOpenAIKey) ? (
              <ToggleRight className="h-6 w-6 text-green-500" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="mt-3 pt-3 border-t border-purple-100">
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Live AI Mode:</strong> Uses {aiProvider === 'gemini' ? 'Google Gemini Pro' : 'OpenAI GPT-3.5-turbo'} for real-time lead analysis, 
              insights generation, and personalized outreach suggestions.
            </p>
            <p>
              <strong>Mock Data Mode:</strong> Demonstrates AI capabilities using pre-built intelligent 
              responses and simulated confidence scores.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
              <p className="text-yellow-800">
                <strong>Setup:</strong> {aiProvider === 'gemini' ? 
                  'Add your free Gemini API key to .env as VITE_GEMINI_API_KEY' :
                  'Add your OpenAI API key to .env as VITE_OPENAI_API_KEY'
                }
              </p>
              {aiProvider === 'gemini' && (
                <p className="text-yellow-800 text-xs mt-1">
                  Get free Gemini API key at: https://makersuite.google.com/app/apikey
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {testResult && (
        <div className="mt-3 pt-3 border-t border-purple-100">
          <div className="text-sm bg-gray-50 p-2 rounded">
            <strong>API Test Result:</strong> {testResult}
          </div>
        </div>
      )}
    </div>
  );
}