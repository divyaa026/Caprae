import { useState } from "react";
import { Search, User, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onAddLead?: () => void;
}

export function Header({ onSearch, onAddLead }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleAddLead = () => {
    alert("Add New Lead functionality would open a form/modal here");
    onAddLead?.();
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leads', path: '/' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Settings', path: '/settings' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            </div>
            <div className="ml-3">
              <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                SaaSQuatch AI
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <button 
              onClick={handleAddLead}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Lead</span>
            </button>
            
            {/* User Profile */}
            <div className="relative">
              <button 
                className="flex items-center text-sm rounded-full focus:outline-none hover:bg-gray-100 p-1 transition-colors"
                onClick={() => alert("User menu would show profile options here")}
              >
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
