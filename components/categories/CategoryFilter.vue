<template lang="html">
    <div class="text-left">

        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Kategorie suchen" aria-label="name" v-model="keyword">
        </div>

        <div>
          {{selected.length + ' Kategorien ausgewählt '}}
          <button class="btn btn-danger" @click="clearSelection">Auswahl aufheben</button>
        </div>

        <div :class=" !admin ? 'lim-height': 'lim-height-admin'">
            <div v-for="(cc, i) in filteredCategoryTree" :key="cc._id">
                <categoryChild  :category="filteredCategoryTree[i]" @treeChanged="modifyTree" @selected="modifySelected" :includeChildren="includeChildren" :leftSelected="maxSelected-selected.length"/>
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
    admin: Boolean,
    initialSelected: {type: Array, default: () => []}
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
    clear() {
      this.clearSelection();
    }
  },
  methods: {
    ...mapActions({
      getCategories: "categories/getCategories"
    }),
    modifySelected: function(data) {
      if (data.value) {
        this.selected.push(data.id);
      } else {
        var i = this.selected.findIndex(s => s === data.id);
        this.selected.splice(i, 1);
      }

      this.$emit("selected", this.selected);
    },
    //Clears the selection and reloads the product tree
    clearSelection() {
      this.selected = [];

      this.categoryTree.forEach(function(c) {
        unselectChildren(c);
      });

      function unselectChildren(category) {
        category.selected = false;
        category.Childs.forEach(function(c) {
          unselectChildren(c);
        });
      }

      this.filterCategoryTree();

      //Emit selected so that parent updates
      this.$emit("selected", this.selected);
      
    },
    modifyTree(childCategory) {
      var vm = this;

      function findChild(cat) {
        var childIndex = cat.Childs.findIndex(c => c._id == childCategory._id);
        if (childIndex != -1) {
          cat.Childs[childIndex] = childCategory;
          return true;
        } else {
          return cat.Childs.some(c => {
            return findChild(c);
          });
        }
      }

      var childIndex = vm.categoryTree.findIndex(
        c => c._id == childCategory._id
      );


      if (childIndex >= 0) {

        this.$set(vm.categoryTree, childIndex, childCategory);

      } else {

        vm.categoryTree.forEach((c, i) => {
          if (findChild(c)) {
            childIndex = i;
          }
        });

      }

      //Modify tree
      vm.filterCategoryTree();
    },
    filterCategoryTree: function(tree) {
      if (tree) {
        this.categoryTree = tree;
      }

      if (!this.keyword) {
        this.filteredCategoryTree = this.categoryTree;
      } else {
        var vm = this;
        var regex = new RegExp(vm.keyword, "i");
        var filtered = [];

        vm.categoryTree.forEach(c => {
          testCategory(c);
        });

        function testCategory(c) {
          var match = regex.test(c.Title);
          if (match) {
            filtered.push(c);
          } else {
            var cats = c.Childs.filter(cat => {
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
    console.log(this.initialSelected)
    this.selected = this.initialSelected
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
  max-height: 20vh;
}
div.lim-height-admin {
  
  max-height: 70vh;
  overflow-y: scroll;
}
div.wrap {
  height: 25vh;
}
</style>

