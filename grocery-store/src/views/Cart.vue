<template>
<div>
  <h1> Your Cart</h1>
  <div v-if="this.$root.$data.cart.length<1"><h2>Cart is Empty</h2></div>
  <ProductCart :products="cart" />
</div>
</template>

<script>
import ProductCart from "../components/ProductCart.vue"
export default {
  name: 'Cart',
  components: {
    ProductCart
  },
  data() {
    return {
    }
  },
  computed: {
    cart() {
      return this.$root.$data.cart;
  },
  methods: {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
