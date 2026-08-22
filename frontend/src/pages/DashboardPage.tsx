import { useLocation } from 'react-router-dom';
import { Button, EmptyState } from '@heroui/react';

const DashboardPage = () => {
  const location = useLocation();
  const workspaceName =
    (location.state as { workspaceName?: string } | null)?.workspaceName ||
    'Dein Workspace';

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-border flex items-center justify-between border-b px-6 py-4">
        <div>
          <p className="text-sm font-medium">Schmankerl</p>
          <p className="text-muted text-xs">{workspaceName}</p>
        </div>
        <Button size="sm" variant="outline">
          Abmelden
        </Button>
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
