package de.samuelthomas.schmankerl.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.sql.Timestamp;

@Entity
@Table(name = "workspace_invites")
public class WorkspaceInvite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String token;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    private Timestamp created_at;

    protected WorkspaceInvite() {
    }

    @JsonCreator(mode = JsonCreator.Mode.DISABLED)
    public WorkspaceInvite(String token, Workspace workspace) {
        this.token = token;
        this.workspace = workspace;
    }

    public int getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public Timestamp getCreatedAt() {
        return created_at;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }
}
