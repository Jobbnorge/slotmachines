<template>
  <header>
    <nav id="nav" class="page-header">
      <ul>
        <li>
          <router-link to="/">SPILL</router-link>
        </li>
        <li>
          <router-link to="/about">DELTAKERE</router-link>
        </li>
        <li>
          <router-link to="/winners">VINNERE</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style>
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: linear-gradient(180deg, rgb(139, 11, 255), transparent);
}
.page-header {
  height: 5em;
}
.header-links {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.3em;
}
.header-links > a {
  margin-bottom: 1em;
}

#nav a {
  font-weight: bold;
  color: #5fff67;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ff81e4;
  text-decoration: underline;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
li {
  margin: 0 1rem;
}
</style>
