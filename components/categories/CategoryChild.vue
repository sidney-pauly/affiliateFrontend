<template>
    <div>

        <div v-if="selected" class="bg-success">
            <b-btn class="btn-sm btn" @click="hide = !hide" :disabled="!category.Childs[0]" variant="dark">+</b-btn>
            <div class="inline" id="elem" @click="select(!category.selected)">{{category.Title}}</div>
        </div>
        <div v-else>
            <b-btn class="btn-sm btn" @click="hide = !hide" :disabled="!category.Childs[0]" variant="dark">+</b-btn>
            <div class="inline" id="elem" @click="select(!category.selected)">{{category.Title}}</div>
        </div>
         
        <div>
            <category-child
            v-for="cc in category.Childs"
            :key="cc._id"
            :category="cc"
            :includeChildren="includeChildren"
            @treeChanged="handThru"
            @selected="handThruSelected"
            v-show="!hide"
            :leftSelected="leftSelected"/>
        </div>

    </div>
</template>

<script>
import categoryChild from "@/components/categories/CategoryChild.vue";

export default {
  name: "category-child",
  props: ["category", "leftSelected", "includeChildren"],
  components: {
    categoryChild
  },
  data() {
    return {
      hide: true,
      selected: false
    };
  },
  watch: {
    numSelected: function() {
      if (this.numSelected == 0 && this.selected && !this.justChanged) {
        this.selected = false;
      }
      this.justChanged = false;
    },
    category: {
      handler() {
        this.selected = this.category.selected;
      },
      deep: true
    }
  },
  methods: {
    select: function(newSelected) {
      if (this.leftSelected > 0 || !newSelected) {
        var vm = this;

        //copy prop to local variable
        var category = JSON.parse(JSON.stringify(this.category));
        category.selected = newSelected;

        if (this.includeChildren) {
          selectChildren(vm.category);
        } else {
          vm.$emit("selected", { id: category._id, value: newSelected });
        }

        function selectChildren(cat) {
          vm.$emit("selected", { id: cat._id, value: newSelected });
          cat.Childs.forEach(c => {
            c.selected = newSelected;
            selectChildren(c);
          });
        }

        this.$emit("treeChanged", category);
      }
    },
    handThruSelected(data) {
      this.$emit("selected", data);
    },
    handThru: function(childCategory) {
      var category = this.category;

      //Find the index of the child category
      var childIndex = category.Childs.findIndex(
        c => c._id == childCategory._id
      );

      category.Childs[childIndex] = childCategory;

      this.$emit("treeChanged", category);
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  margin-left: 20px;
}
button {
  display: inline;
  white-space: nowrap;
}
h5 {
  display: inline;
  white-space: nowrap;
}
#elem {
  &:hover {
    color: white;
    background-color: grey;
  }
}
</style>

