<template>
  <app-layout>
    <div slot="page-name">Home</div>

    <div class="home">
      <h1>Hello Flashcard!</h1>
    </div>
  </app-layout>
</template>

<script>
import Vue from 'vue'
import AppLayout from '@/components/AppLayout'
Vue.component('app-layout', AppLayout)

export default {
  data () {
    return {
      error: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
h1, h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983
</style>
