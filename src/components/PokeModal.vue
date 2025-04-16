<template>
  <Teleport to="body" class="overflow-hidden">
    <Transition name="modal-outer" appear>
      <div class="modal-overlay h-screen">
        <Transition name="modal-inner">
          <div
            class="w-10/12 md:w-6/12 h-auto bg-white fixed modalx top-[10%] flex flex-col  justify-start items-start rounded-md self-start mt-0">

            <div class="relative w-full h-full" v-if="pokemon">
              <section class=" relative w-full h-[200px] sm:h-[300px] object-contain ">
                <img src="../assets/background.svg" alt=""
                  class="absolute inset-0 w-full h-full object-cover z-0 rounded-t-md" />
                <img v-if="!imageLoaded" src="../assets/Loader.svg" alt="loading"
                  class="w-16 sm:w-24 absolute mx-auto bottom-8 left-16 sm:left-36 xl:left-49 animate-spin" />

                <img :src="pokemon.image" @load="imageLoaded = true" alt="pokemon image"
                  class="w-40 sm:w-64 absolute mx-auto bottom-2 left-10 sm:left-36 xl:left-49" />
                <button class="absolute top-3 right-3 sm:top-3 sm:right-3 cursor-pointer" @click="emits('close')"><img
                    src="../assets/close.svg" class="w-8 h-8" alt="close"></button>
              </section>

              <div class="p-8">
                <p class="border-b-2 py-4 px-1 border-[#E8E8E8] text-xl font-[500] secondary-color "><strong
                    class="mr-2">Name:</strong> {{ pokemon.name }}</p>
                <p class="border-b-2 py-4 px-1 border-[#E8E8E8] text-xl font-[500] secondary-color "><strong
                    class="mr-2">Weight:</strong> {{ pokemon.weight }}</p>
                <p class="border-b-2 py-4 px-1 border-[#E8E8E8] text-xl font-[500] secondary-color "><strong
                    class="mr-2">Height:</strong> {{ pokemon.height }}</p>
                <p class="border-b-2 py-4 px-1 border-[#E8E8E8] text-xl font-[500] secondary-color "><strong
                    class="mr-2">Types:</strong> {{ pokemon.types?.join(', ') || 'Unknown' }}</p>
                <div class="flex justify-between items-center  mt-4">
                  <button @click="copyToClipboard"
                    class="relative btn-poke text-white font-[500]  py-3 px-2 sm:px-6 rounded-full transition duration-200 cursor-pointer text-lg sm:text-xl">
                    Share to my friends
                    <span v-if="copied"
                      class="absolute -bottom-8 sm:top-3 right-0 sm:-right-24 h-6 bg-[#5c5c5c] text-white text-sm px-3 py-1 rounded-md shadow-md transition-opacity duration-300 opacity-75">
                      📋 Copied!
                    </span>
                  </button>

                  <img :src="store.isFavorite(pokemon.name) ? Active : Disabled" alt="star"
                    class="h-14 w-14 hover:scale-110 transition-all cursor-pointer"
                    @click.stop="store.toggleFavorite(pokemon)" />
                </div>

              </div>

            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import axiosClient from '../axiosClient'
import { usePokemonStore } from '../stores/PokemonStore'
import Active from '../assets/Active.svg'
import Disabled from '../assets/Disabled.svg'

const props = defineProps({
  pokemonId: Number,
});
const emits = defineEmits(["close", "confirmaAccion"]);

const store = usePokemonStore();

const pokemon = ref({})
const copied = ref(false)
const imageLoaded =ref(false)
// const fetchPokemon = async (id) => {
//   try {
//     const response = await axiosClient.get(`/pokemon/${id}`);

//     // Verificamos que la respuesta tenga datos válidos
//     if (response && response.data) {
//       pokemon.value = {
//         name: response.data.name,
//         weight: response.data.weight,
//         height: response.data.height,
//         types: response.data.types.map(t => t.type.name),
//         image: response.data.sprites.other['official-artwork'].front_default,
//       };

//     } else {
//       console.warn('Respuesta vacía o inválida:', response);
//       pokemon.value = null;
//     }

//   } catch (error) {
//     console.error('Error al obtener el Pokémon:', error);
//     pokemon.value = null; // O podés mostrar un error en pantalla si querés
//   }
// };

const copyToClipboard = () => {
  if (!pokemon.value) return

  const types = pokemon.value.types.join(', ')
  const text = `Name: ${pokemon.value.name}, Weight: ${pokemon.value.weight}, Height: ${pokemon.value.height}, Types: ${types}`

  navigator.clipboard.writeText(text)
    .then(() => {
      copied.value = true
      setTimeout(() => copied.value = false, 2000)
    })
    .catch(err => {
      console.error('Failed to copy text: ', err)
    })
}

// Bloquear el scroll del body cuando el modal está abierto
onMounted(async () => {
  document.body.style.overflow = 'hidden'
  imageLoaded.value = false
  pokemon.value = await store.fetchPokemon(props.pokemonId)
})

// Restaurar el scroll cuando el modal se cierra
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 380px) {
  .modalx {
    top: 1rem;
    /* equivalente a top-12 */
  }
}

@media (max-height: 780px) {
  .modalx {
    top: 2rem;
    /* equivalente a top-12 */
  }
}

@media (max-height: 680px) {
  .modalx {
    top: 0.5rem;
    /* equivalente a top-12 */
  }
}

.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.10s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>