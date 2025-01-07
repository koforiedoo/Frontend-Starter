import { useEffect, useState } from 'react';
import { getAllBirdsRoute } from '../api/birdsApi';
import BirdTable from '../components/BirdTable';
import BirdForm from '../components/BirdForm';
import BirdModal from '../components/BirdModal';

interface Bird {
  id: number;
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string;
  appearance: string;
  photos: string[];
}

const BirdPage = () => {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);

  const fetchBirds = async () => {
    try {
      const data = await getAllBirdsRoute();
      setBirds(data);
    } catch (err) {
      setError('Failed to fetch birds. Please try again later.');
      console.error('Error fetching birds:', err);
    }
  };

  useEffect(() => {
    fetchBirds();
  }, []);

  const handleBirdAdded = () => {
    fetchBirds();
    setIsModalOpen(false); // Close the modal after adding a bird
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal when cancel is clicked
  };

  const handleBirdClick = (bird: Bird) => {
    setSelectedBird(bird);
    setIsModalOpen(true); // Open the modal to display the bird's details
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBird(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Birds Directory</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Bird
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <BirdTable
        birds={birds}
        onSelect={(bird: Bird) => handleBirdClick(bird)} // Open modal on bird click
      />

      {/* Bird Modal */}
      <BirdModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        bird={selectedBird}
      />

      {/* Add Bird Modal */}
      {isModalOpen && !selectedBird && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="p-6">
              <BirdForm onBirdAdded={handleBirdAdded} onCancel={handleCancel} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirdPage;
