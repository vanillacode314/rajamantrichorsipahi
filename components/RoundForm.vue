<script setup lang="ts">
import { useStore } from "@/stores";

const emit = defineEmits<{
  (e: "complete"): void;
}>();

const store = useStore();
const { guessTable, players } = store;

const step = ref<0 | 1 | 2 | 3>(0);
const currentRound = ref<number>(1);
const currentGuess = ref<0 | 1 | 2 | 3>(0);
const playerColors = ["red", "green", "rose", "purple"] as const;

const finished = computed<boolean>(
  () => currentRound.value > store.numberOfRounds,
);

function getScore(player: TPlayer) {
  let score: number = 0;
  for (const [index, outcome] of player.outcomes.entries()) {
    switch (outcome) {
      case "raja":
        score += 1_000;
        break;
      case "mantri":
        score += guessTable[index] ? 8_00 : 0;
        break;
      case "chor":
        score += !guessTable[index] ? 8_00 : 0;
        break;
      case "sipahi":
        score += 500;
        break;
    }
  }
  return score;
}

function getRanks() {
  return players.map((player) => ({
    name: player.name,
    score: getScore(player),
  }));
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <UCard class="w-full max-w-[30rem] mx-auto" v-if="!finished">
      <template #header>
        <h2 class="col-span-full text-center text-2xl md:text-5xl font-bold">
          Round {{ currentRound }}
        </h2>
      </template>

      <div class="grid md:grid-cols-2 gap-3" v-if="step === 0">
        <h3 class="col-span-full text-center text-3xl font-bold">
          Who was raja?
        </h3>
        <UButton
          @click="
            () => {
              player.outcomes.push('raja');
              step++;
            }
          "
          size="xl"
          variant="soft"
          :color="playerColors[index]"
          v-for="(player, index) in players"
          :key="player.name"
          >{{ player.name }}</UButton
        >
      </div>
      <div class="grid md:grid-cols-2 gap-3" v-else-if="step === 1">
        <h3 class="col-span-full text-center text-3xl font-bold">
          Who was mantri?
        </h3>
        <UButton
          @click="
            () => {
              player.outcomes.push('mantri');
              step++;
            }
          "
          size="xl"
          variant="soft"
          :color="playerColors[index]"
          v-for="(player, index) in players"
          :key="player.name"
          :disabled="
            player.outcomes.at(-1) === 'raja' &&
            player.outcomes.length === currentRound
          "
          >{{ player.name }}</UButton
        >
      </div>
      <div class="grid md:grid-cols-2 gap-3" v-else-if="step === 2">
        <h3 class="col-span-full text-center text-3xl font-bold">
          Who did mantri guess was chor?
        </h3>
        <UButton
          @click="
            () => {
              currentGuess = index as 0 | 1 | 2 | 3;
              step++;
            }
          "
          size="xl"
          variant="soft"
          :color="playerColors[index]"
          v-for="(player, index) in players"
          :disabled="
            ['raja', 'mantri'].includes(player.outcomes.at(-1) ?? '') &&
            player.outcomes.length === currentRound
          "
          :key="player.name"
          >{{ player.name }}</UButton
        >
      </div>
      <div class="grid md:grid-cols-2 gap-3" v-else-if="step === 3">
        <h3 class="col-span-full text-center text-3xl font-bold">
          Who was the chor?
        </h3>
        <UButton
          @click="
            () => {
              player.outcomes.push('chor');

              const isCorrectGuess = currentGuess === index;
              guessTable.push(isCorrectGuess);

              const lastPlayer = players.find(
                (player) => player.outcomes.length < currentRound,
              )!;
              lastPlayer.outcomes.push('sipahi');

              step = 0;
              currentRound++;
            }
          "
          size="xl"
          variant="soft"
          :color="playerColors[index]"
          v-for="(player, index) in players"
          :disabled="
            ['raja', 'mantri'].includes(player.outcomes.at(-1) ?? '') &&
            player.outcomes.length === currentRound
          "
          :key="player.name"
          >{{ player.name }}</UButton
        >
      </div>
    </UCard>
    <UCard class="w-full max-w-[30rem] mx-auto" v-else>
      <template #header>
        <h2 class="col-span-full text-center text-2xl md:text-5xl font-bold">
          Results
        </h2>
      </template>

      <UTable :rows="getRanks()"></UTable>
    </UCard>
  </div>
</template>
