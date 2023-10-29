import * as VueRouter from 'vue-router';
import Home from "../views/Home";
import Content from "../views/Content"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/content",
        name: "Content",
        component: Content,
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router