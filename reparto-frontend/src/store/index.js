import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Newspaper from '../models/Newspaper'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    API_URL: 'http://localhost:3000/api',
    deliveryPoints: [],
    newspapers: [],
    newspaper: {...Newspaper}    
  },

  mutations: {
    SET_DELIVERY_POINTS(state, deliveryPoints) {
      state.deliveryPoints = deliveryPoints
    },
    SET_NEWSPAPERS(state, newspapers) {
      state.newspapers = newspapers
    },
    INIT_NEWSPAPER(state) {
      state.newspaper = { ...Newspaper }
    },
    UPDATE_NEWSPAPER( state, fields) {
      state.newspaper = { ...state.newspaper, ...fields}
    }

  },

  actions: {

    // Delivery Point CRUD methods
    async getDeliveryPoints( { commit, state } ) {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            let response = await axios.get(state.API_URL + '/delivery-point')
            commit('SET_DELIVERY_POINTS', response.data)
            resolve(response.data)
          } catch (error) {
            reject(error)
          }
        })()
      })
    },

    orderDeliveryPoints( {state}, deliveryPointsOrder ) {
      return axios.put(state.API_URL + '/delivery-point/order', deliveryPointsOrder)
    },

    getDeliveryPointById( {state}, id) {
      return axios.get(state.API_URL + `/delivery-point/${id}`)
    },

    updateDeliveryPointById( {state}, deliveryPoint) {
      return axios.put(state.API_URL + `/delivery-point/${deliveryPoint._id}`, deliveryPoint)
    },

    createDeliveryPoint( {state}, deliveryPoint) {
      return axios.post(state.API_URL + '/delivery-point', deliveryPoint)
    },

    deleteDeliveryPointById( {state}, id) {
      return axios.delete(state.API_URL + `/delivery-point/${id}`)
    },

    // Newspaper CRUD methods
    async getNewspapers( { commit, state } ) {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            let response = await axios.get(state.API_URL + '/newspaper')
            commit('SET_NEWSPAPERS', response.data)
            resolve()
          } catch (error) {
            reject(error)
          }
        })()
      })
    },

    getNewspaperById( { state }, id) {
      return axios.get(state.API_URL + `/newspaper/${id}`)
    },

    updateNewspaperById( {state}, newspaper ) {
      return axios
        .put(state.API_URL + `/newspaper/${newspaper._id}`, newspaper)
    },

    deleteNewspaperById( { state }, id) {
      return axios
        .delete(state.API_URL + `/newspaper/${id}`)
    },
    
    createNewspaper( { state}, newspaper) {
      return axios
        .post(state.API_URL + '/newspaper', newspaper)
    }
  },

  modules: {
  }
})
