<template>
  <v-container>
    <v-card class="pa-2">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="deliveryPoint.address"
            :rules="rules.address"
            label="Dirección"
            required
          ></v-text-field>

          <v-text-field
            v-model="deliveryPoint.description"
            label="Descripción"
          ></v-text-field>

          <v-text-field
            v-model="deliveryPoint.geoLocation"
            label="Geoposición"
          ></v-text-field>

          <v-switch v-model="deliveryPoint.active" label="Activo"></v-switch>
        </v-form>

        <v-chip
          v-for="(newspaper, key) in deliveryPoint.newspapers"
          v-bind:key="key"
          :color="newspaper.props.color"
          text-color="white"
          label
          class="mt-3 mr-1"
          :class="{ inactive: !newspaper.active }"
          @click="editNewspaper(newspaper, key)"
        >
          <v-avatar left color="white">
            <span :class="newspaper.props.color + '--text'">{{
              newspaper.quantity
            }}</span>
          </v-avatar>
          {{ newspaper.name }}
        </v-chip>
        <v-btn
          class="mt-3 ml-2"
          color="blue-grey darken-1"
          dark
          icon
          @click="showDialog = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="mode === 'edit' ? updateDeliveryPoint() : addDeliveryPoint()"
        >
          Aceptar
        </v-btn>
        <v-btn text color="error" @click="$router.back()">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>

    <message-toast
      :message="snackbar.message"
      :color="snackbar.color"
      :show.sync="snackbar.show"
    ></message-toast>

    <delivery-point-newspaper
      v-model="showDialog"
      @ok="onDialogOk()"
      @cancel="closeDialog()"
      @delete="removeFromNewspapersArray()"
    ></delivery-point-newspaper>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import MessageToast from "../ui/MessageToast.vue";
import DeliveryPointNewspaper from "./DeliveryPointNewspaper.vue";

export default {
  components: { MessageToast, DeliveryPointNewspaper },
  name: "DeliveryPointEdit",

  data: () => ({
    mode: "",
    valid: true,
    deliveryPoint: {
      isNew: true,
      address: "",
      description: "",
      geoLocation: "",
      active: false,
      newspapers: [],
    },
    rules: {
      address: [(v) => !!v || "La dirección es obligatoria"],
    },
    snackbar: {
      message: "",
      color: "red",
      show: false,
    },
    showDialog: false,
  }),

  methods: {
    ...mapActions([
      "getDeliveryPointById",
      "updateDeliveryPointById",
      "createDeliveryPoint",
    ]),

    async updateDeliveryPoint() {
      if (this.valid) {
        try {
          await this.updateDeliveryPointById(this.deliveryPoint);
          this.$router.back();
        } catch (error) {
          this.snackbar.message = error;
          this.snackbar.show = true;
        }
      }
    },

    async addDeliveryPoint() {
      if (this.valid) {
        try {
          await this.createDeliveryPoint(this.deliveryPoint);
          this.$router.back();
        } catch (error) {
          this.snackbar.message = error;
          this.snackbar.show = true;
        }
      }
    },

    editNewspaper(newspaper, key) {
      newspaper.isNew = false;
      newspaper.key = key;
      this.$store.commit("UPDATE_NEWSPAPER", newspaper);
      this.showDialog = true;
    },

    updateNewspapersArray() {
      if (this.$store.state.newspaper.isNew) {
        this.deliveryPoint.newspapers.push(this.$store.state.newspaper);
      } else {
        const idx = this.deliveryPoint.newspapers.findIndex(
          (el) => el._id == this.$store.state.newspaper._id
        );
        this.deliveryPoint.newspapers[idx] = this.$store.state.newspaper;
      }
    },

    removeFromNewspapersArray() {
      this.deliveryPoint.newspapers.splice(this.$store.state.newspaper.key,1);
      this.closeDialog();
    },

    cleanNewspaperState() {
      this.$store.commit("INIT_NEWSPAPER");
    },

    onDialogOk() {
      this.updateNewspapersArray();
      this.closeDialog();
    },

    closeDialog() {
      this.cleanNewspaperState();
      this.showDialog = false;
    },
  },

  async mounted() {
    this.mode = this.$route.params.mode;
    if (this.mode === "edit") {
      try {
        let response = await this.getDeliveryPointById(this.$route.params.id);
        this.deliveryPoint = { ...this.deliveryPoint, ...response.data };
      } catch (error) {
        this.snackbar.message = "error";
        this.snackbar.show = true;
      }
    }
  },
};
</script>
