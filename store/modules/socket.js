import io from 'socket.io-client'
import config from '@/config'

// initial state
const state = {
    socket: undefined
}

// getters
const getters = {
    
}


// mutations
const mutations = {
    setSocket(state, socket){
        state.socket = socket;
    }
}

// actions
const actions = {
    async validateSocket ({state, commit, rootState}) {
         

        //Check if cookies are enabled (socket.io needs them)
        if(!rootState.cookies){
            return false
        } else {

            //Create to socket if there is none
            if(state.socket){
                return true
            } else {
                commit('setSocket', await io.connect(config.socketURL));
                return true
            }
            
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