
const BirdTable = ({ birds, onSelect }: any) => {
  if (!birds.length) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No birds available.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Common Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Scientific Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Description</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Habitat</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Appearance</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Photos</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {birds.map((bird: any) => (
              <tr 
                key={bird._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {bird.commonName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 italic">
                  {bird.scientificName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                  <div className="line-clamp-2">{bird.description}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {bird.habitat}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="line-clamp-2">{bird.appearance}</div>
                </td>
                <td className="px-6 py-4">
                  {bird.photos && bird.photos.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {bird.photos.map((photo: string, index: number) => (
                        <div key={index} className="relative w-12 h-12 rounded-md overflow-hidden">
                          <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No photos</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onSelect(bird)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BirdTable;