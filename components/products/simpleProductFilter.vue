<template lang="html">
    <div>
        <b-input-group @keyup.enter="search">
          <b-form-input v-model="$store.state.productFilter.filter.query" type="text" placeholder="Produktname" />
          <b-input-group-append>
            <b-btn variant="white" @click="search">Suchen</b-btn>
          </b-input-group-append>
        </b-input-group>

      </div>



  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import categoryFilter from '@/components/categories/CategoryFilter'

export default {
  props: {

  },
  components: {
    categoryFilter
  },
  methods: {
    search: function(){
      this.$store.dispatch('productFilter/filterProducts')
      this.$nuxt.$router.replace({ path: '/products' })
    }
  }
}
</script>

<style lang="css">
  
</style>
