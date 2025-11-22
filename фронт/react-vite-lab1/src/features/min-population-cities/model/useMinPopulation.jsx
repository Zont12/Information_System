import { useState } from "react";
import { fetchMinPopulationCities } from "../api/MinPopulationApi";

export function useMinPopulationCities() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    setError("");
    setCities([]);
    setLoading(true);
    try {
      const data = await fetchMinPopulationCities();
      setCities(data);
      if (data.length === 0) setError("No cities with minimal population");
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return { cities, error, loading, fetchCities };
}
