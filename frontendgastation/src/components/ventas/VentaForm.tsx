import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface VentaFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function VentaForm({ initialData, onSubmit, onCancel }: VentaFormProps) {
  const [fecha, setFecha] = useState(initialData?.fecha || '');
  const [totalCombustibles, setTotalCombustibles] = useState(initialData?.totalCombustibles || '');
  const [totalProductos, setTotalProductos] = useState(initialData?.totalProductos || '');
  const [totalGeneral, setTotalGeneral] = useState(initialData?.totalGeneral || '');
  const [usuarioId, setUsuarioId] = useState(initialData?.usuarioId || '');
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFecha(initialData.fecha);
      setTotalCombustibles(initialData.totalCombustibles);
      setTotalProductos(initialData.totalProductos);
      setTotalGeneral(initialData.totalGeneral);
      setUsuarioId(initialData.usuarioId);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: any = {};
    const tc = parseFloat(totalCombustibles);
    const tp = parseFloat(totalProductos);
    const tg = parseFloat(totalGeneral);
    const uId = parseInt(usuarioId);

    if (!fecha) newErrors.fecha = 'Date is required';

    if (!totalCombustibles) newErrors.totalCombustibles = 'Total Combustibles is required';
    else if (isNaN(tc) || tc < 0) newErrors.totalCombustibles = 'Total Combustibles must be a non-negative number';

    if (!totalProductos) newErrors.totalProductos = 'Total Productos is required';
    else if (isNaN(tp) || tp < 0) newErrors.totalProductos = 'Total Productos must be a non-negative number';

    if (!totalGeneral) newErrors.totalGeneral = 'Total General is required';
    else if (isNaN(tg) || tg < 0) newErrors.totalGeneral = 'Total General must be a non-negative number';
    else if (tc + tp !== tg) newErrors.totalGeneral = 'Total General must be the sum of Total Combustibles and Total Productos';

    if (!usuarioId) newErrors.usuarioId = 'User ID is required';
    else if (isNaN(uId) || uId <= 0) newErrors.usuarioId = 'User ID must be a positive integer';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({ 
      ...initialData, 
      fecha, 
      totalCombustibles: parseFloat(totalCombustibles),
      totalProductos: parseFloat(totalProductos),
      totalGeneral: parseFloat(totalGeneral),
      usuarioId: parseInt(usuarioId)
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Daily Sale' : 'Create Daily Sale'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
            {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalCombustibles">Total Combustibles</Label>
            <Input
              id="totalCombustibles"
              type="number"
              value={totalCombustibles}
              onChange={(e) => setTotalCombustibles(e.target.value)}
              required
            />
            {errors.totalCombustibles && <p className="text-red-500 text-sm">{errors.totalCombustibles}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalProductos">Total Productos</Label>
            <Input
              id="totalProductos"
              type="number"
              value={totalProductos}
              onChange={(e) => setTotalProductos(e.target.value)}
              required
            />
            {errors.totalProductos && <p className="text-red-500 text-sm">{errors.totalProductos}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalGeneral">Total General</Label>
            <Input
              id="totalGeneral"
              type="number"
              value={totalGeneral}
              onChange={(e) => setTotalGeneral(e.target.value)}
              required
            />
            {errors.totalGeneral && <p className="text-red-500 text-sm">{errors.totalGeneral}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="usuarioId">Usuario ID</Label>
            <Input
              id="usuarioId"
              type="number"
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              required
            />
            {errors.usuarioId && <p className="text-red-500 text-sm">{errors.usuarioId}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Save Changes' : 'Create Daily Sale'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
