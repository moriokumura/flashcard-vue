<template>
  <app-layout>
    <div slot="page-name">Card</div>

    <div class="card">
      <div v-if="card">
        <p>{{ card.front }}</p>
        <p>{{ card.back }}</p>
        <p>{{ card.created_at }}</p>
      </div>
    </div>
  </app-layout>
</template>

<script>
import apiClient from '@/lib/http'
export default {
  data () {
    return {
      loading: false,
      error: null,
      card: null
    }
  },
  created () {
    this.getCard()
  },
  watch: {
    '$route': 'getCard'
  },
  methods: {
    getCard () {
      this.loading = true
      this.error = null
      this.cards = null
      apiClient.get(`cards/${this.$route.params.cardId}`)
        .then((response) => {
          this.card = response.data
          this.loading = false
        })
        .catch((error) => {
          this.error = error.toString()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
a
  color: #42b983
</style>
