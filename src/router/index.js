import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Cards from '@/components/Cards'
import Card from '@/components/Card'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { noAuth: true } },
    { path: '/', name: 'home', component: Home },
    { path: '/cards', name: 'cards', component: Cards },
    { path: '/card/:cardId', name: 'card', component: Card }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page
  console.log('beforeEach', to.matched, localStorage.getItem('accessToken'))
  if (to.matched.some(record => record.meta.noAuth) || localStorage.getItem('accessToken')) {
    console.log('proceeds to', to.path)
    next()
  } else {
    console.log('redirects to /login')
    next({ path: '/login', query: { redirect: to.fullPath } })
  }
})

export default router
