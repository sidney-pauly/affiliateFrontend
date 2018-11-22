
<template>
<div>
  <div class="" :style="style">

    <div :style="cardStyle" v-if="blog.ImageStyle == 'TitleOverlay' || blog.ImageStyle == 'TextOverlay'" class="card card-full border-0 rounded-0">

      <img class="card-img img-full border-0 rounded-0" :src="blog.Images[0]"  alt="">

      <div class="card-img-overlay ">
        <div class="row h-100 align-items-center">
          <div class="col-12 "><customText :text="blog.Title" /></div>
          <div class="col-12"><customText :text="blog.Text" /></div>
          
          
        </div>
      </div>

    </div>

    <div class="p-5" v-else>

      <div class="text-center" v-if="blog.ImageStyle == 'ImageBeforeTitle'">
        <img class="img-normal" :src="blog.Images[0]"  alt="">
      </div>

      <customText :text="blog.Title" />
          

      <div class="text-center" v-if="blog.ImageStyle == 'ImageAfterTitle'">
        <img class="img-normal" :src="blog.Images[0]"  alt="">
      </div>

      <customText :text="blog.Text" />

      <div class="text-center" v-if="blog.ImageStyle == 'ImageAfterText'">
        <img class="img-normal" :src="blog.Images[0]"  alt="">
      </div>

    </div>
    
    </div>

  

    <div class="row p-5" v-if="blog.products">
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2"  v-for="p in getProducts(maxProducts)" :key="p._id">
          <product  :productData="p"/>
        </div>
      </div>
    
    
  </div>
</template>

<script>
import product from "@/components/products/Product";
import customText from "@/components/text/CustomText";

export default {
  props:{
    blog: Object,
    maxProducts: Number,
    short: Boolean
  },
  components: {
    product,
    customText
  },
  computed: {
    cardStyle () {
      return {
        height: `${this.blog.ImageHeight}vh`
      }
    },
    style () {
      return {
        backgroundColor: `${this.blog.BackgroundColor}`
      }
    }
  },
  methods: {
    getProducts(num) {
      if (this.blog.products) {
        
        let i = Math.floor(Math.random() * (this.blog.products.length - num));

        if (i < 0) {
          i = 0;
        }
        
        let products = [];
        let j = 0;
        
        while (this.blog.products[i] != undefined && j < num) {
          products.push(this.blog.products[i]);
          i++;
          j++;
        }

        return products;
      }
    }
  }
};
</script>

<style scoped>

.card-full{
  height: 100vh;
  border-radius: 0px;
  margin: 0px;
}

.img-full{
  height: 100%;
  object-fit: cover;
  object-position: center;
  
}

.img-normal{
  max-width: 100%;
  object-fit: cover;
  object-position: center;
  max-height: 70vh;
}


</style>
