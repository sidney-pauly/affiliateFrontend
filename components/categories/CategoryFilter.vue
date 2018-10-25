<template>
    <div class="wrap text-left">


        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Kategorie suchen" aria-label="name" v-model="keyword">
        </div>

        <div>
          {{selected.length + ' Kategorien ausgewählt '}}
          <button class="btn btn-danger" @click="clearSelection">Auswahl aufheben</button>
        </div>

        <div :class="{ 'lim-height': !admin, 'lim-height-admin': admin}">
            <div v-for="cc in filteredCategoryTree" :key="cc._id">
                <categoryChild  :category="cc" @treeChanged="modifyTree" @selected="modifySelected" :includeChildren="includeChildren" :leftSelected="maxSelected-selected.length"/>
            </div>
        </div>

    </div>
</template>

<script>
import categoryChild from "@/components/categories/CategoryChild.vue";
import { mapActions } from "vuex";

export default {
  name: "category-child",
  props: {
    maxSelected: Number,
    includeChildren: Boolean,
    clear: Number,
    admin: Boolean
  },
  components: {
    categoryChild
  },
  data() {
    return {
      keyword: "",
      filteredCategoryTree: [],
      selected: [],
      categoryTree: []
    };
  },

  watch: {
    keyword: function() {
      this.filterCategoryTree();
    },
    clear (){
        this.clearSelection()
    }
  },
  methods: {
    ...mapActions({
      getCategories: "categories/getCategories"
    }),
    modifySelected: function(data) {
      if(data.value){
        this.selected.push(data.id)
      } else {
        
        var i = this.selected.findIndex(s => s === data.id)
          this.selected.splice(i, 1)
        
      }

      this.$emit('selected', this.selected)
    },
    //Clears the selection and reloads the product tree
    clearSelection (){
      this.selected = []

      this.categoryTree.forEach(function(c){
        unselectChildren(c)
      })
      
      function unselectChildren (category){
        category.selected = false;
        category.Childs.forEach(function(c){
          unselectChildren(c);
        })
      }


      this.filterCategoryTree();
    },
    modifyTree (childCategory){
      var vm = this;
      
      var childIndex = vm.categoryTree.findIndex(c => c._id == childCategory._id);
      
      //Modify tree and pass it to sub Categories
      this.$set(vm.categoryTree, childIndex, childCategory)
      vm.filterCategoryTree()

      
    },
    filterCategoryTree: function(tree) {
      if(tree){
        this.categoryTree = tree;
      }

      if (!this.keyword) {
        this.filteredCategoryTree = this.categoryTree;
      } else {
        var vm = this;
        var regex = new RegExp(vm.keyword, "i");
        var filtered = [];

        vm.categoryTree.forEach(function(c) {
          testCategory(c)
        });

        function testCategory(c) {
          var match = regex.test(c.Title);
          if (match) {
            filtered.push(c);
          } else {
            var cats = vm.$store.state.categories.categories.filter(cat => {
              return cat.Parent == c._id && !cat.Link;
            });
            return cats.forEach(ca => {
              testCategory(ca);
            });
          }
        }

        vm.filteredCategoryTree = filtered;
      }
    }
  },
  mounted: async function() {
    var vm = this;
    await vm.$store.dispatch("categories/getCategories");
    this.filterCategoryTree(vm.$store.state.categories.categoryTree);
    vm.$store.subscribe((mutation, state) => {
      if (mutation.type == "categories/setCategoryTree") {
        this.filterCategoryTree(vm.$store.state.categories.categoryTree);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
div.lim-height {


  overflow-y: scroll;
}
div.lim-height-admin {

  height: 75vh;

  overflow-y: scroll;
}
div.wrap {
    height: 25vh;
}

</style>

