import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/sign-up",
		name: "SignUp",
		component: SignUp,
	},
	// {
	//   path: "/about",
	//   name: "About",
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () =>
	//     import(/* webpackChunkName: "about" */ "../views/About.vue")
	// }
];

const router = new VueRouter({
	routes,
});

export default router;
