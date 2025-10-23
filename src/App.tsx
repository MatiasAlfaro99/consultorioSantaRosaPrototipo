import { useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { UserManagement } from './components/UserManagement';
import { RoleSwitcher } from './components/RoleSwitcher';

function AppContent() {
  const [currentView, setCurrentView] = useState('inicio');

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'inicio':
        return <Dashboard />;
      case 'usuarios':
        return <UserManagement />;
      case 'documental':
        return (
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <h2 className="text-gray-900 mb-2">Gestión Documental</h2>
              <p className="text-gray-600">Esta sección está en desarrollo</p>
            </div>
          </div>
        );
      case 'calendario':
        return (
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <h2 className="text-gray-900 mb-2">Calendario Institucional</h2>
              <p className="text-gray-600">Esta sección está en desarrollo</p>
            </div>
          </div>
        );
      case 'comunicaciones':
        return (
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <h2 className="text-gray-900 mb-2">Comunicaciones Oficiales</h2>
              <p className="text-gray-600">Esta sección está en desarrollo</p>
            </div>
          </div>
        );
      case 'rrhh':
        return (
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <h2 className="text-gray-900 mb-2">Recursos Humanos</h2>
              <p className="text-gray-600">Esta sección está en desarrollo</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem={currentView} onNavigate={handleNavigate} />

      {/* Header */}
      <Header />

      {/* Role Switcher - Demo purposes */}
      <div className="fixed top-16 left-64 right-0 z-10">
        <RoleSwitcher />
      </div>

      {/* Main Content Area */}
      <main className="ml-64 mt-16 pt-14 p-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
