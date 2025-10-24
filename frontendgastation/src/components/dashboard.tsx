import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Users, 
  Package, 
  Gauge, 
  TrendingUp, 
  Settings,
  Fuel,
  LogOut
} from 'lucide-react';
import { Screen } from '../App';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const modules = [
    {
      id: 'inventory' as Screen,
      title: 'Inventory',
      description: 'Manage product stock and movements',
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'tanks-pumps' as Screen,
      title: 'Tanks & Pumps',
      description: 'Monitor fuel levels and dispensing',
      icon: Gauge,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'financial-reports' as Screen,
      title: 'Financial Reports',
      description: 'View sales and profit reports',
      icon: TrendingUp,
      color: 'from-blue-600 to-green-500'
    },
    {
      id: 'system-functions' as Screen,
      title: 'System Functions',
      description: 'Backups, logs, and maintenance',
      icon: Settings,
      color: 'from-green-600 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Fuel className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">FuelFlow Station</h1>
              <p className="text-sm text-gray-600">Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600">Welcome to your gas station management system</p>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card
                  key={module.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md"
                  onClick={() => onNavigate(module.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`bg-gradient-to-r ${module.color} p-3 rounded-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(module.id);
                      }}
                    >
                      Access Module
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-blue-600">156</p>
                <p className="text-sm text-gray-600">Products in Stock</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-green-600">4</p>
                <p className="text-sm text-gray-600">Active Pumps</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-blue-600">$12,450</p>
                <p className="text-sm text-gray-600">Today's Sales</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-green-600">85%</p>
                <p className="text-sm text-gray-600">Avg Tank Level</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}