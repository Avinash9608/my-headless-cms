// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const EntityDetails = () => {
//   const [entity, setEntity] = useState(null);
//   const [entries, setEntries] = useState([]);
//   const [newEntry, setNewEntry] = useState({});
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       const [entityRes, entriesRes] = await Promise.all([
//         axios.get(`/api/entities/${id}`),
//         axios.get(`/api/entities/${id}/entries`),
//       ]);
//       setEntity(entityRes.data);
//       setEntries(entriesRes.data);
//     };
//     fetchData();
//   }, [id]);

//   const handleCreateEntry = async () => {
//     const res = await axios.post(`/api/entities/${id}/entries`, newEntry);
//     setEntries([...entries, res.data]);
//     setNewEntry({});
//   };

//   return (
//     <div>
//       <h1>{entity?.name}</h1>
//       <h2>Add Entry</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={newEntry.name}
//         onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Email"
//         value={newEntry.email}
//         onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
//       />
//       <input
//         type="number"
//         placeholder="Mobile Number"
//         value={newEntry.mobileNumber}
//         onChange={(e) =>
//           setNewEntry({ ...newEntry, mobileNumber: e.target.value })
//         }
//       />
//       <input
//         type="date"
//         placeholder="Date of Birth"
//         value={newEntry.dateOfBirth}
//         onChange={(e) =>
//           setNewEntry({ ...newEntry, dateOfBirth: e.target.value })
//         }
//       />
//       <button onClick={handleCreateEntry}>Add Entry</button>
//       <h2>Entries</h2>
//       {entries.map((entry) => (
//         <div key={entry.id}>
//           <h3>{entry.name}</h3>
//           <p>{entry.email}</p>
//           <p>{entry.mobileNumber}</p>
//           <p>{entry.dateOfBirth}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EntityDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EntityDetails = () => {
  const [entity, setEntity] = useState(null);
  const [entries, setEntries] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const [entityRes, entriesRes] = await Promise.all([
        axios.get(`/api/entities/${id}`),
        axios.get(`/api/entities/${id}/entries`),
      ]);
      setEntity(entityRes.data);
      setEntries(entriesRes.data);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1>{entity?.name}</h1>
      <h2>Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.fields.map((field) => (
              <p key={field.id}>
                {field.name}: {field.value}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityDetails;
