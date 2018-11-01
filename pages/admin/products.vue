<template>
    <div class="">
        <div class="row">
          <productFilter includeChildren/>
        </div>
        <div class="row">
            <div class="col-6 w-100">
              <div class=" p-5">
                
                  <b-table
                  striped hover
                  :items="$store.state.productFilter.products"
                  :fields="tableFields"
                  @row-clicked="modifieSelected">
                    
                  </b-table>


              </div>
            </div>
            <div class="col-6 p-5">

                <b-form-radio-group  id="radios2" v-model="single" buttons>
                  <b-form-radio :value="true">Edit Single</b-form-radio>
                  <b-form-radio :value="false">Edit Multiple</b-form-radio>
                </b-form-radio-group>
                
                <!-- Single item Edit -->
                <div v-if="single && selected[0]">

                  <!-- Details -->
                  <div class="divider">
                      <product :productData="selected[0]"/>
                  </div>

                  <div class="divider">
                    <h5>Title</h5>
                    <input type="text" class="form-control" placeholder="Title" v-model="selected[0].Title" />
                    <br>
                  </div>

                  <div class="divider">
                    <h5>Description</h5>
                    <input type="text" class="form-control" placeholder="Description" v-model="selected[0].DescriptionCustom" />
                    <br>
                  </div>

                  <div class="divider">
                    <h5>Category</h5>
                    <categoryFilter :maxSelected="1" @selected="modifyCategory"/>
                    <br>
                  </div>

                </div>
                
                
            
            </div>
        </div>
    </div>
</template>

 <script>
import productFilter from "@/components/products/ProductFilter.vue";
import product from "@/components/products/Product.vue";
import categoryFilter from "@/components/categories/CategoryFilter.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    productFilter,
    categoryFilter,
    product
  },
  data() {
    return {
      selected: [],
      tableFields: ['Title', 'EAN'],
      single: true

    };
  },
  watch: {
     selected: {
      handler() {
        if (this.selected) {
          this.modify();
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      dispatchModify: "productFilter/modify",
    }),
    modifieSelected: function(item, index, event) {

      let i = this.selected.findIndex(s => s._id == item._id)

      if(i >= 0){
        this.selected.splice(i, 1);
        this.$store.state.productFilter.products[index]._rowVariant = undefined;
      }else{

        if(!this.single || (this.single && !this.selected[0])){
          this.selected.push(this.$store.state.productFilter.products[index])
          this.$store.state.productFilter.products[index]._rowVariant = 'success';
        }

      }
    },
    modifyCategory (categories){

      //Find products and modify the category
      let products = this.selected.map(s => {

        s.Category = categories[0];
        return s

      })

      this.modify();
    },
    modify() {
      this.dispatchModify(this.selected);
    }
  }
};

</script>

 <style lang="scss" scoped>

.divider {
  margin-top: 10px;
}
</style>
 