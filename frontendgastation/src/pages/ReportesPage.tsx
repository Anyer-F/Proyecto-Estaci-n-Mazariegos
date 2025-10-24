import React, { useEffect, useState } from 'react';
import { getReporteFinanciero, getReporteExistencias, getReporteRendimiento } from '../services/reporteService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Terminal } from 'lucide-react';

export function ReportesPage() {
  const [reporteFinanciero, setReporteFinanciero] = useState([]);
  const [reporteExistencias, setReporteExistencias] = useState([]);
  const [reporteRendimiento, setReporteRendimiento] = useState([]);
  const [startDateFinanciero, setStartDateFinanciero] = useState('');
  const [endDateFinanciero, setEndDateFinanciero] = useState('');
  const [startDateRendimiento, setStartDateRendimiento] = useState('');
  const [endDateRendimiento, setEndDateRendimiento] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, isEncargado } = useAuth();

  const fetchReportes = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isAdmin || isEncargado) {
        const [resFinanciero, resExistencias, resRendimiento] = await Promise.all([
          getReporteFinanciero(startDateFinanciero, endDateFinanciero),
          getReporteExistencias(),
          getReporteRendimiento(startDateRendimiento, endDateRendimiento),
        ]);
        setReporteFinanciero(resFinanciero.data);
        setReporteExistencias(resExistencias.data);
        setReporteRendimiento(resRendimiento.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, [isAdmin, isEncargado, startDateFinanciero, endDateFinanciero, startDateRendimiento, endDateRendimiento]);

  if (!isAdmin && !isEncargado) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reportes</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="financiero">
            <TabsList>
              <TabsTrigger value="financiero">Financiero</TabsTrigger>
              <TabsTrigger value="existencias">Existencias</TabsTrigger>
              <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
            </TabsList>
            <TabsContent value="financiero">
              <h3 className="text-lg font-semibold mb-2">Reporte Financiero</h3>
              <div className="flex space-x-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="startDateFinanciero">Start Date</Label>
                  <Input type="date" id="startDateFinanciero" value={startDateFinanciero} onChange={(e) => setStartDateFinanciero(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDateFinanciero">End Date</Label>
                  <Input type="date" id="endDateFinanciero" value={endDateFinanciero} onChange={(e) => setEndDateFinanciero(e.target.value)} />
                </div>
                <Button onClick={fetchReportes}>Generate Report</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Ingresos</TableHead>
                    <TableHead>Egresos</TableHead>
                    <TableHead>Ganancia Neta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reporteFinanciero.map(reporte => (
                    <TableRow key={reporte.id}>
                      <TableCell>{reporte.id}</TableCell>
                      <TableCell>{reporte.fecha}</TableCell>
                      <TableCell>{reporte.ingresos}</TableCell>
                      <TableCell>{reporte.egresos}</TableCell>
                      <TableCell>{reporte.gananciaNeta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="existencias">
              <h3 className="text-lg font-semibold mb-2">Reporte de Existencias</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad Actual</TableHead>
                    <TableHead>Última Actualización</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reporteExistencias.map(reporte => (
                    <TableRow key={reporte.id}>
                      <TableCell>{reporte.id}</TableCell>
                      <TableCell>{reporte.producto}</TableCell>
                      <TableCell>{reporte.cantidadActual}</TableCell>
                      <TableCell>{reporte.ultimaActualizacion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="rendimiento">
              <h3 className="text-lg font-semibold mb-2">Reporte de Rendimiento</h3>
              <div className="flex space-x-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="startDateRendimiento">Start Date</Label>
                  <Input type="date" id="startDateRendimiento" value={startDateRendimiento} onChange={(e) => setStartDateRendimiento(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDateRendimiento">End Date</Label>
                  <Input type="date" id="endDateRendimiento" value={endDateRendimiento} onChange={(e) => setEndDateRendimiento(e.target.value)} />
                </div>
                <Button onClick={fetchReportes}>Generate Report</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Bomba</TableHead>
                    <TableHead>Litros Vendidos</TableHead>
                    <TableHead>Total Ventas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reporteRendimiento.map(reporte => (
                    <TableRow key={reporte.id}>
                      <TableCell>{reporte.id}</TableCell>
                      <TableCell>{reporte.bomba}</TableCell>
                      <TableCell>{reporte.litrosVendidos}</TableCell>
                      <TableCell>{reporte.totalVentas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
