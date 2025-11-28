package org.example.Service;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import org.example.DTO.CityDto;
import org.example.Entity.City;
import org.example.Mapper.CityMapper;
import org.example.Repository.CityRepository;

import java.util.List;
import java.util.stream.Collectors;


@RequestScoped
public class CityService {
    @Inject
    private CityRepository cityRepository; // бд
    @Inject
    private CityMapper cityMapper;

    public CityDto addCity(CityDto cityDto) {
        City city = cityMapper.toEntity(cityDto);
        cityRepository.save(city);
        return cityDto;
    }

    public List<CityDto> getCitiesPage(int page, int size) {
        List<City> cities = cityRepository.findPage(page, size);
        return cities.stream().map(cityMapper::toDto).collect(Collectors.toList());
    }

    public CityDto modifyCity(CityDto dto) {
        City city = cityMapper.toEntity(dto);
        City updated = cityRepository.update(city);
        return cityMapper.toDto(updated);
    }

    public long countCities() {
        return cityRepository.count();
    }


    public City removeCity(Integer id) {
        return cityRepository.delete(id);
    }

    public List<CityDto> loadCitiesWithTimezoneFunc(int timezone) {
        List<City> cities = cityRepository.findCitiesWithTimezoneFunc(timezone);
        return cities.stream().map(cityMapper::toDto).collect(Collectors.toList());
    }

    public List<CityDto> loadCityWithMinPopulation() {
        List<City> cities = cityRepository.findCityWithMinPopulation();
        return cities.stream().map(cityMapper::toDto).collect(Collectors.toList());
    }

    public int loadCountMetersAboveSeaLevelCount(int selectNumber) {
        return cityRepository.countMetersAboveSeaLevel(selectNumber);
    }

    public double loadDistanceToMaxAreaCity() {
        return cityRepository.findDistanceToMaxAreaCity();
    }

}
