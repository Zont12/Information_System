export async function getCitiesByTimezone(timezone) {
  const response = await fetch(
    `/app/api/cities/by-timezone?timezone=${encodeURIComponent(timezone)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  if (!response.ok) throw new Error("Loading error");
  return response.json();
}
