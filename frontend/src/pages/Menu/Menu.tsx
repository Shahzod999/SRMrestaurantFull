import { useEffect } from "react";
import "./menu.scss";
import { fetchAllFoods, selectedAllFoods, selectedAllFoodsError, selectedAllFoodsLoading } from "../../features/getAllFoodsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import MenuOrder from "../../components/Menu/MenuOrder";
import Error from "../../components/Error/Error";
import SideBarMenu from "../../components/SideBar/SideBarMenu";
import Loading from "../../components/Loading/Loading";

const Menu = () => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectedAllFoods);
  const error = useAppSelector(selectedAllFoodsError);
  const loading = useAppSelector(selectedAllFoodsLoading);
  console.log(foods, "mi tut");
  console.log(error, "mi tut");
  console.log(loading, "mi tut");

  //тут мы

  useEffect(() => {
    dispatch(fetchAllFoods());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div>
        <SideBarMenu />
        <Error />
      </div>
    );
  }

  return (
    <>
      <SideBarMenu />
      <MenuOrder foods={foods} />
    </>
  );
};

export default Menu;
