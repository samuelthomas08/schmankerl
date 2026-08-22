package de.samuelthomas.schmankerl.controllers;

import de.samuelthomas.schmankerl.models.Workspace;
import de.samuelthomas.schmankerl.repositories.WorkspaceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceRepository workspaceRepository;

    public WorkspaceController(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
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
}
