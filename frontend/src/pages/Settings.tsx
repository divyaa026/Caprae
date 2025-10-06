import { useState } from "react";
import { Header } from "@/components/dashboard/Header";

export default function Settings() {
  const [settings, setSettings] = useState({
    aiConfidenceThreshold: 75,
    autoRefresh: true,
    emailNotifications: true,
    slackIntegration: false,
    dataRetention: 365,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-gray-600 mb-8">
            Configure your Lead Intelligence Dashboard preferences and integrations.
          </p>
          
          <div className="space-y-8">
            {/* AI Settings */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI & Intelligence</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI Confidence Threshold: {settings.aiConfidenceThreshold}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={settings.aiConfidenceThreshold}
                    onChange={(e) => handleSettingChange('aiConfidenceThreshold', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum confidence score for lead recommendations
                  </p>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoRefresh}
                    onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Auto-refresh lead intelligence every 5 minutes
                  </label>
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Email notifications for hot leads
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.slackIntegration}
                    onChange={(e) => handleSettingChange('slackIntegration', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Slack integration for team alerts
                  </label>
                </div>
              </div>
            </div>
            
            {/* Data Management */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Management</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Retention Period
                  </label>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={90}>90 days</option>
                    <option value={180}>6 months</option>
                    <option value={365}>1 year</option>
                    <option value={730}>2 years</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    How long to keep lead interaction history
                  </p>
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  alert('Settings saved successfully!');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}