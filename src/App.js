import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import RegistrationFormEn from "./RegistrationFormEn";
import ThankYou from "./ThankYou";
import LoginPage from './LoginPage';
import LoginSuccessPage from './LoginSuccessPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/" element={<RegistrationForm />} /> */}
          <Route path="/th" element={<RegistrationForm />} />
          <Route path="/en" element={<RegistrationFormEn />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/success-login" element={<LoginSuccessPage />} />
        </Routes>
      </Router>
    </div>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  //   <Router>
  //   <Routes>
  //     {/* <Route exact path="/"  component={RegistrationForm} /> */}
  //     <Route exact path="/thank-you" component={ThankYou} />
  //     <Route component={RegistrationForm} />
  //   </Routes>
  // </Router>
}

export default App;
