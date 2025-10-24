import React, { useState } from 'react';
import { ModuleLayout } from './module-layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Gauge, Truck, Fuel, BarChart3, CheckCircle } from 'lucide-react';
import { Screen } from '../App';

interface TanksPumpsModuleProps {
  onNavigate: (screen: Screen) => void;
}

type TanksPumpsView = 'levels' | 'delivery' | 'dispensing' | 'reconciliation';

const mockTanks = [
  { id: 1, name: 'Tank 1 - Regular', capacity: 10000, current: 8500, fuelType: 'Regular 87', percentage: 85 },
  { id: 2, name: 'Tank 2 - Premium', capacity: 10000, current: 6200, fuelType: 'Premium 91', percentage: 62 },
  { id: 3, name: 'Tank 3 - Diesel', capacity: 8000, current: 7200, fuelType: 'Diesel', percentage: 90 },
  { id: 4, name: 'Tank 4 - Regular', capacity: 10000, current: 4100, fuelType: 'Regular 87', percentage: 41 },
];

const mockReconciliationData = [
  { 
    fuelType: 'Regular 87', 
    received: 15000, 
    sold: 12500, 
    stored: 10600, 
    difference: 100, 
    status: 'normal' 
  },
  { 
    fuelType: 'Premium 91', 
    received: 8000, 
    sold: 6800, 
    stored: 6200, 
    difference: -50, 
    status: 'warning' 
  },
  { 
    fuelType: 'Diesel', 
    received: 6000, 
    sold: 4200, 
    stored: 7200, 
    difference: 25, 
    status: 'normal' 
  },
];

export function TanksPumpsModule({ onNavigate }: TanksPumpsModuleProps) {
  const [currentView, setCurrentView] = useState<TanksPumpsView>('levels');

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderContent = () => {
    switch (currentView) {
      case 'delivery':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Fuel Delivery to Tanks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tank">Tank</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tank" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTanks.map(tank => (
                        <SelectItem key={tank.id} value={tank.id.toString()}>
                          {tank.name} ({tank.current}/{tank.capacity}L)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular87">Regular 87</SelectItem>
                      <SelectItem value="premium91">Premium 91</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Received Quantity (Liters)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity in liters"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver Name</Label>
                  <Input
                    id="driverName"
                    placeholder="Enter driver name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    placeholder="Enter invoice number"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Truck className="h-4 w-4 mr-2" />
                  Record Delivery
                </Button>
                <Button variant="outline">
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'dispensing':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-green-600" />
                Fuel Dispensing Record
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pumpNumber">Pump Number</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pump" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Pump 1 - Regular 87</SelectItem>
                      <SelectItem value="2">Pump 2 - Regular 87</SelectItem>
                      <SelectItem value="3">Pump 3 - Premium 91</SelectItem>
                      <SelectItem value="4">Pump 4 - Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="litersSold">Liters Sold</Label>
                  <Input
                    id="litersSold"
                    type="number"
                    step="0.01"
                    placeholder="Enter liters sold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saleAmount">Sale Amount ($)</Label>
                  <Input
                    id="saleAmount"
                    type="number"
                    step="0.01"
                    placeholder="Enter sale amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saleDate">Sale Date</Label>
                  <Input
                    id="saleDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Fuel className="h-4 w-4 mr-2" />
                  Record Sale
                </Button>
                <Button variant="outline">
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'reconciliation':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Automatic Reconciliation Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fuel Type</TableHead>
                    <TableHead>Received (L)</TableHead>
                    <TableHead>Sold (L)</TableHead>
                    <TableHead>Stored (L)</TableHead>
                    <TableHead>Difference (L)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReconciliationData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.fuelType}</TableCell>
                      <TableCell>{item.received.toLocaleString()}</TableCell>
                      <TableCell>{item.sold.toLocaleString()}</TableCell>
                      <TableCell>{item.stored.toLocaleString()}</TableCell>
                      <TableCell className={item.difference < 0 ? 'text-red-600' : 'text-green-600'}>
                        {item.difference > 0 ? '+' : ''}{item.difference}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'normal' ? 'default' : 'secondary'} 
                               className={item.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {item.status === 'normal' ? 'Normal' : 'Check Required'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Report Generated:</strong> {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Differences within ±100L are considered normal due to measurement variance and evaporation.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default: // levels
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockTanks.map((tank) => (
                <Card key={tank.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Gauge className="h-4 w-4 text-blue-600" />
                      {tank.name}
                    </CardTitle>
                    <p className="text-xs text-gray-600">{tank.fuelType}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{tank.current.toLocaleString()}L</span>
                        <span className="text-gray-500">{tank.capacity.toLocaleString()}L</span>
                      </div>
                      <Progress value={tank.percentage} className="h-3" />
                      <div className="text-center">
                        <span className={`text-sm font-medium ${
                          tank.percentage >= 70 ? 'text-green-600' : 
                          tank.percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {tank.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      {tank.percentage < 40 && (
                        <Badge variant="destructive" className="text-xs">
                          Low Level - Refill Needed
                        </Badge>
                      )}
                      {tank.percentage >= 40 && tank.percentage < 70 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Medium Level
                        </Badge>
                      )}
                      {tank.percentage >= 70 && (
                        <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                          Good Level
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Tank Level Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tank</TableHead>
                      <TableHead>Fuel Type</TableHead>
                      <TableHead>Current Level</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTanks.map((tank) => (
                      <TableRow key={tank.id}>
                        <TableCell className="font-medium">{tank.name}</TableCell>
                        <TableCell>{tank.fuelType}</TableCell>
                        <TableCell>{tank.current.toLocaleString()}L</TableCell>
                        <TableCell>{tank.capacity.toLocaleString()}L</TableCell>
                        <TableCell>{tank.percentage}%</TableCell>
                        <TableCell>
                          {tank.percentage < 40 && (
                            <Badge variant="destructive">Low</Badge>
                          )}
                          {tank.percentage >= 40 && tank.percentage < 70 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
                          )}
                          {tank.percentage >= 70 && (
                            <Badge variant="default" className="bg-green-100 text-green-800">Good</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
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
      title="Tanks & Pumps Management"
      onNavigate={onNavigate}
      tabs={[
        { id: 'levels', label: 'Tank Levels', icon: Gauge },
        { id: 'delivery', label: 'Fuel Delivery', icon: Truck },
        { id: 'dispensing', label: 'Fuel Dispensing', icon: Fuel },
        { id: 'reconciliation', label: 'Reconciliation', icon: CheckCircle }
      ]}
      activeTab={currentView}
      onTabChange={(tab) => setCurrentView(tab as TanksPumpsView)}
    >
      {renderContent()}
    </ModuleLayout>
  );
}