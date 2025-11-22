import Input from "../Input/Input";
import "./FilterBar.css";

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
  const currentCol = columns.find((col) => col.key === filterColumn);

  const isNumberField =
    currentCol &&
    ["number", "int", "float", "double", "Integer"].some(
      (t) =>
        (currentCol.type && currentCol.type.toLowerCase().includes(t)) ||
        [
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
        ].includes(currentCol.key)
    );

  return (
    <div className="filter-bar">
      <div className="section">
        <span className="sectionTitle">Фильтр</span>
        <div className="controls">
          <select
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
          >
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
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder={isNumberField ? "Число…" : "Значение…"}
          />
          <button type="button" onClick={() => setFilterValue("")}>
            Сбросить
          </button>
        </div>
      </div>
      <div className="section sortSection">
        <span className="sectionTitle">Сортировка</span>
        <div className="controls">
          <select
            value={sortColumn ?? ""}
            onChange={(e) => setSortColumn(e.target.value || null)}
          >
            <option value="">Нет</option>
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
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
