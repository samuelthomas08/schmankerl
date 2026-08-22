package de.samuelthomas.schmankerl.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private int estimated_time;

    private String description;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User created_by;

    private Timestamp created_at;

    private Timestamp updated_at;

    @ManyToMany(mappedBy = "recipes")
    private List<Workspace> workspaces;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeIngredientMapping> ingredients;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeStep> steps;

    protected Recipe() {
    }

    public Recipe(String name, int estimated_time, String description, User created_by) {
        this.name = name;
        this.estimated_time = estimated_time;
        this.description = description;
        this.created_by = created_by;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getEstimatedTime() {
        return estimated_time;
    }

    public String getDescription() {
        return description;
    }

    public User getCreatedBy() {
        return created_by;
    }

    public Timestamp getCreatedAt() {
        return created_at;
    }

    public Timestamp getUpdatedAt() {
        return updated_at;
    }

    public List<Workspace> getWorkspaces() {
        return workspaces;
    }

    public List<RecipeIngredientMapping> getIngredients() {
        return ingredients;
    }

    public List<RecipeStep> getSteps() {
        return steps;
    }
}
