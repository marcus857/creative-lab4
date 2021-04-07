<template>
<div>
  <h1>Choose a Deck To Edit</h1>
      <div id="projects">
     <button :class="{ selected: active(project)}" v-for="project in projects" :key=project.id @click=selectProject(project)>{{project.name}}</button>
        <div class="button">
<!-- 
        <button @click="deleteItem(item)" class="space">Load Deck for Game
        </button> -->
        
      </div>
<div class="wrapper">
  <div class="products" v-if="project">
    <p v-show="activeItems.length === 0">No Cards In this Deck</p>

      <div class = "product" v-for="item in filteredItems" :key="item.id">
                
                <button @click="deleteItem(item)" class="space">X
        </button>
        <div class="image" v-on:click="deleteItem(product)">

        <img :src="'/images/deck/'+ item.image">

      </div>
                  <div>
          <p> {{item.points}} Points</p> 
          </div>
      </div>

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
    showAll() {
      this.show = 'all';
    },
    showActive() {
      this.show = 'active';
    },
    showCompleted() {
      this.show = 'completed';
    },
    deleteCompleted() {
      this.items.forEach(item => {
        if (item.completed)
          this.deleteItem(item);
      });
    },


    active(project) {
      return (this.project && project._id === this.project._id);
    },

      addProductToCart (product) {
        this.$root.$data.cart.push(product)
        this.$root.$data.addedCard = product.name
      },

 async loadDeck() {
      try {
        const response = await axios.get(`/api/projects/${this.project._id}/items`);
        this.items = response.data;
        alert (this.project._id)
      } catch (error) {
        console.log(error);
      }
    },
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
  margin: 5px;

  height: 50px;
}

.info h1 {
  font-size: 16px;
}
.selected{
  background: red !important;
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
  margin-top: 5px;
  margin-right: 5px;
  background: #000;
  
  color: white;
  border: none;
}

.space{
  margin: 0px !important;
  background: white !important;
  color: black;
  border: none;
  height: 0px !important;
}
.auto {
  margin-left: auto;
}
</style>
