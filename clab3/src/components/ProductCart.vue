<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="product in products" :key="product.id">
      <div class="info">
        <h2>{{product.price}} points</h2>
      </div>
      <div class="image">
        <img :src="'/images/deck/'+product.image">
      </div>
      <div class="price">
        <button v-on:click="RemoveFromCart(product)">Remove From Deck</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array
  },

  methods: {
    RemoveFromCart(product){
    if(this.$root.$data.cart.length>0){
      
      for (var i = 0; i < this.$root.$data.cart.length; i++) {
        if(this.$root.$data.cart[i]==product){
        this.$root.$data.cart.splice(i, 1);
        }
      }

    }

    
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

.products {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 10px;
  width: 100px;
}

.product img {
  height: 155px;
  width: 105px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: black;

  padding: 1px 15px;
  height: 50px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
  color: white;
}

.info p {
  margin: 0px;
  font-size: 10px;
}

button {
  height: 50px;
  margin: 0px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>
