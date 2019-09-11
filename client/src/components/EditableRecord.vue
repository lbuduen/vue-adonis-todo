<template>
  <v-layout row wrap>
    <v-flex xs9 class="text-xs-left">
      <slot></slot>
      <span v-if="!isEditMode" @click="$emit('onClick')">{{title}}</span>
      <v-text-field
        autofocus
        v-if="isEditMode"
        :value="title"
        @input="$emit('onInput', $event)"
        @keyup.enter="$emit('onSave')"
      ></v-text-field>
    </v-flex>
    <v-flex xs3 class="text-xs-right">
      <v-icon @click="$emit('onEdit')" v-if="!isEditMode">mdi-pencil</v-icon>
      <v-icon @click="$emit('onSave')" v-if="isEditMode">mdi-check</v-icon>
      <v-icon @click="$emit('onDelete')">mdi-delete</v-icon>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["isEditMode", "title", "record"]
};
</script>

<style>
</style>