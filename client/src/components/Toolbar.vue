<template>
  <v-app-bar app fixed>
    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>vue</span>
      <span class="font-weight-light">todo</span>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn text v-if="isLoggedIn">
        <v-icon left>mdi-playlist-check</v-icon>projects
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text to="/register" v-if="!isLoggedIn">
        <v-icon left>mdi-account-box</v-icon>register
      </v-btn>
      <v-btn text v-if="!isLoggedIn">
        <v-icon left>mdi-fingerprint</v-icon>login
      </v-btn>
      <v-btn text v-if="isLoggedIn" @click="logout">
        <v-icon left>mdi-exit-to-app</v-icon>logout
      </v-btn>
      <v-btn text>how this was made</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapActions("authentication", ["logout"])
  }
};
</script>

<style>
</style>