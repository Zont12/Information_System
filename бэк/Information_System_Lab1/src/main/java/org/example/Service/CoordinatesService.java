package org.example.Service;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import org.example.DTO.CoordinatesDto;
import org.example.Entity.Coordinates;
import org.example.Mapper.CoordinatesMapper;
import org.example.Repository.CoordinatesRepository;
import java.util.List;
import java.util.stream.Collectors;


@RequestScoped
public class CoordinatesService {
    @Inject
    private CoordinatesRepository coordinatesRepository; // бд
    @Inject
    private CoordinatesMapper coordinatesMapper;

    public CoordinatesDto addCoordinates(CoordinatesDto coordinatesDto) {
        Coordinates coordinates = coordinatesMapper.toEntity(coordinatesDto);
        coordinatesRepository.save(coordinates);
        return coordinatesDto ;
    }

    public List<CoordinatesDto> loadAllCoordinates() {
        List<Coordinates> coordinates = coordinatesRepository.findAll();
        return coordinates.stream().map(coordinatesMapper::toDto).collect(Collectors.toList());
    }
}
