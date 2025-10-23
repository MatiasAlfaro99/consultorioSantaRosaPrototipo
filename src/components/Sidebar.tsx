import { Home, FileText, Calendar, Megaphone, Users, UserCog } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Badge } from './ui/badge';

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (itemId: string) => void;
}

export function Sidebar({ activeItem = 'inicio', onNavigate }: SidebarProps) {
  const { user, hasPermission } = useUser();

  const menuItems = [
    { 
      id: 'inicio', 
      icon: Home, 
      label: 'Inicio',
      visible: true 
    },
    { 
      id: 'documental', 
      icon: FileText, 
      label: 'Gestión Documental',
      visible: hasPermission('create_draft_documents') || hasPermission('manage_documents_all') || hasPermission('approve_documents')
    },
    { 
      id: 'calendario', 
      icon: Calendar, 
      label: 'Calendario',
      visible: true,
      badge: hasPermission('publish_calendar_events') ? 'Editar' : undefined
    },
    { 
      id: 'comunicaciones', 
      icon: Megaphone, 
      label: 'Comunicaciones',
      visible: true
    },
    { 
      id: 'rrhh', 
      icon: Users, 
      label: 'Recursos Humanos',
      visible: hasPermission('view_rrhh_own') || hasPermission('manage_rrhh_all')
    },
    { 
      id: 'usuarios', 
      icon: UserCog, 
      label: 'Gestión de Usuarios',
      visible: hasPermission('manage_users'),
      badge: 'Admin'
    }
  ].filter(item => item.visible);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo y nombre */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white">+</span>
          </div>
          <div>
            <h1 className="text-blue-900">CESFAM</h1>
            <p className="text-xs text-gray-600">Santa Rosa</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate?.(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="text-sm flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge className={`text-xs ${
                      item.badge === 'Admin' 
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                    }`}>
                      {item.badge}
                    </Badge>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Versión 1.0.0
        </p>
      </div>
    </aside>
  );
}
