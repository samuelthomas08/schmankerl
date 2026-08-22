package de.samuelthomas.schmankerl.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToMany(mappedBy = "recipes")
    private List<Workspace> workspaces;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeIngredientMapping> ingredients;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeStep> steps;

    protected Recipe() {
    }

    @JsonCreator(mode = JsonCreator.Mode.DISABLED)
    public Recipe(String name, int estimatedTime, String description, User createdBy) {
        this.name = name;
        this.estimated_time = estimatedTime;
        this.description = description;
        this.created_by = createdBy;
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

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEstimatedTime(int estimated_time) {
        this.estimated_time = estimated_time;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedBy(User created_by) {
        this.created_by = created_by;
    }
}
