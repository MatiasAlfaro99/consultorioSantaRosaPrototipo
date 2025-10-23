import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface Task {
  id: string;
  title: string;
  type: 'pending' | 'approved' | 'rejected';
  date: string;
}

export function TasksWidget() {
  const { user } = useUser();

  // Tareas específicas por rol
  const getTasksByRole = (): Task[] => {
    switch (user.role) {
      case 'Administrador':
        return [
          {
            id: '1',
            title: 'Revisar 3 solicitudes de creación de usuarios',
            type: 'pending',
            date: '23 Oct 2025'
          },
          {
            id: '2',
            title: 'Actualizar días administrativos - Equipo Enfermería',
            type: 'pending',
            date: '23 Oct 2025'
          },
          {
            id: '3',
            title: 'Configurar permisos para nuevo directivo',
            type: 'pending',
            date: '22 Oct 2025'
          }
        ];
      
      case 'Secretaria Administrativa':
        return [
          {
            id: '1',
            title: '5 documentos pendientes de aprobación',
            type: 'pending',
            date: '23 Oct 2025'
          },
          {
            id: '2',
            title: 'Publicar evento "Capacitación SIGGES" en calendario',
            type: 'pending',
            date: '23 Oct 2025'
          },
          {
            id: '3',
            title: 'Documento INF-120/2025 fue aprobado',
            type: 'approved',
            date: '22 Oct 2025'
          }
        ];
      
      case 'Funcionario':
        return [
          {
            id: '1',
            title: 'Completar borrador INF-150/2025',
            type: 'pending',
            date: '23 Oct 2025'
          },
          {
            id: '2',
            title: 'Borrador ORD-045/2025 fue aprobado',
            type: 'approved',
            date: '22 Oct 2025'
          },
          {
            id: '3',
            title: 'Revisar borrador antes de enviar',
            type: 'pending',
            date: '20 Oct 2025'
          }
        ];
      
      case 'General':
        return [
          {
            id: '1',
            title: 'Nuevo comunicado institucional disponible',
            type: 'approved',
            date: '23 Oct 2025'
          }
        ];
      
      default:
        return [];
    }
  };

  const tasks = getTasksByRole();

  const getIcon = (type: Task['type']) => {
    switch (type) {
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getBadgeVariant = (type: Task['type']) => {
    switch (type) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-100';
      case 'approved':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'rejected':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
    }
  };

  const getBadgeText = (type: Task['type']) => {
    switch (type) {
      case 'pending':
        return 'Pendiente';
      case 'approved':
        return 'Aprobado';
      case 'rejected':
        return 'Rechazado';
    }
  };

  const pendingCount = tasks.filter(t => t.type === 'pending').length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Acciones Pendientes</h3>
        {pendingCount > 0 && (
          <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">
            {pendingCount} Pendientes
          </Badge>
        )}
      </div>

      <div className="space-y-3 mb-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="mt-0.5">{getIcon(task.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{task.title}</p>
                <p className="text-xs text-gray-500 mt-1">{task.date}</p>
              </div>
              <Badge className={getBadgeVariant(task.type)}>
                {getBadgeText(task.type)}
              </Badge>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 text-sm">
            No tienes tareas pendientes
          </div>
        )}
      </div>

      {tasks.length > 0 && (
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Ir al Buzón
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </Card>
  );
}
