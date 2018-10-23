<template lang="html">

<div class="card text-center mb-3 text-dark w-100 h-100" @click="redirect">
  <div class="card-header h-100" v-if="productData.Listings[lsitingBiggestImage]">
    <b-img-lazy v-if="productData.Listings[lsitingBiggestImage].Images[biggestImage]" center  :src="productData.Listings[lsitingBiggestImage].Images[biggestImage].URL"  fluid-grow />
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
  props: ["productData"],
  data() {
    return {
      lsitingBiggestImage: 0,
      biggestImage: 0
    };
  },
  mounted: function() {
    this.getBiggestImage();
  },
  watch: {
    productData: function() {
      this.getBiggestImage();
    }
  },
  methods: {
    getPriceRange: function() {
      var min = this.productData.Listings.reduce(
        (acc, loc) => (acc.Price < loc.Price ? acc : loc)
      );
      var max = this.productData.Listings.reduce(
        (acc, loc) => (acc.Price > loc.Price ? acc : loc)
      );
      return min.DisplayPrice + "-" + max.DisplayPrice;
    },
    redirect: function() {
      this.$router.push({
        path: "/products/product-details/" + this.productData._id
      });
    },
    getBiggestImage() {
      //Find immage with highest resulution
      var currentMax = 0;
      var vm = this;
      this.productData.Listings.forEach(function(l, i) {

        l.Images.push({
          URL: "https://via.placeholder.com/500.png?text=Kein+bild+vorhanden",
          Height: -1,
          Width: 1
        });

        l.Images.forEach(function(img, j) {
          if(!img.URL){
            img.URL = "https://via.placeholder.com/500.png?text=Kein+bild+vorhanden";
          }
          if (img.Width * img.Height > currentMax) {
            vm.lsitingBiggestImage = i;
            vm.biggestImage = j;
            currentMax = img.Width * img.Height;
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

div.card-header {
  @include media-breakpoint-up(xs) {
    max-height: 500px;
  }
  @include media-breakpoint-up(sm) {
    max-height: 700px;
  }
  @include media-breakpoint-up(md) {
    max-height: 500px;
  }
  @include media-breakpoint-up(lg) {
    max-height: 500px;
  }
  @include media-breakpoint-up(xl) {
    max-height: 500px;
  }
  z-index: 0;
  overflow: hidden;
}

div.card-body {
  z-index: 10;
}
</style>
