import { Search, Bell } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useUser } from '../contexts/UserContext';

export function Header() {
  const { user, hasPermission } = useUser();
  
  // Calcular notificaciones basadas en el rol
  const getNotificationCount = () => {
    if (user.role === 'Directivo') return 5; // Documentos pendientes de revisión
    if (user.role === 'Funcionario') return 2; // Actualizaciones de documentos
    if (user.role === 'Administrador') return 8; // Múltiples notificaciones
    return 1; // General
  };

  const notificationCount = getNotificationCount();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-64 right-0 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Saludo */}
        <div className="flex items-center gap-4 flex-1">
          <div>
            <h2 className="text-gray-900">CESFAM Santa Rosa</h2>
            <p className="text-sm text-gray-600">
              Hola, <span>{user.name}</span> ({user.role})
            </p>
          </div>
        </div>

        {/* Buscador Global */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar documentos, comunicados..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Notificaciones y perfil */}
        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                {notificationCount}
              </Badge>
            )}
          </button>

          {/* Perfil */}
          <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <Avatar className="h-8 w-8 bg-blue-600">
              <AvatarFallback className="bg-blue-600 text-white text-sm">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
