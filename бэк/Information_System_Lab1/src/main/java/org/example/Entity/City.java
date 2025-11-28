package org.example.Entity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class City {
    private Integer id; //Поле не может быть null, Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически
    private String name; //Поле не может быть null, Строка не может быть пустой
    private Coordinates coordinates; //Поле не может быть null
    private java.time.ZonedDateTime creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически
    private Double area; //Значение поля должно быть больше 0, Поле не может быть null
    private int population; //Значение поля должно быть больше 0
    private java.time.LocalDate establishmentDate;
    private boolean capital;
    private Integer metersAboveSeaLevel;
    private Integer timezone; //Значение поля должно быть больше -13, Максимальное значение поля: 15
    private Float agglomeration;
    private Climate climate; //Поле может быть null
    private Human governor; //Поле может быть null
}


