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
    async validateSocket({ state, dispatch, rootState, commit }) {

        if (await dispatch('socket/validateSocket', null, { root: true })) {
           

            //Define what happens when product is recived
            if(!rootState.socket.socket._callbacks.$product){
                rootState.socket.socket.on('product', function (data) {
                    state.loading = false;
                    state.products.push(data);
                });
              }

               //Define what happens when a product update happens
              if (!rootState.socket.socket._callbacks.$modifyBlog) {
                rootState.socket.socket.on("modifyProduct", function (data) {
                    var i = state.blogs.findIndex(p => p._id == data._id);

                    if (i >= 0) {
                        state.products[i] = data;
                    }

                });
            }


            return true;
        } else {
            return false;
        }
    },
    async filterProducts ({state, dispatch, rootState, commit}) {

        //Check if the socket can be used, if not use normal ajax
        if(await dispatch('validateSocket')){

            rootState.socket.socket.emit('getProducts', state.filter);
      
            state.products = [];
            state.loading = false;
        } else {

            state.loading = true;

            //Fetch data from backend
            return axios.post(config.apiURL + '/searchProducts', state.filter)
            .then((res) => {
                state.products = res.data;
                state.loading = false;
            })
            .catch((e) => {
                console.log(e);
            })

        }
        
    },
    async modify({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("modifyProduct", {
                products: data,
                session: rootState.userData.session
            });
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