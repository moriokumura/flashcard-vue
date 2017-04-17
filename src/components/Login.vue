<template>
  <div class="login">
    <div>
      <label>Mail</label>
      <input type="text" v-model="mail">
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="password">
    </div>
    <div>
      <button v-on:click="submit">Log In</button>
    </div>
  </div>
</template>

<script>
import apiClient from '@/lib/http'
export default {
  data () {
    return {
      loading: false,
      error: null,
      mail: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.loading = true
      this.error = null
      apiClient.post(`login`, { mail: this.mail, password: this.password })
        .then((response) => {
          this.loading = false
          if (response.data.error) {
            this.error = response.data.error
            console.log(this.error)
          } else {
            console.log('got token', response.data.access_token)
            localStorage.setItem('accessToken', response.data.access_token)
            console.log('saved token', localStorage.getItem('accessToken'))
            const redirectPath = this.$route.query.redirect
            if (redirectPath) {
              this.$router.push(redirectPath)
            } else {
              this.$router.push({ name: 'home' })
            }
          }
        })
        .catch((error) => {
          this.error = error.toString()
          console.log(this.error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
h1, h2
  font-weight: normal

a
  color: #42b983
</style>
