package de.samuelthomas.schmankerl.controllers;

import de.samuelthomas.schmankerl.models.User;
import de.samuelthomas.schmankerl.models.Workspace;
import de.samuelthomas.schmankerl.models.WorkspaceInvite;
import de.samuelthomas.schmankerl.repositories.UserRepository;
import de.samuelthomas.schmankerl.repositories.WorkspaceInviteRepository;
import de.samuelthomas.schmankerl.repositories.WorkspaceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/invites")
public class InviteController {

    private final WorkspaceInviteRepository workspaceInviteRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    public InviteController(WorkspaceInviteRepository workspaceInviteRepository, WorkspaceRepository workspaceRepository, UserRepository userRepository) {
        this.workspaceInviteRepository = workspaceInviteRepository;
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{token}")
    public WorkspaceInvite getInviteByToken(@PathVariable String token) {
        return workspaceInviteRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/{token}/accept")
    public Workspace acceptInvite(@PathVariable String token, @RequestBody AcceptInviteRequest request) {
        WorkspaceInvite invite = workspaceInviteRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Workspace workspace = invite.getWorkspace();
        boolean alreadyMember = workspace.getUsers().stream()
                .anyMatch(member -> member.getId() == user.getId());
        if (!alreadyMember) {
            workspace.getUsers().add(user);
            workspaceRepository.save(workspace);
        }
        return workspace;
    }

    public record AcceptInviteRequest(int userId) {
    }
}
