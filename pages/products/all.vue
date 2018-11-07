<template>
  <div class="">
    <ul>
      <li v-for="p in $store.state.productFilter.products" :key="p._id"><a :href="'/products/product-details/' + p._id">{{p.Title}}</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'



export default {
   async fetch ({ store, params }) {
    await store.dispatch('productFilter/getAllProducts');
  }
}
</script>

<style scoped>


</style>
