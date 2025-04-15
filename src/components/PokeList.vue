<template>
	<!-- Contenido real (se muestra después del loader) -->
	    <div class="fixed w-10/12 sm:w-6/12 top-12 z-10">
	          <input v-model="searchQuery" type="text" placeholder="Search"
	            class="w-full p-4 pl-12 rounded-[5px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_2px_10px_0_rgba(0,0,0,0.04)]">
	          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
	            stroke="currentColor" viewBox="0 0 24 24">
	            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
	              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
	          </svg>
	    </div>
	    <Transition name="fade-slide">
	      <div class="w-10/12 sm:w-6/12 flex flex-col  h-full relative mt-36 mb-20" v-show="!loading">
	
	
	
	        <!-- Lista de Pokémon -->
	        <div class="">
	          <ul class="space-y-3">
	            <li v-for="pokemon in filteredPokemons" :key="pokemon"
	              class="p-3 bg-white rounded-lg cursor-pointer transition-colors flex justify-between">
	              {{ pokemon.name }} <img src="../assets/Disabled.svg" alt="">
	            </li>
	          </ul>
	        </div>
	
	        <!-- Filtros -->
	        
	      </div>
	    </Transition>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosClient from '../axiosClient'

const props = defineProps({
  loading: Boolean,
  pokemons:Array
});



const searchQuery = ref('');
const filter = ref('all');

const filteredPokemons = computed(() => {
  let result = props.pokemons;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p => {
      return p.name?.toLowerCase().includes(query);
    });
  }
  
  if (filter.value === 'favorites') {
    // Add favorite filtering logic here
  }
  
  return result;
});
</script>
<style scoped>
/* Transición del contenido */
.fade-slide-enter-active {
  transition: all 0.5s ease 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>