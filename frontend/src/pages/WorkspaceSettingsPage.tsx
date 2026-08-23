import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '@heroui/react';
import {
  ArrowLeft,
  Check,
  Copy,
  Link as LinkIcon,
  User,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { createWorkspaceInvite, getWorkspaceById } from '../client';
import type { User as UserType } from '../client';
import { getStoredUser, getStoredWorkspace } from '../lib/session';

const WorkspaceSettingsPage = () => {
  const navigate = useNavigate();
  const workspace = getStoredWorkspace();
  const [members, setMembers] = useState<UserType[]>([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [isCreatingInvite, setIsCreatingInvite] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!getStoredUser() || !workspace?.id) {
      navigate('/login', { replace: true });
      return;
    }

    getWorkspaceById({ path: { id: workspace.id } }).then(({ data }) => {
      if (data?.users) setMembers(data.users);
    });
  }, [navigate, workspace?.id]);

  useEffect(() => {
    if (!isInviteOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsInviteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInviteOpen]);

  const openInviteDialog = () => {
    setInviteLink(null);
    setInviteError(null);
    setCopied(false);
    setIsInviteOpen(true);
  };

  const handleInvite = async () => {
    if (!workspace?.id) return;
    setInviteError(null);
    setCopied(false);
    setIsCreatingInvite(true);
    const { data: invite, error } = await createWorkspaceInvite({
      path: { id: workspace.id },
    });
    setIsCreatingInvite(false);

    if (error || !invite?.token) {
      setInviteError('Einladungslink konnte nicht erstellt werden.');
      return;
    }

    setInviteLink(`${window.location.origin}/invite/${invite.token}`);
  };

  const handleCopy = async () => {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  };

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-border flex items-center justify-between gap-2 border-b px-4 py-3 sm:px-6 sm:py-4">
        <Button
          aria-label="Zurück"
          isIconOnly
          size="sm"
          variant="outline"
          onPress={() => navigate('/dashboard')}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div className="min-w-0 flex-1 text-right">
          <p className="truncate text-sm font-medium">
            Workspace-Einstellungen
          </p>
          <p className="text-muted truncate text-xs">
            {workspace?.name || 'Dein Workspace'}
          </p>
        </div>
      </header>

      <main className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-sm font-medium">
            <Users className="size-4" />
            Mitglieder
          </h2>
          <Button size="sm" variant="outline" onPress={openInviteDialog}>
            <UserPlus className="size-4" />
            Einladen
          </Button>
        </div>

        <ul className="flex flex-col gap-2">
          {members.map((member) => (
            <li
              key={member.id}
              className="border-border flex items-center gap-3 rounded-md border px-3 py-2"
            >
              <div className="bg-muted/20 flex size-8 shrink-0 items-center justify-center rounded-full">
                <User className="text-muted size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {member.firstname} {member.lastname}
                </p>
                <p className="text-muted truncate text-xs">{member.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {isInviteOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsInviteOpen(false)}
        >
          <Card
            className="w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <Card.Header>
              <Card.Title className="flex items-center gap-2">
                <LinkIcon className="size-4" />
                Mitglied einladen
              </Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3">
              <p className="text-muted text-sm">
                Erstelle einen Link, den du an neue Mitglieder schicken kannst.
              </p>

              {inviteError ? (
                <p className="text-danger text-sm">{inviteError}</p>
              ) : null}

              {inviteLink ? (
                <div className="flex items-end gap-2">
                  <Input readOnly className="flex-1" value={inviteLink} />
                  <Button size="sm" variant="outline" onPress={handleCopy}>
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    {copied ? 'Kopiert!' : 'Kopieren'}
                  </Button>
                </div>
              ) : (
                <Button
                  isDisabled={isCreatingInvite}
                  variant="primary"
                  onPress={handleInvite}
                >
                  <LinkIcon className="size-4" />
                  {isCreatingInvite ? 'Erstelle Link…' : 'Link generieren'}
                </Button>
              )}

              <Button variant="outline" onPress={() => setIsInviteOpen(false)}>
                <X className="size-4" />
                Schließen
              </Button>
            </Card.Content>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default WorkspaceSettingsPage;
