import { useState, useEffect } from "react";
import { createCoordinates, getCoordinatesList } from "../api/coordinatesApi";
import { createHuman, getHumansList } from "../api/humansApi";
import { createCity } from "../api/citiesApi.jsx";
import { createEmptyCity } from "./types.jsx";

export function useAddCityModal({ isOpen, reloadCities }) {
  const [HandleCoordinates, setHandleCoordinates] = useState(true);
  const [HandleGovernor, setHandleGovernor] = useState(true);
  const [coordinatesList, setCoordinatesList] = useState([]);
  const [governorList, setGovernorList] = useState([]);

  const [nameError, setNameError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [populationError, setPopulationError] = useState("");
  const [timezoneError, setTimezoneError] = useState("");
  const [metersAboveSeaLevelError, setMetersAboveSeaLevelError] = useState("");
  const [agglomerationError, setaAglomerationError] = useState("");
  const [xError, setXError] = useState("");
  const [yError, setYError] = useState("");
  const [heightError, setHeightError] = useState("");

  const [city, setCity] = useState(createEmptyCity);

  function onChangeCity(event) {
    const { name, value } = event.target;

    if (name === "coordinates" && typeof value === "object") {
      setCity((cityobject) => ({
        ...cityobject,
        coordinates: value,
      }));
      return;
    }

    if (name === "governor" && typeof value === "object") {
      setCity((cityobject) => ({
        ...cityobject,
        governor: value,
      }));
      return;
    }

    if (name === "coordinates.x" || name === "coordinates.y") {
      const coordinate_axis = name.split(".")[1];
      setCity((cityobject) => ({
        ...cityobject,
        coordinates: { ...cityobject.coordinates, [coordinate_axis]: value },
      }));
    } else if (name === "governor.height") {
      setCity((cityobject) => ({
        ...cityobject,
        governor: { ...cityobject.governor, height: value },
      }));
    } else {
      setCity((cityobject) => ({
        ...cityobject,
        [name]: value,
      }));
    }
  }

  const SubmitCoordinates = async () => {
    let hasError = false;
    const xValue = parseFloat(city.coordinates.x);
    if (city.coordinates.x === "" || isNaN(xValue) || xValue <= -474) {
      setXError("X должно быть числом, больше -474");
      hasError = true;
    }

    const yValue = parseFloat(city.coordinates.y);
    if (city.coordinates.y === "" || isNaN(yValue) || yValue <= -84) {
      setYError("Y должно быть числом, больше -84");
      hasError = true;
    }

    if (hasError) return;

    const coordinatesData = {
      x: parseFloat(city.coordinates.x),
      y: parseFloat(city.coordinates.y),
    };

    try {
      await createCoordinates(coordinatesData);
      alert("Координаты успешно добавлены");
      setCity((cityobject) => ({
        ...cityobject,
        coordinates: { x: "", y: "" },
      }));
    } catch (e) {
      alert("Ошибка при добавлении координат: " + e.message);
    }
  };

  const SubmitHuman = async () => {
    let hasError = false;

    const heightValue = parseFloat(city.governor.height);
    if (city.governor.height === "" || isNaN(heightValue) || heightValue <= 0) {
      setHeightError("Height должно быть числом, больше 0");
      hasError = true;
    }
    if (hasError) return;

    const humanData = {
      height: parseFloat(city.governor.height),
    };

    try {
      await createHuman(humanData);
      alert("Человек успешно добавлен");
      setCity((cityobject) => ({
        ...cityobject,
        governor: { height: "" },
      }));
    } catch (e) {
      alert("Ошибка при добавлении человека: " + e.message);
    }
  };

  const SubmitCity = async () => {
    let hasError = false;

    setNameError("");
    setAreaError("");
    setPopulationError("");
    setTimezoneError("");
    setMetersAboveSeaLevelError("");
    setaAglomerationError("");
    setXError("");
    setYError("");
    setHeightError("");

    if (!city.name) {
      setNameError("Имя города не должно быть пустым!");
      hasError = true;
    }

    const areaValue = parseFloat(city.area);
    if (city.area === "" || isNaN(areaValue) || areaValue <= 0) {
      setAreaError("Area не должно быть пустым и должно быть числом больше 0!");
      hasError = true;
    }

    if (
      city.population == "" ||
      isNaN(Number(city.population)) ||
      Number(city.population) <= 0 ||
      !Number.isInteger(Number(city.population))
    ) {
      setPopulationError("Population должно быть целым числом больше 0!");
      hasError = true;
    }

    if (
      city.timezone !== "" &&
      (isNaN(Number(city.timezone)) ||
        !Number.isInteger(Number(city.timezone)) ||
        Number(city.timezone) <= -13 ||
        Number(city.timezone) > 15)
    ) {
      setTimezoneError(
        "Timezone должно быть целым числом, больше -13 и не больше 15!"
      );
      hasError = true;
    }

    if (
      city.metersAboveSeaLevel !== "" &&
      (isNaN(Number(city.timezone)) || !Number.isInteger(Number(city.timezone)))
    ) {
      setMetersAboveSeaLevelError(
        "MetersAboveSeaLevel должно быть целым числом!"
      );
      hasError = true;
    }

    const agglomerationValue = parseFloat(city.agglomeration);
    if (city.agglomeration !== "" && isNaN(agglomerationValue)) {
      setaAglomerationError("Agglomeration должно быть числом");
      hasError = true;
    }

    const xValue = parseFloat(city.coordinates.x);
    if (city.coordinates.x === "" || isNaN(xValue) || xValue <= -474) {
      setXError("X должно быть числом, больше -474");
      hasError = true;
    }

    const yValue = parseFloat(city.coordinates.y);
    if (city.coordinates.y === "" || isNaN(yValue) || yValue <= -84) {
      setYError("Y должно быть числом, больше -84");
      hasError = true;
    }

    const heightValue = parseFloat(city.governor.height);
    if (
      (city.governor.height !== "" && isNaN(heightValue)) ||
      heightValue <= 0
    ) {
      setHeightError("Height должно быть числом, больше 0");
      hasError = true;
    }

    if (hasError) return;

    let coordinatesValue = null;
    if (HandleCoordinates) {
      if (city.coordinates.x && city.coordinates.y) {
        coordinatesValue = {
          id: null,
          x: parseFloat(city.coordinates.x),
          y: parseFloat(city.coordinates.y),
        };
      }
    } else {
      if (city.coordinates.id) {
        coordinatesValue = { id: city.coordinates.id };
      }
    }

    let governorValue = null;
    if (city.governor && city.governor.id) {
      governorValue = { id: city.governor.id };
    } else if (city.governor && city.governor.height !== "") {
      governorValue = {
        id: null,
        height: parseFloat(city.governor.height),
      };
    }

    const cityData = {
      name: city.name,
      coordinates: coordinatesValue,
      creationDate: new Date().toISOString(),
      area: parseFloat(city.area),
      population: parseInt(city.population),
      establishmentDate:
        city.establishmentDate === "" ? null : city.establishmentDate,
      capital: city.capital.toLowerCase() === "true" || city.capital === "1",
      metersAboveSeaLevel: parseInt(city.metersAboveSeaLevel),
      timezone: parseInt(city.timezone),
      agglomeration: parseFloat(city.agglomeration),
      climate: city.climate === "" ? null : { climate: city.climate },
      governor: governorValue,
    };

    console.log(JSON.stringify(cityData, null, 2));

    try {
      await createCity(cityData);
      alert("Город успешно добавлен");
      if (reloadCities) reloadCities();
      setCity(createEmptyCity());
    } catch (e) {
      alert("Ошибка при добавлении города: " + e.message);
    }
  };

  // загрузка координат
  useEffect(() => {
    if (isOpen && !HandleCoordinates) {
      getCoordinatesList()
        .then((data) => setCoordinatesList(data))
        .catch((e) => console.error(e));
    }
  }, [isOpen, HandleCoordinates]);

  // загрузка губернаторов
  useEffect(() => {
    if (isOpen && !HandleGovernor) {
      getHumansList()
        .then((data) => {
          console.log(data.map((g) => g.id));
          setGovernorList(data);
        })
        .catch((e) => console.error(e));
    }
  }, [isOpen, HandleGovernor]);

  return {
    city,
    HandleCoordinates,
    setHandleCoordinates,
    HandleGovernor,
    setHandleGovernor,
    coordinatesList,
    governorList,
    onChangeCity,
    SubmitCoordinates,
    SubmitHuman,
    SubmitCity,
    nameError,
    areaError,
    populationError,
    timezoneError,
    metersAboveSeaLevelError,
    agglomerationError,
    xError,
    yError,
    heightError,
  };
}
