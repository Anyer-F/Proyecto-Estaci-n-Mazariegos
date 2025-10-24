import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface BombaFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function BombaForm({ initialData, onSubmit, onCancel }: BombaFormProps) {
  const [numero, setNumero] = useState(initialData?.numero || '');
  const [tipoCombustible, setTipoCombustible] = useState(initialData?.tipoCombustible || 'GASOLINA_SUPER');
  const [tanqueId, setTanqueId] = useState(initialData?.tanqueId || '');
  const [totalDespachado, setTotalDespachado] = useState(initialData?.totalDespachado || '');
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setNumero(initialData.numero);
      setTipoCombustible(initialData.tipoCombustible);
      setTanqueId(initialData.tanqueId);
      setTotalDespachado(initialData.totalDespachado);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: any = {};
    const num = parseInt(numero);
    const tId = parseInt(tanqueId);
    const totalDesp = parseFloat(totalDespachado);

    if (!numero) newErrors.numero = 'Number is required';
    else if (isNaN(num) || num <= 0) newErrors.numero = 'Number must be a positive integer';

    if (!tipoCombustible) newErrors.tipoCombustible = 'Fuel type is required';

    if (!tanqueId) newErrors.tanqueId = 'Tank ID is required';
    else if (isNaN(tId) || tId <= 0) newErrors.tanqueId = 'Tank ID must be a positive integer';

    if (!totalDespachado) newErrors.totalDespachado = 'Total dispatched is required';
    else if (isNaN(totalDesp) || totalDesp < 0) newErrors.totalDespachado = 'Total dispatched must be a non-negative number';

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
    onSubmit({ ...initialData, numero: parseInt(numero), tipoCombustible, tanqueId: parseInt(tanqueId), totalDespachado: parseFloat(totalDespachado) });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Pump' : 'Create Pump'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numero">Número</Label>
            <Input
              id="numero"
              type="number"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
            {errors.numero && <p className="text-red-500 text-sm">{errors.numero}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoCombustible">Tipo de Combustible</Label>
            <Select value={tipoCombustible} onValueChange={(value) => {
              setTipoCombustible(value);
              setErrors({ ...errors, tipoCombustible: undefined });
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GASOLINA_SUPER">Gasolina Súper</SelectItem>
                <SelectItem value="GASOLINA_REGULAR">Gasolina Regular</SelectItem>
                <SelectItem value="DIESEL">Diésel</SelectItem>
              </SelectContent>
            </Select>
            {errors.tipoCombustible && <p className="text-red-500 text-sm">{errors.tipoCombustible}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tanqueId">Tanque ID</Label>
            <Input
              id="tanqueId"
              type="number"
              value={tanqueId}
              onChange={(e) => setTanqueId(e.target.value)}
              required
            />
            {errors.tanqueId && <p className="text-red-500 text-sm">{errors.tanqueId}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalDespachado">Total Despachado</Label>
            <Input
              id="totalDespachado"
              type="number"
              value={totalDespachado}
              onChange={(e) => setTotalDespachado(e.target.value)}
              required
            />
            {errors.totalDespachado && <p className="text-red-500 text-sm">{errors.totalDespachado}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Save Changes' : 'Create Pump'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
