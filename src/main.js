import json from "./storage.json";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      users: json.users,
      winners: [],
    };
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getWinners(state) {
      return state.winners;
    },
  },
  mutations: {
    toggleHasPaid(state, user) {
      state.users.filter((u) => u.name == user.name).hasPaid = !user.hasPaid;
    },
    addToWinner(state, user) {
      user.date = new Date().toLocaleString();
      state.winners.push(user);
      console.log(this.state.winners);
    },
  },
});

import App from "./App.vue";
// ROUTES

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Winners from "./views/Winners.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/winners", component: Winners },
  ],
});
//END ROUTES

const app = createApp(App);

app.use(router);
app.use(store);

router.isReady().then(() => {
  app.mount("#app");
});
