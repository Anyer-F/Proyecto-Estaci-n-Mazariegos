import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TanqueFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function TanqueForm({ initialData, onSubmit, onCancel }: TanqueFormProps) {
  const [capacidad, setCapacidad] = useState(initialData?.capacidad || '');
  const [nivelActual, setNivelActual] = useState(initialData?.nivelActual || '');
  const [tipoCombustible, setTipoCombustible] = useState(initialData?.tipoCombustible || 'GASOLINA_SUPER');
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setCapacidad(initialData.capacidad);
      setNivelActual(initialData.nivelActual);
      setTipoCombustible(initialData.tipoCombustible);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: any = {};
    const cap = parseFloat(capacidad);
    const nivel = parseFloat(nivelActual);

    if (!capacidad) newErrors.capacidad = 'Capacity is required';
    else if (isNaN(cap) || cap <= 0) newErrors.capacidad = 'Capacity must be a positive number';

    if (!nivelActual) newErrors.nivelActual = 'Current level is required';
    else if (isNaN(nivel) || nivel < 0) newErrors.nivelActual = 'Current level must be a non-negative number';
    else if (capacidad && nivel > cap) newErrors.nivelActual = 'Current level cannot exceed capacity';

    if (!tipoCombustible) newErrors.tipoCombustible = 'Fuel type is required';

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
    onSubmit({ ...initialData, capacidad: parseFloat(capacidad), nivelActual: parseFloat(nivelActual), tipoCombustible });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Tank' : 'Create Tank'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="capacidad">Capacidad (liters)</Label>
            <Input
              id="capacidad"
              type="number"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              required
            />
            {errors.capacidad && <p className="text-red-500 text-sm">{errors.capacidad}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="nivelActual">Nivel Actual (liters)</Label>
            <Input
              id="nivelActual"
              type="number"
              value={nivelActual}
              onChange={(e) => setNivelActual(e.target.value)}
              required
            />
            {errors.nivelActual && <p className="text-red-500 text-sm">{errors.nivelActual}</p>}
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
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Save Changes' : 'Create Tank'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
