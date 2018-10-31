
import config from '@/config'
import axios from 'axios'

// initial state
const state = {
    title: 'Placeholder',
    blogs: []
}

// getters
const getters = {

}


// mutations
const mutations = {

}

// actions
const actions = {
    async getWebsite({ state, dispatch, rootState, commit }) {


        //Fetch data from backend
        var req = await axios({
            method:'get',
            url: config.apiURL + '/website',
            params: {
                title: config.title
            }
        })

        var website = req.data;


        state.title = website.Title;

        state.blogs = await Promise.all(website.Blogs.map(async b => {
            
            if (b.Category) {
                
                var request = await axios({
                    method:'get',
                    url: config.apiURL + '/productsOfCategory',
                    params: {
                        category: b.Category
                    }
                }).catch(er => {
                    console.log(er)
                })
                b.products = request.data
                
                
            }

            return b

        }));

    },
    async validateSocket({ state, dispatch, rootState, commit }) {

        if (await dispatch('socket/validateSocket', null, { root: true })) {
            //Define what happens when a category is recived

            if (!rootState.socket.socket._callbacks.$newBlog) {
                rootState.socket.socket.on("newBlog", function (data) {
                    state.blogs.push(data);
                });
            }

            if (!rootState.socket.socket._callbacks.$modifyBlog) {
                rootState.socket.socket.on("modifyBlog", function (data) {
                    var i = state.blogs.findIndex(b => b._id == data._id);

                    if (i >= 0) {
                        state.blogs[i] = data;
                    }

                });
            }

            if (!rootState.socket.socket._callbacks.$deleteBlog) {
                rootState.socket.socket.on("deleteBlog", function (data) {
                    var i = state.blogs.findIndex(b => b._id == data._id);

                    if (i >= 0) {
                        state.blogs.splice(i, 1)
                    }

                });
            }

            return true;
        } else {
            return false;
        }
    },
    async create({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("createBlog", {
                website: config.title,
                blog: data
            });
        }
    },
    async modify({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("modifyBlog", {
                website: config.title,
                blog: data
            });
        }
    },
    async delete({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("deleteBlog", {
                website: config.title,
                blog: data
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