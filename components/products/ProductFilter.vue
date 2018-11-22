<template lang="html">
  <div class="p-3 container">

        <b-input-group @keyup.enter="search">
          <b-form-input v-model="$store.state.productFilter.filter.query" type="text" placeholder="Produktname" />
        </b-input-group>

           
      <div class="text-dark">
        <br>
        <span class="text-center">

          <b-btn v-b-toggle.collapse1 variant="outline-dark" block >Erweiterte Suche</b-btn>
        </span>
        
        <b-collapse id="collapse1" class="mt-2">
          <b-card>
            
          
            
              
           <br>

            <div class="text-center p-2" >
              <categoryFilter :maxSelected="5000" @selected="modifySelected" :includeChildren="includeChildren"/>
            </div>

          </b-card>
        </b-collapse>

      </div>
      

      

      <br>
      <b-btn variant="outline-dark" block @click="search">Suchen</b-btn>
      
    </div>



</template>

<script>
import { mapState, mapActions } from 'vuex'
import categoryFilter from '@/components/categories/CategoryFilter'

export default {
  props: {
    includeChildren: {
      type: Boolean
    }
  },
  components: {
    categoryFilter
  },
  methods: {
    search: function(){
      this.$store.dispatch('productFilter/filterProducts')
    },
    modifySelected: function(selected){
      this.$store.state.productFilter.filter.categories = selected;
    }
  }
}
</script>

<style lang="css">
  .lim-height{

    max-height: 15vh;
  }
</style>
