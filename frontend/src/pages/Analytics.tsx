import { Header } from "@/components/dashboard/Header";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics & Insights</h1>
          <p className="text-gray-600 mb-6">
            Deep dive into your sales performance, lead quality, and AI-driven insights.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">AI Confidence Score</h3>
                <p className="text-3xl font-bold">87.2%</p>
                <p className="text-sm opacity-90 mt-2">Average lead quality this month</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Conversion Funnel</h3>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Prospects</span>
                    <span>1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Qualified</span>
                    <span>486</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Converted</span>
                    <span>118</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Signals</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">💰 Funding Events</span>
                    <span className="text-sm font-semibold text-green-600">42% conversion</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">👑 Leadership Changes</span>
                    <span className="text-sm font-semibold text-blue-600">38% conversion</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">📈 Growth Indicators</span>
                    <span className="text-sm font-semibold text-purple-600">31% conversion</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Relationship Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">🎓 Alumni Connections</span>
                    <span className="text-sm font-semibold text-green-600">High Impact</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">🤝 Investor Networks</span>
                    <span className="text-sm font-semibold text-blue-600">Medium Impact</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">💼 Employment History</span>
                    <span className="text-sm font-semibold text-yellow-600">Medium Impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}