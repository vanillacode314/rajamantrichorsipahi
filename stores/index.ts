import { skipHydrate } from "pinia";

export const useStore = defineStore("store", () => {
  const players = skipHydrate(
    useLocalStorage<[TPlayer, TPlayer, TPlayer, TPlayer]>("players", [
      { name: "Player 1", outcomes: [] },
      { name: "Player 2", outcomes: [] },
      { name: "Player 3", outcomes: [] },
      { name: "Player 4", outcomes: [] },
    ]),
  );
  players.value.forEach((player) => (player.outcomes = []));

  const numberOfRounds = ref<number>(20);

  /** true if correct guess */
  const guessTable = reactive<boolean[]>([]);

  return { players, numberOfRounds, guessTable };
});
