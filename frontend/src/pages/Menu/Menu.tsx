import "./menu.scss";
const Menu = () => {
  const arr = [
    {
      name: "shorva",
      price: "10.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 3,
    },
    {
      name: "lavash",
      price: "12.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 1,
    },
    {
      name: "somsa",
      price: "5.000",
      oficiant: "Sher",
      amount: 0,
      stolik: 2,
    },
  ];

  return (
    <div className="menu container">
      <div>
        {arr.map((e) => (
          <>
            <p>{e.name}</p>
            <p>{e.price}</p>
            <p>{e.amount}</p>
            <p>{e.stolik}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default Menu;
