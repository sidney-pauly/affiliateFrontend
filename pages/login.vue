<template lang="html">
    <div class="container p-5 ">

      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Nutzername</label>
          <input class="form-control" id="exampleInputEmail1" placeholder="Nutzername" v-model="$store.state.userData.username">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Passwort</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Passwort" v-model="$store.state.userData.password">
        </div>
        <b-btn  class="btn btn-success" @click="dispatchLogin" block>Login</b-btn>
      </form>                 
                        
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
      newTitle: ""
    };
  },
  computed: {
    admin() {
      return this.$store.state.userData.session.Level == 0;
    }
  },
  watch: {
    admin() {
      if (this.admin == true) {
        this.$nuxt.$router.replace({ path: "/admin" });
      }
    }
  },
  methods: {
    ...mapActions({
      dispatchLogin: "userData/login"
    })
  }
};
</script>

 <style lang="scss" scoped>
.divider {
  margin-top: 10px;
}
</style>
 