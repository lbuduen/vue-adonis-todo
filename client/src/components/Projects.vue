<template>
  <Panel title="Projects">
    <div v-for="project in projects" :key="project.id" class="project mt-2">
      <EditableRecord
        :isEditMode="project.isEditMode"
        :title="project.title"
        @onInput="setProjectTitle({project, title: $event})"
        @onEdit="setEditMode(project)"
        @onSave="saveProject(project)"
        @onDelete="deleteProject(project)"
        @onClick="projectClicked(project)"
      ></EditableRecord>
    </div>

    <CreateRecord
      placeholder="My project name..."
      :value="newProjectTitle"
      @onInput="setNewProjectTitle"
      @create="createProject"
    ></CreateRecord>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import CreateRecord from "@/components/CreateRecord.vue";
import EditableRecord from "@/components/EditableRecord.vue";

export default {
  components: {
    CreateRecord,
    EditableRecord
  },
  mounted() {
    this.fetchProjects();
  },
  computed: {
    ...mapState("projects", ["newProjectTitle", "projects"])
  },
  methods: {
    projectClicked(project) {
      this.setCurrentProject(project);
      this.fetchTasksForProject(project);
    },
    ...mapMutations("projects", [
      "setNewProjectTitle",
      "setEditMode",
      "setProjectTitle",
      "setCurrentProject"
    ]),
    ...mapActions("projects", [
      "createProject",
      "fetchProjects",
      "saveProject",
      "deleteProject"
    ]),
    ...mapActions("tasks", ["fetchTasksForProject"])
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
