package org.example.DTO;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class CityDto {
    private Integer id;
    @NotBlank
    private String name;
    @NotNull
    private CoordinatesDto coordinates;
    @NotNull
    private java.time.ZonedDateTime creationDate;
    @NotNull
    @DecimalMin(value = "0.0000001", inclusive = false)
    private Double area;
    @Min(1)
    private int population;
    private java.time.LocalDate establishmentDate;
    private boolean capital;
    private Integer metersAboveSeaLevel;
    @Min(-12)
    @Max(15)
    private Integer timezone;
    private Float agglomeration;
    private ClimateDto climate;
    private HumanDto governor;
}
