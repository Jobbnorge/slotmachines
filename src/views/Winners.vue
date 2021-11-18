<template>
  <div>
    <h1>Vinnere</h1>
    <ul
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        width: 80vw;
        margin: auto;
      "
    >
      <li v-for="winner in winners" :key="winner">
        <img :src="winner.image" />
        <p>{{ winner.name }}</p>
        <p>{{ winner.date }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      winners: [],
    };
  },
  created() {
    this.winners = this.$store.getters.getWinners;
  },
};
</script>

<style></style>
