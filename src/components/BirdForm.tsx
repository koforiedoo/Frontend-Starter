import { useState } from 'react';
import { addBirdRoute } from '../api/birdsApi';

const BirdForm = ({ onBirdAdded }: any) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Common Name:</label>
        <input
          type="text"
          value={commonName}
          onChange={(e) => setCommonName(e.target.value)}
        />
      </div>
      <div>
        <label>Scientific Name:</label>
        <input
          type="text"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Habitat:</label>
        <input
          type="text"
          value={habitat}
          onChange={(e) => setHabitat(e.target.value)}
        />
      </div>
      <div>
        <label>Appearance:</label>
        <textarea
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
        />
      </div>
      <div>
        <label>Photos:</label>
        <input
          type="file"
          multiple
          onChange={handlePhotoChange}
        />
      </div>
      <button type="submit">Add Bird</button>
    </form>
  );
};

export default BirdForm;