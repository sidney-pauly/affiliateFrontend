<template>
  <div class="bg-dark text-white h-100 hide-overlap-img">
    <div class="container-fluid">
      <br>
      <br>
      <ProductFilter/>
      <br>
      <br>

      <div v-if="!loading" class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col" v-for="product in products" :key="product._id + '' + product.__v" >
          <Product :productData="product"  />
        </div>
      </div>
      <div v-else>
        <h2>Loading ...</h2>
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
