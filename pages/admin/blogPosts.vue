<template>
    <div class="">
        <div class="row divider">
          <div class=" p-5">
            <div  class="">
                <h4>Create Blog</h4>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="New category Name" aria-label="name" v-model="newTitle">
                    <div class="input-group-append">
                        <button class="btn btn-success" @click="create" >Create</button>
                    </div>
                </div>
                <p></p>
            </div>

            <div v-for="blog in $store.state.website.blogs" :key="blog._id">
              {{blog.Title}} <button class="btn btn-warning" @click="selected = blog" >Edit</button> <button class="btn btn-danger" @click="Delete(blog)">Delete</button>
            </div>
          </div>
        </div>
        <div class="row divider">
          <div class="col-5 w-100" id="toolbar">
            
            <div v-if="selected" class="p-5">
              <h4>Edit Blog</h4>

              <div class="divider">
                <h5>Title</h5>
                <input type="text" class="form-control" placeholder="Category Name" v-model="selected.Title" />
                <br>
              </div>

              <div class="divider">
                <h5>Short text (html)</h5>
                <textarea type="text" class="form-control" placeholder="Text" aria-label="name" v-model="selected.TextShort" />
                <br>
              </div>

              <div class="divider">
                <h5>Text (html)</h5>
                <textarea type="text" class="form-control" placeholder="Text" aria-label="name" v-model="selected.Text" />
                <br>
              </div>

              <div class="divider">
                <h5>Rank</h5>
                <input type="number" class="form-control" placeholder="rank" v-model="selected.Rank" />
                <br>
              </div>

              <div class="divider">
                <h5>Category</h5>
                <categoryFilter :maxSelected="1" @selected="modifyCategory"/>
                <br>
              </div>
            

            </div>

          </div>
          <div class="col-7 p-5" v-if="selected" id="preview">

              <h5 class="inline">Preview</h5>
              <b-form-radio-group  id="radios2" v-model="short" buttons>
                <b-form-radio :value="false">Long</b-form-radio>
                <b-form-radio :value="true">Short</b-form-radio>
              </b-form-radio-group>
              <div class="">
                <div class= "p-2 bg-light" id="previewElem">
                  <blog :blog="selected" :short="short"/>
                </div>
                
                <br>
              </div>
                        
            </div>
        </div>
    </div>
</template>

 <script>
import categoryFilter from "@/components/categories/CategoryFilter.vue";
import Blog from "@/components/Blog";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    categoryFilter,
    Blog
  },
  data() {
    return {
      selected: undefined,
      newTitle: "",
      short: false
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
      dispatchCreate: "website/create",
      dispatchModify: "website/modify",
      dispatchDelete: "website/delete"
    }),
    modifyCategory(categories) {
      this.selected.Category = categories[0];
      this.modify();
    },
    create() {
      this.dispatchCreate({ Title: this.newTitle });
    },
    modify() {
      this.dispatchModify(this.selected);
    },
    Delete(blog) {
      this.dispatchDelete(blog);
    }
  }
};
</script>

 <style lang="scss" scoped>
.divider {
  margin-top: 10px;
}
#previewElem {
  border: 2px;
  border-style: solid;
  border-radius: 5px;
}
#toolbar {
  overflow-y: scroll;
  
}
</style>
 