import { useState } from "react";
import "./sideBarMenu.scss";
import { GiCampCookingPot } from "react-icons/gi";

import food from "../../../public/goryach.jpg";
import food1 from "../../../public/desert.jpg";
import food2 from "../../../public/fastfood.jpg";
import food3 from "../../../public/drinks.jpg";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchAllFoods, selectTypeFood } from "../../features/getAllFoodsSlice";

const SideBarMenu = () => {
  const dispatch = useAppDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  const handleTypeToSearchFoods = (type: string) => {
    console.log(type, "1");

    dispatch(selectTypeFood(type));
    dispatch(fetchAllFoods());
  };

  return (
    <div className="sideBarMenu">
      <div className={`${openSideBar ? "openMenuLinks" : ""} linksTomenu`}>
        <div onClick={() => handleTypeToSearchFoods("Starters")} className="linksTomenu__box">
          <img src={food} alt="" />
          <span>Горячее</span>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Dessert")} className="linksTomenu__box">
          <img src={food1} alt="" />
          <span>Десерт</span>
        </div>
        <div onClick={() => handleTypeToSearchFoods("FastFood")} className="linksTomenu__box">
          <img src={food2} alt="" />
          <span>Фастфуд</span>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Drinks")} className="linksTomenu__box">
          <img src={food3} alt="" />
          <span>Напитки</span>
        </div>
        <div onClick={() => handleTypeToSearchFoods("")} className="linksTomenu__box">
          <span>All</span>
        </div>
      </div>

      <div className="logo" onClick={handleSideBar}>
        <GiCampCookingPot />
      </div>
    </div>
  );
};

export default SideBarMenu;
