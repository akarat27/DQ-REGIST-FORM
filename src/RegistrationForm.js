import "./RegistrationForm.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitch from './LanguageSwitch';
import ModalAlert from './ModalAlert'; 

function RegistrationForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!isFormValid()) {
      setShowAlert(true); // Show the alert
      return;
    }

   // ส่งข้อมูลไปยัง server ที่เราสร้างขึ้น โดยใช้ fetch API ของ JavaScript ในการส่งข้อมูล โดยใช้ method POST และ header ที่ระบุว่าเป็น JSON และ body ที่เป็นข้อมูลที่เราต้องการส่งไป ซึ่งเป็นข้อมูลที่เราเก็บไว้ในตัวแปร formData ที่เราสร้างขึ้น โดยใช้ JSON.stringify() ในการแปลงข้อมูลให้เป็น JSON ก่อนส่งไป 
   // check is exists or not 
   // if not exists, create new one 
   // if exists, alert 
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
      navigate("/thank-you"); // Navigate to the thank you page
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.cardID &&
      formData.tel &&
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
            ลงทะเบียนเพียงครั้งเดียว สามารถใช้งาน Wi-Fi
            ที่ร้านอาหารในเครือไมเนอร์ฟู้ด ได้โดยไม่ต้องลงทะเบียนใหม่
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
              placeholder="ชื่อ"
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
              placeholder="นามสกุล"
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
              placeholder="หมายเลขบัตรประชาชาชนหรือหมายเลขพาสปอร์ต"
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
              placeholder="หมายเลขโทรศัพท์"
              required
            />
          </div>

          <div className="form-group">
            {/* <label>Email:</label> */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="อีเมล"
              required
            />
          </div>

          <div className="birthdate">
            <label>วันเกิด:</label>
            <div className="birthdate-inputs">
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="ปี"
              />
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                placeholder="เดือน"
              />
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                placeholder="วัน"
              />
            </div>
          </div>

          <div className="sex">
            <label>เพศ:</label>
            <input
              type="radio"
              name="sex"
              value="female"
              checked={formData.sex === "female"}
              onChange={handleInputChange}
            />
            <label>หญิง</label>
            <input
              type="radio"
              name="sex"
              value="male"
              checked={formData.sex === "male"}
              onChange={handleInputChange}
            />
            <label>ชาย</label>
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
              ฉันได้อ่านและยอมรับ ข้อกำหนดการใช้งาน และ นโยบายความเป็นส่วนตัวของ
              แดรี่ ควีน (ประเทศไทย)
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
              ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ จาก แดรี่
              ควีน (ประเทศไทย) และ บริษัทในเครือ
              โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ
              สามารถศึกษาเงื่อนไข/ข้อตกลง นโยบายความเป็นส่วนตัว
              เพิ่มเติมได้ที่เว็บไซต์ของบริษัท
            </label>
          </div>

          <div className="buttons">
            <button type="submit">ลงทะเบียน</button>
            <button type="button">ย้อนกลับ</button>
          </div>
        </form>
      </div>
    
  );
}

export default RegistrationForm;
