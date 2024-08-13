import "./guestTable.scss";
import { useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectedGuestTable, tableChoose } from "../../features/orderedFoodSlice";
import { useLocation } from "react-router-dom";

const GuestTable: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const choosenTable = useAppSelector(selectedGuestTable);

  const options: { [key: string]: number[] } = {
    Kucha: [1, 2, 3, 4, 5, 6, 7],
    Center: [8, 9, 10, 11, 12, 13, 14],
    Ichkari: [15, 16, 17, 18, 19, 20, 21],
  };

  const [tablePlace, setTablePlace] = useState(
    choosenTable || {
      place: "Center",
      table: options["Center"][0], // Первоначально первый элемент для "Center"
    }
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedPlace = event.target.value;
    setTablePlace({
      place: selectedPlace,
      table: options[selectedPlace][0], //первый элемент из массива
      //преобразуется в целое число с использованием основания системы счисления 10 (десятичная система). Это важно, так как значения из <select> по умолчанию возвращаются как строки.
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTablePlace({
      ...tablePlace,
      table: parseInt(event.target.value, 10),
    });
  };

  const handleGuestTable = () => {
    dispatch(tableChoose(tablePlace));
  };

  const renderSelect = () => (
    <select id={tablePlace.place} value={tablePlace.table} onChange={handleSelectChange}>
      {options[tablePlace.place].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  );

  return (
    <div className="getOrder">
      <div className="counter guestTable">
        {["Kucha", "Center", "Ichkari"].map((place) => (
          <div key={place} className="guestTable__checkbox">
            <input type="checkbox" id={place} value={place} checked={tablePlace.place === place} onChange={handleCheckboxChange} />
            <label htmlFor={place}>{place}</label>
          </div>
        ))}

        {renderSelect()}

        <button onClick={handleGuestTable}>{pathname === "/menu" ? "Set Table" : "Change Table"}</button>
      </div>
    </div>
  );
};

export default GuestTable;
