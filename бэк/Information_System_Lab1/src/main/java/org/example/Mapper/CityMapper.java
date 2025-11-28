package org.example.Mapper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.example.DTO.CityDto;
import org.example.DTO.ClimateDto;
import org.example.DTO.CoordinatesDto;
import org.example.DTO.HumanDto;
import org.example.Entity.City;
import org.example.Entity.Climate;
import org.example.Entity.Coordinates;
import org.example.Entity.Human;
import org.example.Repository.CoordinatesRepository;
import org.example.Repository.HumanRepository;

import java.time.ZonedDateTime;

@ApplicationScoped
public class CityMapper {
    @Inject
    CoordinatesRepository coordinatesRepository;
    @Inject
    HumanRepository humanRepository;
    public City toEntity(CityDto cityDto) {
        City city = new City();
        city.setId(cityDto.getId());
        city.setName(cityDto.getName());
        Coordinates coordinates;
        Human human;
        if (cityDto.getCoordinates().getId() != null) {
            coordinates = coordinatesRepository.findById(cityDto.getCoordinates().getId());
        } else {
            coordinates = new Coordinates();
            coordinates.setX(cityDto.getCoordinates().getX());
            coordinates.setY(cityDto.getCoordinates().getY());
        }
        city.setCoordinates(coordinates);
        if (cityDto.getCreationDate() != null) {
            city.setCreationDate(cityDto.getCreationDate());
        } else {
            city.setCreationDate(ZonedDateTime.now());
        }
        city.setArea(cityDto.getArea());
        city.setPopulation(cityDto.getPopulation());
        city.setEstablishmentDate(cityDto.getEstablishmentDate());
        city.setCapital(cityDto.isCapital());
        city.setMetersAboveSeaLevel(cityDto.getMetersAboveSeaLevel());
        city.setTimezone(cityDto.getTimezone());
        city.setAgglomeration(cityDto.getAgglomeration());
        if (cityDto.getClimate() != null && cityDto.getClimate().getClimate() != null) {
            city.setClimate(Climate.valueOf(cityDto.getClimate().getClimate()));
        } else {
            city.setClimate(null);
        }
        if (cityDto.getGovernor() != null) {
            if (cityDto.getGovernor().getId() != null) {
            human = humanRepository.findById(cityDto.getGovernor().getId());
        } else {
            human = new Human();
            human.setHeight(cityDto.getGovernor().getHeight());
        }
            city.setGovernor(human);
    } else {
            city.setGovernor(null);
        }
        return city;
    }
    public CityDto toDto(City city) {
        CityDto cityDto = new CityDto();
        cityDto.setId(city.getId());
        cityDto.setName(city.getName());
        CoordinatesDto coordinatesDto = new CoordinatesDto();
        coordinatesDto.setId(city.getCoordinates().getId());
        coordinatesDto.setX( city.getCoordinates().getX());
        coordinatesDto.setY(city.getCoordinates().getY());
        cityDto.setCoordinates(coordinatesDto);
        cityDto.setCreationDate(city.getCreationDate());
        cityDto.setArea(city.getArea());
        cityDto.setPopulation(city.getPopulation());
        cityDto.setEstablishmentDate(city.getEstablishmentDate());
        cityDto.setCapital(city.isCapital());
        cityDto.setMetersAboveSeaLevel(city.getMetersAboveSeaLevel());
        cityDto.setTimezone(city.getTimezone());
        cityDto.setAgglomeration(city.getAgglomeration());
        ClimateDto climateDto = new ClimateDto();
        if (city.getClimate() != null) {
            climateDto.setClimate(city.getClimate().toString());
        } else {
            climateDto.setClimate("");
        }
        cityDto.setClimate(climateDto);
        HumanDto humanDto = null;
        if (city.getGovernor() != null) {
            humanDto = new HumanDto();
            if (city.getGovernor().getId() != null) {
                humanDto.setId(city.getGovernor().getId());
            } else {
                humanDto.setId(null);
            }
            humanDto.setHeight(city.getGovernor().getHeight());
        }
        cityDto.setGovernor(humanDto);
        return cityDto;
    }

}


