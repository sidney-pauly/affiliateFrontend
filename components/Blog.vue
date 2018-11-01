
<template lang="html">
  <div >
    <h1>{{blog.Title}}</h1>
    <div v-if="blog.TextShort" v-html="blog.TextShort"></div>
    <div v-if="blog.Text && !short" v-html="blog.Text"></div>
    <hr class="my-4">

    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2" v-if="blog.products" v-for="p in getProducts(maxProducts)" :key="p._id">
          <product  :productData="p"/>
        </div>
      </div>
    
    
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import product from "@/components/products/Product";

export default {
  props:{
    blog: Object,
    maxProducts: Number,
    short: Boolean
  },
  components: {
    product
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
</style>
