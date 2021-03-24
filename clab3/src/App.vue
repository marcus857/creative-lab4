<template>
<div id="app">
  <div id="menu">

    <div id="brand">
      <router-link to="/">
        <h1> BLACKJACK </h1>
      </router-link>
    </div>
    <div id="side">

<div id="lside">
  <router-link to="/CreateDeck">
    <div class="menu-item">
        <img src="/images/add.svg">
        <p> + Cards </p>
      </div>
  </router-link>
  </div>
      <router-link to="/cart">
        <div class="menu-item">
          <img src="/images/CardIcon.svg">
          <p>{{this.$root.$data.cart.length}} Cards</p>
        </div>
      </router-link>

    </div>
  </div>
  <router-view />
</div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;

}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #B84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
  
}

h1 {
color: black;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
  margin: 10px;
}

#lside img {
  width: 42px;
  margin: 15px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}
.router-link-exact-active .router-link--active{
  color: black !important;
}
a{
  color: black !important;
}

.menu-item p {
  margin: 0px;
  color: black;
}

.browse {
  margin-right: 50px;
}
</style>