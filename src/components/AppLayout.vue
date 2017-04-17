<template>
  <div class="container">
    <header>
      <div class="app-name">Flashcard</div>
      <div class="page-name"><slot name="page-name"></slot></div>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link to="/cards">Cards</router-link>
      <div class="button" v-on:click="logout">Logout</div>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      Flashcard v0.0.1 &copy;2017 Morio Okumura
    </footer>
  </div>
</template>

<script>
import apiClient from '../lib/http'
export default {
  data () {
    return {
      error: null
    }
  },
  methods: {
    logout () {
      this.error = null
      apiClient.post(`logout`)
        .then((response) => {
          localStorage.removeItem('accessToken')
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          this.error = error.toString()
          localStorage.removeItem('accessToken')
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>

<style lang="sass" scoped>
header
  border-bottom: 1px solid #ddd
  .app-name, .page-name, .button, a
    display: inline-block
    padding: 20px
  .button
    color: #999
    cursor: pointer

footer
  color: #aaa
  font-size: 11px
  padding-top: 40px

</style>
