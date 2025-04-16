<template>
	<!-- Contenido real (se muestra después del loader) -->
	<div class="fixed w-10/12 sm:w-6/12 top-12 z-10">
		<input v-model="searchQuery" type="text" placeholder="Search"
			class="w-full p-4 pl-12 rounded-[5px] bg-white focus:outline-none focus:ring-2 focus:ring-[#F8CC46] shadow-[0_2px_10px_0_rgba(0,0,0,0.04)]">
		<svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
			stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
		</svg>
	</div>
	<Transition name="fade-slide">
		<div class="w-10/12 sm:w-6/12 flex flex-col  h-full relative mt-36 mb-20" v-show="!loading">

			<!-- Lista de Pokémon -->
			<div v-if="filteredPokemons.length === 0" class="text-center flex flex-col justify-center items-center space-y-4 mt-20">
				<h2 class="text-[36px] font-bold primary-color">Uh-oh!</h2>
				<p class="text-lg secondary-color">You look lost on your journey!</p>
				<button @click="goHome"
					class="btn-poke w-2/5 text-white font-[500] py-3 px-2 sm:px-6 rounded-full transition duration-200 cursor-pointer text-lg sm:text-xl whitespace-nowrap">
					Go back home
				</button>
			</div>

			<div v-else>
				<ul class="space-y-3">
					<li @click="togglePokeModal(pokemon.id)" v-for="pokemon in filteredPokemons" :key="pokemon.name"
						class="p-3 bg-white rounded-lg cursor-pointer transition-colors flex justify-between items-center primary-color font-semibold text-xl">
						<span>{{ pokemon.name }}</span>
						<img :src="store.isFavorite(pokemon.name) ? Active : Disabled" alt="star"
							class="hover:scale-110 transition-all" @click.stop="store.toggleFavorite(pokemon)" />
					</li>
				</ul>
			</div>

		</div>
	</Transition>
	<PokeModal v-if="pokeModal" :pokemonId="pokemonId" @close="togglePokeModal" />
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePokemonStore } from '../stores/PokemonStore'
import { useRouter } from 'vue-router'; 
import PokeModal from '../components/PokeModal.vue'
import Active from '../assets/Active.svg'
import Disabled from '../assets/Disabled.svg'

const store = usePokemonStore()
const router = useRouter();

const pokeModal = ref(false)
const searchQuery = ref('');
const pokemonId = ref(null);

const togglePokeModal = (id) => {
	console.log(id)
	pokemonId.value = id;
	pokeModal.value = !pokeModal.value;
}

onMounted(() => {
	store.fetchPokemons()
})
const props = defineProps({
	loading: Boolean,
	pokemons: Array,
	filter: String,
});

const filteredPokemons = computed(() => {
	let result = props.pokemons || [];

	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase()
		result = result.filter(p => p.name?.toLowerCase().includes(query))
	}

	if (props.filter === 'favorites') {
		result = result.filter(p => store.isFavorite(p.name))
	}

	return result
})

const goHome = () => {
  router.push({ name: 'home' }); // Navega a la ruta con nombre 'List'
};
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