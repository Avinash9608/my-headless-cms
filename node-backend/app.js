// node-backend/app.js
const express = require("express");
const app = express();
const pool = require("./database");
const Entity = require("./models/entity");

app.use(express.json());

// Create an entity
app.post("/entities", async (req, res) => {
  const { name, attributes } = req.body;
  const entity = new Entity(name, attributes);
  const query = entity.createTable();
  try {
    await pool.query(query);
    res.status(201).send(`Entity created: ${name}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating entity");
  }
});

// Create a record
app.post("/entities/:entityName", async (req, res) => {
  const entityName = req.params.entityName;
  const data = req.body;
  const query = `INSERT INTO ${entityName} SET ?`;
  try {
    await pool.query(query, data);
    res.status(201).send(`Record created in ${entityName}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating record");
  }
});

// Read records
app.get("/entities/:entityName", async (req, res) => {
  const entityName = req.params.entityName;
  const query = `SELECT * FROM ${entityName}`;
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading records");
  }
});

// Update a record
app.put("/entities/:entityName/:id", async (req, res) => {
  const entityName = req.params.entityName;
  const id = req.params.id;
  const data = req.body;
  const query = `UPDATE ${entityName} SET ? WHERE id = ${id}`;
  try {
    await pool.query(query, data);
    res.status(200).send(`Record updated in ${entityName}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating record");
  }
});

// Delete a record
app.delete("/entities/:entityName/:id", async (req, res) => {
  const entityName = req.params.entityName;
  const id = req.params.id;
  const query = `DELETE FROM ${entityName} WHERE id = ${id}`;
  try {
    await pool.query(query);
    res.status(200).send(`Record deleted from ${entityName}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting record");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
