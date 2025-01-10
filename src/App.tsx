import { gql, useQuery } from "@apollo/client"

const GET_BIRDS = gql`
  query GetBirds{
    getBirds{
      commonName
      scientificName
    }
  }
`
function App() {
  const {loading, error, data } = useQuery(GET_BIRDS)
  console.log(data)
  return (
    <h1>Hello, World!</h1>
  )
}

export default App
