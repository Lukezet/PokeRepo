import { defineStore } from 'pinia'
import axiosClient from '../axiosClient'
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    allPokemons: [],
    favorites: [],
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