import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const { typeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/entities?type=${typeId}`);
      setEntities(res.data);
    };
    fetchData();
  }, [typeId]);

  return (
    <div>
      <h1>Entities of type {typeId}</h1>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            <Link to={`/entities/${entity.id}`}>{entity.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityList;
