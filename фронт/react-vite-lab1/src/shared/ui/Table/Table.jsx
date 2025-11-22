// File: Table.jsx
import React, { useState } from "react";
import "./Table.css";
import FilterBar from "../Filter/FilterBar";

const columns = [
  { key: "id", label: "id" },
  { key: "name", label: "name" },
  {
    key: "coordinates",
    label: "Coordinates",
    getValue: (city) =>
      city.coordinates
        ? `${city.coordinates.x ?? ""}, ${city.coordinates.y ?? ""}`
        : "",
  },
  { key: "creationDate", label: "Creation Date" },
  { key: "area", label: "area" },
  { key: "population", label: "population" },
  { key: "establishmentDate", label: "establishmentDate" },
  {
    key: "capital",
    label: "capital",
    getValue: (city) =>
      city.capital === true ? "Да" : city.capital === false ? "Нет" : "",
  },
  { key: "metersAboveSeaLevel", label: "metersAboveSeaLevel" },
  { key: "timezone", label: "timezone" },
  { key: "agglomeration", label: "agglomeration" },
  {
    key: "climate",
    label: "climate",
    getValue: (city) =>
      city.climate && city.climate.climate ? city.climate.climate : "",
  },
  {
    key: "governor",
    label: "governor",
    getValue: (city) =>
      city.governor && city.governor.height != null ? city.governor.height : "",
  },
];

const Table = ({
  cities,
  onDelete,
  onEdit,
  errorMsg,
  clearError,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [filterColumn, setFilterColumn] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  // Filter
  const filteredCities = cities.filter((city) => {
    if (!filterValue) return true;
    const col = columns.find((col) => col.key === filterColumn);
    const value = col.getValue ? col.getValue(city) : (city[col.key] ?? "");
    return String(value) === filterValue;
  });

  // Sort
  const sortedCities = [...filteredCities].sort((a, b) => {
    if (!sortColumn) return 0;
    const col = columns.find((col) => col.key === sortColumn);
    const getValue = col.getValue ? col.getValue : (city) => city[sortColumn];

    const vA = getValue(a) ?? "";
    const vB = getValue(b) ?? "";

    // Сортируем числа и строки
    if (!isNaN(Number(vA)) && !isNaN(Number(vB))) {
      return sortDir === "asc"
        ? Number(vA) - Number(vB)
        : Number(vB) - Number(vA);
    }

    return sortDir === "asc"
      ? String(vA).localeCompare(String(vB))
      : String(vB).localeCompare(String(vA));
  });

  return (
    <>
      <div style={{ margin: "10px 0 10px 0" }}>
        <FilterBar
          columns={columns}
          filterColumn={filterColumn}
          setFilterColumn={setFilterColumn}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
          sortDir={sortDir}
          setSortDir={setSortDir}
        />
      </div>
      <table className="table">
        <caption className="table-title">Города</caption>
        <thead>
          {errorMsg && (
            <tr>
              <td colSpan={14}>
                <div className="error-message">
                  {errorMsg}
                  <button className="close-btn" onClick={clearError}>
                    ×
                  </button>
                </div>
              </td>
            </tr>
          )}
          <tr>
            {columns.map((col) => (
              <th scope="col" key={col.key}>
                {col.label}
              </th>
            ))}
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedCities.map((city) => (
            <tr key={city.id}>
              <td>{city.id ?? ""}</td>
              <td>{city.name ?? ""}</td>
              <td>
                {city.coordinates
                  ? `${city.coordinates.x ?? ""}, ${city.coordinates.y ?? ""}`
                  : ""}
              </td>
              <td>{city.creationDate ?? ""}</td>
              <td>{city.area ?? ""}</td>
              <td>{city.population ?? ""}</td>
              <td>{city.establishmentDate ?? ""}</td>
              <td>
                {city.capital === true
                  ? "Да"
                  : city.capital === false
                    ? "Нет"
                    : ""}
              </td>
              <td>{city.metersAboveSeaLevel ?? ""}</td>
              <td>{city.timezone ?? ""}</td>
              <td>{city.agglomeration ?? ""}</td>
              <td>
                {city.climate && city.climate.climate
                  ? city.climate.climate
                  : ""}
              </td>
              <td>
                {city.governor && city.governor.height != null
                  ? city.governor.height
                  : ""}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(city.id)}
                >
                  Удалить
                </button>
                <button className="delete-btn" onClick={() => onEdit(city)}>
                  Обновить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={14} style={{ textAlign: "center" }}>
              {currentPage > 1 && (
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Назад
                </button>
              )}
              <span style={{ margin: "0 12px" }}>
                Страница {currentPage} из {totalPages}
              </span>
              {currentPage < totalPages && (
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Вперед
                </button>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Table;
