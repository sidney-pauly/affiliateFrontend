import { Store } from "vuex";
import axios from 'axios'

// initial state
const state = {
    username: '',
    password: '',
    session: {}
}

// getters
const getters = {

}


// mutations
const mutations = {



}

// actions
const actions = {

    async login({ state, dispatch, rootState, commit }) {


        try {
            //Fetch data from backend
            var res = await axios({
                method: 'post',
                url: rootState.apiUrl + '/login',
                data: {
                    username: state.username,
                    password: state.password
                }
            })

            rootState.status = {text: 'Login erfolgreich', type: 'success'}

            state.session = res.data;
            console.log(res.data)
        }
        catch (er) {
            rootState.status = {text: 'Login fehlgeschlagen', type: 'danger'}

            console.log(er)
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