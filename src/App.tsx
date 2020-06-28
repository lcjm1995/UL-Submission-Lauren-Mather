import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";

import MainPage from "./pages/mainPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>REACTJS WEB APP</h1>
          <Route
            path=""
            exact
            render={() => {
              return <MainPage />;
            }}
          />
        </header>
      </div>

      <div className="footer">
        A web application created by Lauren Mather. 2020
      </div>
    </Router>
  );
}

export default App;
