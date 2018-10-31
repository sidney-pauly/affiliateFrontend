<template>

    <div class="container">
      <div class="text-center p-5">
        <h1 class="title">{{$store.state.website.title}}</h1>
      </div>
      
      <div class="jumbotron">
        <h1>Produkte suchen</h1>

        <hr class="my-4">

        <simpleProductFilter />

        
      </div>
      <div class="jumbotron" v-for="blog in getBlogs()" :key="blog._id">
        <Blog  :blog="blog" :maxProducts="4"/>
        <b-button :to="'/blog/' + blog._id"  v-if="blog.products.length > 0">Mehr Produkte</b-button>
      </div>
      

    </div>

</template>

<script>
import Blog from '@/components/Blog'
import simpleProductFilter from '@/components/products/simpleProductFilter.vue'

export default {
  components: {
    Blog,
    simpleProductFilter
  },
  methods: {
    getBlogs () {
      //return ranked blogs
      return this.$store.state.website.blogs.sort( (a,b) => {
        return a.Rank - b.Rank;
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";

.title {
  @include media-breakpoint-up(xs) {
    font-size: 40px;
  }
  @include media-breakpoint-up(sm) {
    font-size: 80px;
  }
  @include media-breakpoint-up(md) {
    font-size: 100px;
  }
  @include media-breakpoint-up(lg) {
    font-size: 125px;
  }
  @include media-breakpoint-up(xl) {
    font-size: 150px;
  }
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
