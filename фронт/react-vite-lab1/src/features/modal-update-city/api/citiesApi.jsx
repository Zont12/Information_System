const BASE_URL = "/app/api";

export async function createCity(cityData) {
  const response = await fetch(`${BASE_URL}/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cityData),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Ошибка при добавлении города");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function updateCity(id, cityData) {
  const response = await fetch(`${BASE_URL}/cities/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cityData),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Ошибка при обновлении города");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
