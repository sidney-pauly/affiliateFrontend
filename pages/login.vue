<template>
    <div class="container p-5 text-center">
      <input type="text" class="form-control" placeholder="Username" v-model="$store.state.userData.username">
      <input type="password" class="form-control" placeholder="Password" v-model="$store.state.userData.password">
                    
      <b-btn class="btn btn-success" @click="dispatchLogin" block>Login</b-btn>
                        
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
      selected: undefined,
      newTitle: ''
    };
  },
  computed: {
    admin (){
      return this.$store.state.userData.session.Level == 0;
    }
  },
  watch: {
    admin () {
      if(this.admin == true){
        this.$nuxt.$router.replace({ path: '/admin' })
      }
    }
  },
  methods: {
    ...mapActions({
      dispatchLogin: "userData/login",
    
    })
    
  }
};

</script>

 <style lang="scss" scoped>

.divider {
  margin-top: 10px;
}
</style>
 