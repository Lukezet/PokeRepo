<template>
  <div class="flex flex-col items-center justify-center relative">
    <!-- Loader -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <Transition>
        <div v-show="appear" class="pokeball-loader animate-spin"><img src="../assets/Loader.svg" alt="Pikachu"
            class="mb-12" /></div>
      </Transition>
    </div>
    <!-- <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${3}.png`" /> -->
    <PokeList :loading="loading" :pokemons="pokemons"/>
    <FooterFilter/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosClient from '../axiosClient';
import FooterFilter from '../components/FooterFilter.vue'
import PokeList from '../components/PokeList.vue'

const appear = ref(false);
const loading = ref(true);
const pokemons = ref([]);

const getPokemons = async () => {
  const response = await axiosClient.get('/pokemon');
  console.log(formatPokemons(response.data))
  pokemons.value = formatPokemons(response.data);
};

const formatPokemons = (data) => {
  return data.results.map(pokemon => {
    const id = pokemon.url.split('/').filter(Boolean).pop(); // extrae el número del final de la URL
    return {
      name: pokemon.name,
      id: Number(id)
    };
  });
};

onMounted(() => {
  appear.value = true;
  getPokemons()
  const timer = setTimeout(() => {
    loading.value = false;
    clearTimeout(timer);
  }, 2000);
  
  return () => clearTimeout(timer); // Cleanup
  
});

</script>

<style>
/* Estilo de la pokeball girando */

.pokeball-loader {
  width: 60px;
  height: 60px;
  background-image: url('@/assets/pokeball-icon.png');
  background-size: contain;
  animation: spin 2s linear infinite;
  transition: all 0.3s ease;
  transform-origin: center;
}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.v-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.v-leave-to {
  opacity: 0;
  transform: scale(1.1);
}


</style>