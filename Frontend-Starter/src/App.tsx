import { useEffect, useState } from "react";
import axios from "axios";
import { Bird } from "./types";
import ViewModal from "./components/ViewModal";
import EditModal from "./components/EditModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { gql, useQuery } from "@apollo/client";

const API_BASE_URL = "https://birdbackendinterview.onrender.com/bird";

function App() {
  //const { loading, error, data } = useQuery(GET_BIRDS);
  const [birds, setBirds] = useState<Bird[]>([]);
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [editBird, setEditBird] = useState<Bird | null>(null);

  useEffect(() => {
    fetchBirds();
  }, []);

  const fetchBirds = async () => {
    try {
      const res = await axios.get<Bird[]>(API_BASE_URL);
      setBirds(res.data);
    } catch (error) {
      console.error("Error fetching birds:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this bird?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        toast.success("Bird deleted successfully!");
        fetchBirds();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete bird.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Bird List</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Common Name</th>
            <th className="border p-2">Scientific Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {birds.map((bird) => (
            <tr key={bird._id} className="hover:bg-gray-50">
              <td className="border p-2">{bird.commonName}</td>
              <td className="border p-2">{bird.scientificName}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setSelectedBird(bird)}
                >
                  View
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setEditBird(bird)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(bird._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBird && (
        <ViewModal bird={selectedBird} onClose={() => setSelectedBird(null)} />
      )}
      {editBird && (
        <EditModal
          bird={editBird}
          onClose={() => setEditBird(null)}
          refresh={fetchBirds}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
