<script setup lang="ts">
import { useStore } from "@/stores";

const emit = defineEmits<{
  (e: "complete"): void;
}>();

const store = useStore();
const { players } = store;

const step = ref<0 | 1 | 2 | 3>(0);

function onSubmit() {
  step.value++;
  if (step.value === 3) {
    emit("complete");
  }
}
</script>

<template>
  <form class="grid place-content-center h-full" @submit.prevent="onSubmit">
    <template v-if="step === 0">
      <UButton class="px-12 py-10 text-6xl" type="submit">Start Game</UButton>
    </template>
    <template v-else-if="step === 1">
      <div class="grid md:grid-cols-2 gap-3">
        <h3 class="col-span-full text-center text-3xl mb-10 font-bold">
          Enter Player Names
        </h3>
        <UInput
          v-model="player.name"
          size="xl"
          v-for="(player, index) in players"
          :key="index"
        />
        <UButton class="col-span-full" size="xl" type="submit">Next</UButton>
      </div>
    </template>
    <template v-else-if="step === 2">
      <div class="flex flex-col gap-3">
        <h3 class="col-span-full text-center text-3xl font-bold">
          How many rounds do you want to play?
        </h3>
        <UInput v-model="store.numberOfRounds" type="number" size="xl" />
        <UButton size="xl" type="submit">Play</UButton>
      </div>
    </template>
  </form>
</template>
