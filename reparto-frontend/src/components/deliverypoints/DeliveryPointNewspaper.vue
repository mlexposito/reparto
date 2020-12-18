<template>
  <div>
    <v-dialog v-model="localShow" max-width="600" persistent>
      <v-card class="pa-2">
        <v-card-text>
          <v-form v-model="valid">
            <v-select
              v-model="name"
              :items="selectableNewspapers"
              item-text="name"
              item-value="name"
              label="Nombre"
              required
              @change="updateColor(name)"
            ></v-select>

            <v-text-field
              v-model="quantity"
              label="Cantidad"
              type="number"
              required
            ></v-text-field>

            <v-container fluid>
              <v-row>
                <v-col v-for="(day, key) in daysOfWeek" :key="key">
                  <v-checkbox
                    v-model="dayOfWeek"
                    :label="day.label"
                    :value="day.value"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="grey--text text--lighten-1 no-text-decoration">
                    (
                    <a
                      href="#"
                      @click="dayOfWeek = [0, 1, 2, 3, 4, 5, 6]"
                      class="grey--text text--lighten-1 no-text-decoration"
                      >todos</a
                    >
                    <span> / </span>
                    <a
                      href="#"
                      @click="dayOfWeek = [0, 6]"
                      class="grey--text text--lighten-1 no-text-decoration"
                      >fin de semana</a
                    >
                    <span> / </span>
                    <a
                      href="#"
                      @click="dayOfWeek = []"
                      class="grey--text text--lighten-1 no-text-decoration"
                      >ninguno</a
                    >
                    )
                  </span>
                </v-col>
              </v-row>
            </v-container>

            <v-switch v-model="holidays" label="Festivos"></v-switch>

            <v-switch v-model="active" label="Activo"></v-switch>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="red" @click="$emit('delete')">
            Eliminar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="$emit('ok')">
            Aceptar
          </v-btn>
          <v-btn text @click="$emit('cancel')">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DeliveryPointNewspaper",
  props: ["value"],

  data: () => ({
    valid: true,

    daysOfWeek: [
      { label: "Lun", value: 1 },
      { label: "Mar", value: 2 },
      { label: "Mie", value: 3 },
      { label: "Jue", value: 4 },
      { label: "Vie", value: 5 },
      { label: "Sab", value: 6 },
      { label: "Dom", value: 0 },
    ],
  }),

  computed: {
    localShow: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },

    name: {
      get() {
        return this.$store.state.newspaper.name;
      },
      set(value) {
        this.$store.commit("UPDATE_NEWSPAPER", { name: value });
      },
    },

    quantity: {
      get() {
        return this.$store.state.newspaper.quantity;
      },
      set(value) {
        this.$store.commit("UPDATE_NEWSPAPER", { quantity: parseInt(value) });
      },
    },

    dayOfWeek: {
      get() {
        return this.$store.state.newspaper.dayOfWeek;
      },
      set(value) {
        this.$store.commit("UPDATE_NEWSPAPER", { dayOfWeek: value });
      },
    },

    holidays: {
      get() {
        return this.$store.state.newspaper.holidays;
      },
      set(value) {
        this.$store.commit("UPDATE_NEWSPAPER", { holidays: value });
      },
    },

    active: {
      get() {
        return this.$store.state.newspaper.active;
      },
      set(value) {
        this.$store.commit("UPDATE_NEWSPAPER", { active: value });
      },
    },

    selectableNewspapers() {
      return this.$store.state.newspapers.map((el) => ({name: el.name, color: el.color}));
    },
  },

  methods: {
    ...mapActions(["getNewspapers"]),
    updateColor(name) {
      this.$store.commit("UPDATE_NEWSPAPER", { props: { color: this.selectableNewspapers.find(el => el.name == name).color}})
    }
  },

  async mounted() {
    await this.getNewspapers();
  },
};
</script>

<style scoped>
.no-text-decoration {
  text-decoration: none;
}

.v-input--selection-controls {
    margin-top: 0px; 
    padding-top: 0px; 
}

</style>
