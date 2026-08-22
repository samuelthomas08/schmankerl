package de.samuelthomas.schmankerl.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;

    private String lastname;

    private String email;

    private String password;

    private Timestamp created_at;

    private Timestamp updated_at;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private List<Workspace> workspaces;

    @JsonIgnore
    @OneToMany(mappedBy = "created_by")
    private List<Recipe> recipes;

    protected User() {
    }

    @JsonCreator(mode = JsonCreator.Mode.DISABLED)
    public User(String firstname, String lastname, String email, String password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
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

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}