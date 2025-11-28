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
  const [filterColumn, setFilterColumn] = useState("id");
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  // Фильтр
  const filteredCities = cities.filter((city) => {
    if (!filterValue) return true;
    const column = columns.find((c) => c.key === filterColumn);
    if (!column) return true;

    const rawValue = column.getValue ? column.getValue(city) : city[column.key];
    const cityValue = rawValue != null ? String(rawValue) : "";
    return cityValue === filterValue;
  });

  // Сортировка
  const getColumnValue = (city, column) => {
    if (column.getValue) return column.getValue(city);
    return city[column.key] ?? "";
  };

  const compare = (a, b) => {
    const numA = Number(a);
    const numB = Number(b);

    const bothNumbers = !isNaN(numA) && !isNaN(numB);

    if (bothNumbers) {
      return numA - numB;
    }

    return String(a).localeCompare(String(b));
  };

  // Основная сортировка
  const sortedCities = !sortColumn
    ? filteredCities
    : [...filteredCities].sort((a, b) => {
        const column = columns.find((c) => c.key === sortColumn);

        const valueA = getColumnValue(a, column);
        const valueB = getColumnValue(b, column);

        const base = compare(valueA, valueB);

        return sortDir === "asc" ? base : -base;
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
