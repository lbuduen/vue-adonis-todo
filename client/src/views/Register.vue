<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Register</h1>

        <v-text-field
          label="Email"
          placeholder="Email"
          :value="registerEmail"
          @input="setRegisterEmail"
        ></v-text-field>

        <v-text-field
          type="password"
          autocomplete="new-password"
          label="Password"
          placeholder="Password"
          :value="registerPassword"
          @input="setRegisterPassword"
        ></v-text-field>

        <v-alert type="error" :value="registerError">{{registerError}}</v-alert>

        <v-btn @click="register">
          <v-icon left>mdi-account-circle</v-icon>Register
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("authentication", [
      "registerEmail",
      "registerPassword",
      "registerError"
    ])
  },
  methods: {
    ...mapMutations("authentication", [
      "setRegisterEmail",
      "setRegisterPassword"
    ]),
    ...mapActions("authentication", ["register"])
  }
};
</script>

<style>
</style>