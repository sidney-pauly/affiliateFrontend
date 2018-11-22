

import axios from 'axios'

// initial state
const state = {
    title: 'Placeholder',
    namespace: 'affiliate.sc-apps.net',
    blogs: [],
    LandingImage: ''
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
            url: rootState.apiUrl + '/website',
            params: {
                namespace: state.namespace
            }
        })

        var website = req.data;

        state.LandingImage = website.LandingImage;
        state.title = website.Title;

        state.blogs = await Promise.all(website.Blogs.map(async b => {
            
            if (b.Category) {
                
                var request = await axios({
                    method:'get',
                    url: rootState.apiUrl + '/productsOfCategory',
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

            if (!rootState.socket.socket._callbacks.$modifyWebsite) {
                rootState.socket.socket.on("modifyWebsite", function (data) {
                    state.Title = data.Title
                    

                });
            }

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
    async modifyWebsite({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("modifyWebsite", {
                namespace: state.namespace,
                website: state,
                session: rootState.userData.session
            });
        }
    },
    async create({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("createBlog", {
                namespace: state.namespace,
                blog: data,
                session: rootState.userData.session
            });
        }
    },
    async modify({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("modifyBlog", {
                namespace: state.namespace,
                blog: data,
                session: rootState.userData.session
            });
        }
    },
    async delete({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("deleteBlog", {
                namespace: state.namespace,
                blog: data,
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