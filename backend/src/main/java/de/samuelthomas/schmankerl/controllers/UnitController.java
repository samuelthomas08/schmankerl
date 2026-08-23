package de.samuelthomas.schmankerl.controllers;

import de.samuelthomas.schmankerl.models.Unit;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/units")
public class UnitController {

    @GetMapping
    public List<UnitOption> getAllUnits() {
        return Arrays.stream(Unit.values())
                .map(unit -> new UnitOption(unit.name(), unit.getFullName(), unit.getAbbreviation()))
                .toList();
    }

    public record UnitOption(String name, String fullName, String abbreviation) {
    }
}
