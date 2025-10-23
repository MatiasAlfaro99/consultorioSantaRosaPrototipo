import { TasksWidget } from './TasksWidget';
import { HRWidget } from './HRWidget';
import { QuickActionsWidget } from './QuickActionsWidget';
import { CommunicationsWidget } from './CommunicationsWidget';
import { FileText } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function Dashboard() {
  const { user } = useUser();
  
  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1 - Tareas y Accesos Rápidos */}
        <div className="space-y-6">
          <TasksWidget />
          <QuickActionsWidget />
        </div>

        {/* Columna 2 - RR.HH. y Eventos */}
        <div className="space-y-6">
          <HRWidget />
          
          {/* Widget adicional: Próximos Eventos */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Próximos Eventos</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
                <div className="w-12 text-center">
                  <div className="text-teal-700">28</div>
                  <div className="text-xs text-teal-600">OCT</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Capacitación SIGGES</p>
                  <p className="text-xs text-gray-600">09:00 - 13:00 hrs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-12 text-center">
                  <div className="text-blue-700">01</div>
                  <div className="text-xs text-blue-600">NOV</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Día de Todos los Santos</p>
                  <p className="text-xs text-gray-600">Feriado Nacional</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-12 text-center">
                  <div className="text-purple-700">15</div>
                  <div className="text-xs text-purple-600">NOV</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Reunión Equipo Directivo</p>
                  <p className="text-xs text-gray-600">15:00 - 17:00 hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna 3 - Comunicados */}
        <div className="space-y-6">
          <CommunicationsWidget />
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Documentos Este Mes</p>
              <p className="text-2xl text-gray-900 mt-1">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+12% vs mes anterior</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Pendientes Revisión</p>
              <p className="text-2xl text-gray-900 mt-1">5</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-amber-600 mt-2">Requieren atención</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Comunicados Activos</p>
              <p className="text-2xl text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">Publicados en octubre</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Tasa Aprobación</p>
              <p className="text-2xl text-gray-900 mt-1">94%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">Excelente desempeño</p>
        </div>
      </div>
    </div>
  );
}
