package org.example.DTO;
import jakarta.validation.constraints.DecimalMin;
import lombok.*;

@Getter
@Setter
public class HumanDto {
    private Integer id;
    @DecimalMin(value = "0.0001", inclusive = false)
    private double height;
}
