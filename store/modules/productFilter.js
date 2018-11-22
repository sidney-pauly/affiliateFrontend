import { Store } from "vuex";

import axios from 'axios'

// initial state
const state = {
    filter: {
        query: '',
        maxResults: 20,
        fast: false,
        category: undefined,
        categories: [],
        page: 1
      },
      products: [],
      loading: false,
      detailProduct: {}
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
                rootState.socket.socket.on('product', function (data, final) {
                    state.loading = false;
                    state.products.push(data);
                    if(final){
                        state.loading = false;
                    }
                });
              }

               //Define what happens when a product update happens
              if (!rootState.socket.socket._callbacks.$modifyBlog) {
                rootState.socket.socket.on("modifyProduct", function (data) {

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
    async getAllProducts ({state, dispatch, rootState, commit}) {

        var res = await axios({
            method:'get',
            url: rootState.apiUrl + '/allProducts'
        })

        state.products = res.data;
        return res.data;

    },
    async getProductById ({state, dispatch, rootState, commit}, data) {

        var res = await axios({
            method:'get',
            url: rootState.apiUrl + '/product',
            params: {
                id: data
            }
        })

        state.detailProduct = res.data;
        return res.data;

    },
    async filterProducts ({state, dispatch, rootState, commit}, keepProducts) {

        //Check if the socket can be used, if not use normal ajax
        if(await dispatch('validateSocket')){

            rootState.socket.socket.emit('getProducts', state.filter);
            
            if(!keepProducts){
                state.products = [];
            }
            
            state.loading = true;
        } else {

            if(!keepProducts){
                state.products = [];
            }

            state.loading = true;

            //Fetch data from backend
            return axios.post(rootState.apiUrl + '/searchProducts', state.filter)
            .then((res) => {
                console.log(res.data)

                if(keepProducts){
                    state.products = state.products.concat(res.data);
                } else {
                    state.products = res.data;
                }

                
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