// import router from "../router";

export default {
  namespaced: true,
  state: {
    projects: [],
    newProjectTitle: null
  },
  getters: {},
  mutations: {
    setNewProjectTitle(state, title) {
      state.newProjectTitle = title;
    },
    appendProject(state, project) {
      state.projects.push(project);
    }
  },
  actions: {
    async createProject({ commit, state, rootState }) {
      const url = `/api/projects`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          title: state.newProjectTitle
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${rootState.authentication.token}`
        }
      };
      const res = await fetch(url, options);
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      let data = await res.json();
      commit("appendProject", data);
      commit("setNewProjectTitle", null);
    }
  }
};
