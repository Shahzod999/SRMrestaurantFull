import "./orderedFoodMainLine.scss";
import { useState } from "react";

const OrderedFoodMainLine = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const orderedFoodMainLines = [
    {
      order: {
        number: "#A0001",
        table: "Table 01",
      },
      item: {
        quantity: 8,
      },
      status: {
        timeAgo: "2 mins ago",
        position: "In kitchen",
      },
    },
    {
      order: {
        number: "#A0002",
        table: "Table 05",
      },
      item: {
        quantity: 3,
      },
      status: {
        timeAgo: "5 mins ago",
        position: "Preparing",
      },
    },
    {
      order: {
        number: "#A0003",
        table: "Table 02",
      },
      item: {
        quantity: 6,
      },
      status: {
        timeAgo: "10 mins ago",
        position: "Served",
      },
    },
    {
      order: {
        number: "#A0004",
        table: "Table 07",
      },
      item: {
        quantity: 1,
      },
      status: {
        timeAgo: "Just now",
        position: "In kitchen",
      },
    },
  ];

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === orderedFoodMainLines.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? orderedFoodMainLines.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <div className="orderedFoodMainTotal">
        <span>
          All <strong>99+</strong>
        </span>
        <span>
          Wait list <strong>99+</strong>
        </span>
        <span>
          Finish <strong>99+</strong>
        </span>
      </div>
      <div className="wiper">
        <button className="wiper-button wiper-button__right" onClick={handlePrevClick}>
          <img src="https://www.iconpacks.net/icons/2/free-arrow-left-icon-3099-thumb.png" alt="left" />
        </button>

        <div className="wiper-wrapper">
          <ul
            className="wiper-track"
            style={{
              transform: `translateX(-${(200 + 24) * activeIndex}px)`,
            }}>
            {orderedFoodMainLines.map((order, index) => (
              <li key={index} className={`wiper-item ${index === activeIndex ? "active-swipe" : ""}`}>
                <div className="orderedFoodMainLine__box">
                  <div>
                    <span>Order: {order.order.number}</span>
                    <span>{order.order.table}</span>
                  </div>

                  <strong>Item: {order.item.quantity}x</strong>

                  <div>
                    <span>{order.status.timeAgo}</span>
                    <span className="position">{order.status.position}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="wiper-button wiper-button__left" onClick={handleNextClick}>
          <img src="https://www.iconpacks.net/icons/2/free-arrow-left-icon-3099-thumb.png" alt="right" />
        </button>
      </div>
    </>
  );
};

export default OrderedFoodMainLine;
