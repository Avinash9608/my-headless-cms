// // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }

// // // export default App;
// // // react-frontend/src/App.js
// // import React from "eact";
// // import EntityForm from "./components/EntityForm";
// // import EntityList from "./components/EntityList";

// // function App() {
// //   return (
// //     <div>
// //       <h1>Headless CMS</h1>
// //       <EntityForm />
// //       <EntityList />
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import EntityList from "./components/EntityList";
// import EntityForm from "./components/EntityForm";
// import EntityDetails from "./components/EntityDetails"; // make sure this import statement is correct

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<EntityList />} />
//         <Route path="/entities/new" element={<EntityForm />} />
//         <Route path="/entities/:id" element={<EntityDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.js
// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/read-records")
      .then((response) => {
        setEntities(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateEntity = (entityName, attributes) => {
    axios
      .post("http://localhost:3000/create-entity", { entityName, attributes })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateRecord = (entityName, data) => {
    axios
      .post("http://localhost:3000/create-record", { entityName, data })
      .then((response) => {
        console.log(response.data);
        setData({});
        setSelectedEntity(entityName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateRecord = (entityName, data, id) => {
    axios
      .put("http://localhost:3000/update-record", { entityName, data, id })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRecord = (entityName, id) => {
    axios
      .delete(
        `http://localhost:3000/delete-record?entityName=${entityName}&id=${id}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Headless CMS</h1>
      <h2>Create Entity</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const entityName = e.target.entityName.value;
          const attributes = JSON.parse(e.target.attributes.value);
          handleCreateEntity(entityName, attributes);
        }}
      >
        <input
          type="text"
          name="entityName"
          placeholder="Entity Name"
          required
        />
        <textarea
          name="attributes"
          placeholder="Attributes (JSON)"
          required
        ></textarea>
        <button type="submit">Create Entity</button>
      </form>

      <h2>Entities</h2>
      <ul>
        {entities.map((entity, index) => (
          <li key={index} onClick={() => setSelectedEntity(entity.entityName)}>
            {entity.entityName}
          </li>
        ))}
      </ul>

      {selectedEntity && (
        <div>
          <h2>Selected Entity: {selectedEntity}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateRecord(selectedEntity, data);
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="number"
              name="mobileNumber"
              placeholder="Mobile Number"
              onChange={(e) =>
                setData({ ...data, mobileNumber: e.target.value })
              }
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              onChange={(e) =>
                setData({ ...data, dateOfBirth: e.target.value })
              }
            />
            <button type="submit">Create Record</button>
          </form>

          {data && (
            <div>
              <h3>Record</h3>
              <p>Name: {data.name}</p>
              <p>Email: {data.email}</p>
              <p>Mobile Number: {data.mobileNumber}</p>
              <p>Date of Birth: {data.dateOfBirth}</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateRecord(selectedEntity, data, selectedEntity.id);
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input
                  type="number"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  onChange={(e) =>
                    setData({ ...data, mobileNumber: e.target.value })
                  }
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  onChange={(e) =>
                    setData({ ...data, dateOfBirth: e.target.value })
                  }
                />
                <button type="submit">Update Record</button>
              </form>

              <button
                onClick={() => {
                  setData({});
                  handleDeleteRecord(selectedEntity, selectedEntity.id);
                }}
              >
                Delete Record
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
