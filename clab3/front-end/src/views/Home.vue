<template>
<div>
<h3> Instructions </h3>
  <p> The goal of blackjack is to beat the dealer's hand without going over 21.
Face cards are worth 10, the ace in this game is only worth 11. Both the dealer and the player start with 2 cards
To 'Hit' is to ask for another card, do this by clicking on the card below. If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.
The game will play with a standard deck. To play again you must click the restart button first.  </p>

  
            <button v-on:click="startGame()">Start Game</button>
            <button v-on:click="reloadPage()">Restart</button>

     <div v-if="this.$root.$data.dealerValue>21"><h4>BUST!</h4></div>
     <div v-else-if ="this.$root.$data.dealer.length>0"> <h2>Dealer's Hand</h2>  <Dealer :products="dealer" /> </div>

            <button v-on:click="stand()">Stand</button>
            
             <h2>Your Hand</h2> 

  <div class="wrapper">

    <div class = "draw">
  <p class="play">
      <img v-on:click="AddToHand()" src="/images/deck/blue_back.jpg">
  </p>

  </div>
 
    <div v-if="this.$root.$data.hand.length<1"><h2>Hand is Empty</h2></div>
    <div v-if="this.$root.$data.value>21"><h4>BUST!</h4></div>
    <div v-else-if="this.$root.$data.value == -10"><h4>YOU LOOSE!</h4></div>
    <div v-else-if="this.$root.$data.value == -2"><h4>TIE!</h4></div>
    <div v-else-if="this.$root.$data.value == -3"><h4>YOU WIN!</h4></div>
     <div v-else> <PlayBlackJack :products="hand" /> </div>
            


 

</div>
</div>
</template>


<script>
import PlayBlackJack from "../components/PlayBlackJack.vue"
import Dealer from "../components/DealerBJ.vue"
export default {
  name: 'Home',
  components: {
    PlayBlackJack,
    Dealer
  },
    data() {
    return {
  
    }
  },

   methods: {
      AddToHand () {

        if(this.$root.$data.cart.length == 0 ){

        var drawnCardIndex = Math.floor(Math.random() * this.$root.$data.deck.length) 
        

              this.$root.$data.hand.push(this.$root.$data.deck[drawnCardIndex])


      if(this.$root.$data.deck.length>0){
      
      for (var i = 0; i < this.$root.$data.deck.length; i++) {
        if(this.$root.$data.deck[i]==this.$root.$data.deck[drawnCardIndex]){
        this.$root.$data.deck.splice(i, 1);
        }
      }

    }
        }
        else
        this.$root.$data.hand.push(this.$root.$data.cart[Math.floor(Math.random() * this.$root.$data.cart.length)])

              if(this.$root.$data.cart.length>0){
      
      for (var j = 0; j < this.$root.$data.cart.length; j++) {
        if(this.$root.$data.cart[j]==this.$root.$data.cart[drawnCardIndex]){
        this.$root.$data.cart.splice(j, 1);
        }
      }

    }
        var sum = 0;
        for (let i = 0; i < this.$root.$data.hand.length; i++){
          sum += this.$root.$data.hand[i].points;
        }

      if(sum > 21 ){
        this.$root.$data.value = 100;
      }
      else
      this.$root.$data.value = sum;

      },




            dealerDraw(){

if(this.$root.$data.cart.length == 0 ){

        var drawnCardIndex = Math.floor(Math.random() * this.$root.$data.deck.length) 
        

              this.$root.$data.dealer.push(this.$root.$data.deck[drawnCardIndex])


      if(this.$root.$data.deck.length>0){
      
      for (var i = 0; i < this.$root.$data.deck.length; i++) {
        if(this.$root.$data.deck[i]==this.$root.$data.deck[drawnCardIndex]){
        this.$root.$data.deck.splice(i, 1);
        }
      }

    }
        }
        else
        this.$root.$data.dealer.push(this.$root.$data.cart[Math.floor(Math.random() * this.$root.$data.cart.length)])

              if(this.$root.$data.cart.length>0){
      
      for (var j = 0; j < this.$root.$data.cart.length; j++) {
        if(this.$root.$data.cart[j]==this.$root.$data.cart[drawnCardIndex]){
        this.$root.$data.cart.splice(j, 1);
        }
      }

    }
        var sum = 0;
        for (let i = 0; i < this.$root.$data.dealer.length; i++){
          sum += this.$root.$data.dealer[i].points;
        }

      if(sum > 21 ){
        this.$root.$data.dealerValue = 100;
      }
      else
      this.$root.$data.dealerValue = sum;

        
      
      },


      startGame(){

        this.AddToHand ();
        this.AddToHand ();
        this.dealerDraw ();
        this.dealerDraw ();
        

      },
            stand(){
            
            if(this.$root.$data.dealerValue<17)
            this.dealerDraw ();

            if(this.$root.$data.dealerValue>21){
            this.$root.$data.dealerValue = -10;
            this.$root.$data.dealerValue = -10;
            }
            
            else if(this.$root.$data.dealerValue>this.$root.$data.value){
              this.$root.$data.dealerValue = -10;
              this.$root.$data.value = -10;
            }


            else     {
            this.$root.$data.dealerValue = -3;
              this.$root.$data.value = -3;
            }


        

      },
        reloadPage(){
    window.location.reload()
  }
    },

computed: {
    hand() {
      return this.$root.$data.hand;
    },
        dealer() {
      return this.$root.$data.dealer;
    }
  },
}
</script>

<style scoped>

h4{
  color: red;
  font-size: 50px;
}

.play {
  margin: 10px;
  margin-top: 10px;
  width: 100px;
}

.draw{
  display: flex;
  width: 50%;
  height: 210px;
}
.play img {
  height: 320px;
  width: 210px;
  object-fit: cover;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
 
</style>
