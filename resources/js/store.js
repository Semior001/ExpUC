import Vuex from "vuex";
import * as Vue from "vue";
import * as axios from "axios";

Vue.use(Vuex);

// dispatch - запустить  action
// commit - запустить mutation

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || '',
        status: '',
        userData: {}
    },

    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        userData: state => {
            state.userData = JSON.parse(localStorage.getItem('user-data'));

            if(state.userData)
                return state.userData;

            if(!!state.token){

                console.log("loading user data...");

                axios({url: 'api/user', method: 'GET'})
                    .then(response => {
                        const userData = response.data.user;
                        localStorage.setItem('user-data', JSON.stringify(userData));
                        state.userData = userData;
                    })
                    .catch(error => {
                        localStorage.removeItem('user-data');
                    });
                return state.userData;
            }

            return null;
        }
    },

    mutations: {
        "AUTH_REQUEST": (state) => {
            state.status = 'loading';
        },
        "AUTH_SUCCESS": (state, token) => {
            state.status = 'success';
            state.token = token;
        },
        "AUTH_ERROR": (state) => {
            state.status = 'error';
        },
        "PUT_USER_DATA": (state, user) => {
            state.userData = user;
        }
    },

    actions: {
        "AUTH_REQUEST": ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit("AUTH_REQUEST");
                axios({url: 'api/login', data: user, method: 'POST'})
                    .then(response => {
                        if(response.status === 200) {
                            const token = response.data.api_token;
                            localStorage.setItem('user-token', token);
                            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                            commit("AUTH_SUCCESS", token);
                            resolve(response);
                            return;
                        }
                        commit("AUTH_ERROR", response);
                        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                        reject(response);
                    })
                    .catch(error => {
                        commit("AUTH_ERROR", error);
                        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                        reject(error)
                    })
            });
        },
        "AUTH_LOGOUT": ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                commit("AUTH_LOGOUT");
                localStorage.removeItem('user-token');
                localStorage.removeItem('user-data');
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        },
        "REGISTER_REQUEST": ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => {
                axios({url: 'api/register', data:user, method: 'POST'})
                    .then(response => {
                        const token = response.data.api_token;
                        localStorage.setItem('user-token', token);
                        axios.defaults.headers.common['Authorization'] = "Bearer" + token;
                        commit("AUTH_SUCCESS", token);
                        resolve(response);
                    })
                    .catch(error => {
                        commit("AUTH_ERROR", error);
                        localStorage.removeItem('user-token');
                        reject(error);
                    })
            });
        },
        "LOAD_USER_DATA": ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                axios({url: 'api/user', method: 'GET'})
                    .then(response => {
                        const userData = response.data.user;
                        localStorage.setItem('user-data', JSON.stringify(userData));
                        commit("PUT_USER_DATA", userData);
                        resolve(response);
                    })
                    .catch(error => {
                        localStorage.removeItem('user-data');
                        reject(error);
                    });
            });
        },
    },
});
