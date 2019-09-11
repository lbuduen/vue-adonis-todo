// import router from "../router";
import Vue from 'vue';

const url = `/api/projects`;

export default {
  namespaced: true,
  state: {
    tasks: [],
    newTaskName: null,
  },
  getters: {},
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setNewTaskName(state, name) {
      state.newTaskName = name;
    },
    appendTask(state, task) {
      state.tasks.push(task);
    },
    setTaskDescription(state, { task, description }) {
      task.description = description;
    },
    setEditMode(state, task) {
      Vue.set(task, 'isEditMode', true);
    },
    unsetEditMode(state, task) {
      Vue.set(task, 'isEditMode', false);
    },
    removeTask(state, task) {
      state.tasks.splice(state.tasks.indexOf(task), 1);
    },
  },
  actions: {
    async fetchTasksForProject({ commit, rootState }, project) {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.authentication.token}`,
        },
      };
      const res = await fetch(`${url}/${project.id}/tasks`, options);
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      let data = await res.json();
      commit('setTasks', data);
    },
    async createTask({ commit, state, rootState }) {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          description: state.newTaskName,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${rootState.authentication.token}`,
        },
      };
      const res = await fetch(
        `${url}/${rootState.projects.currentProject.id}/tasks`,
        options
      );
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      let data = await res.json();
      commit('appendTask', data);
      commit('setNewTaskName', null);
    },
    async saveTask({ commit, rootState }, task) {
      const options = {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${rootState.authentication.token}`,
        },
      };
      const res = await fetch(`api/tasks/${task.id}`, options);
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      commit('unsetEditMode', task);
    },
    async deleteTask({ commit, rootState }, task) {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${rootState.authentication.token}`,
        },
      };
      const res = await fetch(`api/tasks/${task.id}`, options);
      if (!res.ok) {
        // commit("setRegisterError", "An error has occured");
        throw new Error(res.status); // 404
      }
      commit('removeTask', task);
    },
  },
};
