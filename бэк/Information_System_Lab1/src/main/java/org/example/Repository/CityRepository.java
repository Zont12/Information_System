package org.example.Repository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import org.eclipse.persistence.expressions.Expression;
import org.eclipse.persistence.expressions.ExpressionBuilder;
import org.eclipse.persistence.internal.sessions.ArrayRecord;
import org.eclipse.persistence.queries.SQLCall;
import org.eclipse.persistence.sessions.DatabaseSession;
import org.eclipse.persistence.sessions.UnitOfWork;
import org.example.Entity.City;
import org.example.Entity.Climate;
import org.example.Entity.Coordinates;
import org.example.Entity.Human;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class CityRepository {

    @Inject
    DatabaseSession databaseSession;

    @Inject
    HumanRepository humanRepository;

    @Inject
    CoordinatesRepository coordinatesRepository;

    public City save(City city) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        if (city.getCoordinates().getId() != null) {
            ExpressionBuilder builder = new ExpressionBuilder();
            Expression expr = builder.get("id").equal(city.getCoordinates().getId());
            Coordinates existCoords =
                    (Coordinates) unitOfWork.readObject(Coordinates.class, expr);
            city.setCoordinates(existCoords);
        } else {
            unitOfWork.registerNewObject(city.getCoordinates());
        }
        if (city.getGovernor() != null) {
            if (city.getGovernor().getId() != null) {
                ExpressionBuilder builder = new ExpressionBuilder();
                Expression expr = builder.get("id").equal(city.getGovernor().getId());
                Human existHuman = (Human) unitOfWork.readObject(Human.class, expr);
                city.setGovernor(existHuman);
            } else {
                unitOfWork.registerNewObject(city.getGovernor());
            }
        }
        City persistedCity = (City) unitOfWork.registerNewObject(city);
        unitOfWork.commit();

        return persistedCity;
    }

    public City update(City city) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        ExpressionBuilder builder = new ExpressionBuilder();
        Expression expr = builder.get("id").equal(city.getId());
        City existingCity = (City) unitOfWork.readObject(City.class, expr);
        if (city.getCoordinates() != null) {
            Integer coordId = city.getCoordinates().getId();
            if (coordId != null) {
                ExpressionBuilder coordbuilder = new ExpressionBuilder();
                Expression expr2 = coordbuilder.get("id").equal(coordId);
                Coordinates coordinates = (Coordinates) unitOfWork.readObject(Coordinates.class, expr2);
                existingCity.setCoordinates(coordinates);
            }
        }

        if (city.getGovernor() != null) {
            Integer governorId = city.getGovernor().getId();
            if (governorId != null) {
                ExpressionBuilder governorbuilder = new ExpressionBuilder();
                Expression expr3 = governorbuilder.get("id").equal(governorId);
                Human existingGov = (Human) unitOfWork.readObject(Human.class, expr3);
                existingCity.setGovernor(existingGov);
            } else {
                existingCity.setGovernor(null);
            }
        } else {
            existingCity.setGovernor(null);
        }
        existingCity.setName(city.getName());
        existingCity.setArea(city.getArea());
        existingCity.setPopulation(city.getPopulation());
        existingCity.setEstablishmentDate(city.getEstablishmentDate());
        existingCity.setCapital(city.isCapital());
        existingCity.setMetersAboveSeaLevel(city.getMetersAboveSeaLevel());
        existingCity.setTimezone(city.getTimezone());
        existingCity.setAgglomeration(city.getAgglomeration());
        existingCity.setClimate(city.getClimate());
        unitOfWork.commit();
        return existingCity;

    }


    public List<City> findPage(int page, int size) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        int filter = (page - 1) * size;
        List<City> allCities = unitOfWork.readAllObjects(City.class);
        List<City> result = allCities.stream().skip(filter).limit(size).collect(Collectors.toList());
        return result;
    }


    public long count() {
        List<City> all = (List<City>) databaseSession.readAllObjects(City.class);
        return all.size();
    }

    public City delete(Integer id) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        Expression expression = new ExpressionBuilder().get("id").equal(id);
        City deletecity = (City) unitOfWork.readObject(City.class, expression);
        Coordinates coordinates = deletecity.getCoordinates();
        if (coordinates != null) {
            ExpressionBuilder builder = new ExpressionBuilder();
            Expression expr = builder.get("coordinates").get("id").equal(coordinates.getId()).and(builder.get("id").notEqual(deletecity.getId()));
            List<City> cities = unitOfWork.readAllObjects(City.class, expr);
            if (!cities.isEmpty()) {
                throw new WebApplicationException(
                        Response.status(Response.Status.CONFLICT)
                                .entity("Координаты уже используются другим городом")
                                .type("text/plain")
                                .build()
                );
            }
        }
        Human governor = deletecity.getGovernor();
        if (governor != null) {
            ExpressionBuilder builder = new ExpressionBuilder();
            Expression expr = builder.get("governor").get("id").equal(governor.getId()).and(builder.get("id").notEqual(deletecity.getId()));
            List<City> cities = unitOfWork.readAllObjects(City.class, expr);
            if (!cities.isEmpty()) {
                throw new WebApplicationException(
                        Response.status(Response.Status.CONFLICT)
                                .entity("Governor уже используются другим городом")
                                .type("text/plain")
                                .build()
                );
            }
        }
        unitOfWork.deleteObject(deletecity);
        unitOfWork.deleteObject(governor);
        unitOfWork.deleteObject(coordinates);
        unitOfWork.commit();
        return deletecity;
    }



    // Дополнительный функционал
    public List<City> findCitiesBySql(String sql) {
        SQLCall call = new SQLCall(sql);
        List<?> rows = databaseSession.executeSelectingCall(call);
        List<City> result = new ArrayList<>();
        for (Object rowObj : rows) {
            ArrayRecord record = (ArrayRecord) rowObj;
            City city = new City();
            city.setId((Integer) record.get("id"));
            city.setName((String) record.get("name"));
            Integer coordinatesId = (Integer) record.get("coordinates_id");
            if (coordinatesId != null) {
                Coordinates coordinates;
                coordinates = coordinatesRepository.findById(coordinatesId);
                city.setCoordinates(coordinates);
            } else {
                city.setCoordinates(null);
            }
            Timestamp ts = (Timestamp) record.get("creation_date");
            if (ts != null) {
                ZonedDateTime zdt = ts.toLocalDateTime().atZone(ZoneId.systemDefault());
                city.setCreationDate(zdt);
            }
            city.setArea((Double) record.get("area"));
            city.setPopulation((int) record.get("population"));
            city.setEstablishmentDate(record.get("establishment_date") != null ? ((Timestamp) record.get("establishment_date")).toLocalDateTime().toLocalDate() : null);
            city.setCapital((Boolean) record.get("capital"));
            city.setMetersAboveSeaLevel((Integer) record.get("meters_above_sea_level"));
            city.setTimezone((Integer) record.get("timezone"));
            Float agglomerationValue;
            if (record.get("agglomeration") != null) {
                agglomerationValue = ((Number) record.get("agglomeration")).floatValue();
            } else {
                agglomerationValue = null;
            }
            city.setAgglomeration(agglomerationValue);
            String climateStr = (String) record.get("climate");
            if (climateStr != null) {
                city.setClimate(Climate.valueOf(climateStr));
            } else {
                city.setClimate(null);
            }
            Integer governorId = (Integer) record.get("governor_id");
            if (governorId != null) {
                Human gov;
                gov = humanRepository.findById(governorId);
                city.setGovernor(gov);
            } else {
                city.setGovernor(null);
            }
            result.add(city);
        }
        return result;
    }


    public List<City> findCitiesWithTimezoneFunc(int timezone) {
        String sql = "SELECT * FROM get_cities_with_timezone(" + timezone + ")";
        return findCitiesBySql(sql);
    }

    public List<City> findCityWithMinPopulation() {
        String sql = "SELECT * FROM get_city_with_min_population()";
        return findCitiesBySql(sql);
    }

    public int countMetersAboveSeaLevel(int selectNumber) {
        String sql = "SELECT metersAboveSeaLevel(" + selectNumber + ")";
        SQLCall call = new SQLCall(sql);
        List<?> rows = databaseSession.executeSelectingCall(call);
        if (rows != null && !rows.isEmpty()) {
            ArrayRecord record = (ArrayRecord) rows.get(0);
            Number count = (Number) record.get("metersabovesealevel");
            if (count != null) {
                return count.intValue();
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
    public double findDistanceToMaxAreaCity() {
        String sql = "SELECT get_distance_to_max_area_city()";
        SQLCall call = new SQLCall(sql);
        List<?> rows = databaseSession.executeSelectingCall(call);
        if (rows != null && !rows.isEmpty()) {
            ArrayRecord record = (ArrayRecord) rows.get(0);
            Number result = (Number) record.get("get_distance_to_max_area_city");
            if (result != null) {
                return result.doubleValue();
            }
        }
        return 0.0;
    }
}
