package org.example.Controller;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.DTO.CityDto;
import org.example.Service.CityService;

import java.util.List;
import java.util.Map;

@Path("cities")
@Consumes(MediaType.APPLICATION_JSON) // перевод в dto
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class CityController {

    @Inject
    private CityService cityService;

    @POST
    public CityDto createCity(@Valid CityDto cityDto) {
        return cityService.addCity(cityDto);
    }

    @GET
    public Response getAllCities(@QueryParam("page") int page, @QueryParam("size") int size) {
        List<CityDto> content = cityService.getCitiesPage(page, size);
        long cities = cityService.countCities();
        return Response.ok().entity(Map.of("content", content, "page", page, "size", size, "total", cities)).build();
    }

    @PUT
    @Path("/{id}")
    public CityDto updateCity(@PathParam("id") Integer id, @Valid CityDto cityDto) {
        cityDto.setId(id);
        return cityService.modifyCity(cityDto);
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCity(@PathParam("id") Integer id) {
        cityService.removeCity(id);
        return Response.noContent().build();
    }

    // дополнительные функции
    @GET
    @Path("/by-timezone")
    public List<CityDto> getCitiesWithTimezone(@QueryParam("timezone") int timezone) {
        return cityService.loadCitiesWithTimezoneFunc(timezone);
    }

    @GET
    @Path("/min-population")
    public List<CityDto> Get_city_with_min_population() {
        return cityService.loadCityWithMinPopulation();
    }

    @GET
    @Path("/get-metters")
    public int GetMetersAboveSeaLevelCount(@QueryParam("selectNumber") int selectNumber) {
        return cityService.loadCountMetersAboveSeaLevelCount(selectNumber);
    }

    @GET
    @Path("/get-distance")
    public double GetDistanceToMaxAreaCity() {
        return cityService.loadDistanceToMaxAreaCity();
    }

}
