<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col>
            <v-text-field
              v-model="searchFilter"
              solo
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
            > 
            </v-text-field>
        </v-col>
        <v-col cols="2" md="1">
          <v-btn
            @click="$router.push('/deliverypoint/order')"
            class="mt-1"
            elevation="2"
            icon
            tile
            large
          >
            <v-icon>
              mdi-format-list-bulleted
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-card
      v-for="(deliveryPoint, key1) in deliveryPoints"
      v-bind:key="key1"
      class="ma-2"
      :class="{ 'inactive': !deliveryPoint.active }"
    >
      <v-card-text>
        <h4>{{ deliveryPoint.address }}</h4>
        {{ deliveryPoint.description }}
        <v-divider></v-divider>
        <v-chip
          v-for="(newspaper, key2) in deliveryPoint.newspapers"
          v-bind:key="key2"
          :color="newspaper.props.color"
          text-color="white"
          label
          class="mt-3 mr-1"
          :class="{ 'inactive': !newspaper.active }"
        >
          <v-avatar left color="white">
            <span :class="newspaper.props.color + '--text'">{{
              newspaper.quantity
            }}</span>
          </v-avatar>
          {{ newspaper.name }}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          fab
          dark
          x-small
          elevation="3"
          color="primary"
          @click="editDeliveryPoint(deliveryPoint._id)"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          x-small
          elevation="3"
          color="red"
          @click="showConfirmDeleteDialog(deliveryPoint._id)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-btn
      @click="$router.push('/deliverypoint/add')"
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

    <confirm-dialog
      :show.sync="confirmDeleteDialog.show"
      :buttons="confirmDeleteDialog.buttons"
      @ok="deleteDeliveryPoint"
      @cancel="confirmDeleteDialog.show = false"
    >
      Eliminar {{ confirmDeleteDialog.address }}
    </confirm-dialog>

    <message-toast
      :message="snackbar.message"
      :color="snackbar.color"
      :show.sync="snackbar.show"
    >
    </message-toast>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ConfirmDialog from "../ui/ConfirmDialog.vue";
import MessageToast from "../ui/MessageToast.vue";

export default {
  name: "DeliveryPoints",
  components: { MessageToast, ConfirmDialog},
  data: () => ({
    searchFilter: '',
    snackbar: {
      message: "",
      color: "red",
      show: false,
    },
    confirmDeleteDialog: {
      show: false,
      buttons: {
        ok: {
          message: "Eliminar",
          color: "red",
        },
      },
      address: "",
      _id: "",
    },
  }),

  computed: {
    deliveryPoints() {
      return this.$store.state.deliveryPoints.filter(el => (new RegExp(this.searchFilter, 'i')).test(el.address) || (new RegExp(this.searchFilter, 'i').test(el.description)));
    },
  },

  methods: {
    ...mapActions(["getDeliveryPoints", "deleteDeliveryPointById"]),

    showConfirmDeleteDialog(id) {
      let deliveryPoint = this.$store.state.deliveryPoints.find(
        (el) => el._id === id
      );
      this.confirmDeleteDialog.address = deliveryPoint.address;
      this.confirmDeleteDialog._id = deliveryPoint._id;
      this.confirmDeleteDialog.show = true;
    },

    async deleteDeliveryPoint() {
      try {
        await this.deleteDeliveryPointById(this.confirmDeleteDialog._id);
        await this.getDeliveryPoints();
      } catch (error) {
        this.snackbar.message = error;
        this.snackbar.show = true;
      } finally {
        this.confirmDeleteDialog.show = false;
        this.confirmDeleteDialog._id = "";
        this.confirmDeleteDialog.name = "";
      }
    },

    editDeliveryPoint(id) {
      this.$router.push(`/deliverypoint/edit/${id}`);
    },
  },

  async mounted() {
    try {
      await this.getDeliveryPoints();
    } catch (error) {
      this.snackbar.message = error;
      this.snackbar.show = true;
    }
  },
};
</script>

<style scoped>

</style>
