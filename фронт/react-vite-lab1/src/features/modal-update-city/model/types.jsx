export const createEmptyCity = () => ({
  id: undefined,
  name: "",
  coordinates: { id: undefined, x: "", y: "" },
  area: "",
  population: "",
  establishmentDate: "",
  capital: "false",
  metersAboveSeaLevel: "",
  timezone: "",
  agglomeration: "",
  climate: "",
  governor: { id: undefined, height: "" },
});

export const normalizeCityToEdit = (c) => {
  if (!c) return createEmptyCity();

  const normalizedClimate =
    typeof c.climate === "string"
      ? c.climate
      : c.climate && typeof c.climate.climate === "string"
        ? c.climate.climate
        : "";

  return {
    id: c.id,
    name: c.name ?? "",
    coordinates: {
      id: c.coordinates?.id,
      x: c.coordinates?.x ?? "",
      y: c.coordinates?.y ?? "",
    },
    area: c.area ?? "",
    population: c.population ?? "",
    establishmentDate: c.establishmentDate ?? "",
    capital: String(Boolean(c.capital)),
    metersAboveSeaLevel: c.metersAboveSeaLevel ?? "",
    timezone: c.timezone ?? "",
    agglomeration: c.agglomeration ?? "",
    climate: normalizedClimate,
    governor: c.governor
      ? { id: Number(c.governor.id), height: c.governor.height ?? "" }
      : { id: undefined, height: "" },
  };
};
