import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		clickedFriend: "",
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setFriend(state, name) {
			state.clickedFriend = name;
		},
	},
	actions: {},
	modules: {},
});
