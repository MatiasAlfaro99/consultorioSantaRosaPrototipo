import { Card } from './ui/card';
import { Button } from './ui/button';
import { Upload, CalendarDays, PlusCircle, UserPlus, FileCheck, Settings } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function QuickActionsWidget() {
  const { user, hasPermission } = useUser();

  const getActionsByRole = () => {
    const actions = [];

    // Acciones comunes a todos
    actions.push({
      id: 'calendar',
      icon: CalendarDays,
      label: 'Ver Calendario',
      description: 'Eventos institucionales',
      color: 'bg-teal-600 hover:bg-teal-700',
      visible: true
    });

    // Acciones para Administrador - Control total del sistema
    if (user.role === 'Administrador') {
      actions.unshift(
        {
          id: 'create-user',
          icon: UserPlus,
          label: 'Crear Usuario',
          description: 'Gestión de cuentas',
          color: 'bg-purple-600 hover:bg-purple-700',
          visible: true
        },
        {
          id: 'manage-rrhh',
          icon: Settings,
          label: 'Gestionar RR.HH.',
          description: 'Todos los funcionarios',
          color: 'bg-blue-600 hover:bg-blue-700',
          visible: true
        }
      );
      actions.push({
        id: 'create-communication',
        icon: PlusCircle,
        label: 'Nuevo Comunicado',
        description: 'Comunicación oficial',
        color: 'bg-indigo-600 hover:bg-indigo-700',
        visible: true
      });
    }

    // Acciones para Secretaria Administrativa - Aprobación y calendario
    if (user.role === 'Secretaria Administrativa') {
      actions.unshift(
        {
          id: 'approve-documents',
          icon: FileCheck,
          label: 'Aprobar Documentos',
          description: 'Revisar y aprobar',
          color: 'bg-blue-600 hover:bg-blue-700',
          visible: true
        },
        {
          id: 'publish-event',
          icon: CalendarDays,
          label: 'Publicar Evento',
          description: 'Agregar al calendario',
          color: 'bg-indigo-600 hover:bg-indigo-700',
          visible: true
        }
      );
    }

    // Acciones para Funcionario - Solo gestión de borradores propios
    if (user.role === 'Funcionario') {
      actions.unshift({
        id: 'upload-document',
        icon: Upload,
        label: 'Nuevo Borrador',
        description: 'Crear documento',
        color: 'bg-blue-600 hover:bg-blue-700',
        visible: true
      });
    }

    return actions.filter(a => a.visible);
  };

  const actions = getActionsByRole();

  return (
    <Card className="p-6">
      <h3 className="text-gray-900 mb-4">Accesos Rápidos</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Button
              key={action.id}
              className={`${action.color} w-full h-auto py-4 flex items-center justify-start gap-4`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-white">{action.label}</div>
                <div className="text-xs text-white/80">{action.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
