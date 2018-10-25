import { Store } from "vuex";
import config from '@/config'
import axios from 'axios'

// initial state
const state = {
    filter: {
        query: '',
        maxResults: 20,
        fast: false,
        category: undefined,
        categories: []
      },
      products: [],
      loading: false
}

// getters
const getters = {
  
}


// mutations
const mutations = {
    setProducts(state, payload){
        state.socket = payload;
    }
}

// actions
const actions = {
    async filterProducts ({state, dispatch, rootState, commit}) {

        //Check if the socket can be used, if not use normal ajax
        if(await dispatch('socket/validateSocket', null, { root: true })){


            //Define what happens when product is recived
            if(!rootState.socket.socket._callbacks.$product){
                rootState.socket.socket.on('product', function (data) {
                    state.loading = false;
                    state.products.push(data);
                });
              }
      
            rootState.socket.socket.emit('getProducts', state.filter);
      
            state.products = [];
            state.loading = false;
        } else {

            state.loading = true;

            //Fetch data from backend
            return axios.get(config.apiURL + '/searchProducts' +'?query=' + state.filter.query)
            .then((res) => {
                state.products = res.data;
                state.loading = false;
            })
            .catch((e) => {
                console.log(e);
            })

        }
        
    }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
  
}