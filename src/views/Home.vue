<template>
  <div>
    <div v-if="!winner">
      <transition name="fade" mode="out-in">
        <Wheel
          v-if="dataUsers.length > 1"
          ref="wheel"
          :gift="gift"
          :data="dataUsers"
          @done="done"
          :imgParams="logo"
          style="margin: 0 auto; width: 80vw; height: 80vh; user-select: none"
          @click="spinTheWheel"
          :animDuration="8500"
        />
        <div v-else>
          <div v-if="dataUsers.length == 0">
            <h3>Ingen deltakere</h3>
            <p>
              Legg til deltakere for å spille. Gå til 'Deltakere' og legg til.
            </p>
          </div>
          <div v-if="dataUsers.length == 1">
            <h3>For få deltakere</h3>
            <p>Det må være minst 2 deltakere.</p>
          </div>
        </div>
      </transition>
    </div>
    <RoulletteWinner
      v-if="winner"
      :winner="winner"
      @Reset="playAgain"
    ></RoulletteWinner>
  </div>
</template>

<script>
import { Wheel } from "vue3-fortune-wheel";
import { Random } from "random-js";

import JSConfetti from "js-confetti";
import RoulletteWinner from "@/components/RoulletteWinner";
export default {
  components: {
    Wheel,
    RoulletteWinner,
  },
  computed: {},
  created() {
    var users = this.$store.getters.getUsers.filter((x) => x.hasPaid);
    if (users.length > 0) {
      var data = [];
      users.forEach((element) => {
        data.push({
          id: element.name,
          value: element.name.split(" ")[0],
          bgColor: "#ffffff",
        });
      });
      this.dataUsers = data;
      const i = this.random.integer(1, this.dataUsers.length);
      this.gift = this.dataUsers[i - 1].id;
    }
  },
  data() {
    return {
      gift: null,
      logo: {
        width: 200,
        height: 200,
        backround: "#127dac",
      },
      audio: new Audio(require("../assets/spinning.mp3")),
      dataUsers: [],
      winner: null,
      random: new Random(),
      confettiMachine: new JSConfetti(),
    };
  },
  methods: {
    addToWinners(user) {
      this.$store.commit("addToWinner", user);
    },
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      const i = this.random.integer(1, this.dataUsers.length);
      this.gift = this.dataUsers[i - 1].id;
      return array;
    },
    playAgain() {
      this.winner = null;
    },
    spinTheWheel() {
      this.audio.play();
      this.$refs.wheel.spin();
    },
    done(val) {
      this.confettiMachine.addConfetti();
      setTimeout(() => {
        this.winner = this.$store.getters.getUsers.filter(
          (u) => u.name == val.id
        )[0];
        this.dataUsers = this.shuffle(this.dataUsers);
      }, 1500);
    },
  },
};
</script>
<style>
.wheelholder > circle {
  fill: #127dac;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
