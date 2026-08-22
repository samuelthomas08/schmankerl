package de.samuelthomas.schmankerl.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "workspaces")
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private Timestamp created_at;

    @ManyToMany
    @JoinTable(
            name = "workspace_user_mapping",
            joinColumns = @JoinColumn(name = "workspace_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"workspace_id", "user_id"})
    )
    private List<User> users;

    @ManyToMany
    @JoinTable(
            name = "workspace_recipe_mapping",
            joinColumns = @JoinColumn(name = "workspace_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"workspace_id", "recipe_id"})
    )
    private List<Recipe> recipes;

    protected Workspace() {
    }

    public Workspace(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Timestamp getCreatedAt() {
        return created_at;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }
}
