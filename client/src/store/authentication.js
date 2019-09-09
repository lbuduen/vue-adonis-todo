import router from "../router";

export default {
  namespaced: true,
  state: {
    registerEmail: "lbuduen@hotmail.com",
    registerPassword: "123456",
    registerError: null,
    loginEmail: "lbuduen@hotmail.com",
    loginPassword: "123456",
    loginError: null,
    token: null
  },
  getters: {
    isLoggedIn: state => !!state.token
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
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    logout({ commit }) {
      commit("setToken", null);
      router.push("/login");
    },
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
    },
    async login({ commit, state }) {
      commit("setLoginError", null);
      const url = `/api/auth/login`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          email: state.loginEmail,
          password: state.loginPassword
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await fetch(url, options);
      if (!res.ok) {
        commit("setLoginError", "An error has occured");
        throw new Error(res.status); // 404
      }
      let data = await res.json();
      commit("setToken", data.token);
      router.push("/");
    }
  }
};
