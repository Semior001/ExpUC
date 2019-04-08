import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";
import RegisterPage from "./components/RegisterPage";

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound
    }
];