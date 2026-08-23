package de.samuelthomas.schmankerl.controllers;

import de.samuelthomas.schmankerl.models.Recipe;
import de.samuelthomas.schmankerl.models.Workspace;
import de.samuelthomas.schmankerl.models.WorkspaceInvite;
import de.samuelthomas.schmankerl.repositories.RecipeRepository;
import de.samuelthomas.schmankerl.repositories.WorkspaceInviteRepository;
import de.samuelthomas.schmankerl.repositories.WorkspaceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceInviteRepository workspaceInviteRepository;
    private final RecipeRepository recipeRepository;

    public WorkspaceController(WorkspaceRepository workspaceRepository, WorkspaceInviteRepository workspaceInviteRepository, RecipeRepository recipeRepository) {
        this.workspaceRepository = workspaceRepository;
        this.workspaceInviteRepository = workspaceInviteRepository;
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Workspace getWorkspaceById(@PathVariable int id) {
        return workspaceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Workspace createWorkspace(@RequestBody Workspace workspace) {
        workspace.setId(0);
        return workspaceRepository.save(workspace);
    }

    @PutMapping("/{id}")
    public Workspace updateWorkspace(@PathVariable int id, @RequestBody Workspace updatedWorkspace) {
        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        workspace.setName(updatedWorkspace.getName());
        return workspaceRepository.save(workspace);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkspace(@PathVariable int id) {
        if (!workspaceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        workspaceRepository.deleteById(id);
    }

    @PostMapping("/{id}/invites")
    @ResponseStatus(HttpStatus.CREATED)
    public WorkspaceInvite createWorkspaceInvite(@PathVariable int id) {
        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        WorkspaceInvite invite = new WorkspaceInvite(UUID.randomUUID().toString(), workspace);
        return workspaceInviteRepository.save(invite);
    }

    @PostMapping("/{id}/recipes")
    @ResponseStatus(HttpStatus.CREATED)
    public Recipe createWorkspaceRecipe(@PathVariable int id, @RequestBody Recipe recipe) {
        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        recipe.setId(0);
        Recipe savedRecipe = recipeRepository.save(recipe);
        workspace.getRecipes().add(savedRecipe);
        workspaceRepository.save(workspace);
        return savedRecipe;
    }
}
