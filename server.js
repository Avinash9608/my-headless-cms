// const express = require("express");
// const { Person } = require("./models");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.get("/persons", async (req, res) => {
//   const persons = await Person.findAll();
//   res.status(200).json(persons);
// });

// app.post("/persons", async (req, res) => {
//   const { name, email, mobileNumber, dateOfBirth } = req.body;
//   const person = await Person.create({
//     name,
//     email,
//     mobileNumber,
//     dateOfBirth,
//   });
//   res.status(201).json(person);
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// server.js
const express = require("express");
const app = express();
const mysql = require("mysql");

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "headless_cms",
});

// Create table for entities
app.post("/create-entity", (req, res) => {
  const entityName = req.body.entityName;
  const attributes = req.body.attributes;

  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${entityName} (`;
  attributes.forEach((attribute, index) => {
    createTableQuery += `${attribute.name} ${getAttributeType(attribute.type)}`;
    if (index < attributes.length - 1) {
      createTableQuery += ", ";
    }
  });
  createTableQuery += ");";

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error creating table" });
    } else {
      res.send({ message: `Table ${entityName} created successfully` });
    }
  });
});

// Create record
app.post("/create-record", (req, res) => {
  const entityName = req.body.entityName;
  const data = req.body.data;

  const insertQuery = `INSERT INTO ${entityName} SET ?`;
  db.query(insertQuery, data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error creating record" });
    } else {
      res.send({ message: `Record created successfully` });
    }
  });
});

// Read records
app.get("/read-records", (req, res) => {
  const entityName = req.query.entityName;

  const selectQuery = `SELECT * FROM ${entityName}`;
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error reading records" });
    } else {
      res.send(result);
    }
  });
});

// Update record
app.put("/update-record", (req, res) => {
  const entityName = req.body.entityName;
  const data = req.body.data;
  const id = req.body.id;

  const updateQuery = `UPDATE ${entityName} SET ? WHERE id = ?`;
  db.query(updateQuery, [data, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error updating record" });
    } else {
      res.send({ message: `Record updated successfully` });
    }
  });
});

// Delete record
app.delete("/delete-record", (req, res) => {
  const entityName = req.query.entityName;
  const id = req.query.id;

  const deleteQuery = `DELETE FROM ${entityName} WHERE id = ?`;
  db.query(deleteQuery, id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting record" });
    } else {
      res.send({ message: `Record deleted successfully` });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// Helper function to get attribute type
function getAttributeType(type) {
  switch (type) {
    case "string":
      return "VARCHAR(255)";
    case "number":
      return "INT";
    case "date":
      return "DATE";
    default:
      return "VARCHAR(255)";
  }
}
