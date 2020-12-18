import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/newspapers',
    name: 'Newspapers',
    component: () => import('@/views/newspaper/NewspapersView.vue')
  },
  {
    path: '/newspaper/:mode(add|edit)/:id?',
    name: 'Newspaper_edit',
    component: () => import('@/views/newspaper/NewspaperEditView.vue')
  },
  {
    path: '/deliverypoint/:mode(add|edit)/:id?',
    name: 'DeliveryPoint_edit',
    component: () => import('@/views/deliverypoint/DeliveryPointEditView.vue')
  },
  {
    path: '/deliverypoint/order',
    name: 'DeliveryPoint_order',
    component: () => import('@/views/deliverypoint/DeliveryPointOrderView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
