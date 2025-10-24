import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface UserFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [correo, setCorreo] = useState(initialData?.correo || '');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState(initialData?.rol || 'ENCARGADO');
  const [activo, setActivo] = useState(initialData?.activo !== undefined ? initialData.activo : true);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setCorreo(initialData.correo);
      setRol(initialData.rol);
      setActivo(initialData.activo);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: any = {};
    if (!nombre) newErrors.nombre = 'Name is required';
    if (nombre.length < 3) newErrors.nombre = 'Name must be at least 3 characters';
    if (!correo) newErrors.correo = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(correo)) newErrors.correo = 'Invalid email address';
    if (!initialData && !password) newErrors.password = 'Password is required for new users';
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!rol) newErrors.rol = 'Role is required';
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
    onSubmit({ ...initialData, nombre, correo, password: password || undefined, rol, activo });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit User' : 'Create User'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Name</Label>
            <Input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Email</Label>
            <Input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={initialData ? 'Leave blank to keep current password' : 'Enter password'}
              required={!initialData}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Role</Label>
            <Select value={rol} onValueChange={(value) => {
              setRol(value);
              setErrors({ ...errors, rol: undefined });
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="ENCARGADO">Encargado</SelectItem>
              </SelectContent>
            </Select>
            {errors.rol && <p className="text-red-500 text-sm">{errors.rol}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="activo"
              checked={activo}
              onCheckedChange={setActivo}
            />
            <Label htmlFor="activo">Active</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Save Changes' : 'Create User'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
