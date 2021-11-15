<template>
  <div>
    <h1>Ansatte</h1>
    <Toggle v-model="showActive"></Toggle>
    <label> aktive </label>

    <div v-if="users">
      <transition-group
        name="staggered-fade"
        tag="div"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        class="about"
      >
        <div
          v-for="user in usersForView"
          :key="user"
          @click="toggle(user)"
          style="margin: 0.5em auto; width: 300px"
          class="list-item"
        >
          <div
            style="
              display: grid;
              grid-template-columns: 1fr 6fr;
              border-radius: 2em;
              height: 150px;
            "
            :class="[user.hasPaid ? 'active' : 'inactive']"
          >
            <img
              :src="user.image"
              style="height: inherit; border-radius: 2em"
            />
            <span style="margin-top: 1em">{{ user.name }}</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
import { gsap } from "gsap";
import "@vueform/toggle/themes/default.css";

export default {
  components: { Toggle },
  data() {
    return {
      users: this.$store.getters.getUsers,
      showActive: false,
      usersForView: this.$store.getters.getUsers,
    };
  },
  watch: {
    showActive(value) {
      if (value == true)
        this.usersForView = this.users.filter((x) => x.hasPaid);
      else this.usersForView = this.users;
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: "1.6em",
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        width: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },
    toggle(element) {
      element.hasPaid = !element.hasPaid;
    },
  },
};
</script>
<style>
.about {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.active {
  background: #62ff0040;
}
.inactive {
  background: #e7e7e7;
}
</style>
