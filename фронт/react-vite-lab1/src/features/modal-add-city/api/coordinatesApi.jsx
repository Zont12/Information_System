const BASE_URL = "/app/api";

export async function createCoordinates(coordinatesData) {
  const response = await fetch(`${BASE_URL}/coordinates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coordinatesData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Ошибка сети или сервера");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function getCoordinatesList() {
  const response = await fetch(`${BASE_URL}/coordinates`);
  if (!response.ok) {
    throw new Error("Не удалось получить список координат");
  }
  return response.json();
}
