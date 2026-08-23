package de.samuelthomas.schmankerl.repositories;

import de.samuelthomas.schmankerl.models.WorkspaceInvite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkspaceInviteRepository extends JpaRepository<WorkspaceInvite, Integer> {
    Optional<WorkspaceInvite> findByToken(String token);
}
