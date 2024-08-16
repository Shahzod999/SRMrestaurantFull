import "./guestTable.scss";
import { useState, useEffect, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectedGuestTable, tableChoose } from "../../features/orderedFoodSlice";
import CustomDropdown from "../DropDown/CustomDropdown";

// Типизация
interface TablePlace {
  place: string;
  table: number;
}

// Компонент GuestTable
const GuestTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const choosenTable = useAppSelector(selectedGuestTable);

  const options: { [key: string]: number[] } = {
    Kucha: [1, 2, 3, 4, 5, 6, 7],
    Center: [8, 9, 10, 11, 12, 13, 14],
    Ichkari: [15, 16, 17, 18, 19, 20, 21],
  };

  const [tablePlace, setTablePlace] = useState<TablePlace>(
    choosenTable || {
      place: "Center",
      table: options["Center"][0],
    }
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedPlace = event.target.value;
    setTablePlace((prev) => {
      const newTable = {
        place: selectedPlace,
        table: options[selectedPlace][0],
      };
      dispatch(tableChoose(newTable));
      return newTable;
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTablePlace = parseInt(event.target.value, 10);
    setTablePlace((prev) => {
      const newTable = {
        ...prev,
        table: newTablePlace,
      };
      dispatch(tableChoose(newTable));
      return newTable;
    });
  };

  return (
    <div className="getOrder">
      <div className="counter guestTable">
        {["Kucha", "Center", "Ichkari"].map((place) => (
          <div key={place} className="guestTable__checkbox">
            <input type="checkbox" id={place} value={place} checked={tablePlace.place === place} onChange={handleCheckboxChange} />
            <label htmlFor={place}>{place}</label>
          </div>
        ))}

        <CustomDropdown tablePlace={tablePlace} options={options} handleSelectChange={handleSelectChange} />
      </div>
    </div>
  );
};

export default GuestTable;
