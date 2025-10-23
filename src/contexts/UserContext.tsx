import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'Administrador' | 'Secretaria Administrativa' | 'Funcionario' | 'General';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rut: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  hasPermission: (permission: Permission) => boolean;
}

export type Permission = 
  // Administrador - Control total del sistema
  | 'manage_users'
  | 'manage_rrhh_all'
  | 'manage_documents_all'
  | 'manage_communications_all'
  | 'manage_calendar_all'
  
  // Secretaria Administrativa - Aprobación y publicación
  | 'approve_documents'
  | 'publish_calendar_events'
  
  // Funcionario - Gestión propia
  | 'create_draft_documents'
  | 'manage_own_drafts'
  | 'view_rrhh_own'
  
  // General - Acceso transversal
  | 'view_documents'
  | 'search_documents'
  | 'view_communications';

const rolePermissions: Record<UserRole, Permission[]> = {
  // Administrador: Control total sobre el sistema
  Administrador: [
    'manage_users',
    'manage_rrhh_all',
    'manage_documents_all',
    'manage_communications_all',
    'manage_calendar_all',
    'approve_documents',
    'publish_calendar_events',
    'create_draft_documents',
    'manage_own_drafts',
    'view_rrhh_own',
    'view_documents',
    'search_documents',
    'view_communications',
  ],
  
  // Secretaria Administrativa: Aprobación de documentos y gestión de calendario
  'Secretaria Administrativa': [
    'approve_documents',
    'publish_calendar_events',
    'view_documents',
    'search_documents',
    'view_communications',
  ],
  
  // Funcionario: Gestión de borradores propios y visualización de RR.HH. personal
  Funcionario: [
    'create_draft_documents',
    'manage_own_drafts',
    'view_rrhh_own',
    'view_documents',
    'search_documents',
    'view_communications',
  ],
  
  // General: Solo visualización y búsqueda (acceso transversal)
  General: [
    'view_documents',
    'search_documents',
    'view_communications',
  ],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: '3',
    name: 'Ana López Rojas',
    email: 'alopez@cesfamsantarosa.cl',
    role: 'Funcionario',
    rut: '14.567.890-1',
  });

  const hasPermission = (permission: Permission): boolean => {
    return rolePermissions[user.role].includes(permission);
  };

  return (
    <UserContext.Provider value={{ user, setUser, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
