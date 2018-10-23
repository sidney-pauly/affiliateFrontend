import Vuex from 'vuex'
import axios from 'axios'
import socket from './modules/socket'
import productFilter from './modules/productFilter'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      socket,
      productFilter
    },
    state: () => ({
      categories: [],
      cookies: false,
      showGDPR: true

    }),
    mutations: {
      updateProductFilter (state, payload){
        state.productFilter = payload;
      },
      updateAllProducts (state, payload){
        state.products = payload;
      },
      pushProduct (state, payload){
        state.products.push(payload);
      },
      updateProductFilterLoading (state, payload){
        state.productFilterLoading = payload;
      },
      updateAllCategories (state, payload){
        state.categories = payload;
      },
      pushCategorie (state, payload){
        state.categories.push(payload);
      }
    },
    actions: {
      getProducts (context, productFilter){

      //Commit product filter
      context.commit('updateProductFilterLoading', true);

      //Fetch data from backend
      return axios.get('http://localhost:3001/searchProducts?' + 'query=' + productFilter.query)
      .then((res) => {
        context.commit('updateAllProducts', res.data);
        context.commit('updateProductFilterLoading', false);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      })

      },
      getCategories (context, filter){
  
        //Fetch data from backend
        return axios.get('http://localhost:3001/categories')
        .then((res) => {
          context.commit('updateAllCategories', res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
        })
  
        }
        
    }
  })
}

export default createStore
