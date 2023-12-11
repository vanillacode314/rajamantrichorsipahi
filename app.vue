<script setup lang="ts">
import SetupForm from "@/components/SetupForm.vue";

const rulesModalOpen = ref<boolean>(false);
const configDone = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col p-5 gap-5 h-full">
    <nav class="content-grid">
      <header class="flex gap-5">
        <h3 class="text-lg font-bold">Raja Mantri Chor Sipahi</h3>
        <span class="grow"></span>
        <UButton @click="rulesModalOpen = true">Rules</UButton>
      </header>
    </nav>
    <main class="content-grid grow">
      <SetupForm v-if="!configDone" @complete="configDone = true" />
      <RoundForm v-else />
    </main>
    <UModal v-model="rulesModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
        class="[&_p]:mb-5 last:[&_p]:mb-0"
      >
        <template #header>
          <h2>Rules</h2>
        </template>

        <p>
          You start by taking 4 pieces of paper. Writing one of "Raja" (King),
          "Mantri" (Minister), "Chor" (Thief) and "Sipahi" (Soldier) on each of
          them. After writing the name on each of the four pieces of paper, fold
          them twice.
        </p>

        <p>Now each round toss the papers and each player picks one paper.</p>

        <p>
          Whoever gets <strong>Raja</strong> announces themselves and asks who
          the <strong>Mantri</strong> is.
        </p>

        <p>
          After that the <strong>Mantri</strong> has to figure out who the
          <strong>Sipahi</strong> is and who the <strong>Chor</strong> is from
          the rest of the two players.
        </p>

        <p>
          If the <strong>Mantri</strong> guesses wrong, the
          <strong>Chor</strong> takes the <strong>Raja's</strong> treasure and
          escapes.
        </p>

        <template #footer>
          <div class="flex justify-end w-full">
            <UButton color="red" @click="rulesModalOpen = false">Close</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
