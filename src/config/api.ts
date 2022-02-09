export const PokemonApi = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=900', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  }).then(response => {
    if (response.status === 200) return response.json()
    else throw new Error('Invalid response')
  })
}
