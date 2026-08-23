package de.samuelthomas.schmankerl.models;

public enum Unit {
    GRAM("Gramm", "g"),
    KILOGRAM("Kilogramm", "kg"),
    MILLILITER("Milliliter", "ml"),
    LITER("Liter", "l"),
    PIECE("Stück", "Stk."),
    TABLESPOON("Esslöffel", "EL"),
    TEASPOON("Teelöffel", "TL"),
    PINCH("Prise", "Prise"),
    CUP("Tasse", "Tasse"),
    CLOVE("Zehe", "Zehe"),
    PACKAGE("Packung", "Pkg.");

    private final String fullName;
    private final String abbreviation;

    Unit(String fullName, String abbreviation) {
        this.fullName = fullName;
        this.abbreviation = abbreviation;
    }

    public String getFullName() {
        return fullName;
    }

    public String getAbbreviation() {
        return abbreviation;
    }
}
