import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="breadCrumbs">
        <Breadcrumbs links={["ACERCA DE MI ROPERO"]} />
      </div>
      <div className="bodySection"></div>
    </div>
  );
};

export default About;
