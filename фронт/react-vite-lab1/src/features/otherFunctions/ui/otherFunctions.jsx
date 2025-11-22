import React, { useState } from "react";
import { useMetersDistance } from "../model/useOtherFunctions";
import "./otherFunctions.css";

function OtherFunctions() {
  const {
    metersQuery,
    setMetersQuery,
    metersResult,
    metersError,
    loadingMeters,
    handleMetersSubmit,

    distanceResult,
    distanceError,
    loadingDistance,
    handleDistanceClick,
  } = useMetersDistance();

  const [metersValidationError, setMetersValidationError] = useState("");

  const handleMetersFormSubmit = async (e) => {
    e.preventDefault();
    setMetersValidationError("");

    if (
      metersQuery === "" ||
      isNaN(Number(metersQuery)) ||
      !Number.isInteger(Number(metersQuery))
    ) {
      setMetersValidationError("Meters above sea level should be intenger!");
      return;
    }
    await handleMetersSubmit(e);
  };

  return (
    <div className="extra-features">
      <div className="features-row">
        <div className="feature-block">
          <h3>Cities below specified sea level</h3>
          <form onSubmit={handleMetersFormSubmit}>
            <input
              type="number"
              value={metersQuery}
              onChange={(e) => setMetersQuery(e.target.value)}
              placeholder="Meters above sea level"
              step="1"
              disabled={loadingMeters}
            />
            <button type="submit" disabled={loadingMeters}>
              {loadingMeters ? "Loading..." : "Show count"}
            </button>
          </form>
          {metersValidationError && (
            <div className="error">{metersValidationError}</div>
          )}
          {metersError && <div className="error">{metersError}</div>}

          {metersResult !== null && (
            <div className="result">
              <strong>Cities below specified level:</strong> {metersResult}
            </div>
          )}
        </div>

        <div className="feature-block">
          <h3>Distance to city with max area</h3>
          <button onClick={handleDistanceClick} disabled={loadingDistance}>
            {loadingDistance ? "Loading..." : "Show distance"}
          </button>
          {distanceError && <div className="error">{distanceError}</div>}
          {distanceResult !== null && (
            <div className="result">
              <strong>Distance from (0,0):</strong> {distanceResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtherFunctions;
