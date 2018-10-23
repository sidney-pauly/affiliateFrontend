<template lang="html">
  <div class="">
    <div class="container">
      <b-input-group>
      <b-form-input v-model="$store.state.productFilter.filter.query" type="text" placeholder="Produktname"/>
    <b-input-group-append>
      <b-btn variant="white" @click="search" v-if="nav">Suchen</b-btn>
    </b-input-group-append>
  </b-input-group>
  
  <div class="text-center" v-if="!nav">

    <b-input-group size="sm" prepend="Max Ergebnise">
      <b-form-input v-model="$store.state.productFilter.filter.maxResults" type="number" placeholder="Anzahl"/>
    </b-input-group>

    <br>

    <b-btn variant="white" block @click="search">Suchen</b-btn>
    </div>
  </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    nav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    search: function(){
      this.$store.dispatch('productFilter/filterProducts')
      this.$nuxt.$router.replace({ path: '/products' })
    }
  }
}
</script>

<style lang="css">
</style>
