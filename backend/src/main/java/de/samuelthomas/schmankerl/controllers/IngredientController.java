package de.samuelthomas.schmankerl.controllers;

import de.samuelthomas.schmankerl.models.Ingredient;
import de.samuelthomas.schmankerl.repositories.IngredientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientRepository ingredientRepository;

    public IngredientController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping
    public List<Ingredient> getAll() {
        return ingredientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Ingredient getById(@PathVariable int id) {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ingredient create(@RequestBody Ingredient ingredient) {
        ingredient.setId(0);
        return ingredientRepository.save(ingredient);
    }

    @PutMapping("/{id}")
    public Ingredient update(@PathVariable int id, @RequestBody Ingredient updatedIngredient) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        ingredient.setName(updatedIngredient.getName());
        return ingredientRepository.save(ingredient);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        if (!ingredientRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        ingredientRepository.deleteById(id);
    }
}
