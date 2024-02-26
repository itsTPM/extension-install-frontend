<script setup>
import { onMounted, ref } from 'vue';

let data = ref([]);

onMounted(async () => {
  data.value = await fetch('https://api.github.com/repos/itsTPM/foxford-tools/releases').then((response) =>
    response.json()
  );
});
</script>

<template>
  <div>
    <h1>Changelog</h1>
    <ul>
      <li v-for="release in data" :key="release.id">
        <h2>{{ release.name }}</h2>
        <p>{{ release.body }}</p>
      </li>
    </ul>
  </div>
</template>
