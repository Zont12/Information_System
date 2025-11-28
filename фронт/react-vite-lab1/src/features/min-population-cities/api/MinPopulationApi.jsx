export async function fetchMinPopulationCities() {
  const response = await fetch("/app/api/cities/min-population", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Loading error");
  return response.json();
}
