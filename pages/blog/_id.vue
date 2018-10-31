<template lang="html">
  <div class="container bg-light">
    
    <Blog :blog="blog" :maxProducts="500"/>

  </div>
</template>

<script>
import Blog from "@/components/Blog";
import config from "@/config";
import axios from "axios";

export default {
  components: {
    Blog
  },
  async asyncData({ error, route }) {
    try {
      let req = await axios({
        method: "get",
        url: config.apiURL + "/blog",
        params: {
          website: config.title,
          id: route.params.id
        }
      });

      let blog = req.data;

      if (blog.Category) {
        var request = await axios({
          method: "get",
          url: config.apiURL + "/productsOfCategory",
          params: {
            category: blog.Category
          }
        });

        blog.products = request.data;
      }

      return { blog: req.data };
    } catch (er) {
      error({
        statusCode: 404,
        message: "Sorry die seite wurde nicht gefunden"
      });
    }
  }
};
</script>

<style lang="css">
</style>
