<template>
  <Panel title="Projects">
    <div v-for="project in projects" :key="project.id" class="project mt-2">
      <v-layout row wrap>
        <v-flex xs9 class="text-xs-left">
          <span v-if="!project.isEditMode">{{project.title}}</span>
          <v-text-field
            autofocus
            v-if="project.isEditMode"
            :value="project.title"
            @input="setProjectTitle({project, title: $event})"
            @keyup.enter="saveProject(project)"
          ></v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-icon @click="setEditMode(project)" v-if="!project.isEditMode">mdi-pencil</v-icon>
          <v-icon @click="saveProject(project)" v-if="project.isEditMode">mdi-check</v-icon>
          <v-icon @click="deleteProject(project)">mdi-delete</v-icon>
        </v-flex>
      </v-layout>
    </div>

    <v-layout row wrap class="mt-4">
      <v-flex xs8>
        <v-text-field
          placeholder="My project name..."
          :value="newProjectTitle"
          @input="setNewProjectTitle"
          @keyup.enter="createProject"
        ></v-text-field>
      </v-flex>

      <v-flex xs4>
        <v-btn color="green" dark class="mt-3" @click="createProject">
          <v-icon left>mdi-plus-circle-outline</v-icon>Create
        </v-btn>
      </v-flex>
    </v-layout>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  mounted() {
    this.fetchProjects();
  },
  computed: {
    ...mapState("projects", ["newProjectTitle", "projects"])
  },
  methods: {
    ...mapMutations("projects", [
      "setNewProjectTitle",
      "setEditMode",
      "setProjectTitle"
    ]),
    ...mapActions("projects", [
      "createProject",
      "fetchProjects",
      "saveProject",
      "deleteProject"
    ])
  }
};
</script>

<style>
.project {
  font-size: 24px;
}
.v-icon {
  cursor: pointer;
}
.v-icon:hover {
  color: #333;
}
</style>
