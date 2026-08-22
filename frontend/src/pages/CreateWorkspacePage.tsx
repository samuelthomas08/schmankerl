import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';

const CreateWorkspacePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const workspaceName = new FormData(event.currentTarget).get('name');
    navigate('/dashboard', { state: { workspaceName } });
  };

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
            <Button fullWidth type="submit" variant="primary">
              Workspace erstellen
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CreateWorkspacePage;
