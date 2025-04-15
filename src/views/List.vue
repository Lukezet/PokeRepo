<template>
  <div class="h-screen flex flex-col items-center justify-center mt-12">
    <!-- Loader -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <Transition>
        <div v-show="appear" class="pokeball-loader animate-spin"><img src="../assets/Loader.svg" alt="Pikachu"
            class="mb-12" /></div>
      </Transition>
    </div>

    <!-- Contenido real (se muestra después del loader) -->
    <Transition name="fade-slide">
      <div class="w-10/12 sm:w-6/12 flex flex-col  h-full " v-show="!loading">

        <div class="relative  ">
          <input v-model="searchQuery" type="text" placeholder="Search"
            class="w-full p-4 pl-12 rounded-[5px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_2px_10px_0_rgba(0,0,0,0.04)]">
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <!-- Lista de Pokémon -->
        <div class="m-8">
          <ul class="space-y-3">
            <li v-for="pokemon in filteredPokemons" :key="pokemon"
              class="p-3 bg-white rounded-lg cursor-pointer transition-colors flex justify-between">
              {{ pokemon }} <img src="../assets/Disabled.svg" alt="">
            </li>
          </ul>
        </div>

        <!-- Filtros -->
        <div class="fixed bottom-0 pb-8 left-0 pt-4 w-full flex justify-center shadow-[0_-5px_4px_0_rgba(0,0,0,0.05)] bg-white">
          <div class="flex w-10/12 sm:w-6/12 space-x-2 ">
            <button @click="filter = 'all'" class="transition-colors p-2  w-1/2 flex justify-center space-x-2 " 
            :class="filter === 'all'
              ? 'btn-poke font-medium  '
              : 'btn-poke-disabled hover:text-red-500 p-2 '">
              <img src="../assets/list.svg" alt="">
             <p>All</p>
            </button>
            <button @click="filter = 'favorites'" class="transition-colors p-2 w-1/2" 
            :class="filter === 'favorites'
              ? 'btn-poke font-medium  '
              : 'btn-poke-disabled hover:text-red-500 p-2'">
              Favorites
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const appear = ref(false);
const loading = ref(true);
const searchQuery = ref('');
const filter = ref('all');
const pokemons = ref([
  'Bulbasaur',
  'Ivysaur',
  'Venusaur',
  'Charmander',
  'Charmeleon',
  'Charizard',
  'Squirtle',
  'Charmeleon',
  'Charizard',
  'Squirtle'
]);
const filteredPokemons = computed(() => {
  let result = pokemons.value;

  // Filtro de búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p => p.toLowerCase().includes(query));
  }

  // Filtro de favoritos (ejemplo básico)
  if (filter.value === 'favorites') {
    // Asumiendo que tienes un array de favoritos:
    // result = result.filter(p => favorites.value.includes(p));
  }

  return result;
});


onMounted(() => {
  appear.value = true;
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

/* Transición del contenido */
.fade-slide-enter-active {
  transition: all 0.5s ease 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>