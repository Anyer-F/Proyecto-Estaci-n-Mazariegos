import React, { useState } from 'react';
import { ModuleLayout } from './module-layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Download, Database, FileText, Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Screen } from '../App';

interface SystemFunctionsModuleProps {
  onNavigate: (screen: Screen) => void;
}

type SystemView = 'backups' | 'logs';

const mockActivityLogs = [
  {
    id: 1,
    user: 'admin',
    action: 'User Login',
    details: 'Admin user logged into the system',
    timestamp: '2024-01-15 09:30:25',
    type: 'info'
  },
  {
    id: 2,
    user: 'admin',
    action: 'Inventory Update',
    details: 'Added 50 bottles of Motor Oil 5W-30',
    timestamp: '2024-01-15 09:25:10',
    type: 'success'
  },
  {
    id: 3,
    user: 'admin',
    action: 'Fuel Delivery',
    details: 'Recorded delivery of 8000L Regular 87 to Tank 1',
    timestamp: '2024-01-15 08:45:32',
    type: 'success'
  },
  {
    id: 4,
    user: 'system',
    action: 'Backup Created',
    details: 'Automatic daily backup completed successfully',
    timestamp: '2024-01-15 02:00:00',
    type: 'info'
  },
  {
    id: 5,
    user: 'admin',
    action: 'Sales Entry',
    details: 'Daily sales entered for 2024-01-14',
    timestamp: '2024-01-14 18:30:15',
    type: 'success'
  },
  {
    id: 6,
    user: 'system',
    action: 'Low Stock Alert',
    details: 'Air Fresheners below minimum stock level',
    timestamp: '2024-01-14 16:15:45',
    type: 'warning'
  },
  {
    id: 7,
    user: 'admin',
    action: 'User Logout',
    details: 'Admin user logged out of the system',
    timestamp: '2024-01-14 17:45:20',
    type: 'info'
  }
];

const mockBackups = [
  {
    id: 1,
    name: 'daily_backup_2024-01-15.sql',
    size: '15.2 MB',
    date: '2024-01-15 02:00:00',
    type: 'Automatic',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'daily_backup_2024-01-14.sql',
    size: '14.8 MB',
    date: '2024-01-14 02:00:00',
    type: 'Automatic',
    status: 'Completed'
  },
  {
    id: 3,
    name: 'manual_backup_2024-01-13.sql',
    size: '14.5 MB',
    date: '2024-01-13 16:30:00',
    type: 'Manual',
    status: 'Completed'
  },
  {
    id: 4,
    name: 'daily_backup_2024-01-13.sql',
    size: '14.3 MB',
    date: '2024-01-13 02:00:00',
    type: 'Automatic',
    status: 'Completed'
  }
];

export function SystemFunctionsModule({ onNavigate }: SystemFunctionsModuleProps) {
  const [currentView, setCurrentView] = useState<SystemView>('backups');
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      setIsCreatingBackup(false);
      // In a real app, you would update the backup list here
    }, 3000);
  };

  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getLogTypeBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Success</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Info</Badge>;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'backups':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Database Backups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Automatic backups are scheduled daily at 2:00 AM. Manual backups can be created anytime.
                    Keep backups secure and test restoration procedures regularly.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleCreateBackup}
                    disabled={isCreatingBackup}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    {isCreatingBackup ? 'Creating Backup...' : 'Create Manual Backup'}
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Latest
                  </Button>
                </div>

                {isCreatingBackup && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Creating backup... This may take a few minutes depending on database size.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Backups</p>
                    <p className="text-2xl font-semibold text-blue-600">{mockBackups.length}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Last Backup</p>
                    <p className="text-lg font-semibold text-green-600">Today 2:00 AM</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Size</p>
                    <p className="text-2xl font-semibold text-purple-600">58.8 MB</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup Name</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Date Created</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBackups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell className="font-medium">{backup.name}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{backup.date}</TableCell>
                        <TableCell>
                          <Badge variant={backup.type === 'Automatic' ? 'default' : 'secondary'}>
                            {backup.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {backup.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      default: // logs
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Activity Log
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                System operations and user activities are logged for security and maintenance purposes.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Filter by Date
                    </Button>
                    <Button variant="outline" size="sm">
                      Filter by User
                    </Button>
                    <Button variant="outline" size="sm">
                      Filter by Type
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActivityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          {getLogTypeIcon(log.type)}
                          {log.action}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={log.details}>
                          {log.details}
                        </TableCell>
                        <TableCell>
                          {getLogTypeBadge(log.type)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>Showing 7 of 247 total log entries</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Log entries are automatically purged after 90 days. Important logs should be exported regularly.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <ModuleLayout
      title="System Functions"
      onNavigate={onNavigate}
      tabs={[
        { id: 'backups', label: 'Database Backups', icon: Database },
        { id: 'logs', label: 'Activity Log', icon: FileText }
      ]}
      activeTab={currentView}
      onTabChange={(tab) => setCurrentView(tab as SystemView)}
    >
      {renderContent()}
    </ModuleLayout>
  );
}