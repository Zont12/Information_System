import { useState } from "react";
import {
  fetchMetersCount,
  fetchDistanceToMaxAreaCity,
} from "../api/otherFunctionsApis";

export function useMetersDistance() {
  // Модель для количества городов ниже заданного уровня
  const [metersQuery, setMetersQuery] = useState("");
  const [metersResult, setMetersResult] = useState(null);
  const [metersError, setMetersError] = useState("");
  const [loadingMeters, setLoadingMeters] = useState(false);

  // Модель для расстояния
  const [distanceResult, setDistanceResult] = useState(null);
  const [distanceError, setDistanceError] = useState("");
  const [loadingDistance, setLoadingDistance] = useState(false);

  async function handleMetersSubmit(e) {
    e.preventDefault();
    setMetersError("");
    setMetersResult(null);
    setLoadingMeters(true);
    try {
      const result = await fetchMetersCount(metersQuery);
      let count = null;
      if (typeof result === "number") {
        count = result;
      } else if (typeof result === "object" && result !== null) {
        if ("metersabovesealevel" in result) {
          count = result.metersabovesealevel;
        } else if ("count" in result) {
          count = result.count;
        }
      }
      setMetersResult(count);
    } catch (err) {
      setMetersError(String(err));
    } finally {
      setLoadingMeters(false);
    }
  }

  async function handleDistanceClick() {
    setDistanceError("");
    setDistanceResult(null);
    setLoadingDistance(true);
    try {
      const result = await fetchDistanceToMaxAreaCity();
      let value = null;
      if (typeof result === "number") {
        value = result;
      } else if (typeof result === "object" && result !== null) {
        if ("get_distance_to_max_area_city" in result) {
          value = result.get_distance_to_max_area_city;
        } else if ("distance" in result) {
          value = result.distance;
        }
      }
      setDistanceResult(value);
    } catch (err) {
      setDistanceError(String(err));
    } finally {
      setLoadingDistance(false);
    }
  }

  return {
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
  };
}
