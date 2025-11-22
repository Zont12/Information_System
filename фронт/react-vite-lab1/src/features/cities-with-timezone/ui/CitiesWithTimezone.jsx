import React, { useState } from "react";
import { useCitiesWithTimezone } from "../model/useCitiesWithTimezone";

function CitiesWithTimezone() {
  const { tzQuery, setTzQuery, cities, error, loading, fetchCities } =
    useCitiesWithTimezone();
  const [showTable, setShowTable] = useState(false);

  const [timezoneError, setTimezoneError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimezoneError("");

    let hasError = false;

    if (
      tzQuery === "" ||
      isNaN(Number(tzQuery)) ||
      !Number.isInteger(Number(tzQuery))
    ) {
      setTimezoneError("Timezone should be intenger!");
      hasError = true;
    }

    if (hasError) {
      setShowTable(false);
      return;
    }

    await fetchCities();
    setShowTable(true);
  };

  const handleHide = () => {
    setShowTable(false);
  };

  return (
    <div className="extra-features">
      <div className="feature-block">
        <h3>Cities with timezone less than specified</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={tzQuery}
            onChange={(e) => setTzQuery(e.target.value)}
            placeholder="Enter timezone"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Show"}
          </button>
        </form>
        {timezoneError && <div className="error">{timezoneError}</div>}
        {error && <div className="error">{error}</div>}
        {showTable && cities.length > 0 && (
          <>
            <button onClick={handleHide} style={{ marginBottom: 12 }}>
              Hide
            </button>
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
                        ? `${city.coordinates.x ?? ""}, ${
                            city.coordinates.y ?? ""
                          }`
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
          </>
        )}
      </div>
    </div>
  );
}

export default CitiesWithTimezone;
