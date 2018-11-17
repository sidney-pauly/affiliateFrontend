<template lang="html">
  <div class="container bg-light">
    <div class="">

      <br>
      <h1>{{product.Title}}</h1>
      <br>

      <div class="divider">
        <ImageViewer :Images="product.Listings.map(l => {return l.Images[0]})"/>
        <br>
      </div>


      <div class="divider">
        <h2>Produktbeschreibung</h2>
        <p>{{product.Listings[0].Description}}</p>
      </div>

      <br>
      <div class="" v-for="listing in product.Listings">
        <Listing  :listingData="listing"/>
        <br>
      </div>


    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Listing from '@/components/products/Listing.vue'
import ImageViewer from '@/components/ImageViewer.vue'

export default {
  components: {
    Listing,
    ImageViewer
  },
  async fetch ({ store, params, route }) {
    await store.dispatch('productFilter/getProductById', route.params.id);
  },
  computed: {
    product () {
      return this.$store.state.productFilter.detailProduct;
    }
  },
  data () {
    return {
      asc: true,
      sortParam: 'Price'
    }
  },
  watch: {
    asc: function(){
      this.sortListings();
    },
    sortParam: function(){
      this.sortListings();
    }
  },
  methods: {
    sortListings: function(){
      if(this.asc){
        this.product.Listings = this.product.Listings = this.product.Listings.sort((a, b) => {
          return a[this.sortParam] - b[this.sortParam]
        });

      }else{
        this.product.Listings = this.product.Listings.sort((a, b) => {
          return b[this.sortParam] - a[this.sortParam]
        })
      }
    }
  },
  mounted: function(){
    this.sortListings();
  }
}
</script>

<style lang="css">

</style>
