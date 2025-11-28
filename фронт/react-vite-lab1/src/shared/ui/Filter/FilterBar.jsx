import Input from "../Input/Input";
import "./FilterBar.css";

const numericColumnKeys = [
  "area",
  "population",
  "metersAboveSeaLevel",
  "timezone",
  "agglomeration",
  "id",
  "height",
  "x",
  "y",
  "z",
];

const numericTypes = ["number", "int", "float", "double", "integer"];

function isNumericColumn(column) {
  if (!column) return false;

  const { type, key } = column;
  if (type && numericTypes.some((t) => type.toLowerCase().includes(t))) {
    return true;
  }
  return numericColumnKeys.includes(key);
}

const FilterBar = ({
  columns,
  filterColumn,
  setFilterColumn,
  filterValue,
  setFilterValue,
  sortColumn,
  setSortColumn,
  sortDir,
  setSortDir,
}) => {
  const currentColumn = columns.find((col) => col.key === filterColumn);
  const isNumberField = isNumericColumn(currentColumn);

  const handleFilterColumnChange = (event) => {
    setFilterColumn(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterValue("");
  };

  const handleSortColumnChange = (event) => {
    const value = event.target.value;
    setSortColumn(value || null);
  };

  const toggleSortDirection = () => {
    setSortDir(sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div className="filter-bar">
      <div className="section">
        <span className="sectionTitle">Фильтр</span>
        <div className="controls">
          <select value={filterColumn} onChange={handleFilterColumnChange}>
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>

          <Input
            name="filter"
            type={isNumberField ? "number" : "text"}
            value={filterValue}
            onChange={handleFilterValueChange}
            placeholder={isNumberField ? "Число…" : "Значение…"}
          />

          <button type="button" onClick={handleResetFilter}>
            Сбросить
          </button>
        </div>
      </div>

      {/* Блок сортировки */}
      <div className="section sortSection">
        <span className="sectionTitle">Сортировка</span>
        <div className="controls">
          <select value={sortColumn ?? ""} onChange={handleSortColumnChange}>
            <option value="">Нет</option>
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={toggleSortDirection}
            className="sortButton"
            disabled={!sortColumn}
            aria-label="Сменить направление сортировки"
          >
            {sortDir === "asc" ? "⬇" : "⬆"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
