import axios from "axios";

const getEntities = async () => {
  try {
    const response = await axios.get("/entities");
    return response.data;
  } catch (error) {
    console.error("Error fetching entities:", error);
    throw error;
  }
};

export default getEntities;
