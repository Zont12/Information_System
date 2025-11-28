package org.example.DTO;
import jakarta.validation.constraints.DecimalMin;
import lombok.*;

@Getter
@Setter
public class CoordinatesDto {
    private Integer id;
    @DecimalMin(value="-474", inclusive=false)
    private float x;
    @DecimalMin(value="-84", inclusive=false)
    private float y;
}


