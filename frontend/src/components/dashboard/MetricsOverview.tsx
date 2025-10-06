import { Lead } from "@/types/lead";

interface MetricsOverviewProps {
  leads: Lead[];
}

export function MetricCards({ leads }: MetricsOverviewProps) {
  const metrics = [
    {
      title: 'Hot Leads',
      value: '24',
      change: '+12%',
      description: 'Ready for immediate outreach',
      color: 'from-red-500 to-orange-500',
      icon: '🔥'
    },
    {
      title: 'Relationship Opportunities',
      value: '18',
      change: '+8%',
      description: 'Warm introductions available',
      color: 'from-orange-500 to-amber-500',
      icon: '🤝'
    },
    {
      title: 'Funding Alerts',
      value: '7',
      change: '+23%',
      description: 'Recent raises detected',
      color: 'from-green-500 to-emerald-500',
      icon: '💰'
    },
    {
      title: 'Competitive Replacements',
      value: '11',
      change: '+15%',
      description: 'Migration opportunities',
      color: 'from-purple-500 to-violet-500',
      icon: '🔄'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <div className="flex items-baseline mt-1">
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <span className="ml-2 text-sm font-medium text-green-600">{metric.change}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
            </div>
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center text-white text-xl`}>
              {metric.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}