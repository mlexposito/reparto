<template>
  <v-container style="margin-bottom: 60px;">
    <v-card v-for="(newspaper,key) in newspapers" v-bind:key="key" class="ma-2">
      <v-card-text>
        <h4>{{newspaper.name}}</h4>          
        color: <span :style="`color: ${newspaper.color}`">{{newspaper.color}}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          fab
          dark
          small
          elevation="3"
          color="primary"
          @click="editNewspaper(newspaper._id)"
        >
          <v-icon
            dark
          >mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          dark
          elevation="3"
          color="red"
          @click="showConfirmDeleteDialog(newspaper._id)"
        >
          <v-icon
          >mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <confirm-dialog
      :show.sync="confirmDeleteDialog.show"
      :buttons="confirmDeleteDialog.buttons"
      @ok="deleteNewspaper()"
      @cancel="confirmDeleteDialog.show = false"
    >
      Eliminar {{ confirmDeleteDialog.name }}
    </confirm-dialog>

    <v-btn
      @click="$router.push('/newspaper/add')"
      style="bottom: 10px;"
      color="red"
      dark
      elevation="2"
      fixed
      right
      bottom
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <message-toast
      :message="snackbar.message"
      :color="snackbar.color"
      :show.sync="snackbar.show"
    >
    </message-toast>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import ConfirmDialog from '../ui/ConfirmDialog.vue'
import MessageToast from '../ui/MessageToast'

export default {
  components: {MessageToast, ConfirmDialog},
  name: 'Newspapers',

  data: () => ({
    confirmDeleteDialog : {
      show : false,
      buttons: {
        ok: {
          message: 'Eliminar',
          color: 'red'
        }
      },
      name : '',
      _id : ''
    },

    snackbar : {
      message : '',
      color: 'blue',
      show : false
    }
  }),

  computed: {
    newspapers() {
      return this.$store.state.newspapers
    }
  },

  methods: {
    ...mapActions(['getNewspapers','deleteNewspaperById']),

    showSnackbar( message, color = 'red'){
        this.snackbar.message = message
        this.snackbar.color = color
        this.snackbar.show = true
    },

    showConfirmDeleteDialog(id) {
      let newspaper = this.$store.state.newspapers.find( el => el._id === id)
      this.confirmDeleteDialog._id = newspaper._id
      this.confirmDeleteDialog.name = newspaper.name
      this.confirmDeleteDialog.show = true
    },

    editNewspaper(id) {
      this.$router.push(`/newspaper/edit/${id}`)
    },

    async deleteNewspaper() {
      try {
        await this.deleteNewspaperById(this.confirmDeleteDialog._id)
        await this.getNewspapers()
      } catch (e) {
        this.showSnackbar(e)
      } finally {
        this.confirmDeleteDialog.show = false
        this.confirmDeleteDialog.name = ''
        this.confirmDeleteDialog._id = ''
      }
    }
  },

  mounted() {
    (async () => {
      try {
        await this.getNewspapers()
      } catch (e) {
        this.showSnackbar(e)
      }
    })()
  }
}
</script>
