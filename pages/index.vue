<template>

    <div class="">


      
      <div class="text-center p-5">
        <h1 class="title">{{$store.state.website.title}}</h1>
      </div>
      
      <div class="jumbotron">
        <h1>Produkte suchen</h1>

        <hr class="my-4">

        <simpleProductFilter />

        
      </div>
      <div class="jumbotron" v-for="blog in blogs" :key="blog._id">
          <Blog  :blog="blog" :maxProducts="4" short/>

            <b-button :to="'/blog/' + blog._id">Mehr ...</b-button>

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
  computed: {
    blogs () {
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

.container-fluid {
  @include media-breakpoint-up(md) {
    margin-left: 5vh;
    margin-right: 5vh;
  }
  @include media-breakpoint-up(lg) {
    margin-left: 10vh;
    margin-right: 10vh;
  }
  @include media-breakpoint-up(xl) {
    margin-left: 15vh;
    margin-right: 15vh;
  }
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
