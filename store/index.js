import Vuex from 'vuex'
import axios from 'axios'
import socket from './modules/socket'
import productFilter from './modules/productFilter'
import categories from './modules/categories'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      socket,
      productFilter,
      categories
    },
    state: () => ({
      cookies: false,
      showGDPR: true

    }),
    mutations: {

    },
    actions: {
        
    }
  })
}

export default createStore
