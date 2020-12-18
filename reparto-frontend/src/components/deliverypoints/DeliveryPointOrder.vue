<template>
  <v-container>
    <draggable v-model="deliveryPoints">
      <v-card
        v-for="(deliveryPoint, key) in deliveryPoints"
        :key="key"
        class="mt-2"
      >
        <v-card-text>
          <v-container class="d-flex flex-row">
            <v-icon>
              mdi-drag-horizontal-variant
            </v-icon>
            <div class="ml-6">
              <h3>
                {{ deliveryPoint.address }} ({{ deliveryPoint.description }})
              </h3>
              Orden: {{ key + 1 }}
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </draggable>

    <v-btn
      fab
      color="primary"
      dark
      elevation="2"
      fixed
      right
      bottom
      @click="saveOrder()"
    >
      <v-icon>
        mdi-content-save
      </v-icon>
    </v-btn>

    <message-toast
      :message="snackbar.message"
      :color="snackbar.color"
      :show.sync="snackbar.show"
    ></message-toast>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import draggable from "vuedraggable";
import MessageToast from "../ui/MessageToast.vue";

export default {
  name: "DeliveryPointsOrder",

  components: { draggable, MessageToast },

  data: () => ({
    deliveryPoints: [],
    snackbar: {
      message: "",
      color: "red",
      show: false,
    },
  }),

  methods: {
    ...mapActions(["getDeliveryPoints", "orderDeliveryPoints"]),
    
    async saveOrder() {
      const deliveryPointsOrdered = this.deliveryPoints.map((el, idx) => ({ _id: el._id, order: idx+1 }));
      try {
        await this.orderDeliveryPoints(deliveryPointsOrdered);
        this.$router.back();
      } catch (error) {
        this.snackbar.message = error;
        this.snackbar.show = true;
      }
    },
  },

  async mounted() {
    try {
      this.deliveryPoints = await this.getDeliveryPoints();
    } catch (error) {
      this.snackbar.message = error;
      this.snackbar.show = true;
    }
  },
};
</script>
