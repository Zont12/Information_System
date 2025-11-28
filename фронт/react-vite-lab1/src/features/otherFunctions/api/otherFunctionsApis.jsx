export async function fetchMetersCount(meters) {
  const res = await fetch(
    `/app/api/cities/get-metters?selectNumber=${encodeURIComponent(meters)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  if (!res.ok) throw new Error("Loading error");
  return res.json();
}

export async function fetchDistanceToMaxAreaCity() {
  const res = await fetch(`/app/api/cities/get-distance`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Loading error");
  return res.json();
}
