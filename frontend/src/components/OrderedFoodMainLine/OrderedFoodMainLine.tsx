import { selectedWaitingCards, totalRemoveWorkingDay } from "../../features/orderedFoodSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./orderedFoodMainLine.scss";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";

interface OrderedFood {
  _id: string;
  name: string;
  price: string;
  desc: string;
  type: string;
  userId: string;
  createdOn: string;
  __v: number;
  amount: number;
  portion: number;
}

interface TablePlace {
  place: string;
  table: number;
}

interface WaitingCard {
  orderNumber: number;
  foods: OrderedFood[];
  table: TablePlace;
  orderTime: string;
}

const OrderedFoodMainLine = () => {
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const waitingCards: WaitingCard[] = useAppSelector(selectedWaitingCards);
  let allCounts = waitingCards.length;

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === waitingCards.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? waitingCards.length - 1 : prevIndex - 1));
  };

  const handleDangerFinishWorkButton = () => {
    setModalActive(!modalActive);
  };

  const totalFinishWork = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(totalRemoveWorkingDay());
  };
  return (
    <>
      {modalActive && (
        <div className="finishWorkModal" onClick={handleDangerFinishWorkButton}>
          <div className="finishWorkModal__box">
            <IoIosAlert className="dangerAlert" />
            <p>это удалит все данные рабочего дня</p>
            <button className="dangerButton" onClick={totalFinishWork}>
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="orderedFoodMainTotal">
        <span>
          All <strong>{allCounts}</strong>
        </span>
        <span>
          Wait list <strong>{allCounts}</strong>
        </span>
        <span>
          Finish <strong>{allCounts}</strong>
        </span>
        <span className="dangerButton" onClick={handleDangerFinishWorkButton}>
          Clear
        </span>
      </div>
      <div className="wiper">
        <button className="wiper-button wiper-button__right" onClick={handlePrevClick}>
          <MdKeyboardArrowLeft size={50} />
        </button>

        <div className="wiper-wrapper">
          <ul
            className="wiper-track"
            style={{
              transform: `translateX(-${(200 + 24) * activeIndex}px)`,
            }}>
            {waitingCards.map((order, index) => {
              const dateTimeString = order.orderTime;
              const date = new Date(dateTimeString);
              const hours = date.getUTCHours().toString().padStart(2, "0");
              const minutes = date.getUTCMinutes().toString().padStart(2, "0");

              const time = `${hours}:${minutes}`;

              return (
                <li key={index} className={`wiper-item ${index === activeIndex ? "active-swipe" : ""}`}>
                  <div className="orderedFoodMainLine__box">
                    <div>
                      <span>Order: {order.orderNumber}</span>
                      <span>
                        {order.table.place || "N/A"} - {order.table.table || "N/A"}
                      </span>
                    </div>

                    <strong>Item: {order.foods.reduce((acc, food) => acc + food.amount, 0)}x</strong>

                    <div>
                      <span>{time}</span>
                      <span className="position">In kitchen</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button className="wiper-button wiper-button__left" onClick={handleNextClick}>
          <MdKeyboardArrowRight size={50} />
        </button>
      </div>
    </>
  );
};

export default OrderedFoodMainLine;
