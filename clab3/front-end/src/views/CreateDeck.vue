<template>
<div>
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
      
    </div>
  </div>
  <p> Create and name custom decks and add cards to them by clicking on them. The deck name in red is the one you are adding cards to and you can add 1 of each by clicking on the standard deck button.</p>



  <ProductList :products="products" />
</div>
</template>


<script>
import axios from 'axios';
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Home',
  components: {
    ProductList
  },
    data() {
    return {
      searchText: '',
      projects: [],
      project: null,
      projectName: '',
      items: [],

    }
  },
    created() {
    this.getProjects();
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
       AddAllToDeck () {

          for (var i = 0; i < this.$root.$data.products.length; i++) {
          this.addItem(this.$root.$data.products[i])
          this.$root.$data.addedCard = "Standard Deck Added"
          }
       }
    },

computed: {
  products() {
    return this.$root.$data.products.filter(product => product.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
  }
  },
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
