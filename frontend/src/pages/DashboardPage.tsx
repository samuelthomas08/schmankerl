import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, EmptyState } from '@heroui/react';
import { getStoredUser, getStoredWorkspace } from '../lib/session';

const DashboardPage = () => {
  const navigate = useNavigate();
  const workspace = getStoredWorkspace();

  useEffect(() => {
    if (!getStoredUser() || !workspace?.id) {
      navigate('/login', { replace: true });
    }
  }, [navigate, workspace?.id]);

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-border flex items-center justify-between border-b px-6 py-4">
        <div>
          <p className="text-sm font-medium">Schmankerl</p>
          <p className="text-muted text-xs">
            {workspace?.name || 'Dein Workspace'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onPress={() => navigate('/workspace-settings')}
          >
            Einstellungen
          </Button>
          <Button size="sm" variant="outline">
            Abmelden
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <EmptyState className="flex flex-col items-center gap-2 text-center">
          <p className="text-lg font-medium">Noch keine Rezepte</p>
          <p className="text-muted max-w-sm text-sm">
            Hier tauchen bald eure Rezepte auf, sobald ihr die ersten anlegt.
          </p>
        </EmptyState>
      </main>
    </div>
  );
};

export default DashboardPage;
