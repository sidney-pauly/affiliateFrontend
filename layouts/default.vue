<template>
  <div class="">
    
    <!-- GDPR opt in -->
    <b-alert variant="secondary" dismissible :show="$store.state.showGDPR" @dismissed="$store.state.showGDPR=false">

      <h4 class="alert-heading">Cookies akzeptieren?</h4>
      <div class="row">
        <div class=" col-md-8">
          <p>Cookies werden benötigt um die Ladezeiten zu verkürzen.  </p>
        </div>
        <div class=" col-md-4 text-right">
          <button type="button" class="btn btn-dark text-right" @click="GDPR">Akzeptieren</button>
        </div>
      </div> 
    </b-alert> 

    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Vergleichsseite</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/products">Search products</b-nav-item>
        </b-navbar-nav>

        
        <b-navbar-nav class="ml-auto">

          <no-ssr>
            <ProductFilter  :nav="true"></ProductFilter>
          </no-ssr>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <nuxt/>
  </div>
</template>

<script>
import ProductFilter from '@/components/products/ProductFilter.vue'

export default {
  components: {
    ProductFilter
  },
  methods: {
    GDPR: function(){
      this.$store.state.showGDPR = false;
      this.$store.state.cookies = true;
    }
  }
}

</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
