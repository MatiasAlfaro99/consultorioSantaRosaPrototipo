import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, FileCheck, FileEdit, Users, Calendar, Eye } from 'lucide-react';

export function RolePermissionsInfo() {
  const roles = [
    {
      name: 'Administrador',
      color: 'bg-purple-100 text-purple-700',
      icon: Shield,
      description: 'Control total sobre el sistema',
      permissions: [
        'Crear, modificar y eliminar usuarios',
        'Gestionar días administrativos y vacaciones (todos)',
        'Administrar todos los documentos',
        'Publicar comunicados oficiales',
        'Gestionar calendario institucional'
      ]
    },
    {
      name: 'Secretaria Administrativa',
      color: 'bg-blue-100 text-blue-700',
      icon: FileCheck,
      description: 'Aprobación y publicación oficial',
      permissions: [
        'Aprobar documentos enviados',
        'Publicar eventos en calendario',
        'Ver y buscar documentos',
        'Acceso a comunicaciones oficiales'
      ]
    },
    {
      name: 'Funcionario',
      color: 'bg-teal-100 text-teal-700',
      icon: FileEdit,
      description: 'Gestión de borradores propios',
      permissions: [
        'Subir y gestionar borradores propios',
        'Modificar/eliminar solo mientras esté en borrador',
        'Ver días administrativos y vacaciones propios',
        'Ver y buscar documentos',
        'Acceso a comunicaciones'
      ]
    },
    {
      name: 'General',
      color: 'bg-gray-100 text-gray-700',
      icon: Eye,
      description: 'Acceso transversal de solo lectura',
      permissions: [
        'Ver documentos publicados',
        'Buscar en el repositorio',
        'Acceso a comunicaciones oficiales',
        'Ver calendario de eventos'
      ]
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Roles y Permisos del Sistema</h2>
        <p className="text-gray-600">
          Descripción de los 4 roles disponibles en la Intranet del CESFAM Santa Rosa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          
          return (
            <Card key={role.name} className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{role.name}</h3>
                    <Badge className={`${role.color} hover:${role.color}`}>
                      Rol
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Permisos:</p>
                <ul className="space-y-2">
                  {role.permissions.map((permission, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Nota:</strong> El permiso de "Ver y buscar documentos" es transversal y aplica a todos los roles, 
          facilitando el acceso a la información compartida sin modificarla.
        </p>
      </div>
    </div>
  );
}
