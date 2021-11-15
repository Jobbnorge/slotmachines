<template>
  <div>
    <Header></Header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
  <link href="http://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: { Header },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Roboto";
  letter-spacing: 2px;
}
.container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  max-width: 40rem;
  margin: 3rem auto;
  padding: 1rem;
  border-radius: 12px;
}
.route-enter-from {
  opacity: 0;
  transform: translatex(-500px);
}

.route-leave-to {
  opacity: 0;
  transform: translatex(500px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translatex(0);
}
* {
  box-sizing: border-box;
}
</style>
