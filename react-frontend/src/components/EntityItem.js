import React from "react";
import { Link } from "react-router-dom";

const EntityItem = ({ entity }) => (
  <div>
    <Link to={`/entities/${entity.id}`}>{entity.name}</Link>
  </div>
);

export default EntityItem;
