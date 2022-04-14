//This is a stateless home page
//This page is purely for displaying a small slice of information about the developer on page load

//Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faNode } from "@fortawesome/free-brands-svg-icons";

import developerImage from "../../Assets/me2.png";

import Card from "../../shared/components/UIElements/Card";

import "./Home.css";

//The markup for this page is a wrapping card element, and various headers and paragraph elements,
//along with icons at the bottom to represent the technologies used in development
//This page is purely consisting of static data
const Home = () => {
  return (
    <Card className="home-card">
      <div className="home">
        <div className="home-image">
          <img src={developerImage} alt="Developer" />
        </div>
        <div className="home-details">
          <h2>Jack Ebdon</h2>
          <h3>ST20167463</h3>
        </div>
        <div className="home-title">
          <h1>Development Project</h1>
        </div>
        <div className="home-description">
          <p>
            This website is the culmination of my study at Cardiff Metropolitan
            University, and the resulting software for my Dissertation
            Development Project.
          </p>
          <p>
            This is a Full Stack MERN Website designed around helping
            individuals with ADHD.
          </p>
        </div>
        <div className="home-footer">
          <FontAwesomeIcon
            className="home-icon react"
            icon={faReact}
            size="4x"
          />
          <FontAwesomeIcon className="home-icon node" icon={faNode} size="4x" />
        </div>
      </div>
    </Card>
  );
};

export default Home;
