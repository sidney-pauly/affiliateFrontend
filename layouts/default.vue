<template>
  <div >
    
    <div class="sticky-top">
      <b-navbar toggleable="md" type="dark" variant="dark" >
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">{{$store.state.website.title}}</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/products">Produkte suchen</b-nav-item>
          </b-navbar-nav>

          
          <b-navbar-nav class="ml-auto">

            <no-ssr>
              <simpleProductFilter  :nav="true" />
            </no-ssr>

          </b-navbar-nav>

        </b-collapse>
      </b-navbar>

      <b-navbar toggleable="md" type="dark" variant="danger" v-if="$store.state.userData.session.Level == 0">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/admin">Admin Tools</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item to="/admin/blogPosts">Blogs</b-nav-item>
            <b-nav-item to="/admin/categories">Kategorien managen</b-nav-item>
            <b-nav-item to="/admin/products">Produkte managen</b-nav-item>
            <b-nav-item to="/admin/website">Generrele Einstellungen</b-nav-item>
          </b-navbar-nav>


        </b-collapse>
      </b-navbar>

      <!-- GDPR opt in -->
      <b-alert 
      variant="secondary" 
      dismissible 
      :show="$store.state.showGDPR" 
      @dismissed="$store.state.showGDPR=false"
      >

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

      <b-alert
      :variant="$store.state.status.type"
      dismissible
      :show="$store.state.status.text.length > 0"
      @dismissed="$store.state.status.text = ''">
        <h4 class="alert-heading">{{$store.state.status.text}}</h4>
        <b-btn v-if="$store.state.status.code == 403" class="btn" to="/login" @click="$store.state.status.text = ''">Login</b-btn>
      </b-alert>
    </div>
    
    <div class="container-main">
      <nuxt/>
    </div>
    
    <div class="text-center bg-dark text-white p-5">
      <!-- Bottom disclamers and crawler info -->
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="/products/all">Alle Produkte</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/impressum">Impressum</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/datenschutz">Datenschutz</a>
      </li>
    </ul>
    <hr class="my-5">
    <p>© Mologico GmbH</p>
    </div>
    
  </div>
</template>

<script>
import simpleProductFilter from '@/components/products/simpleProductFilter.vue'

export default {
  components: {
    simpleProductFilter
  },
  methods: {
    GDPR: function(){
      this.$store.state.showGDPR = false;
      this.$store.dispatch('setCookies', true);
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

.container-main{
  min-height: 70vh;
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
