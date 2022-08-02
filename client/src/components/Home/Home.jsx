import React from "react";
import "../../assets/scss/home.scss";
import logo from "../../assets/img/svg/logo.svg";
import hero from "../../assets/img/svg/hero.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="container-fluid">
        <div className="header">
          <div className="header-top-left">
            <img src={logo} />
            <h2>Merres</h2>
          </div>
          <div className="header-top-right">
            <div>
              <Link to="/login">Log in</Link>
              <button className="btn btn-primary" type="submit">
                <Link
                  to="/register"
                  target="_self"
                  rel="noopener noreferrer"
                  style={{ color: "rgb(245, 246, 250)" }}
                >
                  Sign up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="container-row">
          <div className="col-6">
            <h1>Merres helps teams move work forward.</h1>
            <p>
              Collaborate, manage projects, and reach new productivity peaks.{" "}
              <br />
              From hight rises to the home office, the way your team works is{" "}
              <br />
              unique --- accomplish it all with Merres
            </p>
            <button className="btn btn-primary">
              <Link
                to="/register"
                target="_self"
                rel="noopener noreferrer"
                style={{ color: "rgb(245, 246, 250)" }}
              >
                Sign up - it's free
              </Link>
            </button>
          </div>
          <div className="col-6">
            <img src={hero} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
