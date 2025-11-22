import { useMemo } from "react";
import "./ModalUpdate.css";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import { useUpdateCityModal } from "../model/useUpdateCityModal.jsx";

function ModalUpdate({ isOpen, onClose, reloadCities, cityToEdit }) {
  const isEdit = useMemo(
    () => Boolean(cityToEdit && cityToEdit.id),
    [cityToEdit]
  );

  const {
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
  } = useUpdateCityModal({ isOpen, reloadCities, cityToEdit, isEdit, onClose });

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-fields">
          <div>
            {nameError && (
              <div style={{ color: "red", marginTop: 4, fontWeight: "bold" }}>
                {nameError}
              </div>
            )}
            <h2>Введите name</h2>
            <Input name="name" value={city.name} onChange={onChangeBasic} />

            {areaError && (
              <div style={{ color: "red", marginTop: 4, fontWeight: "bold" }}>
                {areaError}
              </div>
            )}
            <h2>Введите area</h2>
            <Input name="area" value={city.area} onChange={onChangeBasic} />

            {populationError && (
              <div style={{ color: "red", marginTop: 4, fontWeight: "bold" }}>
                {populationError}
              </div>
            )}
            <h2>Введите population</h2>
            <Input
              name="population"
              value={city.population}
              onChange={onChangeBasic}
            />

            <h2>Введите establishmentDate</h2>
            <input
              className="establishmentDate-select"
              type="date"
              name="establishmentDate"
              value={city.establishmentDate || ""}
              onChange={onChangeBasic}
            />

            <h2>Выберете capital</h2>
            <select
              className="capital-select"
              name="capital"
              value={city.capital}
              onChange={onChangeBasic}
            >
              <option value="true">TRUE</option>
              <option value="false">FALSE</option>
            </select>

            {metersAboveSeaLevelError && (
              <div style={{ color: "red", marginTop: 4, fontWeight: "bold" }}>
                {metersAboveSeaLevelError}
              </div>
            )}
            <h2>Введите metersAboveSeaLevel</h2>
            <Input
              name="metersAboveSeaLevel"
              value={city.metersAboveSeaLevel}
              onChange={onChangeBasic}
            />

            {timezoneError && (
              <div style={{ color: "red", marginTop: 4, fontWeight: "bold" }}>
                {timezoneError}
              </div>
            )}
            <h2>Введите timezone</h2>
            <Input
              name="timezone"
              value={city.timezone}
              onChange={onChangeBasic}
            />

            {agglomerationError && (
              <div style={{ color: "red", marginTop: 4, fontWeight: "bold" }}>
                {agglomerationError}
              </div>
            )}
            <h2>Введите agglomeration</h2>
            <Input
              name="agglomeration"
              value={city.agglomeration}
              onChange={onChangeBasic}
            />

            <h2>Выберите climate</h2>
            <select
              className="climate-select"
              name="climate"
              value={city.climate || ""}
              onChange={onChangeBasic}
            >
              <option value=""></option>
              <option value="OCEANIC">OCEANIC</option>
              <option value="STEPPE">STEPPE</option>
              <option value="TUNDRA">TUNDRA</option>
            </select>
          </div>

          <div className="right-column">
            <div className="coordinates-block">
              <h2>Выберите координаты</h2>
              <select
                value={city.coordinates.id ? String(city.coordinates.id) : ""}
                onChange={onSelectCoordinates}
              >
                <option value=""></option>
                {coordinatesList.map((coord) => (
                  <option key={coord.id} value={String(coord.id)}>
                    ({coord.x}, {coord.y})
                  </option>
                ))}
              </select>
            </div>

            <div className="governor_block">
              <h2>Выберите governor</h2>
              <select
                value={city.governor.id ? String(city.governor.id) : ""}
                onChange={onSelectGovernor}
              >
                <option value=""></option>
                {governorList.map((g) => (
                  <option key={g.id} value={String(g.id)}>
                    ({g.height})
                  </option>
                ))}
              </select>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
                Оставьте пустым, чтобы снять губернатора (будет отправлено{" "}
                <code>null</code>).
              </div>
            </div>
          </div>
        </div>

        <div className="buttons">
          <Button onClick={onClose}>Закрыть окно</Button>
          <Button onClick={SubmitCity}>
            {isEdit ? "Обновить" : "Отправить"}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ModalUpdate;
