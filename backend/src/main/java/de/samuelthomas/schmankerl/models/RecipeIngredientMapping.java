package de.samuelthomas.schmankerl.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipe_ingredient_mapping")
public class RecipeIngredientMapping {

    @EmbeddedId
    private RecipeIngredientMappingId id;

    @ManyToOne
    @MapsId("recipe_id")
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne
    @MapsId("ingredients_id")
    @JoinColumn(name = "ingredients_id")
    private Ingredient ingredient;

    private Double amount;

    private String unit;

    protected RecipeIngredientMapping() {
    }

    public RecipeIngredientMapping(Recipe recipe, Ingredient ingredient, Double amount, String unit) {
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.amount = amount;
        this.unit = unit;
        this.id = new RecipeIngredientMappingId(recipe.getId(), ingredient.getId());
    }

    public RecipeIngredientMappingId getId() {
        return id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public Double getAmount() {
        return amount;
    }

    public String getUnit() {
        return unit;
    }
}
