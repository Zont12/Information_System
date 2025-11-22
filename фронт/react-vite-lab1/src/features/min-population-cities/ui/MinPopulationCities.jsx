import React, { useState } from "react";
import { useMinPopulationCities } from "../model/useMinPopulation";
import "../ui/MinPopulationCities.css";

function MinPopulationCities() {
  const { cities, error, loading, fetchCities } = useMinPopulationCities();

  const [showTable, setShowTable] = useState(false);

  const handleShowTable = async () => {
    await fetchCities();
    setShowTable(true);
  };

  const handleHideTable = () => {
    setShowTable(false);
  };

  return (
    <div className="extra-features">
      <div className="feature-block">
        <h3>Cities with minimal population</h3>
        {!showTable ? (
          <button onClick={handleShowTable} disabled={loading}>
            {loading ? "Loading..." : "Show"}
          </button>
        ) : (
          <button onClick={handleHideTable}>Hide</button>
        )}
        {error && <div className="error">{error}</div>}
        {showTable && cities.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Coordinates (X, Y)</th>
                <th>Creation Date</th>
                <th>Area</th>
                <th>Population</th>
                <th>Establishment Date</th>
                <th>Capital</th>
                <th>Meters Above Sea Level</th>
                <th>Timezone</th>
                <th>Agglomeration</th>
                <th>Climate</th>
                <th>Governor's Height</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.id}>
                  <td>{city.id ?? ""}</td>
                  <td>{city.name ?? ""}</td>
                  <td>
                    {city.coordinates
                      ? `${city.coordinates.x ?? ""}, ${city.coordinates.y ?? ""}`
                      : ""}
                  </td>
                  <td>{city.creationDate ?? ""}</td>
                  <td>{city.area ?? ""}</td>
                  <td>{city.population ?? ""}</td>
                  <td>{city.establishmentDate ?? ""}</td>
                  <td>
                    {city.capital === true
                      ? "Yes"
                      : city.capital === false
                        ? "No"
                        : ""}
                  </td>
                  <td>{city.metersAboveSeaLevel ?? ""}</td>
                  <td>{city.timezone ?? ""}</td>
                  <td>{city.agglomeration ?? ""}</td>
                  <td>
                    {city.climate && city.climate.climate
                      ? city.climate.climate
                      : ""}
                  </td>
                  <td>
                    {city.governor && city.governor.height != null
                      ? city.governor.height
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MinPopulationCities;
