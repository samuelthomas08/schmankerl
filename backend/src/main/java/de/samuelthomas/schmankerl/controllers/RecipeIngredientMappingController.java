package de.samuelthomas.schmankerl.controllers;

import de.samuelthomas.schmankerl.models.RecipeIngredientMapping;
import de.samuelthomas.schmankerl.models.RecipeIngredientMappingId;
import de.samuelthomas.schmankerl.repositories.RecipeIngredientMappingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/recipe-ingredients")
public class RecipeIngredientMappingController {

    private final RecipeIngredientMappingRepository recipeIngredientMappingRepository;

    public RecipeIngredientMappingController(RecipeIngredientMappingRepository recipeIngredientMappingRepository) {
        this.recipeIngredientMappingRepository = recipeIngredientMappingRepository;
    }

    @GetMapping
    public List<RecipeIngredientMapping> getAll() {
        return recipeIngredientMappingRepository.findAll();
    }

    @GetMapping("/{recipeId}/{ingredientsId}")
    public RecipeIngredientMapping getById(@PathVariable int recipeId, @PathVariable int ingredientsId) {
        return recipeIngredientMappingRepository
                .findById(new RecipeIngredientMappingId(recipeId, ingredientsId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeIngredientMapping create(@RequestBody RecipeIngredientMapping recipeIngredientMapping) {
        return recipeIngredientMappingRepository.save(recipeIngredientMapping);
    }

    @PutMapping("/{recipeId}/{ingredientsId}")
    public RecipeIngredientMapping update(
            @PathVariable int recipeId,
            @PathVariable int ingredientsId,
            @RequestBody RecipeIngredientMapping updatedMapping
    ) {
        RecipeIngredientMapping mapping = recipeIngredientMappingRepository
                .findById(new RecipeIngredientMappingId(recipeId, ingredientsId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        mapping.setAmount(updatedMapping.getAmount());
        mapping.setUnit(updatedMapping.getUnit());
        return recipeIngredientMappingRepository.save(mapping);
    }

    @DeleteMapping("/{recipeId}/{ingredientsId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int recipeId, @PathVariable int ingredientsId) {
        RecipeIngredientMappingId id = new RecipeIngredientMappingId(recipeId, ingredientsId);
        if (!recipeIngredientMappingRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        recipeIngredientMappingRepository.deleteById(id);
    }
}
