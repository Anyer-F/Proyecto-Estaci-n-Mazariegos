import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from './ui/sidebar';
import { Button } from './ui/button';
import { Fuel, LogOut, Users, LayoutDashboard, Fuel as FuelIcon, Droplet, DollarSign, ScrollText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
}

export function MainLayout() {
  const { logout, user, isAdmin, isEncargado } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Usuarios', path: '/usuarios', icon: Users, roles: ['ADMIN'] },
    { label: 'Tanques', path: '/tanques', icon: Droplet, roles: ['ADMIN'] },
    { label: 'Bombas', path: '/bombas', icon: FuelIcon, roles: ['ADMIN'] },
    { label: 'Ventas', path: '/ventas', icon: DollarSign, roles: ['ADMIN', 'ENCARGADO'] },
    { label: 'Reportes', path: '/reportes', icon: ScrollText, roles: ['ADMIN', 'ENCARGADO'] },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true; // If no roles specified, accessible to all authenticated users
    if (isAdmin && item.roles.includes('ADMIN')) return true;
    if (isEncargado && item.roles.includes('ENCARGADO')) return true;
    return false;
  });

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Fuel className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">FuelFlow</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          {/* Main content area */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Welcome, {user?.username}!</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </header>
          <main className="flex-1 p-6">
            <Outlet /> {/* This is where the routed components will be rendered */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
