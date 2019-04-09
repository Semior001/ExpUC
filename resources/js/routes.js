import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import RegisterPage from "./components/RegisterPage";
import {store} from './store.js' // your vuex store

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return
    }
    next('/login')
};

export const routes = [
    {
        path: '/',
        component: Home,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/login',
        component: LoginPage,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/register',
        component: RegisterPage,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound
    }
];