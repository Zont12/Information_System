import { useState } from "react";
import { getCitiesByTimezone } from "../api/CitiesWithTimezoneApi";

export function useCitiesWithTimezone() {
  const [tzQuery, setTzQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    setError("");
    setCities([]);
    setLoading(true);
    try {
      const data = await getCitiesByTimezone(tzQuery);
      setCities(data);
      if (data.length === 0) setError("No cities with this timezone");
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return { tzQuery, setTzQuery, cities, error, loading, fetchCities };
}
