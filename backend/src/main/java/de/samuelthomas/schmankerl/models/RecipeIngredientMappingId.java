package de.samuelthomas.schmankerl.models;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RecipeIngredientMappingId implements Serializable {

    private int recipe_id;

    private int ingredients_id;

    protected RecipeIngredientMappingId() {
    }

    public RecipeIngredientMappingId(int recipe_id, int ingredients_id) {
        this.recipe_id = recipe_id;
        this.ingredients_id = ingredients_id;
    }

    public int getRecipeId() {
        return recipe_id;
    }

    public int getIngredientsId() {
        return ingredients_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RecipeIngredientMappingId that)) return false;
        return recipe_id == that.recipe_id && ingredients_id == that.ingredients_id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipe_id, ingredients_id);
    }
}
