// node-backend/models/entity.js
class Entity {
  constructor(name, attributes) {
    this.name = name;
    this.attributes = attributes;
  }

  createTable() {
    // Create a table definition based on the attributes
    const columns = Object.keys(this.attributes)
      .map((attribute) => {
        let type;
        switch (this.attributes[attribute]) {
          case "string":
            type = "varchar(255)";
            break;
          case "number":
            type = "integer";
            break;
          case "date":
            type = "date";
            break;
          default:
            throw new Error(
              `Unsupported attribute type: ${this.attributes[attribute]}`
            );
        }
        return `${attribute} ${type}`;
      })
      .join(", ");

    const query = `CREATE TABLE IF NOT EXISTS ${this.name} (${columns});`;
    return query;
  }
}

module.exports = Entity;
