<template>
    <div class="">
        <div class="row">
            <div class="col-6 lim-height">
                <div class="p-5">
                    <div v-for="cc in filteredCategoryTree" :key="cc._id">
                        <category-child  :category="cc" @checked="modifieSelected" v-if="!cc.Link" :numSelected="selected.length"/>
                    <br>
                    </div>
                </div>
            </div>
            <div class="col-6 p-5">

                <div class="divider">
                    <h4>Filter Categories</h4>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="search pharse" aria-label="name" v-model="keyword">
                    </div>
                    <p></p>
                </div>

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

                <div v-if="selected.length == 1" class="divider">
                    <h4>Delete Category</h4>
                    <button class="btn btn-danger" @click="deleteCat">Delete</button>
                    <p></p>
                </div>

                <div v-if="selected.length == 2" class="divider">
                    <h4>Merge Categories</h4>
                    <p><b>{{getCategoryByIndex(1).Title}} + {{getCategoryByIndex(0).Title}} = {{getCategoryByIndex(1).Title}}</b></p>
                    <button class="btn btn-primary" @click="merge">Merge</button>
                    <p></p>
                </div>
                <br>

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
import axios from "axios";
import categoryChild from "@/components/products/CategoryChild.vue";
import io from "socket.io-client";

export default {
  components: {
    categoryChild
  },
  data() {
    return {
      categories: [],
      selected: [],
      categoryTree: [],
      filteredCategoryTree: [],
      newTitle: "",
      keyword: ""
    };
  },
  watch: {
    keyword: function() {
      this.filterCategoryTree();
    }
  },
  methods: {
    filterCategoryTree: function() {
      if (!this.keyword) {
        this.filteredCategoryTree = this.categoryTree;
      } else {
        var vm = this;
        var regex = new RegExp(vm.keyword, "i");
        var filtered = [];

        vm.categoryTree.forEach(function(c) {
          if (testCategory(c)) {
            filtered.push(c);
          }
        });

        function testCategory(c) {
          var match = regex.test(c.Title);
          if (match) {
            return match;
          } else {
            var cats = vm.categories.filter(cat => {
              return cat.Parent == c._id && !cat.Link;
            });
            return cats.some(ca => {
              return testCategory(ca);
            });
          }
        }

        vm.filteredCategoryTree = filtered;
      }
    },
    getCategoryByIndex: function(i) {
      return this.categories.find(c => c._id == this.selected[i]);
    },
    modifieSelected: function(value) {
      var vm = this;

      if (value.checked) {
        vm.selected.push(value._id);
      } else {
        var index = vm.selected.findIndex(s => s._id == value._id);
        vm.selected.splice(index, 1);
      }
    },
    rename: function() {
      var vm = this;
      vm.$store.state.socket.emit("renameCategory", {
        _id: vm.selected[0],
        Title: vm.newTitle
      });
    },
    create: function() {
      var vm = this;
      if (vm.selected[0]) {
        vm.$store.state.socket.emit("createCategory", {
          _id: vm.selected[0],
          Title: vm.newTitle
        });
      } else {
        vm.$store.state.socket.emit("createCategory", { Title: vm.newTitle });
      }
      vm.selected = [];
    },
    deleteCat: function() {
      var vm = this;
      vm.$store.state.socket.emit("deleteCategory", { _id: vm.selected[0] });
      vm.selected = [];
    },
    merge: function() {
      var vm = this;
      vm.$store.state.socket.emit("mergeCategories", {
        Category2: { _id: vm.selected[0] },
        Category1: { _id: vm.selected[1] }
      });
      vm.selected = [];
    },
    append: function() {
      var vm = this;

    vm.categoryTree = [];

      vm.$store.state.socket.emit("appendCategory", {
        Category2: { _id: vm.selected[0] },
        Category1: { _id: vm.selected[1] }
      });
      vm.selected = [];
    },
    buildTree: function() {
      //Build category tree
      var vm = this;

      var tree = appendChilds(
        vm.categories.filter(c => {
          return !c.Parent && !c.Link;
        })
      );

      function appendChilds(categories) {
        var cs = [];
        categories.forEach(function(c) {
          var childCategories = vm.categories.filter(cc => {
            return cc.Parent == c._id && !c.Link;
          });
          if (childCategories) {
            c.Childs = appendChilds(childCategories);
            cs.push(c);
          }
        });

        return cs;
      }

      vm.categoryTree = tree;
      vm.filterCategoryTree();
    },
    connectSocket: function() {
      var vm = this;

      if (!vm.$store.state.socket) {
        vm.$store.state.socket = io.connect("http://localhost:3001");
      }

      vm.$store.state.socket.on("categories", function(data) {
        vm.categories = data;
        vm.buildTree();
      });

      vm.$store.state.socket.on("categoryChanged", function(data, final) {
        var changedCatI = vm.categories.findIndex(c => (c._id == data._id));
        vm.categories[changedCatI] = data;
        if (final) {
          vm.buildTree();
        }
      });

      vm.$store.state.socket.on("newCategory", function(data, final) {
        vm.categories.push(data);
        if (final) {
          vm.buildTree();
        }
      });

      vm.$store.state.socket.on("deletedCategory", function(data, final) {
        var changedCatI = vm.categories.findIndex(c => c._id == data._id);
        vm.categories.splice(changedCatI, 1);
        if (final) {
          vm.buildTree();
        }
      });
    }
  },
  mounted: function() {
    var vm = this;
    vm.connectSocket();
    vm.$store.state.socket.emit("getCategories", {});
  }
};
</script>

 <style lang="scss" scoped>
div.lim-height {
  max-height: 95vh;
  overflow: scroll;
}
.divider {
  margin-top: 10px;
}
</style>
 