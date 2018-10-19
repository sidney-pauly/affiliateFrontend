import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      productFilter: {
        query: '',
        maxResults: 20
      },
      products: [],
      productFilterLoading: false,
      cookies: false,
      showGDPR: true,
      socket: '' //the io socket
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

      }
        
    }
  })
}

export default createStore
