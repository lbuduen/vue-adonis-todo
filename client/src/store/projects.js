// import router from "../router";
import Vue from "vue";

const url = `/api/projects`;

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
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setEditMode(state, project) {
      Vue.set(project, "isEditMode", true);
    },
    unsetEditMode(state, project) {
      Vue.set(project, "isEditMode", false);
    },
    removeProject(state, project) {
      state.projects.splice(state.projects.indexOf(project), 1);
    },
    setProjectTitle(state, { project, title }) {
      project.title = title;
    }
  },
  actions: {
    async createProject({ commit, state, rootState }) {
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
    },
    async fetchProjects({ commit, rootState }) {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.authentication.token}`
        }
      };
      const res = await fetch(url, options);
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      let data = await res.json();
      commit("setProjects", data);
    },
    async saveProject({ commit, rootState }, project) {
      const options = {
        method: "PATCH",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${rootState.authentication.token}`
        }
      };
      const res = await fetch(`${url}/${project.id}`, options);
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      commit("unsetEditMode", project);
    },
    async deleteProject({ commit, rootState }, project) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${rootState.authentication.token}`
        }
      };
      const res = await fetch(`${url}/${project.id}`, options);
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      commit("removeProject", project);
    }
  }
};
