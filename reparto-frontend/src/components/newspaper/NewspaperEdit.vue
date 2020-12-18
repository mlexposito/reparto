<template>
  <v-container>
    <v-card
      class="pa-2"
    >
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field>
          <v-container fluid>
            <v-row>
              <v-radio-group
                label="Color"
                v-model="selectedColor"
              >
                <v-radio
                  v-for="(color, key) in colors"
                  :key="key"
                  :label="color.label"
                  :color="color.color"
                  :value="color.color"
                ></v-radio>
              </v-radio-group>
            </v-row>
          </v-container>
        </v-form>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          color="primary"
          @click="mode==='edit' ? updateNewspaper() : addNewspaper()"
        >
          Aceptar
        </v-btn>
        <v-btn
          color="error"
          @click="$router.back()"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>

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
import MessageToast from '../ui/MessageToast.vue'

export default {
  components: { MessageToast },
  name: 'NewspaperEdit',

  data: () => ({
    mode: '',
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'El nombre es obligatorio'
    ],
    selectedColor : '',
    colors : [
      {label: 'Negro', color: 'black'},
      {label: 'Rojo', color: 'red'},
      {label: 'Azul', color: 'blue'},
      {label: 'Naranja', color: 'orange'},
      {label: 'Verde', color: 'green'},
      {label: 'Violeta', color: 'purple'},
      {label: 'Marron', color: 'brown'},
      {label: 'Gris', color: 'blue-grey'}
    ],

    snackbar: {
      show: false,
      message: '',
      color: 'blue'
    }
  }),

  computed: {

  },

  methods: {
    ...mapActions(['getNewspaperById', 'updateNewspaperById', 'createNewspaper']),

    showSnackbar(message, color = 'red') {
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.show = true
  },

    async updateNewspaper() {
      if (this.valid) {
        try {
          await this.updateNewspaperById({ '_id' : this.$route.params.id, 'name': this.name, 'color' : this.selectedColor })
          this.$router.push('/newspapers')
        } catch (e) {
          this.showSnackbar(e)
        }
      } 
    },
      
    async addNewspaper() {
      if (this.valid) {
        try {
          await this.createNewspaper({ 'name': this.name, 'color' : this.selectedColor })
          this.$router.push('/newspapers')
        } catch (e) {
          this.showSnackbar(e)
        }
      }
    }

  },


  async mounted() {
    this.mode = this.$route.params.mode
    if (this.mode === 'edit') {
      try {
        let response = await this.getNewspaperById( this.$route.params.id)
        this.name = response.data.name
        this.selectedColor = response.data.color
      } catch (e) {
        this.showSnackbar(e)
      }
    }
  }
}
</script>
