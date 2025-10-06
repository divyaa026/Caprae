import { Header } from "@/components/dashboard/Header";

export default function Leads() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lead Management</h1>
          <p className="text-gray-600 mb-6">
            Manage all your leads, track progress, and optimize your sales pipeline.
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900">🔥 Hot Leads (24)</h3>
              <p className="text-blue-700 text-sm mt-1">Leads requiring immediate attention</p>
            </div>
            
            <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
              <h3 className="font-semibold text-orange-900">☀️ Warm Leads (156)</h3>
              <p className="text-orange-700 text-sm mt-1">Leads in active nurturing phase</p>
            </div>
            
            <div className="border-l-4 border-gray-500 bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">💨 Cold Leads (892)</h3>
              <p className="text-gray-700 text-sm mt-1">Leads for future follow-up</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lead Actions</h2>
            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Import Leads
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Create Campaign
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                Export to CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}