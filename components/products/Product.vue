<template lang="html">

<div class="card text-center mb-3 text-white w-100 h-100" @click="redirect">
  <div class="card-header bg-white h-100 big-header p-0" v-if="productData.Listings[lsitingBiggestImage]">
    <img class="img" v-if="productData.Listings[lsitingBiggestImage].Images[biggestImage]" center  :src="productData.Listings[lsitingBiggestImage].Images[biggestImage].URL" />
  </div>
  <div class="card-body align-bottom bg-dark">
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
      if(this.productData.Listings.length > 0){
        var min = this.productData.Listings.reduce(
        (acc, loc) => (acc.Price < loc.Price ? acc : loc)
      );
      var max = this.productData.Listings.reduce(
        (acc, loc) => (acc.Price > loc.Price ? acc : loc)
      );
      return min.Price + "€ - " + max.Price + '€';
      }
      else {
        return 'N/A'
      }
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

.card{
  border-style: solid;
  border-width: 4px;
  border-color: $dark;
}

img{
  max-height: 60vh;
  object-fit: cover;
  max-width: 100%;
}

div.big-header {
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

div.small-header {
  @include media-breakpoint-up(xs) {
    max-height: 125px;
  }
  @include media-breakpoint-up(sm) {
    max-height: 135px;
  }
  @include media-breakpoint-up(md) {
    max-height: 145px;
  }
  @include media-breakpoint-up(lg) {
    max-height: 155px;
  }
  @include media-breakpoint-up(xl) {
    max-height: 165px;
  }
  z-index: 0;
  overflow: hidden;
}

div.card-body {
  z-index: 10;
}
</style>
