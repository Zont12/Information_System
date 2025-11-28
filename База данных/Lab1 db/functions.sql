CREATE OR REPLACE FUNCTION get_city_with_min_population()
RETURNS SETOF cities AS $$
BEGIN
  RETURN QUERY
    SELECT * FROM cities
    WHERE population = (SELECT MIN(population) FROM cities WHERE population IS NOT NULL)
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION metersAboveSeaLevel(select_number INTEGER)
RETURNS INTEGER
AS $$
DECLARE
    metersAboveSeaLevel_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO metersAboveSeaLevel_count
    FROM cities
    WHERE meters_above_sea_level < select_number;
    RETURN metersAboveSeaLevel_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_cities_with_timezone(timezone_number INTEGER)
RETURNS SETOF cities AS $$
BEGIN
  RETURN QUERY
    SELECT * FROM cities
    WHERE timezone < timezone_number;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_distance_to_max_area_city()
RETURNS DOUBLE PRECISION
AS $$
DECLARE
  coordx DOUBLE PRECISION;
  coordy DOUBLE PRECISION;
BEGIN
  SELECT coordinates.x, coordinates.y
  INTO coordx, coordy
  FROM cities
  JOIN coordinates ON cities.coordinates_id = coordinates.id
  WHERE cities.area = (SELECT MAX(area) FROM cities);
  RETURN sqrt(power(coordx, 2) + power(coordy, 2));
END;
$$ LANGUAGE plpgsql;