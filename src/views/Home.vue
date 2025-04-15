<template>
  <div class=" flex flex-col w-full h-screen justify-center items-center  p-8">

    <Transition>
      <div v-if="show" class="min-h-screen flex flex-col items-center justify-center  text-center mb-24 sm:mb-0">
        <img src="../assets/pikachu.svg" alt="Pikachu" class="mb-12" />
        <h1 class="text-2xl  text-gray-800 mb-6 font-lato font-[700] ">Welcome to Pokédex</h1>
        <p class="text-gray-600 max-w-md mb-12 ">
          The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
        </p>
        <button class="btn-poke text-white font-[500] py-2 px-6 rounded-full transition duration-200 cursor-pointer"
          @click="start">
          Get started
        </button>
      </div>

    </Transition>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Importa useRouter

const router = useRouter(); // Obtiene la instancia del router
const show = ref(false);

const start = () => {
  router.push({ name: 'List' }); // Navega a la ruta con nombre 'List'
};

onMounted(() => {
  show.value = !show.value;
});
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>