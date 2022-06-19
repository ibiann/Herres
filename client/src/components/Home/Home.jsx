import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/imgs/hero.png"

function Home () {
  return (
    <div className="home-layout-container">
      <div className="hero-text">
        <h1 className="hero-title">
          Merres helps corporation to work forward faster.
        </h1>

        <span>
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is unique
          accomplish it all with Merres.
        </span>
        <Link className="btn-started" to="/login">
            Try Now
        </Link>
      </div>
      <img src={hero} alt="" className="index-img" />
    </div>
  );
};

export default Home;
