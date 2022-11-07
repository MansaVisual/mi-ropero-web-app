import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

const ElegirCategoria = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="elegirCatContainer">
      <Breadcrumbs links={pathnames} />
      <div className="container"></div>
    </div>
  );
};

export default ElegirCategoria;
