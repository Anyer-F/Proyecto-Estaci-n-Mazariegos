import React, { useState } from 'react';
import { ModuleLayout } from './module-layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, FileText, TrendingUp, Download, Calendar } from 'lucide-react';
import { Screen } from '../App';

interface FinancialReportsModuleProps {
  onNavigate: (screen: Screen) => void;
}

type FinancialView = 'entry' | 'sales-report' | 'profit-report';

const mockSalesData = [
  { date: '2024-01-15', regular87: 1250.50, premium91: 890.25, diesel: 675.80, products: 125.45, total: 2942.00 },
  { date: '2024-01-14', regular87: 1180.75, premium91: 920.50, diesel: 720.25, products: 98.50, total: 2920.00 },
  { date: '2024-01-13', regular87: 1320.25, premium91: 780.90, diesel: 650.75, products: 156.10, total: 2908.00 },
  { date: '2024-01-12', regular87: 1450.80, premium91: 1050.25, diesel: 825.50, products: 173.45, total: 3500.00 },
  { date: '2024-01-11', regular87: 1280.60, premium91: 890.75, diesel: 590.25, products: 139.40, total: 2901.00 },
];

const chartData = [
  { name: 'Regular 87', sales: 6482.90, cost: 4537.03, profit: 1945.87 },
  { name: 'Premium 91', sales: 4632.65, cost: 3475.49, profit: 1157.16 },
  { name: 'Diesel', sales: 3462.55, cost: 2595.41, profit: 867.14 },
  { name: 'Products', sales: 692.90, cost: 415.74, profit: 277.16 },
];

const pieData = [
  { name: 'Regular 87', value: 44.2, color: '#3b82f6' },
  { name: 'Premium 91', value: 31.6, color: '#10b981' },
  { name: 'Diesel', value: 23.6, color: '#f59e0b' },
  { name: 'Products', value: 4.7, color: '#8b5cf6' },
];

export function FinancialReportsModule({ onNavigate }: FinancialReportsModuleProps) {
  const [currentView, setCurrentView] = useState<FinancialView>('entry');

  const renderContent = () => {
    switch (currentView) {
      case 'entry':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Daily Sales Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryDate">Date</Label>
                  <Input
                    id="entryDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (6AM - 2PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (2PM - 10PM)</SelectItem>
                      <SelectItem value="night">Night (10PM - 6AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regular87">Regular 87 Sales ($)</Label>
                  <Input
                    id="regular87"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premium91">Premium 91 Sales ($)</Label>
                  <Input
                    id="premium91"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diesel">Diesel Sales ($)</Label>
                  <Input
                    id="diesel"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="products">Product Sales ($)</Label>
                  <Input
                    id="products"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cashSales">Cash Sales ($)</Label>
                  <Input
                    id="cashSales"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardSales">Card Sales ($)</Label>
                  <Input
                    id="cardSales"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Save Daily Sales
                </Button>
                <Button variant="outline">
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'sales-report':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Sales Report
                </CardTitle>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="startDate">From:</Label>
                    <Input
                      id="startDate"
                      type="date"
                      defaultValue="2024-01-11"
                      className="w-auto"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="endDate">To:</Label>
                    <Input
                      id="endDate"
                      type="date"
                      defaultValue="2024-01-15"
                      className="w-auto"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Apply Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Regular 87</TableHead>
                      <TableHead>Premium 91</TableHead>
                      <TableHead>Diesel</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSalesData.map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sale.date}</TableCell>
                        <TableCell>${sale.regular87.toLocaleString()}</TableCell>
                        <TableCell>${sale.premium91.toLocaleString()}</TableCell>
                        <TableCell>${sale.diesel.toLocaleString()}</TableCell>
                        <TableCell>${sale.products.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">${sale.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Regular 87 Total:</p>
                      <p className="font-semibold text-blue-600">$6,482.90</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Premium 91 Total:</p>
                      <p className="font-semibold text-green-600">$4,632.65</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Diesel Total:</p>
                      <p className="font-semibold text-yellow-600">$3,462.55</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Products Total:</p>
                      <p className="font-semibold text-purple-600">$692.90</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Grand Total:</p>
                      <p className="font-semibold text-gray-900 text-lg">$15,271.00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default: // profit-report
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Revenue vs Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, '']} />
                      <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                      <Bar dataKey="cost" fill="#ef4444" name="Costs" />
                      <Bar dataKey="profit" fill="#10b981" name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Sales Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm">{entry.name}: {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Profit Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-semibold text-blue-600">$15,271</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Costs</p>
                    <p className="text-2xl font-semibold text-red-600">$11,023</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Gross Profit</p>
                    <p className="text-2xl font-semibold text-green-600">$4,248</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-2xl font-semibold text-purple-600">27.8%</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Costs</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chartData.map((item, index) => {
                      const margin = ((item.profit / item.sales) * 100).toFixed(1);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>${item.sales.toLocaleString()}</TableCell>
                          <TableCell>${item.cost.toLocaleString()}</TableCell>
                          <TableCell className="text-green-600">${item.profit.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              {margin}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <ModuleLayout
      title="Financial Reports"
      onNavigate={onNavigate}
      tabs={[
        { id: 'entry', label: 'Daily Sales Entry', icon: DollarSign },
        { id: 'sales-report', label: 'Sales Report', icon: FileText },
        { id: 'profit-report', label: 'Profit Analysis', icon: TrendingUp }
      ]}
      activeTab={currentView}
      onTabChange={(tab) => setCurrentView(tab as FinancialView)}
    >
      {renderContent()}
    </ModuleLayout>
  );
}