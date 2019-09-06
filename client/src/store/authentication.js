import router from "../router";

export default {
  namespaced: true,
  state: {
    registerEmail: "lbuduen@hotmail.com",
    registerPassword: "123456",
    registerError: null,
    token: null
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    }
  },
  mutations: {
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async register({ commit, state }) {
      commit("setRegisterError", null);
      const url = `/api/auth/register`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          email: state.registerEmail,
          password: state.registerPassword
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await fetch(url, options);
      if (!res.ok) {
        commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      let data = await res.json();
      commit("setToken", data.token);
      router.push("/");
    }
  }
};
