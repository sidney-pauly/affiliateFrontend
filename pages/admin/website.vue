<template>
    <div class="container" v-on:keyup="modify">
      <div class="p-5">

        <h3>Title</h3>
        <input v-model="$store.state.website.title">

         <h3>Landing image</h3>
        <input v-model="$store.state.website.LandingImage">

        <h3>Theme</h3>
        <input type="color" v-model="$store.state.website.navColor">


        <button class="btn" @click="modify">Save</button>
      </div>
        
    </div>
</template>

 <script>


import { mapActions, mapState } from "vuex";

export default {
  
  methods: {
    ...mapActions({
      dispatchModify: "website/modifyWebsite"
    }),
    modify() {
      this.dispatchModify();
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
 