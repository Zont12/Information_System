package org.example.Controller;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.example.DTO.HumanDto;
import org.example.Service.HumanService;

import java.util.List;

@Path("humans")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class HumanController {

    @Inject
    HumanService humanService;

    @POST
    public HumanDto createHuman(HumanDto humanDto) {
       return humanService.addHuman(humanDto);

    }

    @GET
    public List<HumanDto> getAllHumans() {
        return humanService.loadAllHumans();
    }

}
