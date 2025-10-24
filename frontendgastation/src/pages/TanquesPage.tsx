import React, { useEffect, useState } from 'react';
import { getTanques, createTanque, updateTanque, deleteTanque } from '../services/tanqueService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { TanqueForm } from '../components/tanques/TanqueForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Terminal } from 'lucide-react';

export function TanquesPage() {
  const [tanques, setTanques] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTanque, setEditingTanque] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  const fetchTanques = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTanques();
      setTanques(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tanks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchTanques();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAddTanque = () => {
    setEditingTanque(null);
    setShowForm(true);
  };

  const handleEditTanque = (tanque: any) => {
    setEditingTanque(tanque);
    setShowForm(true);
  };

  const handleDeleteTanque = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTanque(id);
      fetchTanques();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete tank');
      setLoading(false);
    }
  };

  const handleSubmitForm = async (tanqueData: any) => {
    setLoading(true);
    setError(null);
    try {
      if (editingTanque) {
        await updateTanque(tanqueData.id, tanqueData);
      } else {
        await createTanque(tanqueData);
      }
      setShowForm(false);
      fetchTanques();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save tank');
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTanque(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tanques</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="mb-4" onClick={handleAddTanque}>Add Tanque</Button>
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
          <TanqueForm initialData={editingTanque} onSubmit={handleSubmitForm} onCancel={handleCancelForm} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Nivel Actual</TableHead>
                <TableHead>Tipo Combustible</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tanques.map(tanque => (
                <TableRow key={tanque.id}>
                  <TableCell>{tanque.id}</TableCell>
                  <TableCell>{tanque.capacidad}</TableCell>
                  <TableCell>{tanque.nivelActual}</TableCell>
                  <TableCell>{tanque.tipoCombustible}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditTanque(tanque)}>Edit</Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the tank and remove its data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteTanque(tanque.id)}>Continue</AlertDialogAction>
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
