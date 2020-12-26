import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'surveys',
    component: () => import(/* webpackChunkName: "about" */ '../views/Surveys.vue')
  },
  {
    path: '/surveys/:id',
    name: 'survey',
    component: () => import(/* webpackChunkName: "about" */ '../views/Survey.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
