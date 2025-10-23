import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Search, UserPlus, MoreVertical, Edit, Power, KeyRound, ChevronLeft, ChevronRight } from 'lucide-react';

interface User {
  id: string;
  name: string;
  rut: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Datos ficticios de usuarios del CESFAM Santa Rosa
  const allUsers: User[] = [
    { id: '1', name: 'Diego Valenzuela Castro', rut: '17.890.123-4', email: 'dvalenzuela@cesfamsantarosa.cl', role: 'Administrador', status: 'active' },
    { id: '2', name: 'Patricia Gómez Reyes', rut: '22.345.678-9', email: 'pgomez@cesfamsantarosa.cl', role: 'Secretaria Administrativa', status: 'active' },
    { id: '3', name: 'Ana López Rojas', rut: '14.567.890-1', email: 'alopez@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '4', name: 'Javier Ortiz Campos', rut: '21.234.567-8', email: 'jortiz@cesfamsantarosa.cl', role: 'General', status: 'active' },
    { id: '5', name: 'María González Pérez', rut: '12.345.678-9', email: 'mgonzalez@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '6', name: 'Carmen Silva Bravo', rut: '18.234.567-1', email: 'csilva@cesfamsantarosa.cl', role: 'Secretaria Administrativa', status: 'active' },
    { id: '7', name: 'Pedro Ramírez Soto', rut: '15.678.901-2', email: 'pramirez@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '8', name: 'Sofía Fernández Torres', rut: '16.789.012-3', email: 'sfernandez@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '9', name: 'Roberto Sánchez Díaz', rut: '19.012.345-6', email: 'rsanchez@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '10', name: 'Isabel Vargas Núñez', rut: '20.123.456-7', email: 'ivargas@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '11', name: 'Claudia Herrera Morales', rut: '18.901.234-5', email: 'cherrera@cesfamsantarosa.cl', role: 'Funcionario', status: 'inactive' },
    { id: '12', name: 'Luis Contreras Bravo', rut: '23.456.789-0', email: 'lcontreras@cesfamsantarosa.cl', role: 'General', status: 'active' },
    { id: '13', name: 'Carmen Rojas Vega', rut: '24.567.890-1', email: 'crojas@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '14', name: 'Francisco Pino Medina', rut: '25.678.901-2', email: 'fpino@cesfamsantarosa.cl', role: 'Funcionario', status: 'active' },
    { id: '15', name: 'Elena Castro Jiménez', rut: '26.789.012-3', email: 'ecastro@cesfamsantarosa.cl', role: 'General', status: 'pending' },
  ];

  // Filtrar usuarios
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.rut.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Administrador':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'Secretaria Administrativa':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Funcionario':
        return 'bg-teal-100 text-teal-700 hover:bg-teal-100';
      case 'General':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-gray-200 text-gray-700 hover:bg-gray-200';
    }
  };

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activa</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactiva</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pendiente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Gestión de Cuentas y Roles</h1>
          <p className="text-sm text-gray-600 mt-1">Administra usuarios y sus permisos en el sistema</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Crear Nuevo Usuario
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nombre, RUT o correo..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Filtro por Rol */}
          <div>
            <Select value={roleFilter} onValueChange={(value) => {
              setRoleFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Secretaria Administrativa">Secretaria Administrativa</SelectItem>
                <SelectItem value="Funcionario">Funcionario</SelectItem>
                <SelectItem value="General">Acceso General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Estado */}
          <div>
            <Select value={statusFilter} onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activa</SelectItem>
                <SelectItem value="inactive">Inactiva</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Nombre Completo</TableHead>
              <TableHead>RUT</TableHead>
              <TableHead>Correo Electrónico</TableHead>
              <TableHead>Rol Actual</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-gray-600">{user.rut}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Usuario
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <KeyRound className="mr-2 h-4 w-4" />
                          Resetear Contraseña
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}>
                          <Power className="mr-2 h-4 w-4" />
                          {user.status === 'active' ? 'Desactivar Cuenta' : 'Activar Cuenta'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  No se encontraron usuarios con los filtros aplicados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Paginación */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredUsers.length)} de {filteredUsers.length} usuarios
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
