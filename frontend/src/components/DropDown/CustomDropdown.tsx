import "./customDropdown.scss";
import { useState, ChangeEvent } from "react";

interface TablePlace {
  place: string;
  table: number;
}

interface CustomDropdownProps {
  tablePlace: TablePlace;
  options: { [key: string]: number[] };
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ tablePlace, options, handleSelectChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(tablePlace.table);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: number) => {
    setSelectedValue(value);
    setIsOpen(false);
    handleSelectChange({ target: { value: value.toString() } } as ChangeEvent<HTMLSelectElement>);
    //fake event
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedValue || "Select an option"}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options[tablePlace.place].map((num) => (
            <li key={num} onClick={() => handleOptionClick(num)}>
              {num}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
