import { useState } from 'react';
import { addBirdRoute } from '../api/birdsApi';

const BirdForm = ({ onBirdAdded, onCancel }: any) => {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [description, setDescription] = useState('');
  const [habitat, setHabitat] = useState('');
  const [appearance, setAppearance] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBird = {
      commonName,
      scientificName,
      description,
      habitat,
      appearance,
      photos,
    };
    try {
      await addBirdRoute(newBird);
      onBirdAdded();
      setCommonName('');
      setScientificName('');
      setDescription('');
      setHabitat('');
      setAppearance('');
      setPhotos([]);
    } catch (error) {
      console.error('Error adding bird:', error);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const photoUrls = files.map((file) => URL.createObjectURL(file));
    setPhotos(photoUrls);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-white overflow-y-auto">
      <div className="min-h-full w-full max-w-2xl mx-auto p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Common Name</label>
              <input
                type="text"
                name="commonName"
                value={commonName}
                onChange={(e) => setCommonName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scientific Name</label>
              <input
                type="text"
                name="scientificName"
                value={scientificName}
                onChange={(e) => setScientificName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Habitat</label>
              <input
                type="text"
                name="habitat"
                value={habitat}
                onChange={(e) => setHabitat(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Appearance</label>
              <textarea
                name="appearance"
                value={appearance}
                onChange={(e) => setAppearance(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md h-full min-h-[80px]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
            <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md">
              <div className="text-center">
                <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="mt-2 flex flex-col sm:flex-row items-center justify-center text-sm gap-1">
                  <label className="cursor-pointer text-blue-600 hover:text-blue-500">
                    <span>Upload files</span>
                    <input type="file" multiple onChange={handlePhotoChange} className="sr-only"/>
                  </label>
                  <p className="text-gray-600">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Bird
            </button>
            <button
              className="w-full sm:w-auto bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirdForm;
