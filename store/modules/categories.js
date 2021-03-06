
import axios from 'axios'

// initial state
const state = {
    categories: [],
    categroyTree: [],
    version: 0
}

// getters
const getters = {

}


// mutations
const mutations = {

    incrementVersion(state, payload) {
        state.version++;
    },
    setCategoryTree(state, payload) {
        state.categoryTree = payload;
    }

}

// actions
const actions = {
    async validateSocket({ state, dispatch, rootState, commit }) {

        if (await dispatch('socket/validateSocket', null, { root: true })) {
            //Define what happens when a category is recived

            if (!rootState.socket.socket._callbacks.$categories) {
                rootState.socket.socket.on("categories", function (data) {
                    state.categories = data;
                    dispatch('buildTree')
                });
            }

            if (!rootState.socket.socket._callbacks.$categoryChanged) {
                rootState.socket.socket.on("categoryChanged", function (data, final) {
                    var changedCatI = state.categories.findIndex(c => (c._id == data._id));
                    state.categories[changedCatI] = data;
                    if (final) {
                        dispatch('buildTree')
                    }
                });
            }

            if (!rootState.socket.socket._callbacks.$newCategory) {
                rootState.socket.socket.on("newCategory", function (data, final) {
                    state.categories.push(data);
                    if (final) {
                        dispatch('buildTree')
                    }
                });
            }

            if (!rootState.socket.socket._callbacks.$deletedCategory) {
                rootState.socket.socket.on("deletedCategory", function (data, final) {
                    var changedCatI = state.categories.findIndex(c => c._id == data._id);
                    state.categories.splice(changedCatI, 1);
                    if (final) {
                        dispatch('buildTree')
                    }
                });
            }


            return true;
        } else {
            return false;
        }
    },
    async getCategories({ state, dispatch, rootState, commit }, isServer) {

        //Check if the socket can be used, if not use normal ajax
        if (await dispatch('validateSocket') && !isServer) {

            

            //get Categories if none are present
            if (state.categories.length <= 0) {


                await rootState.socket.socket.emit('getCategories')
            }

            return state.categoryTree;

        } else {


            //Fetch data from backend
            return axios.get(rootState.apiUrl + '/categories')
                .then((res) => {
                    state.categories = res.data;
                    dispatch('buildTree')
                })
                .catch((e) => {
                    console.log(e);
                })

        }

    },
    async rename({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {

            rootState.socket.socket.emit("renameCategory", {
                _id: data.selected[0],
                Title: data.newTitle,
                session: rootState.userData.session
            });
        }
    },
    async create({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {
            if (data.selected[0]) {
                rootState.socket.socket.emit("createCategory", {
                    _id: data.selected[0],
                    Title: data.newTitle,
                    session: rootState.userData.session
                });
            } else {
                rootState.socket.socket.emit("createCategory", {
                    Title: data.newTitle,
                    session: rootState.userData.session
                });
            }
        }
    },
    async delete({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {
            rootState.socket.socket.emit("deleteCategory", {
                _id: data.selected[0],
                session: rootState.userData.session
            });
        }
    },
    async merge({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {
            rootState.socket.socket.emit("mergeCategories", {
                Category2: { _id: data.selected[0] },
                Category1: { _id: data.selected[1] },
                session: rootState.userData.session
            });
        }
    },
    async append({ state, dispatch, rootState, commit }, data) {
        if (await dispatch('validateSocket')) {
            state.categoryTree = [];

            rootState.socket.socket.emit("appendCategory", {
                Category2: { _id: data.selected[0] },
                Category1: { _id: data.selected[1] },
                session: rootState.userData.session
            });
        }
    },
    buildTree({ state, dispatch, rootState, commit }) {



        var tree = appendChilds(
            state.categories.filter(c => {
                return !c.Parent && !c.Link;
            })
        );

        function appendChilds(categories) {
            var cs = [];
            categories.forEach(function (c) {
                var childCategories = state.categories.filter(cc => {
                    return cc.Parent == c._id && !c.Link;
                });
                if (childCategories) {
                    c.Childs = appendChilds(childCategories);
                    cs.push(c);
                }
            });

            return cs;
        }

        commit('setCategoryTree', tree);

    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions

}