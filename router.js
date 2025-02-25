import {createWebHistory, createRouter} from "vue-router";
import Home from './components/Home.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import UpdateUser from "./components/UpdateUser.vue";
import AddPost from "./components/AddPost.vue";
import UpdatePost from "./components/UpdatePost.vue";
import DetailPost from "./components/DetailPost.vue";
const routes =[
    {
        name:'Home',
        component: Home,
        path: '/'
    },
    {
        name:'Signup',
        component: Signup,
        path: '/sign-up'
    },
    {
        name:'Login',
        component: Login,
        path: '/login'
    },
    {
        name:'UpdateUser',
        component: UpdateUser,
        path: '/update-user/:id'
    },
    {
        name:'AddPost',
        component: AddPost,
        path: '/add-post/'
    },
    {
        name:'UpdatePost',
        component: UpdatePost,
        path: '/update-post/:id'
    },
    {
        name:'DetailPost',
        component: DetailPost,
        path: '/detail-post/:id'
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;