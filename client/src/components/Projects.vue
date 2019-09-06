<template>
  <Panel title="Projects">
    <div v-for="project in projects" :key="project.id">{{project.title}}</div>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          placeholder="My project name..."
          :value="newProjectTitle"
          @input="setNewProjectTitle"
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
  computed: {
    ...mapState("projects", ["newProjectTitle", "projects"])
  },
  methods: {
    ...mapMutations("projects", ["setNewProjectTitle"]),
    ...mapActions("projects", ["createProject"])
  }
};
</script>

<style>
</style>