import { useState } from "react";
import "../css/form.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addBirthday } from "../redux/birthdaySlice";
import { useNavigate } from "react-router-dom";

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

    try {
      // await axios.post(
      //   "http://localhost:6001/add_birthday",
      //   { formDetails },
      // );
      dispatch(addBirthday({ ...formDetails, bdayDate: unixDate }));
      redirect("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  const stringToUnix = (date) => {
    let _date = date.split("-");
    _date = new Date(_date[0], _date[1] - 1, _date[2]);
    return _date.getTime();
  };

  const showProducts = (e) => {
    if (e.target.innerText === "Men") {
      setMenVisible(true);
      setWomenVisible(false);
    } else if (e.target.innerText === "Women") {
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
            <h2>Men</h2>
            <div
              onClick={handleClick}
              className={menVisible ? "hidden visible" : "hidden"}
            >
              <p className="product" id="perfumeMen">
                Perfume
              </p>
              <p className="product" id="sports">
                Sports
              </p>
              <p className="product" id="funnyMen">
                Funny
              </p>
              <p className="product" id="toyCollectables">
                Toy collectables
              </p>
              <p className="product" id="wallets">
                Wallets
              </p>
              <p className="product" id="clothes">
                Clothes
              </p>
              <p className="product" id="tech">
                Tech
              </p>
              <p className="product" id="plantsMen">
                Plants
              </p>
            </div>
          </div>
          <div onClick={showProducts}>
            <h2>Women</h2>
            <div
              onClick={handleClick}
              className={womenVisible ? "hidden visible" : "hidden"}
            >
              <p className="product" id="perfumeWomen">
                Perfume
              </p>
              <p className="product" id="flowers">
                Flowers
              </p>
              <p className="product" id="makeUp">
                Makeup
              </p>
              <p className="product" id="funnyWomen">
                Funny
              </p>
              <p className="product" id="handbags">
                Handbags
              </p>
              <p className="product" id="shoes">
                Shoes
              </p>
              <p className="product" id="jewellery">
                Jewellery
              </p>
              <p className="product" id="plantsWomen">
                Plants
              </p>
            </div>
          </div>
          <button onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};
