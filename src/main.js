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
      function compare(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
      return state.users.sort(compare);
    },
    getWinners(state) {
      return state.winners.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
  },
  mutations: {
    toggleHasPaid(state, user) {
      state.users.filter((u) => u.name == user.name).hasPaid = !user.hasPaid;
    },
    addToWinner(state, user) {
      user.hasPaid = false;
      user.date = new Date().toLocaleString();
      state.winners.push(user);
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
