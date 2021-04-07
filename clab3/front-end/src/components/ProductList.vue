
<template>
<div>

        <div class="bigButton">
        <button v-on:click="AddAllToDeck()">Click Here to Set to Standard Deck</button>
        <p> Card Just Added: {{this.$root.$data.addedCard}}</p>
        
      </div>

    <h1>Create a Deck</h1>
      <div id="projects">
     <button :class="{ selected: active(project)}" v-for="project in projects" :key=project.id @click=selectProject(project)>{{project.name}}</button>
    <form @submit.prevent="addProject">
      <input type="text" v-model="projectName">
      <button type="submit">Add a Deck</button>
    </form>

  </div>

<div class="wrapper">

  <div class="products">
    <div class="product" v-for="product in products" :key="product.id">

      <!-- <div class="image" v-on:click="addProductToCart(product)">
        <img :src="'/images/deck/'+product.image">
      </div> -->
    <form @submit.prevent="addItem">
        <div class="image" v-on:click="addItem(product)">
        <img :src="'/images/deck/'+product.image">
      </div>
    </form>


    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProductList',
  props: {
    products: Array,
    deck: Array,

  },

  data() {
    return {
      projects: [],
      project: null,
      projectName: '',
      items: [],
      text: '',

    }
  },

   created() {
    this.getProjects();
  },

  computed: {
    activeItems() {
      return this.items.filter(item => {
        return !item.completed;
      });
    },
    filteredItems() {
      if (this.show === 'active')
        return this.items.filter(item => {
          return !item.completed;
        });
      if (this.show === 'completed')
        return this.items.filter(item => {
          return item.completed;
        });
      return this.items;
    },
        cart() {
      return this.$root.$data.cart.length;
    },
  },

    methods: {

          async addProject() {
      try {
        await axios.post("/api/projects", {
          name: this.projectName,
        });
        await this.getProjects();
      } catch (error) {
        console.log(error);
      }
    },

        async getProjects() {
      try {
        const response = await axios.get("/api/projects");
        this.projects = response.data;
      } catch (error) {
        console.log(error);
      }
    },
        selectProject(project) {
      this.project = project;
      this.getItems();
    },




    async getItems() {
      try {
        const response = await axios.get(`/api/projects/${this.project._id}/items`);
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async addItem(product) {
        this.$root.$data.addedCard = product.name
      try {
        await axios.post(`/api/projects/${this.project._id}/items`, {
          
          id: product.id,
          name: product.name,
          points: product.points,
          country: product.country,
          image: product.image,
 
        });
        
        this.name = "";
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },

       async completeItem(item) {
      try {
        axios.put(`/api/projects/${this.project._id}/items/${item._id}`, {
          text: item.text,
          completed: !item.completed,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete(`/api/projects/${this.project._id}/items/${item._id}`);
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },



    active(project) {
      return (this.project && project._id === this.project._id);
    },

      addProductToCart (product) {
        this.$root.$data.cart.push(product)
        this.$root.$data.addedCard = product.name
      },

 AddAllToDeck () {

          for (var i = 0; i < this.$root.$data.products.length; i++) {
          this.addItem(this.$root.$data.products[i])
          this.$root.$data.addedCard = "Standard Deck Added"
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
.selected{
  background: red !important;
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
  margin: 5px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>
