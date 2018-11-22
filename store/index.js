import Vuex from 'vuex'
import socket from './modules/socket'
import productFilter from './modules/productFilter'
import categories from './modules/categories'
import website from './modules/website'
import userData from './modules/userData'
import Cookies from 'js-cookie'
import cookie from 'cookie'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      socket,
      productFilter,
      categories,
      website,
      userData
    },
    state: () => ({
      cookies: false,
      showGDPR: true,
      apiUrl: 'http://localhost:3001',
      status: {
        text: '',
        type: 'success',
        code: 0
      },
      

    }),
    mutations: {

    },
    actions: {
      async nuxtServerInit({ state, dispatch }, {req }) {
       
        //Set api url
        state.apiUrl = process.env.API_URL

        //Setup namespace
        state.website.namespace = req.headers.host

        //Get cookies
        let cookies = {};
      
        if(req.headers.cookie){
          cookies = cookie.parse(req.headers.cookie);
        }
        
        
        //Set relevant user data from cookies
        if(cookies.cookiesAllowed){
          state.cookies = JSON.parse(cookies.cookiesAllowed)
        }

        if(state.cookies){
          state.showGDPR = false;
        }
        

        //Get default data from server
        await dispatch('website/getWebsite')
        //await dispatch('categories/getCategories', true)
      },
      setCookies ({state}, newCookies) {
        state.cookies = newCookies;
        
        //Create cookie with cookie allowed
        if(newCookies){
          Cookies.set('cookiesAllowed', 'true', { expires: 365});
        }
      },
      async setStatus({state}, newStatus){
        console.log(newStatus)
        switch(newStatus.code){
          //Unauthorised access
          case 403:
          state.status = {text: 'Keine ausreichenden Berechtigungen', type: 'danger', code: 403}
          break;
          //Error in admin tool use
          case 1000:
          state.status = {text: newStatus.text, type: 'danger', code: 10000}
          break;
          //404 not found
          case 404:
          state.status = { text: newStatus.item + ' wurde nicht gefunden', type: 'danger', code: 404}
          break;
          //Default error message. Displays standard server error and error code
          default:
          state.status = {text: 'Ein unerwarteter server Fehler ist aufgetreten. Bitte versuchen sie es später erneut. (Fehler Code: ' + newStatus.code + ')' , type: 'danger', code: 0}
        }
      }
    }
  })
}

export default createStore
