import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Calendar, Briefcase, Users } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Button } from './ui/button';

export function HRWidget() {
  const { user, hasPermission } = useUser();

  // Datos de ejemplo que varían por usuario
  const getUserRRHHData = () => {
    if (user.role === 'Funcionario') {
      return {
        vacationDays: { used: 8, total: 15, remaining: 7 },
        adminDays: { used: 2, total: 6, remaining: 4 }
      };
    } else if (user.role === 'Administrador') {
      return {
        vacationDays: { used: 3, total: 15, remaining: 12 },
        adminDays: { used: 1, total: 6, remaining: 5 }
      };
    } else {
      return {
        vacationDays: { used: 0, total: 0, remaining: 0 },
        adminDays: { used: 0, total: 0, remaining: 0 }
      };
    }
  };

  const { vacationDays, adminDays } = getUserRRHHData();
  const vacationPercentage = vacationDays.total > 0 ? (vacationDays.used / vacationDays.total) * 100 : 0;
  const adminPercentage = adminDays.total > 0 ? (adminDays.used / adminDays.total) * 100 : 0;

  // Vista para Administrador (gestión global)
  if (user.role === 'Administrador' && hasPermission('manage_rrhh_all')) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Gestión RR.HH.</h3>
          <Users className="w-5 h-5 text-purple-600" />
        </div>

        <div className="space-y-4">
          {/* Resumen general */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 mb-1">Total Funcionarios</p>
              <p className="text-2xl text-blue-900">58</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg">
              <p className="text-xs text-teal-600 mb-1">Solicitudes Pendientes</p>
              <p className="text-2xl text-teal-900">7</p>
            </div>
          </div>

          {/* Mis días personales */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3">Mis Días Personales</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-700">Vacaciones</span>
                </div>
                <span className="text-sm text-gray-900">{vacationDays.remaining} días</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-teal-600" />
                  <span className="text-xs text-gray-700">Administrativos</span>
                </div>
                <span className="text-sm text-gray-900">{adminDays.remaining} días</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
            Gestionar Todos los Usuarios
          </Button>
        </div>
      </Card>
    );
  }

  // Vista personal (Funcionario, Directivo, etc)
  if (hasPermission('view_rrhh_own')) {
    return (
      <Card className="p-6">
        <h3 className="text-gray-900 mb-6">Mi Saldo RR.HH.</h3>

        <div className="space-y-6">
          {/* Días de Vacaciones */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">Días de Vacaciones</span>
              </div>
              <span className="text-gray-900">{vacationDays.remaining} días disponibles</span>
            </div>
            <Progress value={vacationPercentage} className="h-2 bg-gray-200">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${vacationPercentage}%` }} />
            </Progress>
            <p className="text-xs text-gray-500 mt-2">
              {vacationDays.used} usados de {vacationDays.total} totales
            </p>
          </div>

          {/* Días Administrativos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-gray-700">Días Administrativos</span>
              </div>
              <span className="text-gray-900">{adminDays.remaining} días disponibles</span>
            </div>
            <Progress value={adminPercentage} className="h-2 bg-gray-200">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: `${adminPercentage}%` }} />
            </Progress>
            <p className="text-xs text-gray-500 mt-2">
              {adminDays.used} usados de {adminDays.total} totales
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-900">
            💡 Período vigente: Enero - Diciembre 2025
          </p>
        </div>
      </Card>
    );
  }

  // Sin acceso a RR.HH.
  return null;
}
