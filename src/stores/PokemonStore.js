import { defineStore } from 'pinia'
import axiosClient from '../axiosClient'
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    allPokemons: [],
    favorites: [],
    pokemons: {},
  }),

  actions: {
    
    async fetchPokemons() {
      const response = await axiosClient.get('/pokemon')
      response.data.results
      this.allPokemons = formatPokemons(response.data.results)
    },

    toggleFavorite(pokemon) {
      const index = this.favorites.findIndex(fav => fav.name === pokemon.name)
      if (index !== -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(pokemon)
      }
    },

    isFavorite(name) {
      return this.favorites.some(p => p.name === name)
    },

    async fetchPokemon(id) {
      if (this.pokemons[id]) return this.pokemons[id]

      try {
        const response = await axiosClient.get(`/pokemon/${id}`)
        if (response?.data) {
          const data = {
            name: response.data.name,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map(t => t.type.name),
            image: response.data.sprites.other['official-artwork'].front_default,
          }
          this.pokemons[id] = data
          return data
        }
      } catch (error) {
        console.error('Error al obtener el Pokémon:', error)
        return null
      }
    }

  },
  persist: true,
})

function formatPokemons(data) {
  return data.map(pokemon => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return {
      name: pokemon.name,
      id: Number(id),
    };
  });
}