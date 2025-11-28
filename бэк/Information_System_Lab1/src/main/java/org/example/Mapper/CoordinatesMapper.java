package org.example.Mapper;
import jakarta.enterprise.context.ApplicationScoped;
import org.example.DTO.CoordinatesDto;
import org.example.Entity.Coordinates;

@ApplicationScoped
public class CoordinatesMapper {

    public Coordinates toEntity(CoordinatesDto coordinatesDto) {
        Coordinates coordinates = new Coordinates();
        coordinates.setX(coordinatesDto.getX());
        coordinates.setY(coordinatesDto.getY());
        return coordinates;
    }

    public CoordinatesDto toDto(Coordinates coordinates) {
        CoordinatesDto coordinatesDto = new CoordinatesDto();
        coordinatesDto.setId(coordinates.getId());
        coordinatesDto.setX(coordinates.getX());
        coordinatesDto.setY(coordinates.getY());
        return coordinatesDto;
    }
}
