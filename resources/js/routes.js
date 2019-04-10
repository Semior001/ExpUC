import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import RegisterPage from "./components/RegisterPage";
import Schedule from "./components/Schedule";
import store from './store/index'

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters['user/isAuthenticated']) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters['user/isAuthenticated']) {
        next();
        return
    }
    next('/login')
};

export const routes = [
    {
        title: 'Home',
        icon: 'dashboard',
        path: '/',
        component: Home,
        beforeEnter: ifAuthenticated
    },
    {
        title: 'Schedule',
        icon: 'calendar_today',
        path: '/schedule',
        component: Schedule,
        beforeEnter: ifAuthenticated
    },
    {
        title: 'Login',
        icon: '',
        path: '/login',
        component: LoginPage,
        beforeEnter: ifNotAuthenticated,
        showInToolbar: false
    },
    {
        title: 'Register',
        icon: '',
        path: '/register',
        component: RegisterPage,
        beforeEnter: ifNotAuthenticated,
        showInToolbar: false
    },
    {
        title: '404 - Not found',
        icon: '',
        path: '*',
        name: 'not-found',
        component: NotFound,
        showInToolbar: false
    }
];