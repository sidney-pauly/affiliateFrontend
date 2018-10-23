<template lang="html">
  <div class="">
    <div class="row">
      <div class="col">
        <img v-if="Images[CurrentImage]" :src="Images[CurrentImage].URL" class="dynamic-img mx-auto d-block" />
      </div>

    </div>
    <div class="row text-center">
      <div class="col">
        <div class="btn-group" role="group">
          <button class="btn" v-for="(image, i) in Images" @click="CurrentImage = i" :pressed="CurrentImage === i">{{i+1}}</button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: ['Images'],
  data () {
    return {
      CurrentImage: 0
    }
  },
  watch: {
    Images: function(){
      if(this.Images.length === 0){
        this.Images.push({URL: "https://via.placeholder.com/500.png?text=Kein+bild+vorhanden"})
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";

.dynamic-img {
  @include media-breakpoint-up(xs) {
    height: 200px;
  }
  @include media-breakpoint-up(sm) {
    height: 250px;
  }
  @include media-breakpoint-up(md) {
    height: 325px;
  }
  @include media-breakpoint-up(lg) {
    height: 400px;
  }
  @include media-breakpoint-up(xl) {
    height: 500px;
  }
  width: auto;
  max-width: 100%;
}

</style>
