package de.samuelthomas.schmankerl.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    private int step_number;

    private String instruction;

    private Integer duration_minutes;

    protected RecipeStep() {
    }

    @JsonCreator(mode = JsonCreator.Mode.DISABLED)
    public RecipeStep(Recipe recipe, int stepNumber, String instruction, Integer durationMinutes) {
        this.recipe = recipe;
        this.step_number = stepNumber;
        this.instruction = instruction;
        this.duration_minutes = durationMinutes;
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

    public void setId(int id) {
        this.id = id;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public void setStepNumber(int step_number) {
        this.step_number = step_number;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public void setDurationMinutes(Integer duration_minutes) {
        this.duration_minutes = duration_minutes;
    }
}
