import { Header } from "@/components/dashboard/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Overview</h1>
          <p className="text-gray-600 mb-6">
            Welcome to your Lead Intelligence Dashboard. Here you can view comprehensive analytics and insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Leads</h3>
              <p className="text-3xl font-bold text-blue-600">1,247</p>
              <p className="text-sm text-blue-700 mt-2">↗️ +12% this month</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Conversion Rate</h3>
              <p className="text-3xl font-bold text-green-600">24.3%</p>
              <p className="text-sm text-green-700 mt-2">↗️ +5.2% this month</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Revenue Pipeline</h3>
              <p className="text-3xl font-bold text-purple-600">$2.4M</p>
              <p className="text-sm text-purple-700 mt-2">↗️ +18% this month</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                View All Leads
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}