import React from "react";
import Modal from "react-modal";
import { Bird } from "../types";

Modal.setAppElement("#root");

interface Props {
  bird: Bird;
  onClose: () => void;
}

const ViewModal: React.FC<Props> = ({ bird, onClose }) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="bg-white p-4 rounded shadow-md"
    >
      <h2 className="text-xl font-bold">{bird.commonName}</h2>
      <p>
        <strong>Scientific Name:</strong> {bird.scientificName}
      </p>
      <p>
        <strong>Description:</strong> {bird.description}
      </p>
      <p>
        <strong>Habitat:</strong> {bird.habitat.join(", ")}
      </p>
      <p>
        <strong>Appearance:</strong> {bird.appearance.size}, Colors:{" "}
        {bird.appearance.color.join(", ")}
      </p>
      <button
        className="bg-red-500 text-white px-3 py-1 mt-3"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default ViewModal;
