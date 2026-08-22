package de.samuelthomas.schmankerl.repositories;

import de.samuelthomas.schmankerl.models.RecipeIngredientMapping;
import de.samuelthomas.schmankerl.models.RecipeIngredientMappingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientMappingRepository
        extends JpaRepository<RecipeIngredientMapping, RecipeIngredientMappingId> {
}
