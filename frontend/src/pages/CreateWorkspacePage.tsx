import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import { Plus } from 'lucide-react';
import { createWorkspace } from '../client';
import type { User } from '../client';
import { setStoredWorkspace } from '../lib/session';

const CreateWorkspacePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = (location.state as { user?: User } | null)?.user;
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    setError(null);

    const name = new FormData(event.currentTarget).get('name') as string;
    setIsCreating(true);
    const { data: workspace, error: apiError } = await createWorkspace({
      body: {
        name,
        users: [{ id: user.id }],
      },
    });
    setIsCreating(false);

    if (apiError || !workspace) {
      setError(
        'Workspace konnte nicht erstellt werden. Bitte versuch es erneut.',
      );
      return;
    }

    setStoredWorkspace({ id: workspace.id, name: workspace.name });
    navigate('/dashboard');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Workspace erstellen</Card.Title>
          <Card.Description>
            Ein Workspace bündelt eure Rezepte und Mitglieder an einem Ort
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField isRequired name="name">
              <Label>Workspace-Name</Label>
              <Input
                placeholder="Familienküche Mustermann"
                variant="secondary"
              />
              <FieldError />
            </TextField>
            {error ? <p className="text-danger text-sm">{error}</p> : null}
            <Button
              fullWidth
              isDisabled={isCreating}
              type="submit"
              variant="primary"
            >
              <Plus className="size-4" />
              {isCreating ? 'Workspace wird erstellt…' : 'Workspace erstellen'}
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CreateWorkspacePage;
