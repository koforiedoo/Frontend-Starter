import React from 'react';

interface Bird {
  id: number;
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string;
  appearance: string;
  photos: string[];
}

interface BirdModalProps {
  isOpen: boolean;
  onClose: () => void;
  bird: Bird | null;
}

const BirdModal: React.FC<BirdModalProps> = ({ isOpen, onClose, bird }) => {
  if (!isOpen || !bird) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-lg w-full">
        <button className="absolute top-2 right-2" onClick={onClose}>X</button>
        <div className="mb-4">
          {bird.photos && bird.photos.length > 0 ? (
            <img src={bird.photos[0]} alt={bird.commonName} className="w-full h-auto rounded-md" />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">No photo available</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold mb-2">{bird.commonName}</h2>
        <p className="text-gray-600 italic mb-2">{bird.scientificName}</p>
        <p className="text-gray-600 mb-2"><strong>Description:</strong> {bird.description}</p>
        <p className="text-gray-600 mb-2"><strong>Habitat:</strong> {bird.habitat}</p>
        <p className="text-gray-600 mb-2"><strong>Appearance:</strong> {bird.appearance}</p>
      </div>
    </div>
  );
};

export default BirdModal;