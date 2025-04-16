<template>
  <div class="flex flex-col items-center justify-center relative">
    <!-- Loader -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <Transition>
        <div v-show="appear" class="pokeball-loader animate-spin"><img src="../assets/Loader.svg" alt="Pikachu"
            class="mb-12" /></div>
      </Transition>
    </div>

    <PokeList :loading="loading" :pokemons="pokemons" :filter="filter" />
    <FooterFilter :filter="filter" @update:filter="filter = $event"/>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import FooterFilter from '../components/FooterFilter.vue'
import PokeList from '../components/PokeList.vue'
import { usePokemonStore } from '../stores/PokemonStore'

const store = usePokemonStore()
const filter = ref('all')
const appear = ref(false);
const loading = ref(true);
const pokemons = computed(() => store.allPokemons)


onMounted(async () => {
  appear.value = true;
  await store.fetchPokemons(); // carga al store
  const timer = setTimeout(() => {
    loading.value = false;
    clearTimeout(timer);
  }, 1500);
  
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