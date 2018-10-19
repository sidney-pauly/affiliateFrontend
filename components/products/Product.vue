<template lang="html">

<div class="card text-center mb-3 text-dark w-100 h-100" @click="redirect">
  <div class="card-header h-100" v-if="productData.Listings[lsitingBiggestImage].Images">
    <b-img-lazy center  :src="productData.Listings[lsitingBiggestImage].Images[biggestImage].URL"  fluid-grow />
  </div>
  <div class="card-body align-bottom bg-white">
    <h5 class="card-title">{{productData.Title}}</h5>
    <p class="card-text">Preis: {{getPriceRange()}}
    </p>
    <b-button :to="'/products/product-details/' + productData._id">Details</b-button>
  </div>
</div>
</template>

<script>
export default {
  props: ['productData'],
  data (){
    return {
      lsitingBiggestImage: 0,
      biggestImage: 0
    }
  },
  mounted: function () {
    
    //Find immage with highest resulution
    var currentMax = 0;
    var vm = this;
    this.productData.Listings.forEach(function(l, i){
      if(l.Images){
        l.Images.forEach(function(img, j){
        if(img.Width * img.Height > currentMax){
          vm.lsitingBiggestImage = i
          vm.biggestImage = j
          currentMax = img.Width * img.Height
        }
      })
      } 
    })
  },
  methods: {
    getPriceRange: function(){
    var min = this.productData.Listings.reduce(
      (acc, loc) =>
        acc.Price < loc.Price
          ? acc
          : loc
    )
    var max = this.productData.Listings.reduce(
      (acc, loc) =>
        acc.Price > loc.Price
          ? acc
          : loc
    );
    return min.DisplayPrice + '-' + max.DisplayPrice;
  },
  redirect: function(){
    this.$router.push(
        {
          path: '/products/product-details/' + this.productData._id
        });
  }
  }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

div.card-header {
  @include media-breakpoint-up(xs) { max-height: 500px }
  @include media-breakpoint-up(sm) { max-height: 700px }
  @include media-breakpoint-up(md) { max-height: 500px }
  @include media-breakpoint-up(lg) { max-height: 500px }
  @include media-breakpoint-up(xl) { max-height: 500px }
  z-index: 0;
  overflow: hidden;
}

div.card-body {
  z-index: 10;
}

</style>
