import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, EmptyState } from '@heroui/react';
import { ChefHat, LogOut, Settings, UtensilsCrossed } from 'lucide-react';
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
      <header className="border-border flex items-center justify-between gap-2 border-b px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-2">
          <ChefHat className="text-muted size-5 shrink-0" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Schmankerl</p>
            <p className="text-muted truncate text-xs">
              {workspace?.name || 'Dein Workspace'}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            aria-label="Einstellungen"
            isIconOnly
            size="sm"
            variant="outline"
            onPress={() => navigate('/workspace-settings')}
          >
            <Settings className="size-4" />
          </Button>
          <Button aria-label="Abmelden" isIconOnly size="sm" variant="outline">
            <LogOut className="size-4" />
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <EmptyState className="flex flex-col items-center gap-2 text-center">
          <UtensilsCrossed className="text-muted mb-1 size-8" />
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
