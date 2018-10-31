<template>
    <div class="">
        <div class="row">
            <div class="col-6 w-100">
              <div class=" p-5">
                <categoryFilter @selected="modifieSelected" :maxSelected="2" :clear="clear" admin/>
              </div>
            </div>
            <div class="col-6 p-5">

                

                <div v-if="selected.length < 2" class="divider">
                    <h4>Create Category</h4>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="New category Name" aria-label="name" v-model="newTitle">
                        <div class="input-group-append">
                            <button class="btn btn-success" @click="create" >Create</button>
                        </div>
                    </div>
                    <p></p>
                </div>
    
                
                <!-- Rename -->
                <div v-if="selected.length == 1" class="divider">
                    <h4>Rename Category</h4>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Category Name" aria-label="name" v-model="newTitle">
                        <div class="input-group-append">
                            <button class="btn btn-warning" @click="rename" >Change</button>
                        </div>
                    </div>
                    <p></p>
                </div>
                
                <!-- Delete -->
                <div v-if="selected.length == 1" class="divider">
                    <h4>Delete Category</h4>
                    <button class="btn btn-danger" @click="Delete">Delete</button>
                    <p></p>
                </div>

                <!-- Merge -->
                <div v-if="selected.length == 2" class="divider">
                    <h4>Merge Categories</h4>
                    <p><b>{{getCategoryByIndex(1).Title}} + {{getCategoryByIndex(0).Title}} = {{getCategoryByIndex(1).Title}}</b></p>
                    <button class="btn btn-primary" @click="merge">Merge</button>
                    <p></p>
                </div>
                <br>

                <!-- Append -->
                <div v-if="selected.length == 2" class="divider">
                    <h4>Append Categoriy</h4>
                    <p><b>{{getCategoryByIndex(1).Title + ' ← '}} {{getCategoryByIndex(0).Title}}</b></p>
                    <button class="btn btn-secondary" @click="append">Append</button>
                    <p></p>
                </div>
            
            </div>
        </div>
    </div>
</template>

 <script>
import categoryFilter from "@/components/categories/CategoryFilter.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    categoryFilter
  },
  data() {
    return {
      selected: [],
      clear: 0,
      newTitle: ""

    };
  },
  watch: {
    
  },
  methods: {
    ...mapActions({
      getCategories: "categories/getCategories",
      dispatchRename: "categories/rename",
      dispatchCreate: "categories/create",
      dispatchDelete: "categories/delete",
      dispatchMerge: "categories/merge",
      dispatchAppend: "categories/append"
    }),
    
    getCategoryByIndex: function(i) {
      var cat =  this.$store.state.categories.categories.find(
        c => c._id == this.selected[i]
      );
      if(cat){
        return cat;
      }
      else {
        return {};
      }
    },
    modifieSelected: function(value) {
      this.selected = value
    },
    rename() {
      this.dispatchRename({ selected: this.selected, newTitle: this.newTitle });
      this.clear++;

    },
    create() {
      this.dispatchCreate({ selected: this.selected, newTitle: this.newTitle });
      this.clear++;
    },
    Delete() {
      this.dispatchDelete({ selected: this.selected, newTitle: this.newTitle });
      this.clear++;
    },
    merge() {
      this.dispatchMerge({ selected: this.selected, newTitle: this.newTitle });
      this.clear++;
    },
    append() {
      this.dispatchAppend({ selected: this.selected, newTitle: this.newTitle });
      this.clear++;
    }
  }
};

</script>

 <style lang="scss" scoped>

.divider {
  margin-top: 10px;
}
</style>
 