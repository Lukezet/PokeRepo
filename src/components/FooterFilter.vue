<template>
  <transition name="slide-up">
    <div 
      v-if="showNav"
      class="fixed bottom-0 pb-8 left-0 pt-4 w-full flex justify-center shadow-[0_-5px_4px_0_rgba(0,0,0,0.05)] bg-white"
    >
      <div class="flex w-10/12 sm:w-6/12 space-x-2">

        <button  @click="localFilter = 'all'" class="transition-colors p-2  w-1/2 flex justify-center space-x-2 cursor-pointer " :class="props.filter === 'all'
        ? 'btn-poke font-medium  '
        : 'btn-poke-disabled hover:text-red-500 p-2 '">
        <img src="../assets/list.svg" alt="">
        <p>All</p>
      </button>

      <button @click="localFilter = 'favorites'" class="transition-colors p-2 w-1/2 flex justify-center space-x-2 cursor-pointer" :class="props.filter === 'favorites'
        ? 'btn-poke font-medium  '
        : 'btn-poke-disabled hover:text-red-500 p-2'">
        <img src="../assets/starwhite.svg" alt="">
        <p>Favorites</p>
      </button>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
const props = defineProps({
  filter: String
})
const emit = defineEmits(['update:filter'])
const localFilter = ref(props.filter)
const filter = ref('all');
const showNav = ref(false);

watch(localFilter, (newVal) => {
  emit('update:filter', newVal)
})

onMounted(() => {
  showNav.value = true;
});
</script>

<style scoped>
/* Transición mejorada */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 4.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}
</style>