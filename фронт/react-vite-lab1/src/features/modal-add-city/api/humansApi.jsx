const BASE_URL = "/app/api";

export async function createHuman(humanData) {
  const response = await fetch(`${BASE_URL}/humans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(humanData),
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

export async function getHumansList() {
  const response = await fetch(`${BASE_URL}/humans`);
  if (!response.ok) {
    throw new Error("Не удалось получить список людей");
  }
  return response.json();
}
