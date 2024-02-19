import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import './user.css'; // Import CSS file
import countryList from 'react-select-country-list';
import Ipaddress from './Ipaddress';

const UserComponent = () => {
  const [value, setValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const [location, setlocation] = useState({
    latitude: "", longitude: ""
  })

  const changeHandler = (selectedOption) => {
    setValue(selectedOption);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setlocation({
          latitude: latitude.toString(),
          longitude: longitude.toString()
        });
      });
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = "http://localhost:5000/api"
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${url}/user_enter_number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phoneno: phoneNumber,
          countrycode: value,
          location: location
        })
      });


      // console.log({location : location});
      console.log(response);
      // const result = await response.json();
      // if (result.status) {
      //   console.log("result");
      //   // return res.json("completed")
      // } else {
      //   console.log("error else");
      //   // return res.json("error")
      // }
    }
    catch (error) {
      console.log({err: error });
    }
  }

  const giveotp = () => {
    if (!value) {
      alert('Please select a country');
      return;
    }
    if (!phoneNumber) {
      alert('Please enter your phone number');
      return;
    }
    getLocation();
    handleSubmit()
  };

  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>Welcome sir/madam</h1>
        </div>
        <div className="subheading">
          <h3>Get your free recharge</h3>
        </div>

        <div className="content-box">
          <div className="subheading">Enter your number</div>
          <div className="box">
            <Select options={options} value={value} onChange={changeHandler} />
            <input type="number" value={phoneNumber} onChange={handlePhoneNumberChange} />
            <button onClick={giveotp}>Get OTP</button>
          </div>
        </div>
      </div>

<Ipaddress/>

    </>
  );
};

export default UserComponent;
