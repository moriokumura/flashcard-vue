<template>
  <app-layout>
    <div slot="page-name">Cards</div>

    <div class="cards">
      <h1>Your cards</h1>
      <div>
        <input type="text" v-model="front">
        <input type="text" v-model="back">
        <div class="button" v-on:click="createCard">Add</div>
      </div>
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <ul>
        <li v-for="card in cards">
          <router-link :to="{ name: 'card', params: { cardId: card.id }}">
            <span>{{ card.front }}</span>
            <span>{{ card.back }}</span>
          </router-link>
          <div class="button delete" v-on:click="deleteCard(card.id)">x</div>
        </li>
      </ul>
    </div>
  </app-layout>
</template>

<script>
import apiClient from '../lib/http'
import Vue from 'vue'
import AppLayout from '@/components/AppLayout'
Vue.component('app-layout', AppLayout)
export default {
  data () {
    return {
      loading: false,
      error: null,
      cards: [],
      front: '',
      back: ''
    }
  },
  created () {
    this.getCards()
  },
  watch: {
    '$route': 'getCards'
  },
  methods: {
    getCards () {
      this.loading = true
      this.error = null
      this.cards = []
      apiClient.get('cards')
        .then((response) => {
          this.cards = response.data
          this.loading = false
        })
        .catch((error) => {
          this.error = error.toString()
        })
    },
    createCard () {
      apiClient.post('cards', { front: this.front, back: this.back })
        .then((response) => {
          this.front = ''
          this.back = ''
          this.cards.push(response.data)
        })
        .catch((error) => {
          this.error = error.toString()
        })
    },
    deleteCard (cardId) {
      apiClient.delete(`cards/${cardId}`)
        .then((response) => {
          this.cards = this.cards.filter(card => card.id !== cardId)
        })
        .catch((error) => {
          this.error = error.toString()
        })
    }
  }
}
</script>

<style lang="sass" scoped>
ul
  list-style-type: none
  padding: 0

li
  border-bottom: 1px solid #ddd
  padding: 10px
  &:first-child
    border-top: 1px solid #ddd

a
  color: #42b983

.button
  border: 1px solid #42b983
  border-radius: 3px
  color: #42b983
  cursor: pointer
  display: inline-block
  padding: 5px 10px
  &.delete
    border: none
    color: #bbb
</style>
