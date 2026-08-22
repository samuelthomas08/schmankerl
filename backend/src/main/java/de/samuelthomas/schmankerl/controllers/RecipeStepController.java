package de.samuelthomas.schmankerl.controllers;

import de.samuelthomas.schmankerl.models.RecipeStep;
import de.samuelthomas.schmankerl.repositories.RecipeStepRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/recipe-steps")
public class RecipeStepController {

    private final RecipeStepRepository recipeStepRepository;

    public RecipeStepController(RecipeStepRepository recipeStepRepository) {
        this.recipeStepRepository = recipeStepRepository;
    }

    @GetMapping
    public List<RecipeStep> getAllRecipeSteps() {
        return recipeStepRepository.findAll();
    }

    @GetMapping("/{id}")
    public RecipeStep getRecipeStepById(@PathVariable int id) {
        return recipeStepRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeStep createRecipeStep(@RequestBody RecipeStep recipeStep) {
        recipeStep.setId(0);
        return recipeStepRepository.save(recipeStep);
    }

    @PutMapping("/{id}")
    public RecipeStep updateRecipeStep(@PathVariable int id, @RequestBody RecipeStep updatedRecipeStep) {
        RecipeStep recipeStep = recipeStepRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        recipeStep.setRecipe(updatedRecipeStep.getRecipe());
        recipeStep.setStepNumber(updatedRecipeStep.getStepNumber());
        recipeStep.setInstruction(updatedRecipeStep.getInstruction());
        recipeStep.setDurationMinutes(updatedRecipeStep.getDurationMinutes());
        return recipeStepRepository.save(recipeStep);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecipeStep(@PathVariable int id) {
        if (!recipeStepRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        recipeStepRepository.deleteById(id);
    }
}
