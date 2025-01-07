import  { useEffect, useState } from 'react';
import { getAllBirdsRoute } from '../api/birdsApi';
import BirdTable from '../components/BirdTable';
import BirdForm from '../components/BirdForm';

interface Bird {
  id: number;
  name: string;
  species: string;
}

const BirdPage = () => {
  const [birds, setBirds] = useState([]);
  const [error, setError] = useState('');

  const fetchBirds = async () => {
    try {
      const data = await getAllBirdsRoute();
      console.log('Fetched birds:', data);
      setBirds(data);
    } catch (err) {
      setError('Failed to fetch birds. Please try again later.');
      console.error('Error fetching birds:', err);
    }
  };

  useEffect(() => {
    fetchBirds();
  }, []);

  return (
    <div>
      <h1>Birds</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BirdTable birds={birds} onSelect={(bird: Bird) => console.log('Selected bird:', bird)} />
        <BirdForm onBirdAdded={fetchBirds} />
    </div>
  );
};

export default BirdPage;
