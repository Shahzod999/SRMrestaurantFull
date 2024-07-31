import { useState } from "react";
import "./sideBarMenu.scss";
import { GiCampCookingPot } from "react-icons/gi";
import { Link } from "react-router-dom";

import food from "../../../public/goryach.jpg";
import food1 from "../../../public/desert.jpg";
import food2 from "../../../public/fastfood.jpg";
import food3 from "../../../public/drinks.jpg";

const SideBarMenu = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <div className="sideBarMenu">
      <div className={`${openSideBar ? "openMenuLinks" : ""} linksTomenu`}>
        <Link to="/menu/goryach" className="linksTomenu__box">
          <img src={food} alt="" />
          <span>Горячее</span>
        </Link>
        <Link to="/menu/desert" className="linksTomenu__box">
          <img src={food1} alt="" />
          <span>Десерт</span>
        </Link>
        <Link to="/menu/fastfood" className="linksTomenu__box">
          <img src={food2} alt="" />
          <span>Фастфуд</span>
        </Link>
        <Link to="/menu/drinks" className="linksTomenu__box">
          <img src={food3} alt="" />
          <span>Напитки</span>
        </Link>
      </div>

      <div className="logo" onClick={handleSideBar}>
        <GiCampCookingPot />
      </div>
    </div>
  );
};

export default SideBarMenu;
