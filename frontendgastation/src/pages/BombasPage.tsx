import React, { useEffect, useState } from 'react';
import { getBombas, createBomba, updateBomba, deleteBomba } from '../services/bombaService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { BombaForm } from '../components/bombas/BombaForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Terminal } from 'lucide-react';

export function BombasPage() {
  const [bombas, setBombas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBomba, setEditingBomba] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  const fetchBombas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBombas();
      setBombas(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch pumps');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchBombas();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAddBomba = () => {
    setEditingBomba(null);
    setShowForm(true);
  };

  const handleEditBomba = (bomba: any) => {
    setEditingBomba(bomba);
    setShowForm(true);
  };

  const handleDeleteBomba = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBomba(id);
      fetchBombas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete pump');
      setLoading(false);
    }
  };

  const handleSubmitForm = async (bombaData: any) => {
    setLoading(true);
    setError(null);
    try {
      if (editingBomba) {
        await updateBomba(bombaData.id, bombaData);
      } else {
        await createBomba(bombaData);
      }
      setShowForm(false);
      fetchBombas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save pump');
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBomba(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bombas</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="mb-4" onClick={handleAddBomba}>Add Bomba</Button>
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
          <BombaForm initialData={editingBomba} onSubmit={handleSubmitForm} onCancel={handleCancelForm} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Tipo Combustible</TableHead>
                <TableHead>Tanque ID</TableHead>
                <TableHead>Total Despachado</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {bombas.map(bomba => (
                <TableRow key={bomba.id}>
                  <TableCell>{bomba.id}</TableCell>
                  <TableCell>{bomba.numero}</TableCell>
                  <TableCell>{bomba.tipoCombustible}</TableCell>
                  <TableCell>{bomba.tanqueId}</TableCell>
                  <TableCell>{bomba.totalDespachado}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditBomba(bomba)}>Edit</Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the pump and remove its data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteBomba(bomba.id)}>Continue</AlertDialogAction>
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
