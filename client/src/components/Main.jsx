import React from "react";
import Login from "./Login";
import './Main.css'

export default function Display () {
  return (
    <>
      <header className="header-body">
        <div className="d-flex flex-column justify-content-center w-100 h-100">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Login />
            <h1 className="fw-light text-white m-0">Fitness starts with how you live.</h1>
            <h5 className="fw-light text-white m-0">— FitPal - Live Healthy —</h5>
          </div>
        </div>
      </header>
    </>
  );
}