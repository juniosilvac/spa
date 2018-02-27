import Vue from 'vue'
import Router from 'vue-router'
import localforage from 'localforage'

import { bus } from '@/plugins/event-bus'

import dashboard from '@app/dashboard/routes'
import categories from '@app/categories/routes'
import products from '@app/products/routes'
import auth from '@app/auth/routes'
import users from '@app/users/routes'
import store from '@/store'

const routes = [
  ...dashboard,
  ...categories,
  ...products,
  ...auth,
  ...users
]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

const checkAuth = async (to, from, next) => {
  const token = await localforage.getItem('token')
  store.dispatch('setToken', { token })
  if (to.name !== 'auth.index' && token === null) {
    next({name: 'auth.index'})
  }
  next()
}

const clearAlerts = () => {
  bus.$emit('clear-alerts')
}

router.beforeEach(async (to, from, next) => {
  checkAuth(to, from, next)
  clearAlerts()
})

export default router
