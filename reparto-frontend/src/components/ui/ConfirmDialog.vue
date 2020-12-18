<template>
    <v-dialog
      v-model="localShow"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
           <slot></slot>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="buttonsProps.ok.color"
            text
            @click="$emit('ok')"
          >
            {{ buttonsProps.ok.message }}
          </v-btn>
          <v-btn
            :color="buttonsProps.cancel.color"
            text
            @click="$emit('cancel')"
          >
            {{ buttonsProps.cancel.message }}
          </v-btn>          
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmDialog',
    props: ['show', 'buttons'],
    computed: {

        localShow: {
            get() {
                return this.show
            },
            set (show) {
                this.$emit('input', show)
            }
        },

        buttonsProps() {
            return {
                ok: {
                    message: 'Aceptar',
                    color: 'primary'
                },
                cancel: {
                    message: 'Cancelar',
                    color: 'grey'
                },
                ...this.buttons
            }
        }
    }
}
</script>