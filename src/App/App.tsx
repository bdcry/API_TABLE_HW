import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/Details";
import GroupByUserID from "../pages/GroupByUserID";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/groupbyuserid' element={<GroupByUserID />} />
      </Routes>
    </div>
  );
}

export default App;
