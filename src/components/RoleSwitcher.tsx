import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { useUser, UserRole, User } from '../contexts/UserContext';
import { UserCog } from 'lucide-react';

const roleUsers: Record<UserRole, User> = {
  Administrador: {
    id: '1',
    name: 'Diego Valenzuela Castro',
    email: 'dvalenzuela@cesfamsantarosa.cl',
    role: 'Administrador',
    rut: '17.890.123-4',
  },
  'Secretaria Administrativa': {
    id: '2',
    name: 'Patricia Gómez Reyes',
    email: 'pgomez@cesfamsantarosa.cl',
    role: 'Secretaria Administrativa',
    rut: '22.345.678-9',
  },
  Funcionario: {
    id: '3',
    name: 'Ana López Rojas',
    email: 'alopez@cesfamsantarosa.cl',
    role: 'Funcionario',
    rut: '14.567.890-1',
  },
  General: {
    id: '4',
    name: 'Javier Ortiz Campos',
    email: 'jortiz@cesfamsantarosa.cl',
    role: 'General',
    rut: '21.234.567-8',
  },
};

const getRoleBadgeColor = (role: UserRole) => {
  switch (role) {
    case 'Administrador':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
    case 'Secretaria Administrativa':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    case 'Funcionario':
      return 'bg-teal-100 text-teal-700 hover:bg-teal-100';
    case 'General':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

export function RoleSwitcher() {
  const { user, setUser } = useUser();

  const handleRoleChange = (role: UserRole) => {
    setUser(roleUsers[role]);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-amber-50 border-b border-amber-200">
      <div className="flex items-center gap-2">
        <UserCog className="w-4 h-4 text-amber-700" />
        <span className="text-sm text-amber-900">Simular Rol:</span>
      </div>
      
      <Select value={user.role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-56 bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Administrador">Administrador</SelectItem>
          <SelectItem value="Secretaria Administrativa">Secretaria Administrativa</SelectItem>
          <SelectItem value="Funcionario">Funcionario</SelectItem>
          <SelectItem value="General">Acceso General</SelectItem>
        </SelectContent>
      </Select>

      <Badge className={getRoleBadgeColor(user.role)}>
        {user.role}
      </Badge>

      <span className="text-sm text-gray-600 ml-2">
        ({user.name})
      </span>
    </div>
  );
}
