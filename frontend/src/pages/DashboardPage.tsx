import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  EmptyState,
  FieldError,
  Input,
  Label,
  NumberField,
  Table,
  TextArea,
  TextField,
} from '@heroui/react';
import {
  ArrowLeft,
  ArrowRight,
  Carrot,
  ChefHat,
  Clock,
  LogOut,
  Plus,
  Settings,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import {
  createIngredient,
  createRecipeIngredient,
  createWorkspaceRecipe,
  getAllIngredients,
  getAllUnits,
  getWorkspaceById,
} from '../client';
import type {
  Recipe,
  RecipeIngredientMappingWritable,
  UnitOption,
} from '../client';
import { getStoredUser, getStoredWorkspace } from '../lib/session';

type IngredientRow = {
  key: number;
  name: string;
  amount: number | undefined;
  unit: RecipeIngredientMappingWritable['unit'] | '';
};

let nextRowKey = 0;
const emptyRow = (): IngredientRow => ({
  key: nextRowKey++,
  name: '',
  amount: undefined,
  unit: '',
});

const DashboardPage = () => {
  const navigate = useNavigate();
  const workspace = getStoredWorkspace();
  const user = getStoredUser();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [units, setUnits] = useState<UnitOption[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('30');
  const [ingredientRows, setIngredientRows] = useState<IngredientRow[]>([
    emptyRow(),
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadRecipes = () => {
    if (!workspace?.id) return;
    getWorkspaceById({ path: { id: workspace.id } }).then(({ data }) => {
      if (data?.recipes) setRecipes(data.recipes);
    });
  };

  useEffect(() => {
    if (!user || !workspace?.id) {
      navigate('/login', { replace: true });
      return;
    }
    loadRecipes();
    getAllUnits().then(({ data }) => {
      if (data) setUnits(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, workspace?.id]);

  useEffect(() => {
    if (!isCreateOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCreateOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreateOpen]);

  const openCreateDialog = () => {
    setStep(1);
    setName('');
    setDescription('');
    setEstimatedTime('30');
    setIngredientRows([emptyRow()]);
    setError(null);
    setIsCreateOpen(true);
  };

  const updateRow = (key: number, patch: Partial<IngredientRow>) => {
    setIngredientRows((rows) => {
      const updated = rows.map((row) =>
        row.key === key ? { ...row, ...patch } : row,
      );
      const last = updated[updated.length - 1];
      const lastHasContent =
        last.name.trim() || last.amount !== undefined || last.unit;
      if (last.key === key && lastHasContent) {
        return [...updated, emptyRow()];
      }
      return updated;
    });
  };

  const removeRow = (key: number) => {
    setIngredientRows((rows) => rows.filter((row) => row.key !== key));
  };

  const handleNext = () => {
    if (!name.trim()) {
      setError('Bitte gib einen Namen ein.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleCreate = async () => {
    if (!user?.id || !workspace?.id) return;
    setError(null);
    setIsCreating(true);

    const { data: recipe, error: apiError } = await createWorkspaceRecipe({
      path: { id: workspace.id },
      body: {
        name: name.trim(),
        description: description.trim() || undefined,
        estimatedTime: Number(estimatedTime) || 0,
        createdBy: { id: user.id },
      },
    });

    if (apiError || !recipe?.id) {
      setIsCreating(false);
      setError('Rezept konnte nicht erstellt werden. Bitte versuch es erneut.');
      return;
    }

    const rowsToSave = ingredientRows.filter((row) => row.name.trim());
    if (rowsToSave.length > 0) {
      const { data: existingIngredients } = await getAllIngredients();
      const byName = new Map(
        (existingIngredients ?? []).map((ingredient) => [
          ingredient.name?.toLowerCase().trim(),
          ingredient,
        ]),
      );

      for (const row of rowsToSave) {
        const key = row.name.toLowerCase().trim();
        let ingredient = byName.get(key);

        if (!ingredient) {
          const { data: created } = await createIngredient({
            body: { name: row.name.trim() },
          });
          if (created) {
            ingredient = created;
            byName.set(key, created);
          }
        }

        if (ingredient?.id) {
          await createRecipeIngredient({
            body: {
              recipe: { id: recipe.id },
              ingredient: { id: ingredient.id },
              amount: row.amount,
              unit: row.unit || undefined,
            },
          });
        }
      }
    }

    setIsCreating(false);
    setIsCreateOpen(false);
    loadRecipes();
  };

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
            aria-label="Rezept erstellen"
            isIconOnly
            size="sm"
            variant="outline"
            onPress={openCreateDialog}
          >
            <Plus className="size-4" />
          </Button>
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

      <main className="flex flex-1 flex-col p-4 sm:p-6">
        {recipes.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyState className="flex flex-col items-center gap-2 text-center">
              <UtensilsCrossed className="text-muted mb-1 size-8" />
              <p className="text-lg font-medium">Noch keine Rezepte</p>
              <p className="text-muted max-w-sm text-sm">
                Hier tauchen bald eure Rezepte auf, sobald ihr die ersten
                anlegt.
              </p>
              <Button
                className="mt-2"
                variant="primary"
                onPress={openCreateDialog}
              >
                <Plus className="size-4" />
                Rezept erstellen
              </Button>
            </EmptyState>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="border-border flex flex-col gap-2 rounded-md border p-4"
              >
                <p className="text-sm font-medium">{recipe.name}</p>
                {recipe.description ? (
                  <p className="text-muted line-clamp-2 text-xs">
                    {recipe.description}
                  </p>
                ) : null}
                <p className="text-muted mt-auto flex items-center gap-1 text-xs">
                  <Clock className="size-3.5" />
                  {recipe.estimatedTime} Min.
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>

      {isCreateOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsCreateOpen(false)}
        >
          <Card
            className="w-full max-w-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Card.Header>
              <Card.Title>Rezept erstellen</Card.Title>
              <Card.Description>
                Schritt {step} von 2 · {step === 1 ? 'Details' : 'Zutaten'}
              </Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-col gap-4">
              {step === 1 ? (
                <>
                  <TextField isRequired value={name} onChange={setName}>
                    <Label>Name</Label>
                    <Input
                      placeholder="Spaghetti Carbonara"
                      variant="secondary"
                    />
                    <FieldError />
                  </TextField>
                  <TextField value={description} onChange={setDescription}>
                    <Label>Beschreibung</Label>
                    <TextArea
                      placeholder="Kurze Beschreibung des Rezepts"
                      variant="secondary"
                    />
                  </TextField>
                  <TextField
                    type="number"
                    value={estimatedTime}
                    onChange={setEstimatedTime}
                  >
                    <Label>Zubereitungszeit (Minuten)</Label>
                    <Input min={1} variant="secondary" />
                  </TextField>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Carrot className="size-4" />
                    Zutaten
                  </p>

                  <Table>
                    <Table.ScrollContainer>
                      <Table.Content aria-label="Zutaten">
                        <Table.Header>
                          <Table.Column isRowHeader>Zutat</Table.Column>
                          <Table.Column>Menge</Table.Column>
                          <Table.Column>Einheit</Table.Column>
                          <Table.Column />
                        </Table.Header>
                        <Table.Body>
                          {ingredientRows.map((row, index) => {
                            const isLastRow =
                              index === ingredientRows.length - 1;
                            return (
                              <Table.Row
                                key={row.key}
                                id={row.key}
                                className={isLastRow ? 'opacity-50' : undefined}
                              >
                                <Table.Cell>
                                  <TextField
                                    aria-label="Zutat"
                                    value={row.name}
                                    onChange={(value) =>
                                      updateRow(row.key, { name: value })
                                    }
                                  >
                                    <Input
                                      placeholder="z. B. Mehl"
                                      variant="secondary"
                                    />
                                  </TextField>
                                </Table.Cell>
                                <Table.Cell>
                                  <NumberField
                                    aria-label="Menge"
                                    minValue={0}
                                    value={row.amount}
                                    variant="secondary"
                                    onChange={(value) =>
                                      updateRow(row.key, { amount: value })
                                    }
                                  >
                                    <NumberField.Group>
                                      <NumberField.DecrementButton />
                                      <NumberField.Input placeholder="200" />
                                      <NumberField.IncrementButton />
                                    </NumberField.Group>
                                  </NumberField>
                                </Table.Cell>
                                <Table.Cell>
                                  <select
                                    aria-label="Einheit"
                                    className="border-border bg-field-background w-full rounded-md border px-2 py-1.5 text-sm"
                                    value={row.unit}
                                    onChange={(event) =>
                                      updateRow(row.key, {
                                        unit: event.target
                                          .value as IngredientRow['unit'],
                                      })
                                    }
                                  >
                                    <option value="">–</option>
                                    {units.map((unit) => (
                                      <option key={unit.name} value={unit.name}>
                                        {unit.fullName} ({unit.abbreviation})
                                      </option>
                                    ))}
                                  </select>
                                </Table.Cell>
                                <Table.Cell>
                                  {!isLastRow ? (
                                    <Button
                                      aria-label="Zutat entfernen"
                                      isIconOnly
                                      size="sm"
                                      variant="outline"
                                      onPress={() => removeRow(row.key)}
                                    >
                                      <X className="size-4" />
                                    </Button>
                                  ) : null}
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table.Content>
                    </Table.ScrollContainer>
                  </Table>
                </div>
              )}

              {error ? <p className="text-danger text-sm">{error}</p> : null}

              <div className="flex gap-2">
                {step === 1 ? (
                  <>
                    <Button
                      variant="outline"
                      onPress={() => setIsCreateOpen(false)}
                    >
                      Abbrechen
                    </Button>
                    <Button fullWidth variant="primary" onPress={handleNext}>
                      Weiter
                      <ArrowRight className="size-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onPress={() => setStep(1)}>
                      <ArrowLeft className="size-4" />
                      Zurück
                    </Button>
                    <Button
                      fullWidth
                      isDisabled={isCreating}
                      variant="primary"
                      onPress={handleCreate}
                    >
                      <Plus className="size-4" />
                      {isCreating ? 'Wird erstellt…' : 'Rezept erstellen'}
                    </Button>
                  </>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardPage;
