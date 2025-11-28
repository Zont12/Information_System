export async function createCity(cityData) {
  const response = await fetch(`/app/api/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cityData),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Ошибка сети или сервера");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}
