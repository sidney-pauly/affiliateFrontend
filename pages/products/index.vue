<template>
  <div class="">
    <div class="container-fluid">
      <br>
      <br>
      <ProductFilter includeChildren/>
      <br>
      <br>

      <div  class="row">
        <div  class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col" v-for="product in products" :key="product._id + '' + product.__v" >
          <Product :productData="product"  />
        </div>
        <div v-if="products.length <= 0 && !loading">
          <h2> Keine Produkte gefunden :(</h2>
        </div>
        
      </div>
      <div v-if="products.length > 0 && !loading" class="p-5">
          <b-btn block variant="success" @click="nextPage">Mehr Produkte</b-btn>
          <br>
          <br>
          <br>
        </div>
      <div v-if="loading" class="text-center">
        <img src="/loading.svg" alt="loader">
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/products/Product.vue'
import ProductFilter from '@/components/products/ProductFilter.vue'
import { mapState } from 'vuex'


export default {
  components: {
    Product,
    ProductFilter
  },
  computed: mapState({

    loading: state => state.productFilter.loading,
    products: state => state.productFilter.products

  }),
  methods: {
    nextPage () {
      this.$store.state.productFilter.filter.page++;
      this.$store.dispatch('productFilter/filterProducts', true)
    }
  }
}
</script>

<style scoped>
  .col {
    margin-bottom: 20px;
  }

  .container-fluid {
     min-height: 100vh;
  }

</style>
