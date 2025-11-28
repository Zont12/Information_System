package org.example.Controller;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.example.DTO.CoordinatesDto;
import org.example.Service.CoordinatesService;
import java.util.List;

@Path("coordinates")
@Consumes(MediaType.APPLICATION_JSON) // перевод в dto
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class CoordinatesController {

    @Inject
    private CoordinatesService coordinatesService;

    @POST
    public CoordinatesDto createCoordinates(CoordinatesDto coordinatesDto) {
        return coordinatesService.addCoordinates(coordinatesDto);
    }


    @GET
    public List<CoordinatesDto> getAllCoordinates() {
        return coordinatesService.loadAllCoordinates();
    }
}
