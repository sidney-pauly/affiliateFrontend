<template>
  <div class="">
    <ul>
      <li v-for="p in products" :key="p._id"><a :href="'/products/product-details/' + p._id">{{p.Title}}</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'



export default {
  asyncData ({ error, route }) {
    return axios.get(config.apiURL + '/allProducts')
    .then((res) => {
      return { products: res.data }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'product not found: ' + e })
    })
  }
}
</script>

<style scoped>


</style>
