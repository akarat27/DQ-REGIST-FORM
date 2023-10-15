import "./RegistrationForm.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitch from './LanguageSwitch';
import ModalAlert from './ModalAlert'; 

function RegistrationFormEn() {
  const [showAlert, setShowAlert] = useState(false);
  const [showExistAlert, setShowExistAlert] = useState(false);
  const navigate = useNavigate(); // Create a history object for navigation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cardID: "",
    tel: "",
    email: "",
    year: "",
    month: "",
    day: "",
    sex: "male",
    agreement1: false,
    agreement2: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const goBack = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!isFormValid()) {
      setShowAlert(true); // Show the alert
      // alert('Please fill in all required fields before submitting.');
      return;
    }

     try{
      const response = await fetch("https://dq-data-api-tpdx.vercel.app/is-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      //Get response json from server 
      const data = await response.json();
      console.log(data);
      
      if (data.message === "Data exists") {
        setShowExistAlert(true); // Show the alert
        return;
      }
  
      }catch (error) {   
        console.error("An error occurred:", error);
      }

    // Handle form submission, e.g., send data to a server or perform validation
    try {
      const response = await fetch(
        "https://dq-data-api-tpdx.vercel.app/save-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Data successfully sent to the server
        console.log("Data sent successfully.");
      } else {
        // Handle error if the request was not successful
        console.error("Failed to send data to the server.");
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("An error occurred:", error);
    } finally {
      // navigate("/thank-you"); // Navigate to the thank you page
      window.location.href = 'https://www.google.com';
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.cardID &&
      // formData.tel &&
      formData.email &&
      formData.year &&
      formData.month &&
      formData.day &&
      formData.sex &&
      formData.agreement1 &&
      formData.agreement2
    );
  };

  return (
      <div className="registration-form">
        {/* file is in src */}
        <div className="logodiv"> 
          <img src="dq_logo.png" alt="Logo" className="logo" />
        </div>
        
        <LanguageSwitch /> {/* Include the LanguageSwitch component here */}
        {showAlert && (
        <ModalAlert
          open={showAlert}
          onClose={() => setShowAlert(false)}
          message="Please fill in all required fields before submitting."
        />
        )}

        {showExistAlert && (
        <ModalAlert
          open={showExistAlert}
          onClose={() => setShowExistAlert(false)}
          message="Your profile already exists. Please check your email or tel number and card ID."
        />
        )}

        <div className="info">
          <p>
            {/* ลงทะเบียนเพียงครั้งเดียว สามารถใช้งาน Wi-Fi ที่ร้านอาหารในเครือไมเนอร์ฟู้ด ได้โดยไม่ต้องลงทะเบียนใหม่ */}
            Only one-time registration for Free Wi-Fi usage at all Minor Food Group restaurants.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            {/* <label>First Name:</label> */}
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
          </div>

          <div className="form-group">
            {/* <label>Last Name:</label> */}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
            />
          </div>

          <div className="form-group">
            {/* <label>Card ID:</label> */}
            <input
              type="text"
              name="cardID"
              value={formData.cardID}
              onChange={handleInputChange}
              placeholder="Thai Citizen ID or Passport Number"
              required
            />
          </div>

          <div className="form-group">
            {/* <label>TEL:</label> */}
            <input
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
              placeholder="(Optional) Phone Number"
            />
          </div>

          <div className="form-group">
            {/* <label>Email:</label> */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="birthdate">
            <label>Date of birth:</label>
            <div className="birthdate-inputs">
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Year"
                size={4}
                maxLength={4}
              />
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                placeholder="Month"
                size={2}
                maxLength={2}
              />
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                placeholder="Date"
                size={2}
                maxLength={2}
              />
            </div>
          </div>

          <div className="sex">
            <label>Gender:</label>
            <input
              type="radio"
              name="sex"
              value="female"
              checked={formData.sex === "female"}
              onChange={handleInputChange}
            />
            <label>Female</label>
            <input
              type="radio"
              name="sex"
              value="male"
              checked={formData.sex === "male"}
              onChange={handleInputChange}
            />
            <label>Male</label>
          </div>

          <div className="agreement">
            <input
              type="checkbox"
              name="agreement1"
              checked={formData.agreement1}
              onChange={handleInputChange}
              required
            />
            <label>
            I have read and accept terms and conditions and privacy policy of Dairy Queen (Thailand)
            </label>
          </div>
          <div className="agreement">  
            <input
              type="checkbox"
              name="agreement2"
              checked={formData.agreement2}
              onChange={handleInputChange}
              required
            />
            <label>
            I agree to receive the information including other marketing activities from Dairy Queen (Thailand) and affiliated companies. We will keep your data confidential. Learn more about privacy policy from company website.
            </label>
          </div>
          
          <p>
            {/* By submitting this form, you agree to our{' '} */}
            <a href={'https://www.dairyqueenthailand.com/privacypolicy'} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </p>

          <div className="buttons">
            <button type="submit">Register</button>
            <button type="button" onClick={goBack}>Back</button>
          </div>
        </form>
      </div>
    
  );
}

export default RegistrationFormEn;
