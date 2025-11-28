import "./Modal.css";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import { useAddCityModal } from "../model/useAddCityModal.jsx";

function Modal({ isOpen, onClose, reloadCities }) {
  const {
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
  } = useAddCityModal({ isOpen, reloadCities });

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-fields">
          <div>
            {nameError && (
              <div
                style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}
              >
                {nameError}
              </div>
            )}
            <h2>Введите name</h2>
            <Input name="name" value={city.name} onChange={onChangeCity} />
            {areaError && (
              <div
                style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}
              >
                {areaError}
              </div>
            )}
            <h2>Введите area</h2>
            <Input name="area" value={city.area} onChange={onChangeCity} />
            {populationError && (
              <div
                style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}
              >
                {populationError}
              </div>
            )}
            <h2>Введите population</h2>
            <Input
              name="population"
              value={city.population}
              onChange={onChangeCity}
            />
            <h2>Введите establishmentDate</h2>
            <input
              className="establishmentDate-select"
              type="date"
              name="establishmentDate"
              value={city.establishmentDate}
              onChange={onChangeCity}
            />
            <h2>Выберете capital</h2>
            <select
              className="capital-select"
              name="capital"
              value={city.capital}
              onChange={onChangeCity}
            >
              <option value="true">TRUE</option>
              <option value="false">FALSE</option>
            </select>
            {metersAboveSeaLevelError && (
              <div
                style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}
              >
                {metersAboveSeaLevelError}
              </div>
            )}
            <h2>Введите metersAboveSeaLevel</h2>
            <Input
              name="metersAboveSeaLevel"
              value={city.metersAboveSeaLevel}
              onChange={onChangeCity}
            />
            {timezoneError && (
              <div
                style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}
              >
                {timezoneError}
              </div>
            )}
            <h2>Введите timezone</h2>
            <Input
              name="timezone"
              value={city.timezone}
              onChange={onChangeCity}
            />
            {agglomerationError && (
              <div
                style={{ color: "red", marginTop: "4px", fontWeight: "bold" }}
              >
                {agglomerationError}
              </div>
            )}
            <h2>Введите agglomeration</h2>
            <Input
              name="agglomeration"
              value={city.agglomeration}
              onChange={onChangeCity}
            />
            <h2>Выберите climate</h2>
            <select
              className="climate-select"
              name="climate"
              value={city.climate}
              onChange={onChangeCity}
            >
              <option value=""></option>
              <option value="OCEANIC">OCEANIC</option>
              <option value="STEPPE">STEPPE</option>
              <option value="TUNDRA">TUNDRA</option>
            </select>
          </div>
          <div className="right-column">
            <div className="coordinates-block">
              <Button
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={() => setHandleCoordinates((value) => !value)}
              >
                Поменять формат ввода
              </Button>
              {HandleCoordinates ? (
                <div name="input_coordinate">
                  <Button
                    style={{ backgroundColor: "blue", color: "white" }}
                    onClick={SubmitCoordinates}
                  >
                    Добавить координаты
                  </Button>
                  {xError && (
                    <div
                      style={{
                        color: "blue",
                        marginTop: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      {xError}
                    </div>
                  )}
                  <h2>Введите coordinates X</h2>
                  <Input
                    name="coordinates.x"
                    value={city.coordinates.x}
                    onChange={onChangeCity}
                  />
                  {yError && (
                    <div
                      style={{
                        color: "blue",
                        marginTop: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      {yError}
                    </div>
                  )}
                  <h2>Введите coordinates Y</h2>
                  <Input
                    name="coordinates.y"
                    value={city.coordinates.y}
                    onChange={onChangeCity}
                  />
                </div>
              ) : (
                <div>
                  <h2>Выберите координаты</h2>
                  <select
                    value={
                      city.coordinates.id ? String(city.coordinates.id) : ""
                    }
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      const selected = coordinatesList.find(
                        (coord) => coord.id === id
                      );
                      // эта логика осталась прежней
                      if (selected) {
                        onChangeCity({
                          target: {
                            name: "coordinates",
                            value: {
                              id: selected.id,
                              x: selected.x,
                              y: selected.y,
                            },
                          },
                        });
                      } else {
                        onChangeCity({
                          target: {
                            name: "coordinates",
                            value: { id: "", x: "", y: "" },
                          },
                        });
                      }
                    }}
                  >
                    <option value=""></option>
                    {coordinatesList.map((coord) => (
                      <option key={coord.id} value={String(coord.id)}>
                        ({coord.x}, {coord.y})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="governor_block">
              <Button
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={() => setHandleGovernor((value) => !value)}
              >
                Поменять формат ввода
              </Button>
              {HandleGovernor ? (
                <div name="input_governor">
                  <Button
                    style={{ backgroundColor: "blue", color: "white" }}
                    onClick={SubmitHuman}
                  >
                    Добавить governor
                  </Button>
                  {heightError && (
                    <div
                      style={{
                        color: "blue",
                        marginTop: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      {heightError}
                    </div>
                  )}
                  <h2>Введите height</h2>
                  <Input
                    name="governor.height"
                    value={city.governor.height}
                    onChange={onChangeCity}
                  />
                </div>
              ) : (
                <div>
                  <h2>Выберите governor</h2>
                  <select
                    value={city.governor.id ? String(city.governor.id) : ""}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      const selected = governorList.find(
                        (governor) => governor.id === id
                      );
                      if (selected) {
                        onChangeCity({
                          target: {
                            name: "governor",
                            value: {
                              id: selected.id,
                              height: selected.height,
                            },
                          },
                        });
                      } else {
                        onChangeCity({
                          target: {
                            name: "governor",
                            value: { id: "", height: "" },
                          },
                        });
                      }
                    }}
                  >
                    <option value=""></option>
                    {governorList.map((governor) => (
                      <option key={governor.id} value={String(governor.id)}>
                        ({governor.height})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="buttons">
          <Button onClick={onClose}>Закрыть окно</Button>
          <Button onClick={SubmitCity}>Отправить</Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
