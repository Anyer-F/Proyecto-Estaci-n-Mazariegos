import React, { useEffect, useState } from 'react';
import { getVentas, createVenta, updateVenta, deleteVenta } from '../services/ventaService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { VentaForm } from '../components/ventas/VentaForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Terminal } from 'lucide-react';

export function VentasPage() {
  const [ventas, setVentas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVenta, setEditingVenta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, isEncargado } = useAuth();

  const fetchVentas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getVentas();
      setVentas(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch sales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin || isEncargado) {
      fetchVentas();
    }
  }, [isAdmin, isEncargado]);

  if (!isAdmin && !isEncargado) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAddVenta = () => {
    setEditingVenta(null);
    setShowForm(true);
  };

  const handleEditVenta = (venta: any) => {
    setEditingVenta(venta);
    setShowForm(true);
  };

  const handleDeleteVenta = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteVenta(id);
      fetchVentas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete sale');
      setLoading(false);
    }
  };

  const handleSubmitForm = async (ventaData: any) => {
    setLoading(true);
    setError(null);
    try {
      if (editingVenta) {
        await updateVenta(ventaData.id, ventaData);
      } else {
        await createVenta(ventaData);
      }
      setShowForm(false);
      fetchVentas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save sale');
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingVenta(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        {(isAdmin || isEncargado) && <Button className="mb-4" onClick={handleAddVenta}>Add Venta</Button>}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading && !showForm ? (
          <div className="space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : showForm ? (
          <VentaForm initialData={editingVenta} onSubmit={handleSubmitForm} onCancel={handleCancelForm} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total Combustibles</TableHead>
                <TableHead>Total Productos</TableHead>
                <TableHead>Total General</TableHead>
                <TableHead>Usuario ID</TableHead>
                {(isAdmin || isEncargado) && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ventas.map(venta => (
                <TableRow key={venta.id}>
                  <TableCell>{venta.id}</TableCell>
                  <TableCell>{venta.fecha}</TableCell>
                  <TableCell>{venta.totalCombustibles}</TableCell>
                  <TableCell>{venta.totalProductos}</TableCell>
                  <TableCell>{venta.totalGeneral}</TableCell>
                  <TableCell>{venta.usuarioId}</TableCell>
                  {(isAdmin || isEncargado) && (
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditVenta(venta)}>Edit</Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the sale and remove its data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteVenta(venta.id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
