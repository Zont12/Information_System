import { useState, useEffect } from "react";
import "./styles/App.css";
import Button from "../shared/ui/Button/Button.jsx";
import Header from "../shared/ui/Header/Header.jsx";
import Table from "../shared/ui/Table/Table.jsx";
import Modal from "../features/modal-add-city/ui/Modal.jsx";
import ModalUpdate from "../features/modal-update-city/ui/ModalUpdate.jsx";
import MinPopulationCities from "../features/min-population-cities/ui/MinPopulationCities.jsx";
import OtherFunctions from "../features/otherFunctions/ui/otherFunctions.jsx";
import CitiesWithTimezone from "../features/cities-with-timezone/ui/CitiesWithTimezone.jsx";

function App() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [cityToEdit, setCityToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState("table");
  const pageSize = 3;

  const reloadCities = () => {
    fetch(`/app/api/cities?page=${currentPage}&size=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        setCities(Array.isArray(data.content) ? data.content : []);
        setTotalPages(Math.ceil(data.total / pageSize));
      })
      .catch(() => setCities([]));
  };

  const handleDelete = (id) => {
    fetch(`/app/api/cities/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (res.ok) {
        reloadCities();
        setErrorMsg("");
      } else if (res.status === 409) {
        const errorText = await res.text();
        setErrorMsg(errorText);
      } else {
        setErrorMsg("Ошибка при удалении");
      }
    });
  };

  useEffect(() => {
    reloadCities();
    const interval = setInterval(reloadCities, 3000);
    return () => clearInterval(interval);
  }, [currentPage, pageSize]);

  return (
    <div>
      <Header />
      <div className="buttons">
        <Button onClick={() => setView("table")}>Список городов</Button>
        <Button onClick={() => setView("extra")}>
          Дополнительные возможности
        </Button>
        <Button onClick={() => setIsOpen(true)}>Добавить город</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          reloadCities={reloadCities}
        />
        <ModalUpdate
          isOpen={updateModalOpen}
          onClose={() => {
            setUpdateModalOpen(false);
            setCityToEdit(null);
          }}
          reloadCities={reloadCities}
          cityToEdit={cityToEdit}
        />
      </div>
      {view === "table" ? (
        <Table
          cities={cities}
          onDelete={handleDelete}
          onEdit={(city) => {
            setCityToEdit(city);
            setUpdateModalOpen(true);
          }}
          errorMsg={errorMsg}
          clearError={() => setErrorMsg("")}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div>
          <CitiesWithTimezone />
          <MinPopulationCities />
          <OtherFunctions />
        </div>
      )}
    </div>
  );
}

export default App;
