// // react-frontend/src/components/EntityForm.js
// import React, { useState } from 'eact';
// import axios from 'axios';

// const EntityForm = () => {
//   const [name, setName] = useState('');
//   const [attributes, setAttributes] = useState({});

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/entities', { name, attributes });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Entity Name:
//         <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
//       </label>
//       <br />
//       <label>
//         Attributes:
//         <textarea value={JSON.stringify(attributes)} onChange={(event) => setAttributes(JSON.parse(event.target.value))} />
//       </label>
//       <br />
//       <button type="submit">Create Entity</button>
//     </form>
//   );
// };

// export default EntityForm;

import React, { useState } from "react";
import axios from "axios";

const EntityForm = () => {
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a request to the backend to create a new entity
    await axios.post("/api/entities", { name, attributes });
    // Reset the form fields
    setName("");
    setAttributes([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Entity Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Attributes:
        <input
          type="text"
          value={attributes.join(", ")}
          onChange={(e) => setAttributes(e.target.value.split(","))}
        />
      </label>
      <button type="submit">Create Entity</button>
    </form>
  );
};

export default EntityForm;
