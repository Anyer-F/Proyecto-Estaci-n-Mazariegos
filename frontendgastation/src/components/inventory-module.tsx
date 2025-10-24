import React, { useState } from 'react';
import { ModuleLayout } from './module-layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Plus, Minus, Package, AlertTriangle } from 'lucide-react';
import { Screen } from '../App';

interface InventoryModuleProps {
  onNavigate: (screen: Screen) => void;
}

type InventoryView = 'overview' | 'entry' | 'exit';

const mockInventory = [
  { id: 1, name: 'Motor Oil 5W-30', quantity: 45, unit: 'bottles', minStock: 20, status: 'normal' },
  { id: 2, name: 'Brake Fluid', quantity: 12, unit: 'bottles', minStock: 15, status: 'low' },
  { id: 3, name: 'Air Fresheners', quantity: 8, unit: 'packs', minStock: 10, status: 'critical' },
  { id: 4, name: 'Windshield Washer', quantity: 25, unit: 'bottles', minStock: 15, status: 'normal' },
  { id: 5, name: 'Snack Bars', quantity: 120, unit: 'pieces', minStock: 50, status: 'normal' },
];

export function InventoryModule({ onNavigate }: InventoryModuleProps) {
  const [currentView, setCurrentView] = useState<InventoryView>('overview');
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    unit: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      quantity: '',
      unit: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const getStatusBadge = (status: string, quantity: number, minStock: number) => {
    if (quantity <= minStock / 2) {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Critical
      </Badge>;
    } else if (quantity <= minStock) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Low Stock
      </Badge>;
    }
    return <Badge variant="default" className="bg-green-100 text-green-800">Normal</Badge>;
  };

  const renderContent = () => {
    switch (currentView) {
      case 'entry':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Product Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottles">Bottles</SelectItem>
                      <SelectItem value="packs">Packs</SelectItem>
                      <SelectItem value="pieces">Pieces</SelectItem>
                      <SelectItem value="boxes">Boxes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Inventory
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'exit':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Minus className="h-5 w-5 text-red-600" />
                Product Exit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exitProduct">Product Name</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockInventory.map(item => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name} ({item.quantity} {item.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exitQuantity">Quantity</Label>
                  <Input
                    id="exitQuantity"
                    type="number"
                    placeholder="Enter quantity to remove"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exitReason">Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="damage">Damage</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exitDate">Date</Label>
                  <Input
                    id="exitDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Minus className="h-4 w-4 mr-2" />
                  Remove from Inventory
                </Button>
                <Button variant="outline">
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default: // overview
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Stock Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Min Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>
                        {getStatusBadge(item.status, item.quantity, item.minStock)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <ModuleLayout
      title="Inventory Management"
      onNavigate={onNavigate}
      tabs={[
        { id: 'overview', label: 'Stock Overview', icon: Package },
        { id: 'entry', label: 'Product Entry', icon: Plus },
        { id: 'exit', label: 'Product Exit', icon: Minus }
      ]}
      activeTab={currentView}
      onTabChange={(tab) => setCurrentView(tab as InventoryView)}
    >
      {renderContent()}
    </ModuleLayout>
  );
}