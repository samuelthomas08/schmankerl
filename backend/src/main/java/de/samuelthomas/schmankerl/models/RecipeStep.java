package de.samuelthomas.schmankerl.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipe_steps")
public class RecipeStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    private int step_number;

    private String instruction;

    private Integer duration_minutes;

    protected RecipeStep() {
    }

    public RecipeStep(Recipe recipe, int step_number, String instruction, Integer duration_minutes) {
        this.recipe = recipe;
        this.step_number = step_number;
        this.instruction = instruction;
        this.duration_minutes = duration_minutes;
    }

    public int getId() {
        return id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public int getStepNumber() {
        return step_number;
    }

    public String getInstruction() {
        return instruction;
    }

    public Integer getDurationMinutes() {
        return duration_minutes;
    }
}
