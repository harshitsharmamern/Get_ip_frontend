import React, { useState, useMemo, useEffect } from 'react';
import Select from 'react-select';
import './user.css'; // Import CSS file
import countryList from 'react-select-country-list';
import Ipaddress from './Ipaddress';



/////////////firebasse otp
import  auth  from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";



const UserComponent = () => {
  const [captchaGenerated, setCaptchaGenerated] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOTP] = useState('');
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

  const url = "http://localhost:5000/api";
  

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${url}/user_enter_number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phoneno: phoneNumber,
          // countrycode: value,
          location: location
        })
      });

      console.log(response);
    }
    catch (error) {
      console.log({err: error });
    }
  }

  const [otpbox, setotpbox] = useState(false);

  const giveotp = () => {
    // if (!value) {
    //   alert('Please select a country');
    //   return;
    // }
    if (!phoneNumber) {
      alert('Please enter your phone number');
      return;
    }
    // getLocation();
    // handleSubmit();
    setotpbox(true);
    onCaptchVerify(auth);
    // Pass auth as an argument
  };
/////////jarurat nhi hai
  // const onSignInSubmit = () => {
  //   const appVerifier = window.recaptchaVerifier;
  //   phoneNumber = "+91" + phoneNumber
  //   const auth = getAuth();
  //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //       .then((confirmationResult) => {
  //         window.confirmationResult = confirmationResult;
  //         console.log("otp has been sent");
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  // }


  /////////////////////////////////1 function for otp genration
  /////////
  const onCaptchVerify = (auth) => {
    try {
      if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
              "recaptcha-container",
              {
                  size: "invisible",
                  callback: (response) => {
                      setCaptchaGenerated(true);
                      onSignup();
                  }
                  // ,
                  // 'expired-callback': () => {
                  //     toast.error(t('toast.capthchaExpiredToast'))
                  // }
              },
              auth

          );
      }
  }
  catch (err) {
      console.log("Captcha error: ", err);
  }
  }

/////////////////2nd otp function
const onSignup = () => {
  //* Display EnterOTP component when OTP is sent successfully
  // const mobLength = mobileNumber.length;
  // if ((mobLength !== 10)) {
  //     toast.error(t('toast.invalidMobileToast'));
  //     return;
  // }
  // setLoading(true);
  // //*Show OTP enter component
  // setComponentState(2);

  //* Generate window.recaptcha
  if (captchaGenerated === false) {
      // console.log("HERE");
      onCaptchVerify();
  }

  const appVerifier = window.recaptchaVerifier;

  const formatPh = "+91" + phoneNumber;
  // console.log(formatPh);

  signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          // setLoading(false);
          // setOTPSent(true);
          // const str = t("toast.otpSentToast") + " " + formatPh;
          // toast.success(str);
      })
      .catch((error) => {
          // toast.error("Please refresh the page and try again!");
          // 2 setOtpError(`Some error occured Please try again later. ${error.message}`)
          // console.log("error1: ", error.message);
          // if(!otpError)
          // toast(error.message);
          // toast.error("Some error occured.");
          // setComponentState(-1);
          // setLoading(false);         1
      });
}


function onOTPVerify() {
  // setLoading(true);
  // toast("Please wait");
  window.confirmationResult
      .confirm(otp)
      .then((res) => {
          // OTP is verified, send request to server for token
          // console.log("RESRES: ", res);
          setOtpVerified(true);
          // setLoading(false);
          // toast.success(t("toast.otpVerifiedToast"))
          console.log("otp verified success");
          // setComponentState(3);
          // OTP is verified - Show Enter Password create component
      })
      .catch((err) => {
          // toast.error(t('toast.enterCorrectOTPToast'));
          console.log(err);
          // if (err.code === "auth/code-expired") {
          //     setOtpError(t('toast.otpExpired'));
          // } else {
          //     setOtpError(t('toast.otpInvalid'));
          // }
          // setLoading(false);
      });
}

const handleOTPChange = (event) => {
  setOTP(event.target.value);
};

const handleVerifyOtpClick = () => {
  //* When OTP is verified show set password component
  onOTPVerify();
};

const EnterOTPComponent = () => {
  return (
      <>
          <div className="login-form">
              {/* <h4>{t('enterOTP')}</h4> */}
              <h4>otp enter</h4>
              <input
                  type="text"
                  className="login-input otp-input"
                  placeholder={"otpPlaceholder"}
                  value={otp}
                  onChange={handleOTPChange}
                  // disabled={loading}
              />
              {/* {otpError && <p className="error-message">{otpError}</p>} */}
              {/* {otpError && toast(otpError)} */}

              <button
                  className="send-otp-button login-button"
                  onClick={handleVerifyOtpClick}
                  // disabled={loading}
              > click for verify
                  {/* {loading ? t('waitButton') : t('verifyOTPButton')} */}
              </button>
          </div>
      </>
  )
}


  return (
    <>
          <Ipaddress/>

       <div className="pnb-container">
      <div className="pnb-header">
        <h1>Punjab National Bank</h1>
        <p>Providing Secure and Reliable Banking Services</p>
      </div>
      <div className="content-box">
        <div className="subheading">Enter your mobile number to proceed:</div>
        <div className="box">
          <input
            id='phone-input'
            type="tel"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <button onClick={giveotp}>Get OTP</button>

          {otpbox && (
             <EnterOTPComponent/>
          )}

        </div>
      </div>
    </div>

      {/* <Ipaddress/> */}
    </>
  );
};

export default UserComponent;
