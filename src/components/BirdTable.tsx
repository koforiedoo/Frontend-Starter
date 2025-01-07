const BirdTable = ({ birds, onSelect }: any) => {
  if (!birds.length) {
    return <p>No birds available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Common Name</th>
          <th>Scientific Name</th>
          <th>Description</th>
          <th>Habitat</th>
          <th>Appearance</th>
          <th>Photos</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {birds.map((bird: any) => (
          <tr key={bird._id}>
            <td>{bird.commonName}</td>
            <td>{bird.scientificName}</td>
            <td>{bird.description}</td>
            <td>{bird.habitat}</td>
            <td>{bird.appearance}</td>
            <td>
              {bird.photos && bird.photos.length > 0 ? (
                <ul>
                  {bird.photos.map((photo: string, index: number) => (
                    <li key={index}>
                      <img src={photo} alt={`Photo ${index + 1}`} width="50" />
                    </li>
                  ))}
                </ul>
              ) : (
                'No photos available'
              )}
            </td>
            <td>
              <button onClick={() => onSelect(bird)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BirdTable;