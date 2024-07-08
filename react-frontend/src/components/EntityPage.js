import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EntityPage = () => {
  const [entity, setEntity] = useState(null);
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({});
  const [editingEntry, setEditingEntry] = useState(null);
  const { id } = useParams();

  // Fetch the entity and its entries when the component mounts
  React.useEffect(() => {
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

  // Handle creating a new entry
  const handleCreateEntry = async () => {
    // Send a request to the backend to create a new entry
    const res = await axios.post(`/api/entities/${id}/entries`, newEntry);
    setEntries([...entries, res.data]);
    setNewEntry({});
  };

  // Handle updating an existing entry
  const handleUpdateEntry = async (entryId, updatedEntry) => {
    // Send a request to the backend to update the entry
    await axios.put(`/api/entities/${id}/entries/${entryId}`, updatedEntry);
    setEditingEntry(null);
  };

  // Handle deleting an entry
  const handleDeleteEntry = async (entryId) => {
    // Send a request to the backend to delete the entry
    await axios.delete(`/api/entities/${id}/entries/${entryId}`);
    setEntries(entries.filter((entry) => entry.id !== entryId));
  };

  // Handle editing an entry
  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setNewEntry(entry);
  };

  // Handle canceling editing an entry
  const handleCancelEditEntry = () => {
    setEditingEntry(null);
    setNewEntry({});
  };

  // Render the entity page
  return (
    <div>
      <h1>{entity?.name}</h1>
      <Link to={`/entities/${id}/entries/new`}>Create Entry</Link>
      <table>
        <thead>
          <tr>
            {Object.keys(entity?.attributes || {}).map((attribute) => (
              <th key={attribute}>{attribute}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              {Object.values(entry)
                .slice(0, -1)
                .map((value) => (
                  <td key={value}>{value}</td>
                ))}
              <td>
                <Link to={`/entities/${id}/entries/${entry.id}/edit`}>
                  Edit
                </Link>
                <button onClick={() => handleDeleteEntry(entry.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingEntry && (
        <div>
          <h2>Editing Entry</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateEntry(editingEntry.id, newEntry);
            }}
          >
            {Object.keys(entity?.attributes || {}).map((attribute) => (
              <div key={attribute}>
                <label>{attribute}:</label>
                <input
                  type={entity.attributes[attribute].type}
                  value={newEntry[attribute]}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, [attribute]: e.target.value })
                  }
                />
              </div>
            ))}
            <button type="submit">Save</button>
            <button onClick={handleCancelEditEntry}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EntityPage;
