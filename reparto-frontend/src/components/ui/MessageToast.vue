<template>
    <v-snackbar
      v-model="localShow"
      timeout=2000
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="color"
          text
          v-bind="attrs"
          @click="localShow = false"
        >
          cerrar
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>

export default {
  name: 'MessageToast',
  props: ['message', 'color', 'show'],
  computed: {
    localShow: {
      get() {
        return this.show
      },
      set (show) {
        this.$emit('input', show)
      }
    }
  }
}
</script>