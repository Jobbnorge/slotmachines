<template>
  <div
    id="confetti"
    style="
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      display: table;
      background: linear-gradient(180deg, #8b0bff, #ffcbcb);
    "
    v-if="winner"
  >
    <div
      style="
        display: grid;
        justify-items: center;
        grid-gap: 1em;
        margin-top: 20vh;
      "
    >
      <img :src="winner.image" alt="xd" style="border-radius: 1em" />
      <h1>{{ winner.name }}</h1>
      <div v-if="moreActions">
        <p>LEGG TIL SOM VINNER?</p>
        <div
          style="display: flex; gap: 1em; width: 100%; justify-content: center"
        >
          <h3
            @click="addToWinners(winner)"
            style="padding: 1em; cursor: pointer"
            class="clickable"
          >
            JA
          </h3>
          <h3
            style="padding: 1em; cursor: pointer"
            class="clickable"
            @click="$emit('Reset')"
          >
            NEI
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { winner: Object },
  emits: ["Reset"],
  methods: {
    addToWinners(user) {
      this.$store.commit("addToWinner", user);
      this.moreActions = false;
      this.$router.push("/winners");
    },
  },
  data() {
    return {
      moreActions: true,
    };
  },
};
</script>

<style scoped>
.clickable {
  border: 1px solid transparent;
  border-radius: 1em;
}
.clickable:hover {
  border: 1px solid pink;
  text-decoration: underline pink;
  background: rgba(216, 112, 147, 0.24);
}
</style>
