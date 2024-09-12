import { useState } from "react";
import "../css/form.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addBirthday } from "../redux/birthdaySlice";
import { useNavigate } from "react-router-dom";
import { stringToUnix } from "../utils/utils";

export const Form = () => {
  const [formDetails, setFormDetails] = useState({
    userName: "",
    userEmail: "",
    emailFrequency: "hourly",
    partnersName: "",
    bdayDate: "",
    products: [],
  });

  const [menVisible, setMenVisible] = useState(false);
  const [womenVisible, setWomenVisible] = useState(false);

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    if (e.target.className === "product") {
      if (formDetails["products"].includes(e.target.id)) {
        const indexOf = formDetails.products.findIndex(
          (product) => product === e.target.id
        );
        const _products = [...formDetails.products];
        _products.splice(indexOf, 1);
        setFormDetails({ ...formDetails, products: _products });
        return;
      } else {
        const _products = formDetails.products;
        _products.push(e.target.id);
        setFormDetails({ ...formDetails, products: _products });
      }
    }
  };

  const handleSubmit = async () => {
    const unixDate = stringToUnix(formDetails.bdayDate);
    console.log(formDetails);
    try {
      await axios.post("http://localhost:6001/add_birthday", { formDetails });
      dispatch(addBirthday({ ...formDetails, bdayDate: unixDate }));
      console.log(formDetails);
      redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const addSelected = (e) => {
    e.target.classList.toggle("selected");
    formDetails.products.push(e.currentTarget.innerText);
  };

  const showProducts = (e) => {
    if (e.target.innerText === "Men ▾") {
      setMenVisible(true);
      setWomenVisible(false);
    } else if (e.target.innerText === "Women ▾") {
      setWomenVisible(true);
      setMenVisible(false);
    }
  };

  return (
    <div className="form">
      <div className="section one">
        <label htmlFor="userName">What's your name?</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formDetails.userName}
          onChange={handleChange}
        />
        <label htmlFor="userEmail">What's your email?</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          value={formDetails.userEmail}
          onChange={handleChange}
        />
        <label htmlFor="emailFrequency">
          How often would you like to be reminded?
        </label>
        <select
          id="emailFrequency"
          name="emailFrequency"
          defaultValue={formDetails.emailFrequency}
          onChange={handleChange}
        >
          <option value="hourly">Hourly - Harass me</option>
          <option value="daily">Daily - Harass me a bit</option>
          <option value="weekly">
            Weekly - Leave me alone. I've got this.
          </option>
        </select>
      </div>
      <div className="section two">
        <label htmlFor="partnersName">What's your partners name?</label>
        <input
          type="text"
          id="partnersName"
          name="partnersName"
          value={formDetails.partnersName}
          onChange={handleChange}
        />
      </div>
      <div className="section three">
        <label htmlFor="bdayDate">When is the big day?</label>
        <input
          type="date"
          id="bdayDate"
          name="bdayDate"
          value={formDetails.bdayDate}
          onChange={handleChange}
        />
      </div>
      <div className="section four">
        <p>What products would your partner like?</p>
        <div className="productListContainer">
          <div onClick={showProducts}>
            <h2>Men &#9662;</h2>
            <div
              onClick={handleClick}
              className={menVisible ? "hidden visible" : "hidden"}
            >
              <img
                src="../../perfume-spray.png"
                alt="perfume bottle"
                className="icon"
              />
              <p className="product" id="perfumeMen" onClick={addSelected}>
                Perfume
              </p>
              <img src="../../sports.png" alt="sports" className="icon" />
              <p className="product" id="sports" onClick={addSelected}>
                Sports
              </p>
              <img src="../../laughing.png" alt="funny" className="icon" />
              <p className="product" id="funny" onClick={addSelected}>
                Funny
              </p>
              <img src="../../lego.png" alt="lego" className="icon" />
              <p className="product" id="collectables" onClick={addSelected}>
                Toy collectables
              </p>
              <img src="../../wallet.png" alt="wallet" className="icon" />
              <p className="product" id="wallets" onClick={addSelected}>
                Wallets
              </p>
              <img src="../../fashion.png" alt="fashion" className="icon" />
              <p className="product" id="clothes" onClick={addSelected}>
                Clothes
              </p>

              <img
                src="../../data-management.png"
                alt="tech"
                className="icon"
              />
              <p className="product" id="tech" onClick={addSelected}>
                Tech
              </p>
            </div>
          </div>
          <div onClick={showProducts}>
            <h2>Women &#9662;</h2>
            <div
              onClick={handleClick}
              className={womenVisible ? "hidden visible" : "hidden"}
            >
              <img
                src="../../perfume-spray.png"
                alt="perfume bottle"
                className="icon"
              />
              <p className="product" id="perfumeWomen" onClick={addSelected}>
                Perfume
              </p>

              <img src="../../flower.png" alt="flowers" className="icon" />
              <p className="product" id="flowers" onClick={addSelected}>
                Flowers
              </p>

              <img src="../../cosmetics.png" alt="flowers" className="icon" />
              <p className="product" id="makeUp" onClick={addSelected}>
                Makeup
              </p>

              <img src="../../laughing.png" alt="laughing" className="icon" />
              <p className="product" id="funnyWomen" onClick={addSelected}>
                Funny
              </p>

              <img src="../../handbag.png" alt="handbag" className="icon" />
              <p className="product" id="handbags" onClick={addSelected}>
                Handbags
              </p>

              <img src="../../high-heels.png" alt="flowers" className="icon" />
              <p className="product" id="shoes" onClick={addSelected}>
                Shoes
              </p>

              <img src="../../jewelry.png" alt="jewellery" className="icon" />
              <p className="product" id="jewellery" onClick={addSelected}>
                Jewellery
              </p>
            </div>
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
