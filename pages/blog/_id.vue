<template lang="html">
  <div class="container bg-light">
    
    <Blog :blog="blog" :maxProducts="500"/>

  </div>
</template>

<script>
import Blog from "@/components/Blog";

export default {
  components: {
    Blog
  },
  computed: {
    blog: function() {
      let vm = this;
      let b = vm.$store.state.website.blogs.find(bb => bb._id == vm.$route.params.id);

      if(b){
        return  b ; 
      } else {
        throw console.error('not found');
        
      }
    }
  }

};
</script>

<style lang="css">
</style>
