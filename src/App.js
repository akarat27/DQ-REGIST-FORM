import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import ThankYou from "./ThankYou";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
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
