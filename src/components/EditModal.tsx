import React, { useState } from "react";
import Modal from "react-modal";
import { Bird } from "../types";
//import { updateBird } from "../api";
import { toast } from "react-toastify";
import axios from "axios";

interface Props {
  bird: Bird;
  onClose: () => void;
  refresh: () => void;
}

const API_BASE_URL = "https://birdbackendinterview.onrender.com/bird";

const EditModal: React.FC<Props> = ({ bird, onClose, refresh }) => {
  const [updatedData, setUpdatedData] = useState(bird);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${API_BASE_URL}/${bird._id}`, updatedData);
      toast.success("Bird updated!");
      refresh();
      onClose();
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="bg-white p-4 rounded shadow-md"
    >
      <h2 className="text-xl font-bold">Edit {bird.commonName}</h2>
      <input
        name="commonName"
        value={updatedData.commonName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        className="bg-green-500 text-white px-3 py-1 mt-3"
        onClick={handleSubmit}
      >
        Save
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 mt-3 ml-2"
        onClick={onClose}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default EditModal;
