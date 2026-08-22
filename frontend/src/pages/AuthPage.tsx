import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Tabs,
  TextField,
} from '@heroui/react';

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateEmail = (value: string) => {
  if (!EMAIL_PATTERN.test(value)) {
    return 'Bitte gib eine gültige E-Mail-Adresse ein';
  }
  return null;
};

const validatePassword = (value: string) => {
  if (value.length < 8) {
    return 'Das Passwort muss mindestens 8 Zeichen lang sein';
  }
  return null;
};

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/create-workspace');
  };

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Willkommen bei Schmankerl</Card.Title>
          <Card.Description>
            Melde dich an oder erstelle ein neues Konto
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Tabs>
            <Tabs.ListContainer>
              <Tabs.List aria-label="Anmelden oder registrieren">
                <Tabs.Tab id="login">
                  Anmelden
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="signup">
                  Registrieren
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel className="pt-4" id="login">
              <Form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={validateEmail}
                >
                  <Label>E-Mail</Label>
                  <Input placeholder="max@beispiel.de" variant="secondary" />
                  <FieldError />
                </TextField>
                <TextField isRequired name="password" type="password">
                  <Label>Passwort</Label>
                  <Input placeholder="••••••••" variant="secondary" />
                  <FieldError />
                </TextField>
                <Button fullWidth type="submit" variant="primary">
                  Anmelden
                </Button>
              </Form>
            </Tabs.Panel>

            <Tabs.Panel className="pt-4" id="signup">
              <Form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <div className="flex gap-4">
                  <TextField
                    isRequired
                    className="min-w-0 flex-1"
                    name="firstname"
                  >
                    <Label>Vorname</Label>
                    <Input placeholder="Max" variant="secondary" />
                    <FieldError />
                  </TextField>
                  <TextField
                    isRequired
                    className="min-w-0 flex-1"
                    name="lastname"
                  >
                    <Label>Nachname</Label>
                    <Input placeholder="Mustermann" variant="secondary" />
                    <FieldError />
                  </TextField>
                </div>
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={validateEmail}
                >
                  <Label>E-Mail</Label>
                  <Input placeholder="max@beispiel.de" variant="secondary" />
                  <FieldError />
                </TextField>
                <TextField
                  isRequired
                  minLength={8}
                  name="password"
                  type="password"
                  validate={validatePassword}
                >
                  <Label>Passwort</Label>
                  <Input placeholder="••••••••" variant="secondary" />
                  <FieldError />
                </TextField>
                <Button fullWidth type="submit" variant="primary">
                  Konto erstellen
                </Button>
              </Form>
            </Tabs.Panel>
          </Tabs>
        </Card.Content>
      </Card>
    </div>
  );
};

export default AuthPage;
