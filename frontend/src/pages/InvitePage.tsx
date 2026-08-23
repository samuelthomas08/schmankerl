import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from '@heroui/react';
import { LogIn, Mail, UserPlus } from 'lucide-react';
import { acceptInvite, getInviteByToken } from '../client';
import type { WorkspaceInvite } from '../client';
import {
  getStoredUser,
  setPendingInviteToken,
  setStoredWorkspace,
} from '../lib/session';

const InvitePage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [invite, setInvite] = useState<WorkspaceInvite | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found'>(
    'loading',
  );
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getInviteByToken({ path: { token } }).then(({ data, error }) => {
      if (error || !data) {
        setStatus('not-found');
        return;
      }
      setInvite(data);
      setStatus('ready');
    });
  }, [token]);

  const user = getStoredUser();

  const handleJoin = async () => {
    if (!token || !user?.id) return;
    setError(null);
    setIsJoining(true);
    const { data: workspace, error: apiError } = await acceptInvite({
      path: { token },
      body: { userId: user.id },
    });
    setIsJoining(false);

    if (apiError || !workspace) {
      setError('Beitreten fehlgeschlagen. Bitte versuch es erneut.');
      return;
    }

    setStoredWorkspace({ id: workspace.id, name: workspace.name });
    navigate('/dashboard');
  };

  const handleSignupFirst = () => {
    if (token) setPendingInviteToken(token);
    navigate('/login');
  };

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Mail className="size-5" />
            Einladung
          </Card.Title>
        </Card.Header>
        <Card.Content>
          {status === 'loading' ? (
            <p className="text-muted text-sm">Einladung wird geladen…</p>
          ) : status === 'not-found' ? (
            <p className="text-danger text-sm">
              Diese Einladung ist ungültig oder abgelaufen.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-sm">
                Du wurdest eingeladen, dem Workspace{' '}
                <span className="font-medium">{invite?.workspace?.name}</span>{' '}
                beizutreten.
              </p>
              {error ? <p className="text-danger text-sm">{error}</p> : null}
              {user ? (
                <Button
                  fullWidth
                  isDisabled={isJoining}
                  variant="primary"
                  onPress={handleJoin}
                >
                  <LogIn className="size-4" />
                  {isJoining ? 'Trete bei…' : `Als ${user.firstname} beitreten`}
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-muted text-sm">
                    Du brauchst zuerst ein Konto, um beizutreten.
                  </p>
                  <Button
                    fullWidth
                    variant="primary"
                    onPress={handleSignupFirst}
                  >
                    <UserPlus className="size-4" />
                    Konto erstellen
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default InvitePage;
