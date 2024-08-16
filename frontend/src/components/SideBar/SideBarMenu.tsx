import { useState } from "react";
import "./sideBarMenu.scss";
import { GiCampCookingPot } from "react-icons/gi";

import { useAppDispatch } from "../../hooks/hooks";
import { fetchAllFoods, selectTypeFood } from "../../features/getAllFoodsSlice";

const SideBarMenu = () => {
  const dispatch = useAppDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  const handleTypeToSearchFoods = (type: string) => {
    dispatch(selectTypeFood(type));
    dispatch(fetchAllFoods());
  };

  return (
    <div className="sideBarMenu">
      <div className={`${openSideBar ? "openMenuLinks" : ""}openMenuLinks linksTomenu`}>
        <div onClick={() => handleTypeToSearchFoods("")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>All menu</p>
            <span>999 item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Starters")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>Starters</p>
            <span>999 item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Dessert")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>Dessert</p>
            <span>999 item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("FastFood")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>FastFood</p>
            <span>999 item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Drinks")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>Drinks</p>
            <span>999 item</span>
          </div>
        </div>
      </div>

      <div className="logo" onClick={handleSideBar}>
        <GiCampCookingPot />
      </div>
    </div>
  );
};

export default SideBarMenu;
