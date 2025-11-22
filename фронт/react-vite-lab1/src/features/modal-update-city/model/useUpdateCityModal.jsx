import { useEffect, useState } from "react";
import { createEmptyCity, normalizeCityToEdit } from "./types.jsx";
import { getCoordinatesList } from "../../modal-add-city/api/coordinatesApi";
import { getHumansList } from "../../modal-add-city/api/humansApi";
import { createCity, updateCity } from "../api/citiesApi";

export function useUpdateCityModal({
  isOpen,
  reloadCities,
  cityToEdit,
  isEdit,
  onClose,
}) {
  const [coordinatesList, setCoordinatesList] = useState([]);
  const [governorList, setGovernorList] = useState([]);

  const [nameError, setNameError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [populationError, setPopulationError] = useState("");
  const [timezoneError, setTimezoneError] = useState("");
  const [metersAboveSeaLevelError, setMetersAboveSeaLevelError] = useState("");
  const [agglomerationError, setaAglomerationError] = useState("");

  const [city, setCity] = useState(createEmptyCity());

  useEffect(() => {
    if (!isOpen) return;

    getCoordinatesList()
      .then((data) => setCoordinatesList(data))
      .catch(() => setCoordinatesList([]));

    getHumansList()
      .then((data) => setGovernorList(data))
      .catch(() => setGovernorList([]));
  }, [isOpen]);

  // установка города для редактирования / очистка
  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && cityToEdit) {
      setCity(normalizeCityToEdit(cityToEdit));
    } else {
      setCity(createEmptyCity());
    }
  }, [isOpen, isEdit, cityToEdit]);

  function onChangeBasic(event) {
    const { name, value } = event.target;
    setCity((prev) => ({ ...prev, [name]: value }));
  }

  function onSelectCoordinates(e) {
    const id = Number(e.target.value);
    const selected = coordinatesList.find((coord) => coord.id === id);
    setCity((prev) => ({
      ...prev,
      coordinates: selected
        ? { id: selected.id, x: selected.x, y: selected.y }
        : { id: undefined, x: "", y: "" },
    }));
  }

  function onSelectGovernor(e) {
    const id = Number(e.target.value);
    const selected = governorList.find((g) => g.id === id);
    setCity((prev) => ({
      ...prev,
      governor: selected
        ? { id: selected.id, height: selected.height }
        : { id: undefined, height: "" },
    }));
  }

  const SubmitCity = () => {
    let hasError = false;

    setNameError("");
    setAreaError("");
    setPopulationError("");
    setTimezoneError("");
    setMetersAboveSeaLevelError("");
    setaAglomerationError("");

    if (!city.name?.trim()) {
      setNameError("Имя города не должно быть пустым!");
      hasError = true;
    }

    const areaValue = parseFloat(String(city.area));
    if (city.area === "" || isNaN(areaValue) || areaValue <= 0) {
      setAreaError("Area не должно быть пустым и должно быть числом больше 0!");
      hasError = true;
    }

    if (
      city.population !== "" &&
      (isNaN(Number(city.population)) ||
        Number(city.population) <= 0 ||
        !Number.isInteger(Number(city.population)))
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
      (isNaN(Number(city.metersAboveSeaLevel)) ||
        !Number.isInteger(Number(city.metersAboveSeaLevel)))
    ) {
      setMetersAboveSeaLevelError(
        "MetersAboveSeaLevel должно быть целым числом!"
      );
      hasError = true;
    }

    const agglomerationValue = parseFloat(String(city.agglomeration));
    if (city.agglomeration !== "" && isNaN(agglomerationValue)) {
      setaAglomerationError("Agglomeration должно быть числом");
      hasError = true;
    }

    if (!city.coordinates.id) {
      alert("Выберите координаты.");
      hasError = true;
    }

    if (hasError) return;

    const coords =
      city.coordinates.id != null
        ? {
            id: city.coordinates.id,
            x: parseFloat(String(city.coordinates.x)),
            y: parseFloat(String(city.coordinates.y)),
          }
        : undefined;

    const governor =
      city.governor && city.governor.id != null && city.governor.id !== ""
        ? {
            id: city.governor.id,
            height:
              city.governor.height === "" || city.governor.height == null
                ? null
                : parseFloat(String(city.governor.height)),
          }
        : null;

    const cityData = {
      id: isEdit ? city.id : undefined,
      name: city.name,
      creationDate: isEdit ? cityToEdit.creationDate : undefined,
      area: parseFloat(String(city.area)),
      population:
        city.population === "" ? null : parseInt(String(city.population), 10),
      establishmentDate:
        city.establishmentDate === "" ? null : city.establishmentDate,
      capital:
        city.capital === "true" || city.capital === true || city.capital === 1,
      metersAboveSeaLevel:
        city.metersAboveSeaLevel === ""
          ? null
          : parseInt(String(city.metersAboveSeaLevel), 10),
      timezone:
        city.timezone === "" ? null : parseInt(String(city.timezone), 10),
      agglomeration:
        city.agglomeration === ""
          ? null
          : parseFloat(String(city.agglomeration)),
      climate: city.climate === "" ? null : { climate: city.climate },
      coordinates: coords,
      governor: governor,
    };

    const request = isEdit
      ? updateCity(city.id, cityData)
      : createCity(cityData);

    request
      .then(() => {
        alert(isEdit ? "Город успешно обновлён" : "Город успешно добавлен");
        reloadCities?.();
        onClose?.();
      })
      .catch((error) => {
        alert("Ошибка сети или сервера: " + error.message);
      });
  };

  return {
    city,
    nameError,
    areaError,
    populationError,
    timezoneError,
    metersAboveSeaLevelError,
    agglomerationError,
    coordinatesList,
    governorList,
    onChangeBasic,
    onSelectCoordinates,
    onSelectGovernor,
    SubmitCity,
  };
}
