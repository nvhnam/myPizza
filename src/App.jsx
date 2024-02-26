/* eslint-disable react/prop-types */
import { useState } from "react";
import pizza1 from "./img/pizza1.jpg";

const sizes = [
  {
    sizeId: 1,
    sizeName: "Personal",
    // crustName: "Pan",
  },
  {
    sizeId: 2,
    sizeName: "Regular",
    // crustName: "Hand Tossed",
  },
  {
    sizeId: 3,
    sizeName: "Large",
    // crustName: "Meat Crust",
  },
];

const crusts = [
  {
    crustId: 1,
    crustName: "Pan",
  },
  {
    crustId: 2,
    crustName: "Hand Tossed",
  },
  {
    crustId: 3,
    crustName: "Meat Crust",
  },
];

const pizzas = [
  {
    id: crypto.randomUUID(),
    name: "Cheesy Chicken Pizaa",
    image: pizza1,
    info: "Enjoy the great combination of Karaage chicken with pizza at once",
    available: true,
    price: 10,
    size: sizes,
    crust: crusts,
  },
  {
    id: crypto.randomUUID(),
    name: "Shrimp Crown Meat Crust",
    image: pizza1,
    info: "Shrimp, Chicken, Bacon, Cheese, Mushroom, Red Capsicum, Onion",
    available: true,
    price: 15,
    size: sizes,
    crust: crusts,
  },
  {
    id: crypto.randomUUID(),
    name: "Fisherman's Tuna",
    image: pizza1,
    info: "Fisherman'S Tuna Pizza Bring You The Dedicate Taste Of The Ocean With Tuna, Crab Sticks, Onions, Pineapples On Top Of Pesto Sauce",
    available: false,
    price: 20,
    size: sizes,
    crust: crusts,
  },
  {
    id: crypto.randomUUID(),
    name: "Shrimp Crown Meat Crust",
    image: pizza1,
    info: "Shrimp, Chicken, Bacon, Cheese, Mushroom, Red Capsicum, Onion",
    available: true,
    price: 15,
    size: sizes,
    crust: crusts,
  },
  {
    id: crypto.randomUUID(),
    name: "Ocean Delight",
    image: pizza1,
    info: "Squids, Crab Sticks, Pineapples, Capsicums On Top Of Cheesy Mayo Sauce And Mozzarella Cheese",
    available: false,
    price: 20,
    size: sizes,
    crust: crusts,
  },
];

function App() {
  const [selectedItem, setSelectedItem] = useState([]);
  const [quantity, setQuantity] = useState(1);

  function handleQuantityUpdate(itemId, quantity) {
    setSelectedItem((prevSelectedItems) =>
      prevSelectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );
  }

  function handleSelected(pizza, size, crust) {
    const exists = selectedItem.some((item) => item.id === pizza.id);

    if (!exists) {
      setSelectedItem((selectedItem) => [
        ...selectedItem,
        {
          ...pizza,
          id: pizza.id,
          size: size,
          crust: crust,
          quantity: quantity,
        },
      ]);
    } else {
      setSelectedItem((selectedItem) =>
        selectedItem.map((item) =>
          item.name === pizza.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  }

  // console.log(quantity);

  function deleteSelected(id) {
    setSelectedItem((selectedItem) =>
      selectedItem.filter((pizza) => pizza.id !== id)
    );
  }

  return (
    <div className="container">
      <MainMenu handleSelected={handleSelected} />
      <SideBar
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        deleteSelected={deleteSelected}
        setQuantity={setQuantity}
        quantity={quantity}
        handleQuantityUpdate={handleQuantityUpdate}
      />
    </div>
  );
}

export default App;

function MainMenu({ handleSelected }) {
  return (
    <div className="mainMenu">
      {pizzas.map((pizza) => (
        <Pizza pizza={pizza} key={pizza.id} handleSelected={handleSelected} />
      ))}
    </div>
  );
}

function Pizza({ pizza, handleSelected }) {
  const [size, setSize] = useState(pizza.size[0].sizeName);
  const [crust, setCrust] = useState(pizza.crust[0].crustName);
  const [show, setShow] = useState(false);

  const displayInfo = show
    ? pizza.info
    : pizza.info.split(" ").slice(0, 5).join(" ") + "...";

  return (
    <div className="pizzaContainer">
      <img src={pizza.image} alt={pizza.name} />
      <div className="pizzaInfo">
        <h1>{pizza.name}</h1>
        <p>
          <span>{displayInfo}</span>
          <span
            className="InfoButton"
            role="button"
            onClick={() => setShow(!show)}
          >
            {show ? "collapse" : "read more"}
          </span>
        </p>
      </div>
      <div className="optionWapper">
        <label htmlFor={pizza.id}>Select your size</label>
        <select
          id={pizza.id}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          {pizza.size.map((size) => (
            <option key={size.sizeId} value={size.sizeName}>
              {size.sizeName}
            </option>
          ))}
        </select>
        <label htmlFor={pizza.id}>Select your crust</label>
        <select
          id={pizza.id}
          value={crust}
          onChange={(e) => setCrust(e.target.value)}
        >
          {pizza.crust.map((crust) => (
            <option key={crust.crustId} value={crust.crustName}>
              {crust.crustName}
            </option>
          ))}
        </select>
      </div>
      <div className="pizzaButton">
        <Button onClick={() => handleSelected(pizza, size, crust)}>
          ADD <span>{pizza.price + `$`}</span>
        </Button>
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="theButton">
      {children}
    </button>
  );
}

function SideBar({
  selectedItem,
  deleteSelected,
  setSelectedItem,
  setQuantity,
  quantity,
  handleQuantityUpdate,
}) {
  return (
    <div className="sideBar">
      <Cart
        selectedItem={selectedItem}
        deleteSelected={deleteSelected}
        setQuantity={setQuantity}
        quantity={quantity}
        setSelectedItem={setSelectedItem}
        handleQuantityUpdate={handleQuantityUpdate}
      />
      <Checkout
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        quantity={quantity}
      />
    </div>
  );
}

function Cart({
  selectedItem,
  deleteSelected,
  setQuantity,
  quantity,
  setSelectedItem,
  handleQuantityUpdate,
}) {
  const isEmpty = selectedItem.length === 0;

  return (
    <div className="cart">
      <h1>----Your Basket----</h1>
      {isEmpty && <Empty />}
      {selectedItem.map((item) => (
        <Items
          item={item}
          key={item.id}
          deleteSelected={deleteSelected}
          setQuantity={setQuantity}
          quantity={quantity}
          setSelectedItem={setSelectedItem}
          handleQuantityUpdate={handleQuantityUpdate}
        />
      ))}
    </div>
  );
}

function Empty() {
  return (
    <div className="empty">
      <h4>Your cart is empty</h4>
    </div>
  );
}

function Items({ item, deleteSelected, handleQuantityUpdate }) {
  const [quantity, setLocalQuantity] = useState(item.quantity || 1);

  function handleNext() {
    if (quantity < 15) {
      setLocalQuantity(quantity + 1);
      handleQuantityUpdate(item.id, quantity + 1);
    }
  }

  function handlePrevious() {
    if (quantity > 1) {
      setLocalQuantity(quantity - 1);
      handleQuantityUpdate(item.id, quantity - 1);
    }
  }

  return (
    <div className="items">
      <div className="itemsContainer">
        <div className="item">
          <div className="itemName">
            <h5>{item.name}</h5>
            <p>{item.size}</p>
            <p>{item.crust}</p>
          </div>
          <div className="itemPrice">
            <span>
              <button
                style={{ fontSize: "13px", color: "red", fontWeight: "bold" }}
                onClick={() => deleteSelected(item.id)}
              >
                X
              </button>
            </span>
            <h3>{item.price * item.quantity} $</h3>
            <button onClick={() => handlePrevious()}>-</button>
            <input type="text" value={item.quantity} readOnly />
            <button onClick={handleNext}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checkout({ selectedItem, setSelectedItem }) {
  const [discount, setDiscount] = useState("");
  const [shipping, setshipping] = useState(0);

  let subTotal = 0;

  selectedItem.forEach((item) => {
    subTotal += item.price * item.quantity;
  });

  const percent = subTotal * 0.1;

  let total = subTotal + percent + shipping;

  function handleForm(e) {
    e.preventDefault();

    if (subTotal === 0) {
      window.alert("Add something to Cart!");
      return;
    }
  }

  function handleButton() {
    if (selectedItem.length === 0) {
      window.alert("Add something to Cart!");
      return;
    }
    setSelectedItem([]);
    // setSubTotal(0);
    setshipping(0);
  }

  return (
    <div className="checkout">
      <div className="calculate">
        <div className="calculateTitle">
          <p>Sub total</p>
          <p>Promotion</p>
          <p>Shipping</p>
          <p>Surcharge (10%)</p>
        </div>
        <div className="calculatePrice">
          <p>{subTotal} $</p>
          <form onSubmit={handleForm}>
            <input
              type="text"
              placeholder="%"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </form>
          <form onSubmit={handleForm}>
            <input
              type="text"
              placeholder="shipping fee"
              value={shipping}
              onChange={(e) => setshipping(Number(e.target.value))}
            />
          </form>

          <p>{percent} $</p>
        </div>
      </div>
      <div className="pizzaButton">
        <Button onClick={() => handleButton()}>
          CHECKOUT <span>{total - total * (discount / 100)} $</span>
        </Button>
      </div>
    </div>
  );
}
