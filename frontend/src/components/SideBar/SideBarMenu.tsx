import { useEffect, useState } from "react";
import "./sideBarMenu.scss";
import { GiCampCookingPot } from "react-icons/gi";

import { useAppDispatch } from "../../hooks/hooks";
import { fetchAllFoods, selectTypeFood } from "../../features/getAllFoodsSlice";
import axiosInstance from "../../utils/axiosInstance";

const SideBarMenu = () => {
  const dispatch = useAppDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [counts, setCounts] = useState({
    all: 0,
    starters: 0,
    dessert: 0,
    fastFood: 0,
    drinks: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/get-all-foods`);
        const allFoods = response.data.foods;

        const counts = {
          all: allFoods.length,
          starters: allFoods.filter((item: any) => item.type == "Starters").length,
          dessert: allFoods.filter((item: any) => item.type == "Dessert").length,
          fastFood: allFoods.filter((item: any) => item.type == "FastFood").length,
          drinks: allFoods.filter((item: any) => item.type == "Drinks").length,
        };
        setCounts(counts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounts();
  }, []);

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
            <span>{counts.all} item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Starters")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>Starters</p>
            <span>{counts.starters} item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Dessert")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>Dessert</p>
            <span>{counts.dessert} item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("FastFood")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>FastFood</p>
            <span>{counts.fastFood} item</span>
          </div>
        </div>
        <div onClick={() => handleTypeToSearchFoods("Drinks")} className="linksTomenu__box">
          <div className="linksTomenu__box__img">
            <img src="noPic.jpg" alt="" />
          </div>
          <div className="linksTomenu__box__text">
            <p>Drinks</p>
            <span>{counts.drinks} item</span>
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
