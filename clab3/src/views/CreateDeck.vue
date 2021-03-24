<template>
<div>
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
      
    </div>
  </div>
  <p> Click on a Card to Add it to the Black Jack Deck. You can edit your existing deck and see the values of the cards by clicking on the deck on the top right or just play with what you have</p>

      <div class="bigButton">
        <button v-on:click="AddAllToDeck()">Click Here to Set to Standard Deck</button>
        <p> Card Just Added: {{this.$root.$data.addedCard}}</p>
        
      </div>

  <ProductList :products="products" />
  <ProductList :deck="products" />
</div>
</template>


<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Home',
  components: {
    ProductList
  },
    data() {
    return {
      searchText: '',
    }
  },

   methods: {
      AddAllToDeck () {

          this.$root.$data.cart = [];
          for (var i = 0; i < this.$root.$data.deck.length; i++) {
           this.$root.$data.cart.push(this.$root.$data.deck[i])
          }
      
      }
    },

computed: {
  products() {
    return this.$root.$data.products.filter(product => product.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
  }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
