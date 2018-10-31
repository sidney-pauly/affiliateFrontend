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
    async validateSocket ({state, commit, rootState, dispatch}) {
         

        //Check if cookies are enabled (socket.io needs them)
        if(!rootState.cookies){
            return false
        } else {

            //Create socket if there is none
            if(state.socket){
                return true
            } else {
                commit('setSocket', await io.connect(config.socketURL));

                if (!state.socket._callbacks.$errorMsg) {
                    state.socket.on("errorMsg", function (data) {
                        dispatch('setStatus', data, { root: true })
                    });
                }

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