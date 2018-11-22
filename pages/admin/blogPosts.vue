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
              {{blog.Title.Content}} <button class="btn btn-warning" @click="selected = blog" >Edit</button> <button class="btn btn-danger" @click="Delete(blog)">Delete</button>
            </div>
          </div>
        </div>
        <div class="row divider">
          <div class="col-5 w-100" id="toolbar">
            
            <div v-if="selected" class="p-5">
              <h4>Edit Blog</h4>

              <b-btn v-b-toggle.collapsetitle class="m-1">Title</b-btn>
              <b-collapse id="collapsetitle">
                <customTextEditor :text="selected.Title" />
              </b-collapse>

              <hr>

              <div class="">
                <h5>BackgroundColor</h5>
                <input type="color" class="form-control" aria-label="name" v-model="selected.BackgroundColor" />
                <br>
              </div>

              <hr>

              <div class="">
                
                <b-btn v-b-toggle.collapseimage class="m-1">Image settings</b-btn>
                <b-collapse id="collapseimage">

                    <h5>Images</h5>
                  <div v-for="(img, i) in selected.Images" :key="img._id">
                    <input type="text" v-model="selected.Images[i]"/>
                    <button class="btn" @click="removeImage(i)">Remove</button>
                  </div>
                  
                  <button class="btn" @click="addImage">Add image</button>
                    <h5>Image Style</h5>
                  <b-form-select v-model="selected.ImageStyle" :options="imageStyleOptions" class="mb-3" />
                  <br>
                  <h5>Image Height</h5>
                  {{selected.ImageHeight}}
                  <input type="range" min="0" max="100" class="form-control" placeholder="rank" v-model="selected.ImageHeight" />
                </b-collapse>
                
              </div>

              <hr>

              <div class="">
                <b-btn v-b-toggle.collapsetext class="m-1">Text</b-btn>
                <b-collapse id="collapsetext">
                  <customTextEditor :text="selected.Text" />
                </b-collapse>
                

              </div>

              <hr>

              <div class="">
                <h5>Rank</h5>
                <input type="number" class="form-control" placeholder="rank" v-model="selected.Rank" />

              </div>

              <hr>

              <div class="">
                <h5>Product Category</h5>
                <categoryFilter :maxSelected="1" @selected="modifyCategory"/>
                <br>
              </div>
            

            </div>

          </div>
          <div class="col-7 p-5" v-if="selected" id="preview">

              <h5 class="inline">Preview</h5>
              <div class="">
                <div class= "p-2 bg-light" id="previewElem">
                  <blog :blog="selected"/>
                </div>
                
                <br>
              </div>
                        
            </div>
        </div>
    </div>
</template>

 <script>
import categoryFilter from "@/components/categories/CategoryFilter.vue";
import customTextEditor from "@/components/text/CustomTextEditor.vue";
import Blog from "@/components/Blog";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    categoryFilter,
    Blog,
    customTextEditor
  },
  data() {
    return {
      selected: undefined,
      newTitle: "",
      imageStyleOptions: ['ImageAfterTitle', 'ImageBeforeTitle', 'ImageAfterText', 'TitleOverlay', 'TextOverlay']
     
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
      this.dispatchCreate({ Title: {Content: this.newTitle}, Text: {Content: ' '} });
    },
    modify() {
      this.dispatchModify(this.selected);
    },
    Delete(blog) {
      this.dispatchDelete(blog);
    },
    addImage(){
      this.selected.Images.push('')
    },
    removeImage(i){
      if(!this.selected.Images){
        this.selected.Images = []
      }
      this.selected.Images.splice(i, 1)
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
 