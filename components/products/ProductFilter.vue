<template lang="html">
  <div class="">
    <div class="container">
      <b-input-group>
      <b-form-input v-model="$store.state.productFilter.query" type="text" placeholder="Produktname"/>
    <b-input-group-append>
      <b-btn variant="white" @click="search" v-if="nav">Suchen</b-btn>
    </b-input-group-append>
  </b-input-group>
  
  <div class="text-center" v-if="!nav">

    <b-input-group size="sm" prepend="Max Ergebnise">
      <b-form-input v-model="$store.state.productFilter.maxResults" type="number" placeholder="Anzal"/>
    </b-input-group>

    <br>

    <b-btn variant="white" block @click="search">Suchen</b-btn>
    </div>
  </div>

  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  computed: {
    filter () {
      return this.$store.state.productFilter;
    }
  },
  props: {
    nav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    
    search: function(){
      console.log('search')

      var vm = this;

      //Only use websocket if user agrees to cookies
      if(vm.$store.state.cookies){
          //Connect to socket if none exists
        if(!vm.$store.state.socket){
          vm.$store.state.socket = io.connect('http://localhost:3001');
        }

        if(!vm.$store.state.socket._callbacks.$product){
          vm.$store.state.socket.on('product', function (data) {
            vm.$store.commit('updateProductFilterLoading', false)
            vm.$store.commit('pushProduct', data)
          });
        }

        vm.$store.state.socket.emit('getProducts', vm.$store.state.productFilter);

        vm.$store.commit('updateAllProducts', [])
        vm.$store.commit('updateProductFilterLoading', true)

        if(vm.nav){
          vm.$nuxt.$router.replace({ path: '/products' })
        }
        
      } else {
        vm.$store.dispatch('getProducts', vm.$store.state.productFilter)
      }
          
      
    }
    
  }
}
</script>

<style lang="css">
</style>
