// LoginPage.js
import React , { useState }from 'react';
import { Link,useNavigate } from 'react-router-dom';
import ModalAlert from './ModalAlert'; 

function LoginPage() {
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const navigate = useNavigate(); // Create a history object for navigation
    const [formData, setFormData] = useState({
        cardID: '',
        tel: '',
      });

      const [loginMessage, setLoginMessage] = useState('');
      const [showThankYou, setShowThankYou] = useState(false);

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('https://dq-data-api-tpdx.vercel.app/login2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            const data = await response.json();
            if (data.message === 'login success') {
              setLoginMessage('Login successful.');
              setShowThankYou(true);

              window.location.href = 'https://www.google.com';
            //   navigate("/success-login");
            } else {
              setShowAlert(true);  
              setLoginMessage('Login failed. Please check your credentials.');
            }
          } else {
            setShowAlert(true);
            setLoginMessage('Login failed. Please try again later.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

  return (
    <div className="login-page">
      <div className="logo">
        <img src="dq_logo.png" alt="Logo" className='logo' />
      </div>
      {showAlert && (
        <ModalAlert
          open={showAlert}
          onClose={() => setShowAlert(false)}
          message={loginMessage}
        />
        )}
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            {/* <label htmlFor="firstName">First Name</label> */}
            <input
              type="text"
              id="cardID"
              name="cardID"
              value={formData.cardID}
              onChange={(e) =>
                setFormData({ ...formData, cardID: e.target.value })
              }
              placeholder="Thai Citizen ID or Passport Number"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="lastName">Last Name</label> */}
            <input
              type="text"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={(e) =>
                setFormData({ ...formData, tel: e.target.value })
              }
              placeholder="Phone Number"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="registration-link">
        <p>Don't have an account? <Link to="/registration">Register</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
